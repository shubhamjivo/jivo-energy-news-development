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
  // Without an image the box stays a plain gray square.
  return (
    <div className={`relative overflow-hidden bg-placeholder ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
