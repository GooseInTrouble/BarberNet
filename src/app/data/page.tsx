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
        caption="shopItems"
        content={[
          ["name", "text", "required"],
          ["cost", "number", "required"],
          ["ItemCategory", "text", "required"],
          ["props", "object", "required"],
          ["image"],
          ["quantity", "number", "required"],
        ]}
        columnStyle="grid-cols-7"
      />
    </main>
  );
}
