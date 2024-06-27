// src/app/newAppointment/page.tsx
"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic'; // Імпортуємо dynamic з next/dynamic для обробки рендерингу на клієнті

interface AppointmentData {
  serviceId: string;
  workerId: string;
  date: Date;
  userId: string;
  price: number;
}

// Використовуємо dynamic для динамічного імпорту AppointmentForm для рендерингу на клієнті
const AppointmentForm = dynamic(() => import('./AppointmentForm'), { ssr: false });

const NewAppointmentPage = () => {
  const handleSubmit = (formData: AppointmentData) => {
    try {
      // Імітуємо виклик API або інтеграцію з бекендом
      console.log('Form submitted:', formData);

      // Очищаємо форму після відправки (для демонстраційних цілей)
      setServiceId('');
      setWorkerId('');
      setDate(new Date());
      setPrice(0);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const [serviceId, setServiceId] = useState<string>('');
  const [workerId, setWorkerId] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [price, setPrice] = useState<number>(50); // Встановлюємо ціну за замовчуванням на 50

  return (
    <main>
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Appointment</h1>
      <AppointmentForm onSubmit={handleSubmit} />
    </div>
    </main>
  );
};

export default NewAppointmentPage;
