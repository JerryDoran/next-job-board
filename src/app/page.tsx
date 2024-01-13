import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResults from "@/components/job-results";
import Heading from "@/components/ui/heading";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

type HomePageProps = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
};

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developer jobs"
        : "All Developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({ searchParams }: HomePageProps): Metadata {
  return {
    title: `${getTitle({
      q: searchParams.q,
      type: searchParams.type,
      location: searchParams.location,
      remote: searchParams.remote === "true",
    })} | Dev Jobs`,
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const filterValues: JobFilterValues = {
    q: searchParams.q,
    type: searchParams.type,
    location: searchParams.location,
    remote: searchParams.remote === "true",
  };

  return (
    <main className="mx-auto my-10 max-w-4xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <Heading>{getTitle(filterValues)}</Heading>
        <p className="text-muted-foreground">Find your next developer job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filteredValues={filterValues} />
      </section>
    </main>
  );
}
