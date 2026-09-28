import Image from "next/image";

const WIDTH = 2981;
const HEIGHT = 2000;

const SRC = {
  transparent: "/logo/Africa Energy News Logo with transparent background.png",
  onWhite: "/logo/Africa Energy News Logo with background.jpg",
} as const;

type LogoProps = {
  variant?: keyof typeof SRC;
  className?: string;
  preload?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
};

export function Logo({
  variant = "transparent",
  className = "",
  preload = false,
  sizes,
  style,
}: LogoProps) {
  return (
    <Image
      src={SRC[variant]}
      alt="Africa Energy News"
      width={WIDTH}
      height={HEIGHT}
      preload={preload}
      sizes={sizes}
      style={style}
      className={className}
    />
  );
}
