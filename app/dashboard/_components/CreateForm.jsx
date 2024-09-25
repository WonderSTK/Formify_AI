"use client";
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AiChatSession } from '@/configs/AiModal';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { desc, eq } from 'drizzle-orm';

const PROMPT = ", On the basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle, FieldType, Placeholder, label, required fields, and checkbox and select field type options will be in array only and in JSON format";
const DESCRIPTION_PREFIX = "Description:";

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        if (user) GetFormList();
    }, [user]);

    const GetFormList = async () => {
        try {
            const result = await db.select()
                .from(JsonForms)
                .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(JsonForms.id));

            setFormList(result);
        } catch (error) {
            console.error("Error fetching form list:", error);
            toast.error("Failed to fetch form list.");
        }
    };

    const onCreateForm = async () => {
        if (formList.length >= 3) {
            toast('Upgrade to create unlimited forms');
            return;
        }

        setLoading(true);
        try {
            const result = await AiChatSession.sendMessage(`${DESCRIPTION_PREFIX} ${userInput}${PROMPT}`);
            const responseText = result.response.text();

            if (responseText) {
                const resp = await db.insert(JsonForms).values({
                    jsonform: responseText,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM/YYYY')
                }).returning({ id: JsonForms.id });

                if (resp[0]?.id) {
                    toast.success("Form created successfully!");
                    router.push('/edit-form/' + resp[0].id);
                }
            }
        } catch (error) {
            console.error("Error creating form:", error);
            toast.error("Failed to create form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto"> {/* Center and limit width for larger screens */}
            <Button onClick={() => setOpenDialog(true)} className="w-full">+ Create Form</Button>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Form</DialogTitle>
                        <DialogDescription>
                            <Textarea 
                                className="my-2 w-full"  // Full width
                                onChange={(event) => setUserInput(event.target.value)}
                                placeholder="Write description of your form" 
                            />
                            <div className='flex gap-2 my-3 justify-end'>
                                <Button 
                                    onClick={() => setOpenDialog(false)}
                                    variant="destructive">
                                    Cancel
                                </Button>
                                <Button 
                                    disabled={loading}
                                    onClick={onCreateForm}>
                                    {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateForm;
