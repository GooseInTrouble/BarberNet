import { userCollection } from "@/lib/MongoConnect";
import Users from "@/types/Users";
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

  
  const newUser = new Users(user.email);
  if (user.name) newUser.name = user.name;
  newUser.isEmployee = false;
  newUser.salonId = "";


  userCollection.insertOne(newUser);

  console.log(`Registered user ${user.email} to DB`);
}
