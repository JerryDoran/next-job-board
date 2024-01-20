import Heading from "@/components/ui/heading";

export default function JobSubmittedPage() {
  return (
    <main className="m-auto my-10 max-w-4xl space-y-5 px-3 text-center">
      <Heading>Job Submitted</Heading>
      <p className="text-muted-foreground">
        Your job has been submitted and is pending approval
      </p>
    </main>
  );
}
