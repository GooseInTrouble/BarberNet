"use client";
// src/app/newset/page.tsx
import { useState, useEffect } from "react";

interface ClothingItem {
  _id: string;
  name: string;
}

interface SetFormData {
    name: string;
    season: string[];
    purpose: string;
    color: string;
    image: string;
    clothing_ids: string[];
  }

const NewSetForm = () => {
  const [setName, setSetName] = useState<string>("");
  const [setSeason, setSetSeason] = useState<string[]>([]);
  const [setPurpose, setSetPurpose] = useState<string>("");
  const [setColor, setSetColor] = useState<string>("");
  const [setImage, setSetImage] = useState<string>("");
  const [selectedClothingItems, setSelectedClothingItems] = useState<
    ClothingItem[]
  >([]);
  const [deleteSetName, setDeleteSetName] = useState<string>("");

  useEffect(() => {
    // Fetch and display the set data based on the entered name for deletion
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/sets?name=${deleteSetName}`);
        if (response.ok) {
          const data = await response.json();
          // Display the data or take further action if needed
        } else {
          console.error("Failed to fetch set data for deletion");
        }
      } catch (error) {
        console.error("Error fetching set data:", error);
      }
    };

    if (deleteSetName) {
      fetchData();
    }
  }, [deleteSetName]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: SetFormData = {
        name: setName,
        season: setSeason,
        purpose: setPurpose,
        color: setColor,
        image: setImage,
        clothing_ids: selectedClothingItems.map((item) => item._id),
      };

    try {
      const response = await fetch('/api/data/sets', {
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
        setSetName('');
        setSetSeason([]);
        setSetPurpose('');
        setSetColor('');
        setSetImage('');
        setSelectedClothingItems([]);
      } else {
        console.error('Failed to add data to the server');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/sets?name=${deleteSetName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Set deleted successfully");
        // Additional logic after successful deletion if needed
      } else {
        console.error("Failed to delete set");
      }
    } catch (error) {
      console.error("Error deleting set:", error);
    }
  };

  // Function to handle selection of clothing items
  const handleClothingItemSelection = (item: ClothingItem) => {
    setSelectedClothingItems((prevItems) => [...prevItems, item]);
  };

  // Function to handle removal of selected clothing items
  const handleRemoveClothingItem = (itemId: string) => {
    setSelectedClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">New Set Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="setName"
            className="block text-sm font-medium text-gray-600"
          >
            Set Name:
          </label>
          <input
            type="text"
            id="setName"
            name="setName"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="setSeason"
            className="block text-sm font-medium text-gray-600"
          >
            Set Seasons (comma-separated):
          </label>
          <input
            type="text"
            id="setSeason"
            name="setSeason"
            value={setSeason.join(",")}
            onChange={(e) => setSetSeason(e.target.value.split(","))}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="setPurpose"
            className="block text-sm font-medium text-gray-600"
          >
            Set Purpose:
          </label>
          <input
            type="text"
            id="setPurpose"
            name="setPurpose"
            value={setPurpose}
            onChange={(e) => setSetPurpose(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="setColor"
            className="block text-sm font-medium text-gray-600"
          >
            Set Color:
          </label>
          <input
            type="text"
            id="setColor"
            name="setColor"
            value={setColor}
            onChange={(e) => setSetColor(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="setImage"
            className="block text-sm font-medium text-gray-600"
          >
            Set Image URL:
          </label>
          <input
            type="text"
            id="setImage"
            name="setImage"
            value={setImage}
            onChange={(e) => setSetImage(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Select Clothing Items:
          </label>
          <ul className="list-disc pl-5">
            {selectedClothingItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between">
                <span>{item.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveClothingItem(item._id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        {[
          { _id: "1", name: "Clothing Item 1" },
          { _id: "2", name: "Clothing Item 2" },
          { _id: "3", name: "Clothing Item 3" },
        ].map((item) => (
          <li key={item._id} className="flex items-center justify-between">
            <span>{item.name}</span>
            <button
              type="button"
              onClick={() => handleClothingItemSelection(item)}
              className="text-green-600"
            >
              Select
            </button>
          </li>
        ))}

        <div className="mb-4">
          <label
            htmlFor="deleteSetName"
            className="block text-sm font-medium text-gray-600"
          >
            Set Name to Delete:
          </label>
          <input
            type="text"
            id="deleteSetName"
            name="deleteSetName"
            value={deleteSetName}
            onChange={(e) => setDeleteSetName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Delete Set
          </button>
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

export default NewSetForm;
