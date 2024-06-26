import { userCollection } from "@/lib/MongoConnect";
import { getServerSession } from "next-auth";
import NavButtonLink from "@/components/NavButtonLink";

export async function isUserEmployee(email: string): Promise<boolean> {
  const user = await userCollection.findOne({ email: email });
  ;
  //Перевірка, чи є користувач працівником салону
  return user?.isEmployee || false;
}

export async function GrantAccess() {
  const session = await getServerSession()
  if (!session || !session.user) {
    return false;
  }

  const userEmail = session.user.email;
  if (!userEmail || typeof userEmail !== "string") {
    return false;
  }

  const isEmployee = await isUserEmployee(userEmail);

  if (!isEmployee) {
    return false;
  }
  else if(userEmail == "artem.arabadzhy@nure.ua"){
    return (<>{session && <NavButtonLink href="/data">$Data</NavButtonLink>}</>);
  }
}


