import DataTable from "@/components/DataTable";
import { getServerSession } from "next-auth";
import { isUserEmployee } from "@/components/isEmployee";

export default async function CRUD() {
  const session = await getServerSession();

  //Access check
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

  const isEmployee = await isUserEmployee(userEmail);

  if (!isEmployee) {
    return (
      <main className="border-slate-800 flex h-screen flex-col items-center justify-center p-24 bg-slate-500 bg-fixed text-black text-white text-3xl">
        Access not granted
      </main>
    );
  }

  return (
    <main className="bg-slate-500 text-white">
      <p>Appointments</p>
      <DataTable
        caption="appointments"
        content={[
          ["_id", "text","readonly"],
          ["date", "text", "required"],
          ["serviceId", "text", "required"],
          ["workerId", "text", "required"],
          ["userId", "text", "required"],
          ["totalCost", "boolean", "required"],
        ]}
        columnStyle="grid-cols-7"
      />
      <p>Salons</p>
      <DataTable
        caption="salons"
        content={[
          ["_id", "text","readonly"],
          ["name", "text", "required"],
          ["location", "text", "required"],
          ["image"],
          ["workers", "object", "required"],
          ["services", "object", "required"],
          ["tools", "object", "required"],
          ["description", "text", "required"],
        ]}
        columnStyle="grid-cols-9"
      />
      <p>Services</p>
      <DataTable
        caption="services"
        content={[
          ["_id", "text","readonly"],
          ["name", "text", "required"],
          ["price", "text", "required"],
          ["description", "text", "required"],
          ["image"],
          ["ServiceCategory", "object", "required"],
        ]}
        columnStyle="grid-cols-7"
      />
      <p>Tools</p>
      <DataTable
        caption="tools"
        content={[
          ["_id", "text","readonly"],
          ["name", "text", "required"],
          ["type", "text", "required"],
        ]}
        columnStyle="grid-cols-7"
      />
      <p>Users</p>
      <DataTable
        caption="users"
        content={[
          ["_id", "text","readonly"],
          ["name", "text", "required"],
          ["email", "text", "required"],
          ["isEmployee", "boolean", "required"],          
          ["salonId", "text"],
        ]}
        columnStyle="grid-cols-7"
      />
      <p>Workers</p>
      <DataTable
        caption="workers"
        content={[
          ["_id", "text","readonly"],
          ["name", "text", "required"],
          ["email", "text", "required"],          
          ["salonId", "text"],
        ]}
        columnStyle="grid-cols-7"
      />
    </main>
  );
}
/* "name": "John Doe",
  "email": "johndoe@example.com",
  "salonId":*/