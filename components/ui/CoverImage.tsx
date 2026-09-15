import Image from "next/image";

type CoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

export function CoverImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  unoptimized = false,
}: CoverImageProps) {
  return (
    <div className={`relative overflow-hidden bg-ink/10 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className="object-cover"
      />
    </div>
  );
}
