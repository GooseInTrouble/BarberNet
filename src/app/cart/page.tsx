import CatalogItem from "@/components/catalog/CatalogItem";
import { GetCatalogById, GetUserLiked } from "@/lib/Catalog";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export default async function Cart() {
  const session = await getServerSession();
  const email = session?.user?.email;

  const liked = email ? await GetUserLiked(email) : [];
  const likedStr = liked.map((x) => x.toString());

  const basket = cookies().get("basket")?.value;
  const basketArr: string[] = basket ? JSON.parse(basket) : [];

  const basketIds: ObjectId[] = [];
  basketArr.forEach((item) => {
    try {
      basketIds.push(new ObjectId(item));
    } catch {}
  });

  const catalog = await GetCatalogById(basketIds);
  const total = catalog.reduce((acc, item) => acc + Number(item.cost), 0);

  return (
    <main className="flex bg-zinc-400 ">
      {catalog.length === 0 ? (
        <p
          className="
          text-white text-lg text-center py-5
          bg-slate-600 rounded h-[10vh] w-[25vh]
          absolute left-[45vw] top-[40vh]
          "
        >
          Cart is empty
        </p>
      ) : (
        <>
          <div className="p-4 w-full grid grid-cols-4 gap-4">
            {catalog.map((item, index) => (
              <CatalogItem
                item={item}
                key={index}
                isLiked={email ? likedStr.includes(item._id.toString()) : null}
                isInBasket={basketArr.includes(item._id.toString())}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
