import { getServerSession } from "next-auth";
import SetItem from "@/components/sets/SetItem";
import {
  GetAllFilterProps,
  GetCatalogFiltered,
  GetCatalogById,
  GetCatalogSearch,
  GetUserLiked,
  SearchParams,
} from "@/lib/Sets"; 

export default async function Catalog({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession();
  const email = session?.user?.email;

  const liked = email ? await GetUserLiked(email) : [];

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

  const filterNames = ["color", "material"];
  const filterProps = await GetAllFilterProps(filterNames);

  return (
    <main className="flex bg-zinc-400">
      <div className="w-full">
      <div className="bg-slate-600 h-[40px] w-full sticky top-0 text-center text-white text-lg py-2"> Sets</div>
        <div className="p-4 w-full grid grid-cols-4 gap-4">
          {catalog.map((item, index) => (
            <SetItem
              item={item}
              key={index}            
            />
          ))}
        </div>
      </div>
    </main>
  );
}
