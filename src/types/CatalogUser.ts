import { ObjectId } from "mongodb";

export default class CatalogUser {
  constructor(public email: string) {}

  public name?: string;
  public isAdmin?: boolean;
  public liked?: ObjectId[];
}
