import { db } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  try {
    const appointments = await db
      .collection("appointments")
      .find({ userId })
      .toArray();

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.error();
  }
}
