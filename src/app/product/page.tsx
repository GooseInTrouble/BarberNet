import { GetServiceItem } from "@/lib/Catalog";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Services from "@/types/Services";

export default async function Product({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  if (!searchParams || !searchParams.id) {
    return <p>Error. Item not found</p>;
  }

  let itemId;
  try {
    itemId = new ObjectId(searchParams.id);
  } catch (error) {
    return <p>Error. Item not found</p>;
  }
  const services = await GetServiceItem(itemId);
  let props = [];
  for (const key in services) {
    const val = (services as any)[key];
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
  const userEmail = session?.user?.email;
  const isAdmin = userEmail === "artem.arabadzhy@nure.ua";

  const basket = cookies().get("basket")?.value;
  const basketArr: string[] = basket ? JSON.parse(basket) : [];

  return (
    <main className="bg-slate-500 text-white max-h-[30vh]">
      <div className="p-1 flex w-full h-[80vh]">
        <Image
          src={services.image}
          alt={`${services.name} image`}
          className="object-contain min-w-[30%] w-full rounded-lg"
          width={900}
          height={900}
        />
        <div className="text-lg text-white p-2 w-full h-full">
          <div>
            <p className="text-xl break-words">{services.name}</p>
            <hr />
          </div>
          <div className="pt-5 max-h-[70%] overflow-auto w-full static">
            {isAdmin ? (
              <>
                <p>Product characteristics:</p>
                <table className="bg-[#596273] w-full min-w-[50%] table-auto">
                  <tbody>
                    <tr className="bg-[#4c5467]">
                      <th className="border border-slate-400">
                        Characteristic
                      </th>
                      <th className="border border-slate-400">Value</th>
                    </tr>
                    {props}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <table className="bg-[#596273] w-full min-w-[50%] table-auto">
                  <tbody>
                    <tr>
                      <td className="border border-slate-400 px-1.5 py-1">
                        Description
                      </td>
                      <td className="border border-slate-400 px-1.5 py-1">
                        {services.description}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 px-1.5 py-1">
                        Type
                      </td>
                      <td className="border border-slate-400 px-1.5 py-1">
                        {services.ServiceCategory.join(", ")}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 px-1.5 py-1">
                        Price
                      </td>
                      <td className="border border-slate-400 px-1.5 py-1">
                        {services.price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div
            className="
            text-white text-lg
            rounded-md px-3 py-2 mx-1
            hover:bg-white hover:bg-opacity-10"
          >
            <Link href="/newAppointment"> Schedule Appointment </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
