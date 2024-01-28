"use client";

import {
  approveSubmission,
  deleteJob,
} from "@/app/(admin)/_actions/admin-actions";
import FormSubmitButton from "@/components/form-submit-button";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";

type AdminSidebarProps = {
  job: Job;
};

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

type AdminButtonProps = {
  jobId: number;
};

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <span className="text-sm text-red-500">{formState.error}</span>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <span className="text-sm text-red-500">{formState.error}</span>
      )}
    </form>
  );
}
