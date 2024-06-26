"use client"
import { useEffect, useState } from 'react';

interface ServiceOption {
  id: string;
  name: string;
}

interface AppointmentData {
  date: string;
  time: string;
  stylist: string;
  service: string;
  price: number;
}

const SubmitForm = () => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [stylist, setStylist] = useState<string>('');
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    // Replace with actual salonId from your session or context
    const salonId = '667833f26bd549ac28d2d203'; // Example salonId

    // Fetch services based on salonId
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services/${salonId}`);
        if (response.ok) {
          const data = await response.json();
          setServices(data.services); // Assuming API returns an array of services
          setSelectedService(''); // Reset selected service when services are loaded
        } else {
          console.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // Run once on component mount, adjust dependencies as needed

  const handleServiceChange = (value: string) => {
    const selected = services.find(service => service.id === value);
    if (selected) {
      setSelectedService(selected.id);
      setPrice(50); // Example: Base price $50 + $50
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: AppointmentData = {
      date,
      time,
      stylist,
      service: selectedService,
      price,
    };

    try {
      const response = await fetch('/api/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Assuming you want to reset the form after successful submission
        setDate('');
        setTime('');
        setStylist('');
        setSelectedService('');
        setPrice(0);
      } else {
        console.error('Failed to add appointment to the server');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-600">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stylist" className="block text-sm font-medium text-gray-600">
            Stylist:
          </label>
          <input
            type="text"
            id="stylist"
            name="stylist"
            value={stylist}
            onChange={(e) => setStylist(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium text-gray-600">
            Service:
          </label>
          <select
            id="service"
            name="service"
            value={selectedService}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={`$${price}`}
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

export default SubmitForm;
