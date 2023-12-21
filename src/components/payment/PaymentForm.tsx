"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import React from "react";

import { Purchase } from "@/lib/Payment";

export default function PaymentForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const session = useSession();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });
      const data = await response.json();
      const clientSecret = data;

      const cardResponse = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      const formData = new FormData(e.target as HTMLFormElement);

      console.log(formData.get("email"));

      if (cardResponse.paymentIntent?.status === "succeeded") {
        alert("Payment Successful");
        Purchase(formData.get("email") as string);

        cardElement.clear();
      } else {
        alert("Payment Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-2 flex flex-col justify-between h-full pb-14"
    >
      <div className="">
        <input
          required
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 my-2 rounded-md w-full text-black"
          defaultValue={session?.data?.user?.email ?? ""}
        />
        <input
          required
          name="name"
          type="text"
          placeholder="Name"
          className="p-2 my-2 rounded-md w-full text-black"
          defaultValue={session?.data?.user?.name ?? ""}
        />
      </div>
      <div>
        <h2 className="text-black text-center">Credit Card Details</h2>
        <div className="p-4 my-2 rounded-md w-full bg-white">
          <CardElement />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white w-full mt-8 p-3 rounded-md"
      >
        Buy
      </button>
    </form>
  );
}
