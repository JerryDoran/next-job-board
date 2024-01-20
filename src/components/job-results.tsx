import { JobFilterValues } from "@/lib/validation";
import JobListItem from "./job-list-item";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type JobResultsProps = {
  filteredValues: JobFilterValues;
};

export default async function JobResults({ filteredValues }: JobResultsProps) {
  const { q, type, location, remote } = filteredValues;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: {
              search: searchString,
              mode: "insensitive",
            },
          },
          {
            companyName: {
              search: searchString,
              mode: "insensitive",
            },
          },
          {
            type: {
              search: searchString,
              mode: "insensitive",
            },
          },
          {
            locationType: {
              search: searchString,
              mode: "insensitive",
            },
          },
          {
            location: {
              search: searchString,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      {
        approved: true,
      },
    ],
  };

  const jobs = await prisma.job.findMany({
    where: where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grow space-y-3">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">No results found</p>
      )}
    </div>
  );
}
