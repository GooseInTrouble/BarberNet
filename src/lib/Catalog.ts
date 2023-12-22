import Clothes, { ItemCategory } from "@/types/Clothes";

import { clothesCollection, userCollection } from "@/lib/MongoConnect";
import { WithId, Filter, Document, ObjectId } from "mongodb";

export function GetFilterProps(filterName: string) {
  return clothesCollection.distinct(`props.${filterName}`);
}

export function GetAllFilterProps(filterNames: string[]) {
  return Promise.all(
    filterNames.map((filterName) => GetFilterProps(filterName))
  );
}

export function GetCatalogFull(): Promise<WithId<Clothes>[]> {
  return clothesCollection.find().toArray() as Promise<WithId<Clothes>[]>;
}

export type SearchParams = { [key: string]: string | string[] | undefined };

export function GetCatalogFiltered(searchParams: SearchParams) {
  const mongoFilter = ToMongoFilter(searchParams);

  const query = clothesCollection.find(mongoFilter);

  return query.toArray() as Promise<WithId<Clothes>[]>;
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
  const query = clothesCollection.aggregate([
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

  return query.toArray() as Promise<WithId<Clothes>[]>;
}

export async function GetUserLiked(email: string): Promise<ObjectId[]> {
  const user = await userCollection.findOne({
    email: email,
  });

  return user?.liked ?? [];
}

export function GetCatalogById(liked: ObjectId[]) {
  return clothesCollection.find({ _id: { $in: liked } }).toArray() as Promise<
    WithId<Clothes>[]
  >;
}

export function GetCatalogType(type: ItemCategory) {
  return clothesCollection.find({ ItemCategory: type }).toArray();
}

export function GetShopItem(id: ObjectId) {
  return clothesCollection.findOne({ _id: id }) as Promise<WithId<Clothes>>;
}

