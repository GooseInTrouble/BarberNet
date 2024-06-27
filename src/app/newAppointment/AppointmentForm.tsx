import { useState } from 'react';

interface AppointmentFormProps {
  onSubmit: (formData: AppointmentData) => void;
}

interface AppointmentData {
    serviceId: string;
    workerId: string;
    date: Date; // Змінено тип даних на Date
    userId: string;
    price: number;
  }
  

const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const [serviceId, setServiceId] = useState<string>('');
  const [workerId, setWorkerId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [price, setPrice] = useState<number>(50); // Placeholder price, replace with actual logic

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData: AppointmentData = {
      serviceId,
      workerId,
      date: new Date(date), // Перетворення рядка на об'єкт Date
      userId: 'user123',
      price,
    };
  
    try {
      const response = await fetch('/api/data/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Appointment created successfully:', data);
        onSubmit(formData);
        setServiceId('');
        setWorkerId('');
        setDate('');
        setPrice(50); // Скидання ціни до плейсхолдерного значення після відправки
      } else {
        console.error('Failed to create appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="serviceId" className="block text-sm font-medium text-gray-600">
            Service ID:
          </label>
          <input
            type="text"
            id="serviceId"
            name="serviceId"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="workerId" className="block text-sm font-medium text-gray-600">
            Worker ID:
          </label>
          <input
            type="text"
            id="workerId"
            name="workerId"
            value={workerId}
            onChange={(e) => setWorkerId(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">
            Date:
          </label>
          <input
            type="datetime-local" // Use datetime-local for date and time selection
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={`$${price}`} // Display price with currency symbol
            readOnly
            className="mt-1 p-2 w-full border rounded-md bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
