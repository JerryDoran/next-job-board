import { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JobDetails from "@/components/job-details";

type JobDetailsPageProps = {
  params: {
    slug: string;
  };
};

const getJobDetails = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) notFound();

  return job;
});

export async function generateMetadata({
  params: { slug },
}: JobDetailsPageProps): Promise<Metadata> {
  const job = await getJobDetails(slug);

  return {
    title: job?.title,
  };
}

export default async function JobDetailsPage({
  params: { slug },
}: JobDetailsPageProps) {
  const job = await getJobDetails(slug);

  return (
    <main className="m-auto my-10 flex max-w-4xl flex-col items-center gap-5 p-3 md:flex-row md:items-start">
      <JobDetails job={job} />
    </main>
  );
}
