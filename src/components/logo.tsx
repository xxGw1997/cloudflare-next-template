import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-foreground flex flex-row items-center gap-2 sm:gap-3"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={32}
        height={32}
        priority
        className="object-cover"
      />
      <span className="text-foreground text-lg leading-tight sm:text-xl">
        Cloudflare Next Template
      </span>
    </Link>
  );
}
