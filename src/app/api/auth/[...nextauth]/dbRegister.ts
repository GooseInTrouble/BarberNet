import { userCollection } from "@/lib/MongoConnect";
import CatalogUser from "@/types/CatalogUser";
import { User } from "next-auth";

export default async function dbRegister(user: User) {
  if (!user.email) {
    console.error("User has no email!");
    return;
  }

  const userDoc = await userCollection.findOne({ email: user.email });

  if (userDoc) {
    console.log(`User ${user.email} already registered`);
    return;
  }

  const newUser = new CatalogUser(user.email);
  if (user.name) newUser.name = user.name;

  userCollection.insertOne(newUser);

  console.log(`Registered user ${user.email} to DB`);
}
