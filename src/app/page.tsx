import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobListItem from "@/components/job-list-item";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto my-10 max-w-4xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Developer Jobs
        </h1>
        <p className="text-muted-foreground">Find your next developer job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <div className="grow space-y-3">
          {jobs.map((job) => (
            <JobListItem job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
