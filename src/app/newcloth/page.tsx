"use client"
// src/app/newset/page.tsx
import { useState } from 'react';

interface FormData {
  name: string;
  category: string;
  seasons: string[];
  props: {
    material: string;
    purpose: string;
    color: string;
  };
  size: string;
  image: string;
}

const SubmitForm = () => {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [seasons, setSeasons] = useState<string[]>([]);
  const [material, setMaterial] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: FormData = {
      name,
      category,
      seasons,
      props: {
        material,
        purpose,
        color,
      },
      size,
      image,
    };

    try {
      const response = await fetch('/api/data/clothes', {
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
        setName('');
        setCategory('');
        setSeasons([]);
        setMaterial('');
        setPurpose('');
        setColor('');
        setSize('');
        setImage('');
      } else {
        console.error('Failed to add data to the server');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
    <h1 className="text-2xl font-bold mb-4">Submit Form</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>


        <label htmlFor="category" className="block text-sm font-medium text-gray-600" >Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <label htmlFor="seasons" className="block text-sm font-medium text-gray-600">Seasons:</label>
        <input
          type="text"
          id="seasons"
          name="seasons"
          value={seasons.join(',')}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setSeasons(e.target.value.split(','))}
          required
        />

        <label htmlFor="material" className="block text-sm font-medium text-gray-600">Material:</label>
        <input
          type="text"
          id="material"
          name="material"
          value={material}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setMaterial(e.target.value)}
          required
        />

        <label htmlFor="purpose" className="block text-sm font-medium text-gray-600">Purpose:</label>
        <input
          type="text"
          id="purpose"
          name="purpose"
          value={purpose}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setPurpose(e.target.value)}
          required
        />

        <label htmlFor="color" className="block text-sm font-medium text-gray-600">Color:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={color}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setColor(e.target.value)}
          required
        />

        <label htmlFor="size" className="block text-sm font-medium text-gray-600">Size:</label>
        <input
          type="text"
          id="size"
          name="size"
          value={size}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setSize(e.target.value)}
          required
        />

        <label htmlFor="image" className="block text-sm font-medium text-gray-600">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setImage(e.target.value)}
          required
        />

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
