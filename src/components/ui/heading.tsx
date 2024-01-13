import { cn } from "@/lib/utils";

export default function Heading(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        "text-3xl font-bold tracking-tight lg:text-4xl",
        props.className,
      )}
    />
  );
}
