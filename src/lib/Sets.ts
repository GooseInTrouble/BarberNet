import Sets from "@/types/Sets";
import { setCollection, userCollection } from "@/lib/MongoConnect";
import { WithId, Filter, Document, ObjectId } from "mongodb";

export function GetFilterProps(filterName: string) {
  return setCollection.distinct(`props.${filterName}`);
}
export function GetFilterSeason(filterName: string) {
  return setCollection.distinct(`season.${filterName}`);
}
export function GetAllFilterProps(filterNames: string[]) {
  return Promise.all(
    filterNames.map((filterName) => GetFilterProps(filterName))
  );
}

export function GetCatalogFull(): Promise<WithId<Sets>[]> {
  return setCollection.find().toArray() as Promise<WithId<Sets>[]>;
}

export type SearchParams = { [key: string]: string | string[] | undefined };

export function GetCatalogFiltered(searchParams: SearchParams) {
  const mongoFilter = ToMongoFilter(searchParams);

  const query = setCollection.find(mongoFilter);

  return query.toArray() as Promise<WithId<Sets>[]>;
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
  const query = setCollection.aggregate([
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

  return query.toArray() as Promise<WithId<Sets>[]>;
}

export async function GetUserLiked(email: string): Promise<ObjectId[]> {
  const user = await userCollection.findOne({
    email: email,
  });

  return user?.liked ?? [];
}

export function GetCatalogById(liked: ObjectId[]) {
  return setCollection.find({ _id: { $in: liked } }).toArray() as Promise<
    WithId<Sets>[]
  >;
}



export function GetShopItem(id: ObjectId) {
  return setCollection.findOne({ _id: id }) as Promise<WithId<Sets>>;
}

