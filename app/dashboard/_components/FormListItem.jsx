import { Button } from '@/components/ui/button';
import { Edit, Share, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import { toast } from 'sonner';

function FormListItem({ formRecord, jsonForm, refreshData }) {
    const { user } = useUser();

    const onDeleteForm = async () => {
        try {
            const result = await db.delete(JsonForms)
                .where(and(eq(JsonForms.id, formRecord.id),
                eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

            if (result) {
                toast('Form Deleted!!!');
                refreshData();
            }
        } catch (error) {
            console.error("Error deleting form:", error);
            toast.error("Failed to delete form. Please try again.");
        }
    };

    const handleCopyLink = async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/aiform/${formRecord?.id}`;
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy link: ", err);
            toast.error("Failed to copy link.");
        }
    };

    return (
        <div className='border shadow-sm rounded-lg p-4 flex flex-col gap-4 w-full max-w-2xl mx-auto'>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg text-black'>{jsonForm?.formTitle}</h2>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Trash className='h-5 w-5 text-red-600 cursor-pointer hover:scale-105 transition-all' />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this form.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDeleteForm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
            <hr className='my-4' />
            <div className='flex justify-between flex-wrap gap-2'>
                <Button variant="outline" size="sm" className="flex gap-2" onClick={handleCopyLink}>
                    <Share className='h-5 w-5' /> Copy Link
                </Button>
                <Link href={`/edit-form/${formRecord?.id}`}>
                    <Button className="flex gap-2" size="sm">
                        <Edit className='h-5 w-5' /> Edit
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default FormListItem;
