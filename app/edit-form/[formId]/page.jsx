"use client";
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';
import Controller from '../_components/Controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedBackground, setSelectedBackground] = useState();
  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
    setSelectedBackground(result[0].background);
    setSelectedTheme(result[0].theme);
    setSelectedStyle(JSON.parse(result[0].style));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value, index) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });

    toast('Updated!!!');
  };

  const deleteField = (indexToRemove) => {
    const result = jsonForm.fields.filter((item, index) => index !== indexToRemove);
    jsonForm.fields = result;
    setUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (value, columnName) => {
    const result = await db
      .update(JsonForms)
      .set({
        [columnName]: value,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      )
      .returning({ id: JsonForms.id });

    toast('Updated!!!');
  };

  const handleCopyLink = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/aiform/${record?.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link: ", err);
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold text-sm md:text-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={'/aiform/' + record?.id} target="_blank">
            <Button className="flex gap-2 text-sm md:text-base">
              <SquareArrowOutUpRight className="h-5 w-5" /> Live Preview
            </Button>
          </Link>
          <Button
            className="flex gap-2 bg-green-600 hover:bg-green-700 text-sm md:text-base"
            onClick={handleCopyLink}
          >
            <Share2 /> Copy Link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-4 md:p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, 'theme');
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, 'background');
              setSelectedBackground(value);
            }}
            selectedStyle={(value) => {
              setSelectedStyle(value);
              updateControllerFields(value, 'style');
            }}
            setSignInEnable={(value) => {
              updateControllerFields(value, 'enabledSignIn');
            }}
          />
        </div>

        <div
          className="md:col-span-2 p-4 md:p-5 border rounded-lg flex items-center justify-center"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;
