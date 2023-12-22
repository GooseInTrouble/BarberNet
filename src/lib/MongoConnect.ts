import ShopItem from "@/types/ShopItem";
import CatalogUser from "@/types/CatalogUser";
import { Collection, MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING!;

const client = new MongoClient(uri);

export const db = client.db("stylehub");

export const userCollection = db.collection("users") as Collection<CatalogUser>;
export const shopItemCollection = db.collection("clothes") as Collection<ShopItem>;
