import JobListItem from "@/components/job-list-item";
import Heading from "@/components/ui/heading";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });
  return (
    <main className="m-auto my-10 max-w-4xl space-y-10 px-3">
      <Heading className="text-center">Admin Dashboard</Heading>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved Jobs:</h2>
        {unapprovedJobs.map((job) => (
          <Link href={`admin/jobs/${job.slug}`} key={job.id} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <p className="text-muted-foreground">No unapproved jobs</p>
        )}
      </section>
    </main>
  );
}
