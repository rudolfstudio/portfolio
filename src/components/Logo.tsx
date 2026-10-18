import Image from "next/image";

type Props = { light?: boolean; className?: string; priority?: boolean };

export function Logo({ light = false, className = "", priority = false }: Props) {
  return (
    <Image
      src={light ? "/portfolio/brand/logo-light.svg" : "/portfolio/brand/logo-color.svg"}
      alt="Rudolf Studio"
      width={205}
      height={25}
      priority={priority}
      className={className}
    />
  );
}
