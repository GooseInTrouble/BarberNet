import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

import ItemCategoryButton from "@/components/catalog/ItemCategoryButtom";
import CatalogItem from "@/components/catalog/CatalogItem";
import FilterGroup from "@/components/catalog/FilterGroup";
import {
  GetAllFilterProps,
  GetCatalogFiltered,
  GetCatalogById,
  GetCatalogSearch,
  GetUserLiked,
  SearchParams,
} from "@/lib/Catalog";

export default async function Catalog({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession();
  const email = session?.user?.email;

  const liked = email ? await GetUserLiked(email) : [];
  const likedStr = liked.map((x) => x.toString());

  const likedParam = searchParams["liked"];
  const searchParam = searchParams["search"];

  let catalog;
  if (likedParam === "") {
    catalog = await GetCatalogById(liked);
  } else if (searchParam && !Array.isArray(searchParam)) {
    catalog = await GetCatalogSearch(searchParam);
  } else {
    catalog ??= await GetCatalogFiltered(searchParams);
  }

  const filterNames = ["color", "brand"];
  const filterProps = await GetAllFilterProps(filterNames);

  const basket = cookies().get("basket")?.value;
  const basketArr: string[] = basket ? JSON.parse(basket) : [];

  return (
    <main className="flex bg-zinc-400">
      <div className="flex">
        <div className="bg-slate-600 h-screen min-w-[300px] p-2 text-white text-lg sticky top-0">
          <p className="text-2xl items-center justify-center flex">
            Filtration
          </p>
          <hr />
          <form className="max-h-[82vh] w-full overflow-auto">
            <button
              type="submit"
              className="bg-[#21ad9a] p-2 my-4 rounded-xl w-full static"
            >
              Apply
            </button>
            {filterNames.map((prop, index) => (
              <FilterGroup
                name={prop}
                filterSet={filterProps[index]}
                key={index}
              />
            ))}
          </form>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-slate-600 h-[40px] w-full sticky top-0 grid grid-cols-6">
          <ItemCategoryButton productType="cpu">CPUs</ItemCategoryButton>
          <ItemCategoryButton productType="gpu">GPUs</ItemCategoryButton>
          <ItemCategoryButton productType="ram">RAM</ItemCategoryButton>
          <ItemCategoryButton productType="hd">HardDrives</ItemCategoryButton>
          <ItemCategoryButton productType="mb">Motherboards</ItemCategoryButton>
          <ItemCategoryButton productType="psu">PSUs</ItemCategoryButton>
        </div>
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
      </div>
    </main>
  );
}