"use client";

import Heading from "@/components/ui/heading";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main className="mx-auto my-10 max-w-4xl space-y-5 px-3 text-center">
      <Heading>Error</Heading>
      <p>An unexpected error occurred.</p>
    </main>
  );
}
