// src/pages/UserAppointmentsPage.tsx
 "use client"
import { useEffect, useState } from 'react';
import Appointments from '@/types/Appointments';
import { ObjectId, WithId } from 'mongodb';
interface UserAppointmentsPageProps {
  userId: string;
}

interface Appointment {
  _id: ObjectId;
  date: string;
  time: string;
  employeeName: string;
}

const UserAppointmentsPage = ({ userId }: UserAppointmentsPageProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        // Отримати апойнтменти з сервера
        const response = await fetch(`/api/appointments/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch user appointments:', error);
      }
    }
  
    fetchAppointments();
  }, [userId]);
  
  return (
    <div>
      <h1>User Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id.toString()}>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Employee: {appointment.employeeName}</p>
            {/* Додайте інші дані про запис, які ви хочете відображати */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAppointmentsPage;
