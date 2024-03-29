import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    return !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an image file")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Either Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value: string) =>
        locationTypes.includes(value as "Remote" | "Hybrid" | "On-site"),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required if location type is not remote",
      path: ["location"],
    },
  );

export const CreateJobSchema = z
  .object({
    title: requiredString.max(100),
    companyName: requiredString.max(100),
    type: requiredString.refine(
      (value: string) =>
        jobTypes.includes(
          value as
            | "Full-time"
            | "Part-time"
            | "Contract"
            | "Internship"
            | "Temporary"
            | "Volunteer",
        ),
      "Invalid job type",
    ),
    companyLogo: companyLogoSchema,
    location: z.string().optional(),
    description: z.string().max(5000).optional(),
    salary: z
      .string()
      .min(1)
      .regex(/^\d+$/, "Must be a number")
      .max(9, "Must be less than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type CreateJobValues = z.infer<typeof CreateJobSchema>;
export type JobFilterValues = z.infer<typeof jobFilterSchema>;
