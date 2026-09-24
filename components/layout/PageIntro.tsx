import { Container } from "@/components/ui/Container";

export function PageIntro({
  kicker,
  title,
  dek,
}: {
  kicker: string;
  title: string;
  dek: string;
}) {
  return (
    <section className="pt-8 pb-2 desk:pt-10">
      <Container>
        <p className="text-[10px] font-semibold tracking-[1px] text-accent">
          {kicker}
        </p>
        <h1 className="mt-2.5 text-[32px] font-bold leading-[38px] text-ink desk:text-[48px] desk:leading-none">
          {title}
        </h1>
        <p className="mt-2.5 max-w-[820px] text-sm leading-5 text-muted desk:text-base desk:leading-6">
          {dek}
        </p>
        <div className="mt-2.5 h-px bg-hairline" />
      </Container>
    </section>
  );
}
