import { Metadata } from "next"
import NewJobForm from "./_components/new-job-form"

export const metadata: Metadata = {
  title: 'Post a new job',
}

export default function NewJobPage() {
  return (
    <NewJobForm />
  )
}