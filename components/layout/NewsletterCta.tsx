import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function NewsletterCta() {
  return (
    <section id="newsletter" className="bg-forest py-10 text-white">
      <Container className="flex h-full flex-col items-start justify-between gap-6 desk:flex-row desk:items-center">
        <div className="flex max-w-[640px] flex-col gap-2">
          <h2 className="text-[24px] font-bold leading-[30px] desk:text-[28px] desk:leading-[34px]">
            The 5 energy stories you need to know today.
          </h2>
          <p className="text-sm leading-5">
            Africa Energy Brief — intelligence from Johannesburg, Lagos and Nairobi.
          </p>
        </div>
        <Link
          href="#newsletter"
          className="flex h-12 w-full items-center justify-center bg-accent text-[10px] font-semibold tracking-[1px] uppercase text-white desk:w-[280px]"
        >
          Subscribe to the Brief
        </Link>
      </Container>
    </section>
  );
}
