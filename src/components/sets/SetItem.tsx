import Image from "next/image";
import Link from "next/link";
import { WithId } from "mongodb";

import Sets from "@/types/Sets";

export default function CatalogItem({
  item,
}: {
  item: WithId<Sets>;
}) {
  return (
    <div className="bg-slate-600 p-4 text-white text-lg hover:outline hover:bg-slate-500 rounded-md max-w-xs h-fit">
      <Link href={`/setview?id=${item._id}`}>
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
      </Link>
    </div>
  );
}
