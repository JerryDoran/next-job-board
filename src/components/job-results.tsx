import { JobFilterValues } from "@/lib/validation";
import JobListItem from "./job-list-item";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type JobResultsProps = {
  filteredValues: JobFilterValues;
  page?: number;
};

export default async function JobResults({
  filteredValues,
  page = 1,
}: JobResultsProps) {
  const { q, type, location, remote } = filteredValues;

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

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

  const jobsPromise = prisma.job.findMany({
    where: where,
    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({
    where: where,
  });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

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
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filteredValues={filteredValues}
        />
      )}
    </div>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  filteredValues: JobFilterValues;
};

function Pagination({
  filteredValues: { q, type, location, remote },
  currentPage,
  totalPages,
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return <div className="flex justify-between"></div>;
}
