import NavButtonLink from "./NavButtonLink";

export default function Footer() {
  return (
    <nav className="bg-gray-700 font-arial p-2 items-center bottom-0">
      <div className="flex text-white items-start justify-start w-1/6">
        <NavButtonLink href="/">BarberNet</NavButtonLink>
        <NavButtonLink href="/about">About Us</NavButtonLink>
      </div>
      <p className="text-gray text-md">©2024 BarberNet</p>
    </nav>
  );
}
