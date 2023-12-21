import { db } from "@/lib/MongoConnect";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { data: string } }
) {
  const collName = snakeToCamel(params.data);
  const data = await db.collection(collName).find().toArray();

  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { data: string } }
) {
  const collName = snakeToCamel(params.data);
  const collection = db.collection(collName);

  const data = await request.json();

  if (!data) {
    return NextResponse.error();
  }

  const dbResponce = await collection.insertOne(data);

  if (dbResponce.acknowledged) {
    return NextResponse.json(
      await collection.findOne({ _id: dbResponce.insertedId })
    );
  }

  return NextResponse.error();
}

function snakeToCamel(input: string): string {
  const words = input.split("_");

  const pascalCaseString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return pascalCaseString;
}
