import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { Pen } from 'lucide-react'
import FieldEdit from './FieldEdit'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import moment from 'moment'
import { toast } from 'sonner'
import { SignInButton, useUser } from '@clerk/nextjs'

function FormUi({ jsonForm, selectedTheme, selectedStyle, 
  onFieldUpdate, deleteField, editable = true, formId = 0, enabledSignIn = false }) {
  const [formData, setFormData] = useState();
  let formRef = useRef();
  const { user, isSignedIn } = useUser();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const result = await db.insert(userResponses)
      .values({
        jsonResponse: formData,
        createdAt: moment().format('DD/MM/yyy'),
        
      });

    if (result) {
      formRef.reset();
      toast('Response Submitted Successfully!');
    } else {
      toast('Error while saving your form!');
    }
  }

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];
    if (value) {
      list.push({
        label: itemName,
        value: value
      });
      setFormData({
        ...formData,
        [fieldName]: list
      });
    } else {
      const result = list.filter((item) => item.label !== itemName);
      setFormData({
        ...formData,
        [fieldName]: result
      });
    }
  }

  return (
    <form 
      ref={(e) => formRef = e}
      onSubmit={onFormSubmit}
      className='border p-5 w-full max-w-lg md:w-[600px] rounded-lg mx-auto'
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key === 'boxshadow' && '5px 5px 0px black',
        border: selectedStyle?.key === 'border' && selectedStyle.value
      }}
    >
      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formHeading}</h2>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className='flex flex-col md:flex-row items-center gap-2 my-3'>
          {field.fieldType === 'select' ? (
            <div className='w-full'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              <Select required={field?.required} onValueChange={(v) => handleSelectChange(field.fieldName, v)}>
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, index) => (
                    <SelectItem key={index} value={item.label ? item.label : item}>
                      {item.label ? item.label : item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === 'radio' ? (
            <div className='w-full'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              <RadioGroup required={field?.required}>
                {field.options.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.label} id={item.label} onClick={() => handleSelectChange(field.fieldName, item.label)} />
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === 'checkbox' ? (
            <div className='w-full'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              {field?.options?.map((item, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <Checkbox onCheckedChange={(v) => handleCheckboxChange(field?.label, item.label ? item.label : item, v)} />
                  <h2>{item.label ? item.label : item}</h2>
                </div>
              ))}
            </div>
          ) : (
            <div className='w-full'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              <Input type={field?.type} placeholder={field.placeholder} name={field.fieldName} className="bg-transparent w-full" required={field?.required} onChange={(e) => handleInputChange(e)} />
            </div>
          )}

          {editable && (
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}
        </div>
      ))}

      {!enabledSignIn ? (
        <button className='btn btn-primary w-full'>Submit</button>
      ) : isSignedIn ? (
        <button className='btn btn-primary w-full'>Submit</button>
      ) : (
        <Button className="w-full">
          <SignInButton mode='modal'>Sign In before Submit</SignInButton>
        </Button>
      )}
    </form>
  );
}

export default FormUi;
