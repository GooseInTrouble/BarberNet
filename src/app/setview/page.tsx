import { GetShopItem } from "@/lib/Salons";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { WithId } from "mongodb";
import { isUserEmployee } from "@/components/isEmployee";
import Salons from "@/types/Salons";

export default async function SetView({
  searchParams,
  item,
}: {
  searchParams: { id: string };
  item: WithId<Salons>;
}) {
  if (!searchParams || !searchParams.id) {
    return <p>Error. Item not found</p>;
  }

  let _id = searchParams;
  let itemId;
  try {
    itemId = new ObjectId(searchParams.id);
  } catch (error) {
    return <p>Error. Item not found</p>;
  }

  const salons = await GetShopItem(itemId);

  let props = [];
  for (const key in salons) {
    const val = (salons as any)[key];
    props.push(
      <tr key={key}>
        <td className="border border-slate-400 px-1.5 py-1">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </td>
        <td className="border border-slate-400 px-1.5 py-1">{val}</td>
      </tr>
    );
  }

  const session = await getServerSession();
  const email = session?.user?.email;
  const isEmployee = email ? await isUserEmployee(email) : false;

  return (
    <main className="bg-slate-500 text-white max-h-[30vh]">
      <div className="p-1 flex w-full h-[80vh]">
        <Image
          src={salons.image}
          alt={`${salons.name} image`}
          className="object-contain min-w-[30%] w-full rounded-lg"
          width={900}
          height={900}
        />
        <div className="text-lg text-white p-2 w-full h-full">
          <div>
            <p className="text-xl break-words">{salons.name}</p>
            <hr />
            <p className="text-xl break-words">{salons.description}</p>
            
          </div>
          <div className="pt-5 max-h-[70%] overflow-auto w-full static">
          <hr />
            <p>Location: {salons.location}</p>
            {isEmployee && (
              <>
                <p>Product characteristics:</p>
                <table className="bg-[#596273] w-full min-w-[50%] table-auto">
                  <tbody>
                    <tr className="bg-[#4c5467]">
                      <th className="border border-slate-400">Characteristic</th>
                      <th className="border border-slate-400">Value</th>
                    </tr>
                    {props}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div 
            className="
            text-white text-lg
            rounded-md px-3 py-2 mx-1 mt-5
            bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
            hover:from-pink-500 hover:to-yellow-500">
            <Link href="/catalog">Go to Catalog</Link>
          </div>
        </div>
      </div>
    </main>
  );
}