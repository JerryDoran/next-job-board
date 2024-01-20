import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatRelativeDate(fromDate: Date) {
  return formatDistanceToNowStrict(fromDate, { addSuffix: true });
}

export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w-]+/g, "")
    .replace(/ /g, "-");
}
