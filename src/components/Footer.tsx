import NavButtonLink from "./NavButtonLink";

export default function Footer() {
  return (
    <nav className="bg-[#303a50] font-arial p-2 items-center">
      <div className="flex text-white items-center mx-auto justify-center w-1/6">
        <NavButtonLink href="/">Epclon</NavButtonLink>
        <NavButtonLink href="/about">About Us</NavButtonLink>
      </div>
      <hr></hr>
      <p className="text-gray-400">
        A copyright notice, link to a privacy policy, sitemap, logo, contact
        information, social media icons, and an email sign-up form.
      </p>
    </nav>
  );
}
