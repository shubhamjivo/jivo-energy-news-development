import type { VideoEntry } from "@/lib/cms";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WatchListen({ videos, heading }: { videos: VideoEntry[]; heading: Heading }) {
  if (videos.length === 0) return null;

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

      <div className="mt-4 hidden grid-cols-3 gap-6 desk:grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="mt-4 desk:hidden">
        <Carousel spaceBetween={16}>
          {videos.map((video) => (
            <div key={video.id} className="w-[280px]">
              <VideoCard video={video} />
            </div>
          ))}
        </Carousel>
      </div>
      </Container>
    </section>
  );
}

function VideoCard({ video }: { video: VideoEntry }) {
  const body = (
    <>
      <div className="relative">
        <CoverImage
          src={video.image}
          alt={video.title}
          className="h-[160px] w-full"
          sizes="(max-width: 1439px) 80vw, 424px"
        />
        <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90">
          <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-ink" />
        </span>
      </div>
      <Kicker>VIDEO</Kicker>
      <p className="text-[15px] font-semibold leading-5 text-ink">{video.title}</p>
    </>
  );

  return video.href ? (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2"
    >
      {body}
    </a>
  ) : (
    <div className="flex flex-col gap-2">{body}</div>
  );
}
