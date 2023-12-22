import { NextResponse } from "next/server";
import { clothesCollection, userCollection } from "@/lib/MongoConnect";

// Handles GET requests to /api
export async function GET(request: Request) {
  try {
    // Fetch all documents from the 'clothes' collection
    const shopItems = await clothesCollection.find({}).toArray();

    // Fetch all documents from the 'users' collection
    const users = await userCollection.find({}).toArray();

    return NextResponse.json({ shopItems, users });
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return NextResponse.error();
  }
}

// Handles POST requests to /api
export async function POST(request: Request) {
  try {
    // You can add your logic for handling POST requests here
    return NextResponse.json({ message: "Hello World" });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.error();
  }
}
