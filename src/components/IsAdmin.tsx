import { userCollection } from "@/lib/MongoConnect";
import { getServerSession } from "next-auth";
import NavButtonLink from "@/components/NavButtonLink";

export async function isUserAdmin(email: string): Promise<boolean> {
  const user = await userCollection.findOne({ email: email });
  ;
  // Перевіряємо, чи знайдено користувача і чи він є адміном
  return user?.isAdmin || false;
}
export async function GrantAccses() {
  const session = await getServerSession()
  if (!session || !session.user) {
    return false;
  }

  const userEmail = session.user.email;

  if (!userEmail || typeof userEmail !== "string") {
    return false;
  }

  const isAdmin = await isUserAdmin(userEmail);

  if (!isAdmin) {
    return false;
  }
  
    return (<>
    {session && <NavButtonLink href="/data">$Data</NavButtonLink>}
    </>
    
    );
  
}
