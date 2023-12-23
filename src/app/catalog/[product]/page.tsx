import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

import ItemCategoryButton from "@/components/catalog/ItemCategoryButtom";
import CatalogItem from "@/components/catalog/CatalogItem";
import FilterGroup from "@/components/catalog/FilterGroup";
import {
  GetAllFilterProps,
  GetUserLiked,
  SearchParams,
  GetCatalogType,
} from "@/lib/Catalog";
import { ItemCategory } from "@/types/Clothes";

export default async function Catalog({
  searchParams,
  params,
}: {
  searchParams: SearchParams;
  params: { product: string };
}) {
  const session = await getServerSession();
  const email = session?.user?.email;

  const liked = email ? await GetUserLiked(email) : [];
  const likedStr = liked.map((x) => x.toString());

  let catalog: any[] = [];
  let filterNames: string[] = [];
  try {
    let productType: ItemCategory | undefined;

    switch (params.product) {
      case "Jeans":
        productType = "Jeans";
      break;
      case "Shirts":
        productType = "Shirts";
      break;
      case "Jackets":
        productType = "Jackets";
      break;
      case "Shoes":
        productType = "Shoes";
      break;
      default:
      break;
    }

    filterNames.push(...["color", "seasons"]);
    catalog = await GetCatalogType(productType!);
  } catch (err) {
    console.log(err);
  }

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
          <ItemCategoryButton productType="Jeans">Jeans</ItemCategoryButton>
          <ItemCategoryButton productType="Shirts">Shirts</ItemCategoryButton>
        </div>
        <div className="p-4 w-full grid grid-cols-4 gap-4">
          {catalog.map((item, index) => (
            <CatalogItem
              item={item}
              key={index}
              isLiked={email ? likedStr.includes(item._id.toString()) : null}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
