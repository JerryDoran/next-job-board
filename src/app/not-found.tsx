import Heading from "@/components/ui/heading";

export default function NotFound() {
  return (
    <main className="mx-w-4xl max-w-screen m-auto flex min-h-[calc(100vh-188px)] flex-col items-center justify-center space-y-5 px-3 ">
      <Heading className="text-5xl">Not Found</Heading>
      <p>Sorry, the page you were looking for could not be found.</p>
    </main>
  );
}
