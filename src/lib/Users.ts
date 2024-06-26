import Users from "@/types/Users";
import { userCollection } from "@/lib/MongoConnect";
import { WithId, Filter, Document, ObjectId } from "mongodb";
import { appointmentsCollection } from '@/lib/MongoConnect';

export async function getUserAppointments(userId: ObjectId) {
  const appointments = await appointmentsCollection.find({ userId }).toArray();
  return appointments;
}

export function GetServiceItem(id: ObjectId) {
    return userCollection.findOne({ _id: id }) as Promise<WithId<Users>>;
  }
  