import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center py-16">
      <Container>
      <p className="text-[10px] font-semibold tracking-[1px] text-accent">404</p>
      <h1 className="mt-2 text-[28px] font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-md text-sm leading-5 text-muted">
        That page does not exist. Head back to the homepage for the latest Africa
        energy stories.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center bg-navy px-4 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
      </Container>
    </main>
  );
}
