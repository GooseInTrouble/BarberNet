import Services, { ServiceCategory } from "@/types/Services";

import { servicesCollection, userCollection } from "@/lib/MongoConnect";
import { WithId, Filter, Document, ObjectId } from "mongodb";

export function GetFilterProps(filterName: string) {
  return servicesCollection.distinct(`props.${filterName}`);
}

export function GetAllFilterProps(filterNames: string[]) {
  return Promise.all(
    filterNames.map((filterName) => GetFilterProps(filterName))
  );
}
// src/lib/MongoConnect.ts

export function GetServicesBySalonId(salonId: ObjectId) {
  return servicesCollection.find({ salonId: salonId }).toArray() as Promise<WithId<Services>[]>;
}

export function GetCatalogFull(): Promise<WithId<Services>[]> {
  return servicesCollection.find().toArray() as Promise<WithId<Services>[]>;
}

export type SearchParams = { [key: string]: string | string[] | undefined };

export function GetCatalogFiltered(searchParams: SearchParams) {
  const mongoFilter = ToMongoFilter(searchParams);

  const query = servicesCollection.find(mongoFilter);

  return query.toArray() as Promise<WithId<Services>[]>;
}

function ToMongoFilter(searchParams: SearchParams) {
  const mongoFilter: Filter<Document> = {};

  for (const key in searchParams) {
    const val = searchParams[key];

    if (Array.isArray(val)) {
      mongoFilter[`props.${key}`] = { $in: val };
    } else {
      mongoFilter[`props.${key}`] = val;
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

export function GetServiceById(liked: ObjectId[]) {
  return servicesCollection.find({ _id: { $in: liked } }).toArray() as Promise<
    WithId<Services>[]
  >;
}




/*-------------------------------------------------
Service  Services  servicesCollection
*/

export function GetServiceItem(id: ObjectId) {
  return servicesCollection.findOne({ _id: id }) as Promise<WithId<Services>>;
}

export function GetServiceType(type: ServiceCategory) {
  return servicesCollection.find({ ItemCategory: type }).toArray();
}