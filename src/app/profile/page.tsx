import { userCollection } from "@/lib/MongoConnect";
import CatalogUser from "@/types/CatalogUser";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from "next/image";

const keys: (keyof CatalogUser)[] = ["name", "bio"];

export default async function Home() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return <p>Page is not accessible. Please, authorize.</p>;
  }

  const email = session.user.email;

  const profile = await userCollection.findOne({
    email: email,
  });

  if (!profile) {
    return <p>An error has occurred. Your profile was not found.</p>;
  }

  return (
    <main className="flex bg-slate-900 text-white">
      <div className="m-5">
        <Image
          src={session.user.image!}
          alt="User profile"
          width={200}
          height={200}
        />
      </div>
      <form className="w-[600px]" action={editProfileHandler}>
        <label className="block my-5">
          Email
          <input
            className="block bg-slate-700 w-full p-1"
            value={email}
            disabled
            required
          ></input>
        </label>
        {keys.map((key) => (
          <label key={key} className="block my-5">
            {formatString(key)}
            <input
              type="text"
              className="block bg-slate-700 w-full p-1"
              name={key}
              placeholder={key}
              defaultValue={profile[key]?.toString()}
            />
          </label>
        ))}
        <button type="submit" className="bg-green-500 p-3">
          Save changes
        </button>
      </form>
    </main>
  );
}

async function editProfileHandler(formData: FormData) {
  "use server";
  const session = await getServerSession();

  if (!session?.user?.email) return;
  const email = session.user.email;

  const obj: any = {};
  for (const key of keys) {
    const val = formData.get(key);
    if (val) obj[key] = val;
  }

  await userCollection.updateOne({ email: email }, { $set: obj });
  revalidatePath("");
}

function formatString(input: string): string {
  const words = input.split(/(?=[A-Z])/);

  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
}
