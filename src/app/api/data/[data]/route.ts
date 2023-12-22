import { NextResponse } from "next/server";
import { clothesCollection, userCollection, setCollection } from "@/lib/MongoConnect";
// Handles GET requests to /api/:collectionName
export async function GET(request: Request,
  { params }: { params: { data: string } })  {
  try {
    const collectionName = params.data;
    let result;

    switch (collectionName) {
      case 'users':
        result = await userCollection.find({}).toArray();
        break;
      case 'clothes':
        result = await clothesCollection.find({}).toArray();
        break;
      case 'sets':
        result = await setCollection.find({}).toArray();
        break;
      default:
        return NextResponse.error();
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return NextResponse.error();
  }
}