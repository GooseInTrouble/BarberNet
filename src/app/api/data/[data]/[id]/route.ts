import { db } from "@/lib/MongoConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { data: string; id: string } }
) {
    const collName = params.data;

  try {
    const oId = new ObjectId(params.id);

    const data = await db.collection(collName).findOne({ _id: oId });

    return NextResponse.json(data);
  } catch {}

  return NextResponse.error();
}