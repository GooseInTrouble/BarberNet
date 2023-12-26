import DataTable from "@/components/DataTable";
import { getServerSession } from "next-auth";
import { isUserAdmin } from "@/components/IsAdmin";

export default async function CRUD() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return (
      <main className="border-slate-800 flex h-screen flex-col items-center justify-center p-24 bg-slate-500 bg-fixed text-black text-white text-3xl">
        Access not granted <p>Login</p>
      </main>
    );
  }

  const userEmail = session.user.email;

  if (!userEmail || typeof userEmail !== "string") {
    return <p>Invalid user email</p>;
  }

  const isAdmin = await isUserAdmin(userEmail);

  if (!isAdmin) {
    return (
      <main className="border-slate-800 flex h-screen flex-col items-center justify-center p-24 bg-slate-500 bg-fixed text-black text-white text-3xl">
        Access not granted
      </main>
    );
  }

  return (
    <main className="bg-slate-500 text-white">
      <p>Clothes</p>
      <DataTable
        caption="clothes"
        content={[
          ["name", "text", "required"],
          ["category", "text", "required"],
          ["seasons", "array", "required"],
          ["props", "object", "required"],
          ["size", "text", "required"],
          ["image"],
        ]}
        columnStyle="grid-cols-7"
      />
      <p>Sets</p>
      <DataTable
        caption="sets"
        content={[
          ["name", "text", "required"],
          ["season", "object", "required"],
          ["purpose", "text", "required"],
          ["color", "text", "required"],
          ["image"],
        ]}
        columnStyle="grid-cols-7"
      />
      <p>Users</p>
      <DataTable
        caption="users"
        content={[
          ["name", "text", "required"],
          ["email", "text", "required"],
          ["liked", "array", "required"],
          ["isAdmin", "boolean", "required"],
        ]}
        columnStyle="grid-cols-7"
      />
    </main>
  );
}
