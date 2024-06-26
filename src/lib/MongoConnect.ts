import { Collection, MongoClient } from "mongodb";

import Appointments from "@/types/Appointments";
import Salons from "@/types/Salons";
import Services from "@/types/Services"
import Tools from "@/types/Tools"
import Users from "@/types/Users";
import Workers from "@/types/Workers";

const uri = process.env.MONGO_CONNECTION_STRING!;

const client = new MongoClient(uri);

export const db = client.db("BarberNetDB");

export const appointmentsCollection = db.collection("appointments") as Collection<Appointments>;
export const salonsCollection = db.collection("salons") as Collection<Salons>
export const servicesCollection = db.collection("services") as Collection<Services>;
export const ToolsCollection = db.collection("tools") as Collection<Tools>;
export const userCollection = db.collection("users") as Collection<Users>;
export const workersCollection = db.collection("workers") as Collection<Workers>;