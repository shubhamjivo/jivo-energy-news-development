import Link from "next/link";
import { REPORTS } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { HScroll } from "@/components/ui/HScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LatestReports() {
  return (
    <section className="pb-8 pt-8 desk:pt-10">
      <Container>
      <SectionHeading
        kicker="FROM THE DESK"
        title="Latest Reports"
        href="/insights"
        action="Browse the library →"
      />
      <div className="mt-3.5 h-px bg-ink" />

      <div className="mt-4 hidden grid-cols-4 gap-6 desk:grid">
        {REPORTS.map((report) => (
          <ReportCard key={report.title} report={report} />
        ))}
      </div>

      <div className="mt-4 desk:hidden">
        <HScroll className="gap-4">
          {REPORTS.map((report) => (
            <div key={report.title} className="w-[220px] shrink-0 snap-start">
              <ReportCard report={report} />
            </div>
          ))}
        </HScroll>
      </div>
      </Container>
    </section>
  );
}

function ReportCard({ report }: { report: (typeof REPORTS)[number] }) {
  return (
    <Link href="/insights" className="flex flex-col gap-2.5">
      <CoverImage
        src={report.image}
        alt={report.title}
        className="h-[180px] w-full"
        sizes="312px"
      />
      <p className="text-sm font-semibold leading-[19px] text-ink">{report.title}</p>
    </Link>
  );
}
