"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout({ amount }: { amount: number }) {
  return (
    <div className="bg-gray-200 block max-w-[300px] m-auto p-5 h-full">
      <Elements stripe={stripePromise}>
        <h2 className="text-black text-center mb-4 text-xl font-bold">
          Total {`${Number(amount).toFixed(2)}₴`}
        </h2>
        <PaymentForm amount={amount} />
      </Elements>
    </div>
  );
}
