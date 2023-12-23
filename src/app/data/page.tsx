import DataTable from "@/components/DataTable";
import { getServerSession } from "next-auth";

export default async function CRUD() {
  const session = await getServerSession();

  if (!session) {
    return <p>Access not granted</p>;
  }

  return (
    <main className="bg-slate-500">
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
    </main>
  );
}
