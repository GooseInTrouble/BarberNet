import Salons from "@/types/Salons";
import { salonsCollection, userCollection } from "@/lib/MongoConnect";
import { WithId, Filter, Document, ObjectId } from "mongodb";

export function GetFilterProps(filterName: string) {
  return salonsCollection.distinct(`props.${filterName}`);
}

export function GetAllFilterProps(filterNames: string[]) {
  return Promise.all(
    filterNames.map((filterName) => GetFilterProps(filterName))
  );
}

export function GetCatalogFull(): Promise<WithId<Salons>[]> {
  return salonsCollection.find().toArray() as Promise<WithId<Salons>[]>;
}

export type SearchParams = { [key: string]: string | string[] | undefined };

export function GetCatalogFiltered(searchParams: SearchParams) {
  const mongoFilter = ToMongoFilter(searchParams);

  const query = salonsCollection.find(mongoFilter);

  return query.toArray() as Promise<WithId<Salons>[]>;
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
  const query = salonsCollection.aggregate([
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

  return query.toArray() as Promise<WithId<Salons>[]>;
}

export function GetServiceById(liked: ObjectId[]) {
  return salonsCollection.find({ _id: { $in: liked } }).toArray() as Promise<
    WithId<Salons>[]
  >;
}



export function GetShopItem(id: ObjectId) {
  return salonsCollection.findOne({ _id: id }) as Promise<WithId<Salons>>;
}

export async function GetSalonNameByUser(email: string): Promise<string> {
  const user = await userCollection.findOne({ email: email });

  if (!user || !user.isEmployee || !user.salonId) {
    throw new Error("User is not an employee of any salon.");
  }

  const salon = await salonsCollection.findOne({ _id: new ObjectId(user.salonId) });

  if (!salon) {
    throw new Error("Salon not found.");
  }

  return salon.name;
}