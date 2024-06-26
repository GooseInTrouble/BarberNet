// src/pages/api/check-employee.ts

import { NextApiRequest, NextApiResponse } from "next";
import { userCollection } from "@/lib/MongoConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  const user = await userCollection.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({
    isEmployee: user.isEmployee || false,
    salonId: user.salonId || null,
  });
}
