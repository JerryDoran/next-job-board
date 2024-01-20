"use server";

import { toSlug } from "@/lib/utils";
import { CreateJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  // validate form data
  const {
    title,
    description,
    companyName,
    companyLogo,
    type,
    location,
    locationType,
    applicationEmail,
    applicationUrl,
    salary,
  } = CreateJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogoUrl) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo!.name)}`,
      companyLogoUrl,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      description: description?.trim(),
      companyName: companyName.trim(),
      companyLogoUrl,
      type,
      location,
      locationType,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      salary: parseInt(salary),
    },
  });

  redirect("/job-submitted");
}
