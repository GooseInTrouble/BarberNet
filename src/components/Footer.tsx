import NavButtonLink from "./NavButtonLink";

export default function Footer() {
  return (
    <nav className="bg-gray-700 font-arial p-2 items-center">
      <div className="flex text-white items-start justify-start w-1/6">
        <NavButtonLink href="/">StyleHub</NavButtonLink>
        <NavButtonLink href="/about">About Us</NavButtonLink>
      </div>
      <hr />
      <p className="text-gray text-md">©2023 StyleHub</p>
    </nav>
  );
}
