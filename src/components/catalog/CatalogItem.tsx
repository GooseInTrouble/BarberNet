import Image from "next/image";
import Link from "next/link";
import { WithId } from "mongodb";

import LikeButton from "./LikeButton";
import ShopItem from "@/types/ShopItem";

export default function CatalogItem({
  item,
  isLiked,
}: {
  item: WithId<ShopItem>;
  isLiked: boolean | null;
}) {
  return (
    <div className="bg-slate-600 p-4 text-white text-lg hover:outline hover:bg-slate-500 rounded-md max-w-xs h-fit">
      <Link href={`/product?id=${item._id}`}>
        <div className="mb-4 aspect-w-1 aspect-h-1">
          <Image
            src={item.image}
            alt={`${item.name} image`}
            width={200}
            height={200}
            className="aspect-square object-cover m-auto rounded-md"
          />
        </div>
        <p className="flex justify-center overflow-hidden">
          <span className="truncate">{item.name}</span>
        </p>
        <p className="text-center">{`${Number(item.cost).toFixed(2)}₴`}</p>
      </Link>
      <div className="flex gap-2 my-1">
        {isLiked !== null && <LikeButton id={item._id} isLiked={isLiked} />}
      </div>
    </div>
  );
}
