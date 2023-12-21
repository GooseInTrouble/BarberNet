import { db } from "@/lib/MongoConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { data: string; id: string } }
) {
  const collName = snakeToCamel(params.data);

  try {
    const oId = new ObjectId(params.id);

    const data = await db.collection(collName).findOne({ _id: oId });

    return NextResponse.json(data);
  } catch {}

  return NextResponse.error();
}

export async function PUT(
  request: Request,
  { params }: { params: { data: string; id: string } }
) {
  const collName = snakeToCamel(params.data);
  const collection = db.collection(collName);

  try {
    const oId = new ObjectId(params.id);
    const json = await request.json();

    const data = await collection.replaceOne({ _id: oId }, json);

    if (!data.acknowledged) return NextResponse.error();

    const obj = await collection.findOne({ _id: oId });

    return NextResponse.json(obj);
  } catch {}

  return NextResponse.error();
}

export async function DELETE(
  request: Request,
  { params }: { params: { data: string; id: string } }
) {
  const collName = snakeToCamel(params.data);
  const collection = db.collection(collName);

  try {
    const oId = new ObjectId(params.id);

    await collection.deleteOne({ _id: oId });

    return NextResponse.json({});
  } catch {}

  return NextResponse.error();
}

function snakeToCamel(input: string): string {
  const words = input.split("_");

  const pascalCaseString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return pascalCaseString;
}
