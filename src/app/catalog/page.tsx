import CatalogItem from "@/components/catalog/CatalogItem";
import FilterGroup from "@/components/catalog/FilterGroup";
import { GetAllFilterProps, GetCatalogFiltered, GetCatalogSearch } from "@/lib/Catalog";
import { WithId } from "mongodb";
import Services from "@/types/Services";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default async function Catalog({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchParam = searchParams["search"];

  let catalog: WithId<Services>[] = [];
  if (searchParam && !Array.isArray(searchParam)) {
    catalog = await GetCatalogSearch(searchParam);
  } else {
    const partialSearchParams: Partial<Services> = {};
    for (const key in searchParams) {
      const value = searchParams[key];
      if (value !== undefined) {
        if (key === "name" || key === "ServiceCategory") {
          partialSearchParams[key as keyof Services] = Array.isArray(value) ? value.join(", ") : value;
        } else {
          partialSearchParams[key as keyof Services] = value as any;
        }
      }
    }    
    catalog = await GetCatalogFiltered(partialSearchParams);
  }

  const filterNames: (keyof Services)[] = ["name", "ServiceCategory"];
  const filterProps = await GetAllFilterProps(filterNames);

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
                name={prop as string}
                filterSet={filterProps[index] as string[]}
                key={index}
              />
            ))}
          </form>
        </div>
      </div>
      <div className="w-full">
        <div className="p-4 w-full grid grid-cols-4 gap-4">
          {catalog.map((item, index) => (
            <CatalogItem
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
