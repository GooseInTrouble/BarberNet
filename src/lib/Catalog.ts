import ShopItem, { ItemCategory } from "@/types/ShopItem";

import { shopItemCollection, userCollection } from "@/lib/MongoConnect";
import { WithId, Filter, Document, ObjectId } from "mongodb";

export function GetFilterProps(filterName: string) {
  return shopItemCollection.distinct(`props.${filterName}`);
}

export function GetAllFilterProps(filterNames: string[]) {
  return Promise.all(
    filterNames.map((filterName) => GetFilterProps(filterName))
  );
}

export function GetCatalogFull(): Promise<WithId<ShopItem>[]> {
  return shopItemCollection.find().toArray() as Promise<WithId<ShopItem>[]>;
}

export type SearchParams = { [key: string]: string | string[] | undefined };

export function GetCatalogFiltered(searchParams: SearchParams) {
  const mongoFilter = ToMongoFilter(searchParams);

  const query = shopItemCollection.find(mongoFilter);

  return query.toArray() as Promise<WithId<ShopItem>[]>;
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
  const query = shopItemCollection.aggregate([
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

  return query.toArray() as Promise<WithId<ShopItem>[]>;
}

export async function GetUserLiked(email: string): Promise<ObjectId[]> {
  const user = await userCollection.findOne({
    email: email,
  });

  return user?.liked ?? [];
}

export function GetCatalogById(liked: ObjectId[]) {
  return shopItemCollection.find({ _id: { $in: liked } }).toArray() as Promise<
    WithId<ShopItem>[]
  >;
}

export function GetCatalogType(type: ItemCategory) {
  return shopItemCollection.find({ ItemCategory: type }).toArray();
}

export function GetShopItem(id: ObjectId) {
  return shopItemCollection.findOne({ _id: id }) as Promise<WithId<ShopItem>>;
}

export function PriceFormat(cost: number) {
  if (typeof cost !== 'number') {
    // Handle the case where cost is not a number (e.g., log an error, return a default value)
    return 'Invalid cost';
  }

  return `${cost.toFixed(2)}₴`;
}
