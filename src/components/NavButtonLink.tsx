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
      text-gray-300 text-lg
      rounded-md px-3 py-2
      hover:bg-[#475c85] hover:text-white"
      href={href}
    >
      {children}
    </Link>
  );
}
