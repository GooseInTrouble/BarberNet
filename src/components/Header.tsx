import Link from "next/link";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import NavButtonLink from "./NavButtonLink";
import { getServerSession } from "next-auth";

export default async function Header() {
  const session = await getServerSession();

  return (
    <nav className="bg-[#303a50] flex items-center justify-between">
      <div className="flex items-center">
        <Link
          href="/"
          className="rounded-full m-3 w-[50px] h-[50px] bg-[url('/logo.jpg')] bg-cover"
        ></Link>
        <NavButtonLink href="/cart">Cart</NavButtonLink>
        <NavButtonLink href="/catalog">Catalog</NavButtonLink>
        {session && <NavButtonLink href="/data">Data</NavButtonLink>}
      </div>
      <div className="flex items-center justify-between">
        <SearchBar />
        <ProfileButton />
      </div>
    </nav>
  );
}