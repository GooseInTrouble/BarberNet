// components/isEmployee.tsx

import { userCollection } from "@/lib/MongoConnect";
import { getServerSession } from "next-auth";
import NavButtonLink from "@/components/NavButtonLink";

export async function isUserEmployee(email: string): Promise<boolean> {
  const user = await userCollection.findOne({ email: email });
  return user?.isEmployee || false;
}

export async function isUserAdmin(email: string): Promise<boolean> {
  const user = await userCollection.findOne({ email: email });
  return user?.isEmployee || false;
}

export async function GrantAccess() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return false;
  }

  const userEmail = session.user.email;
  if (!userEmail || typeof userEmail !== "string") {
    return false;
  }

  const isEmployee = await isUserEmployee(userEmail);
  const isAdmin = await isUserAdmin(userEmail);

  if (isEmployee || isAdmin) {
    return true;
  }

  return false;
}

export default class Users {
  constructor(public email: string) {}

  public name?: string;
  public isEmployee?: boolean;
  public salonId?: string;
}
