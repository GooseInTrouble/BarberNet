"use client";
import { useEffect, useState } from "react";

interface Appointment {
  _id: string;
  serviceId: string;
  workerId: string;
  date: string;
  userId: string;
  price: number;
}

const UserAppointments = ({ userId }: { userId: string }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <main>
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="mb-4 p-4 border rounded-md">
              <p><strong>Service ID:</strong> {appointment.serviceId}</p>
              <p><strong>Worker ID:</strong> {appointment.workerId}</p>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
              <p><strong>Price:</strong> ${appointment.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </main>
  );
};

export default UserAppointments;
