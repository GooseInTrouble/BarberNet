import CatalogItem from "@/components/catalog/CatalogItem";
import FilterGroup from "@/components/catalog/FilterGroup";
import { GetAllFilterProps, GetCatalogFiltered, GetCatalogSearch } from "@/lib/Catalog";
import { ServiceCategory } from "@/types/Services";
import { WithId } from "mongodb";

interface SearchParams {
  search?: string | undefined;
  category?: ServiceCategory | undefined;
}

export default function Catalog({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchParam = searchParams.search;
  const categoryFilter = searchParams.category;

  let catalog: WithId<any>[] = [];

  // Асинхронна функція для завантаження каталогу
  const loadCatalog = async () => {
    if (searchParam && !Array.isArray(searchParam)) {
      catalog = await GetCatalogSearch(searchParam);
    } else {
      catalog = await GetCatalogFiltered(searchParams);
    }
  };

  // Виклик асинхронної функції
  loadCatalog();

  // Фільтрація за категорією
  if (categoryFilter && categoryFilter !== "All" && catalog.length > 0) {
    catalog = catalog.filter(item => item.ServiceCategory === categoryFilter);
  }

  const filterNames: string[] = ["color", "material"];

  // Асинхронне завантаження фільтрів
  const loadFilters = async () => {
    const filterProps = await GetAllFilterProps(filterNames);
    return filterProps;
  };

  // Виклик асинхронного завантаження фільтрів
  const filterProps = loadFilters();

  return (
    <main className="flex bg-zinc-400">
      <div className="flex">
        <div className="bg-slate-600 h-screen min-w-[300px] p-2 text-white text-lg sticky top-0">
          <p className="text-2xl items-center justify-center flex">
            Фільтрація
          </p>
          <hr />
          <form className="max-h-[82vh] w-full overflow-auto">
            <button
              type="submit"
              className="bg-[#21ad9a] p-2 my-4 rounded-xl w-full static"
            >
              Застосувати
            </button>
            {filterNames.map((prop, index) => (
              <FilterGroup
                name={prop}
                filterSet={filterProps[index]}
                key={index}
              />
            ))}
            {/* Вибір категорії */}
            <div>
              <label htmlFor="category">Виберіть категорію:</label>
              <select
                id="category"
                name="category"
                onChange={(e) => {
                  // Оновлення параметрів пошуку з обраною категорією
                  const selectedCategory = e.target.value as ServiceCategory;
                  // Потрібно додати логіку для збереження параметрів пошуку
                  console.log(selectedCategory);
                }}
              >
                <option value="All">Всі</option>
                <option value="Hairstyling">Причіски</option>
                <option value="Shaving">Гоління</option>
                <option value="Coloring">Фарбування</option>
              </select>
            </div>
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
