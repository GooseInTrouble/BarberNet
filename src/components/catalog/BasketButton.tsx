import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const IN_BASKET = "To cart";
const NOT_IN_BUSKET = "Out of cart";

export default function BasketButton({
  id,
  isInBasket,
}: {
  id: ObjectId;
  isInBasket: boolean;
}) {
  return (
    <form className="flex-grow max-w-[300px]" action={likeHandler}>
      <input
        className={`rounded-lg border-sky-500 border-4 p-1 cursor-pointer w-full bg-sky-600 ${
          isInBasket ? "" : "bg-opacity-10"
        }`}
        type="submit"
        name={id.toString()}
        value={isInBasket ? NOT_IN_BUSKET : IN_BASKET}
      />
    </form>
  );
}

async function likeHandler(formData: FormData) {
  "use server";

  for (const [key, val] of formData.entries()) {
    if (val === IN_BASKET) {
      const basket = JSON.parse(cookies().get("basket")?.value || "[]");
      basket.push(key);
      cookies().set("basket", JSON.stringify(basket));
      break;
    }

    if (val === NOT_IN_BUSKET) {
      const basket = JSON.parse(cookies().get("basket")?.value || "[]");
      basket.splice(basket.indexOf(key), 1);
      cookies().set("basket", JSON.stringify(basket));
      break;
    }
  }

  revalidatePath("");
}
