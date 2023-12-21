import { userCollection } from "@/lib/MongoConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const LIKE = "❤️";
const UNLIKE = "🤍";

export default function LikeButton({
  id,
  isLiked,
}: {
  id: ObjectId;
  isLiked: boolean;
}) {
  return (
    <form className="" action={likeHandler}>
      <input
        className={`rounded-lg border-rose-500 border-4 p-1 aspect-square cursor-pointer bg-rose-500 ${
          isLiked ? "" : "bg-opacity-10"
        }`}
        type="submit"
        name={id.toString()}
        value={isLiked ? UNLIKE : LIKE}
      />
    </form>
  );
}

async function likeHandler(formData: FormData) {
  "use server";

  const session = await getServerSession();

  if (!session?.user?.email) return;
  const email = session.user.email;

  for (const [key, val] of formData.entries()) {
    if (val === LIKE) {
      await userCollection.updateOne(
        { email: email },
        { $push: { liked: new ObjectId(key) } }
      );
      break;
    }

    if (val === UNLIKE) {
      await userCollection.updateOne(
        { email: email },
        { $pull: { liked: new ObjectId(key) } }
      );
      break;
    }
  }

  revalidatePath("");
}
