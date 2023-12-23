import { GetShopItem, GetUserLiked} from "@/lib/Sets";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function SetView({
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

  const clothes = await GetShopItem(itemId);

  let props = [];
  for (const key in clothes) {
    const val = (clothes as any)[key];
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

  const liked = email ? await GetUserLiked(email) : [];
  const likedStr = liked.map((x) => x.toString());

  const basket = cookies().get("basket")?.value;
  const basketArr: string[] = basket ? JSON.parse(basket) : [];

  return (
    <main className="bg-slate-500 text-white max-h-[30vh]">
      <div className="p-1 flex w-full h-[80vh]">
        <Image
          src={clothes.image}
          alt={`${clothes.name} image`}
          className=" object-contain min-w-[30%] w-full rounded-lg"
          width={900}
          height={900}
        /> 
        <div className="text-lg text-white p-2 w-full h-full">
          <div>
            <p className="text-xl break-words">{clothes.name}</p>
            <hr />
          </div>
          <div className="pt-5 max-h-[70%] overflow-auto w-full static">
            <p>Product characteristics:</p>
            <table className="bg-[#596273] w-full min-w-[50%] table-auto">
              <tbody>
                <tr className="bg-[#4c5467]">
                  <th className="border border-slate-400 ">Characteristic</th>
                  <th className="border border-slate-400">Value</th>
                </tr>
                {props}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
