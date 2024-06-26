import Link from "next/link";

export default function ItemCategoryButton({
  productType,
  children,
}: {
  productType: string;
  children: string;
}) {
  return (
    <Link
      href={`/catalog/${productType}`}
      className="text-white text-lg text-center
    rounded-md max-h-[100%] py-1
    hover:bg-white hover:bg-opacity-10"
    >
      {children}
    </Link>
  );
}
