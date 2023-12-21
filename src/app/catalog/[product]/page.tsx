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
import { ItemCategory } from "@/types/ShopItem";

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
      case "cpu":
        productType = "CPU";
        filterNames = [

          "socket",
          "threadCount",
          "coreCount",
          "clockspeed_GHz"
        ];
      break;
      case "gpu":
        productType = "GPU";
        filterNames = [
        "pcieVersion", 
        "gpuCableType", 
        "memoryCapacity_Gb",
        "memoryStandard"
      ];
      break;
      case "ram":
        productType = "RAM";
        filterNames = [
        "ramStandard", 
        "frequency_GHz", 
        "ramCapacity_Gb", 
      ];
      break;
      case "hd":
        productType = "Hard Drive";
        filterNames = [
        "memoryCapacity_Gb", 
        "readSpeed_MBs", 
        "writeSpeed_MBs", 
        "type", 
        "intrface"];
      break;
      case "mb":
        productType = "Motherboard";
        filterNames = [
        "socket", 
        "ramStandard", 
        "pcieVersion", 
        "ramSlotCount", 
        "type"];
      break;
      case "psu":
        productType = "PSU";
        filterNames = [
        "gpuCableType", 
        "power_W", 
        "efficiencyCertificate"];
      break;
      default:
      break;
    }

    filterNames.push(...["color", "brand"]);
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
