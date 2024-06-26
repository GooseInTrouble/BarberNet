import { getServerSession } from "next-auth";
import SalonItem from "@/components/salons/SalonItem";
import {
  GetCatalogFiltered,
  GetCatalogSearch,
  SearchParams,
} from "@/lib/Salons"; 

export default async function Salon({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession();
  const searchParam = searchParams["search"];

  let catalog;
  if (searchParam && !Array.isArray(searchParam)) {
    catalog = await GetCatalogSearch(searchParam);
  } else {
    catalog ??= await GetCatalogFiltered(searchParams);
  }

  return (
    <main className="flex bg-zinc-400">
      <div className="w-full">
      <div className="bg-slate-600 h-[40px] w-full sticky top-0 text-center text-white text-lg py-2"> Salons</div>
        <div className="p-4 w-full grid grid-cols-4 gap-4">
          {catalog.map((item, index) => (
            <SalonItem
              item={item}
              key={index}            
            />
          ))}
        </div>
      </div>
    </main>
  );
}
