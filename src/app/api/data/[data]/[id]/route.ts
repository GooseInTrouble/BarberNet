import { db } from "@/lib/MongoConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Запит на отримання даних за ідентифікатором
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
// Запит на оновлення даних за ідентифікатором
export async function PUT(
  request: Request,
  { params }: { params: { data: string; id: string } }
) {
  const collName = params.data;
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
// Запит на видалення даних за ідентифікатором
export async function DELETE(
  request: Request,
  { params }: { params: { data: string; id: string } }
) {
  const collName = params.data;
  const collection = db.collection(collName);

  try {
    const oId = new ObjectId(params.id);

    await collection.deleteOne({ _id: oId });

    return NextResponse.json({});
  } catch {}

  return NextResponse.error();
}
