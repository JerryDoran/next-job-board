import JobDetails from "@/components/job-details";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./_components/admin-sidebar";

type JobDetailsPageProps = {
  params: {
    slug: string;
  };
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = await prisma.job.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-4xl flex-col items-center gap-5 px-3 md:flex-row  md:items-start">
      <JobDetails job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
