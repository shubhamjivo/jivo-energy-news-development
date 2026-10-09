import Link from "next/link";
import type { InsightCard } from "@/lib/cms";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LatestReports({
  reports,
  heading,
}: {
  reports: InsightCard[];
  heading: Heading;
}) {
  if (reports.length === 0) return null;

  return (
    <section className="py-5 desk:py-6">
      <Container>
      <SectionHeading
        kicker={heading.kicker}
        title={heading.title}
        href={heading.linkUrl}
        action={heading.linkLabel}
      />
      <div className="mt-3.5 h-px bg-ink" />

      <div className="mt-4 hidden grid-cols-4 gap-6 desk:grid">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      <div className="mt-4 desk:hidden">
        <Carousel spaceBetween={16}>
          {reports.map((report) => (
            <div key={report.id} className="w-[220px]">
              <ReportCard report={report} />
            </div>
          ))}
        </Carousel>
      </div>
      </Container>
    </section>
  );
}

function ReportCard({ report }: { report: InsightCard }) {
  return (
    <Link href={report.href} className="flex flex-col gap-2.5">
      {report.image ? (
        <CoverImage
          src={report.image}
          alt={report.title}
          className="h-[180px] w-full"
          sizes="312px"
        />
      ) : null}
      <p className="text-sm font-semibold leading-[19px] text-ink">{report.title}</p>
    </Link>
  );
}
