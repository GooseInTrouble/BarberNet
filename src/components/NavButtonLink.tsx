import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export default function NavButtonLink({
  children,
  href,
}: {
  children: string;
  href: Url;
}) {
  return (
    <Link
      className="
      text-white text-lg
      rounded-md px-3 py-2 mx-1
      hover:bg-white hover:bg-opacity-10"
      href={href}
    >
      {children}
    </Link>
  );
}
