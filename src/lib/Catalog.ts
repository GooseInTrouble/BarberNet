import { servicesCollection } from "@/lib/MongoConnect";
import { WithId, Filter, Document } from "mongodb";
import Services, { ServiceCategory } from "@/types/Services";
import { ObjectId } from "mongodb";

export function GetFilterProps(filterName: keyof Services) {
  return servicesCollection.distinct(filterName);
}

export function GetAllFilterProps(filterNames: (keyof Services)[]) {
  return Promise.all(
    filterNames.map((filterName) => GetFilterProps(filterName))
  );
}
export function GetServiceItem(id: ObjectId) {
  return servicesCollection.findOne({ _id: id }) as Promise<WithId<Services>>;
}

export function GetCatalogFiltered(searchParams: Partial<Services>) {
  const mongoFilter = ToMongoFilter(searchParams);

  const query = servicesCollection.find(mongoFilter);

  return query.toArray() as Promise<WithId<Services>[]>;
}

function ToMongoFilter(searchParams: Partial<Services>) {
  const mongoFilter: Filter<Document> = {};

  for (const key in searchParams) {
    const val = searchParams[key as keyof Services];

    if (Array.isArray(val)) {
      mongoFilter[key] = { $in: val };
    } else {
      mongoFilter[key] = val;
    }
  }

  return mongoFilter;
}

export function GetCatalogSearch(searchQuery: string) {
  const query = servicesCollection.aggregate([
    {
      $search: {
        index: "searchIndex",
        text: {
          query: searchQuery,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ]);

  return query.toArray() as Promise<WithId<Services>[]>;
}
