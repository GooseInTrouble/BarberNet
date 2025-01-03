const { MongoClient } = require("mongodb");
const faker = require('@faker-js/faker').faker;

const uri = "mongodb+srv://artemarabadzhy:545454@barbernetcluster.nt61oft.mongodb.net/?retryWrites=true&w=majority&appName=BarberNetCluster";
const client = new MongoClient(uri);


async function deleteServicesWithWrongImages() {
  try {
    await client.connect();
    const db = client.db("BarberNetDB");
    const result = await db.collection("services").deleteMany({
      image: { $regex: /^https/ }, // Видаляємо, якщо `image` починається з http
    });
    console.log(`Видалено ${result.deletedCount} записів.`);
  } catch (err) {
    console.error("Помилка при видаленні записів:", err);
  } finally {
    try {
      await client.close(); // Закриття підключення тільки після виконання операції
      console.log("Підключення до MongoDB закрито.");
    } catch (closeErr) {
      console.error("Помилка при закритті підключення:", closeErr);
    }
  }
}

// Виклик функції
deleteServicesWithWrongImages();


const generateToolName = () => {
    const tools = [
      "Hair Dryer",
      "Flat Iron",
      "Curling Wand",
      "Electric Shaver",
      "Nail Drill",
      "Hair Clippers",
      "Straightening Brush",
      "Manicure Set",
    ];
    return tools[Math.floor(Math.random() * tools.length)];
  };
  const generateToolType = () => {
    const toolTypes = [
      "Hair straightener",
      "Hair dryer",
      "Curling iron",
      "Shaving tool",
      "Nail care",
    ];
    return toolTypes[Math.floor(Math.random() * toolTypes.length)];
  };
  const generateTools = () => {
  return Array.from({ length: 10 }, () => ({
    name: generateToolName(),
    type: generateToolType(),
  }));
};
const generateServiceDescription = () => faker.lorem.sentence(5);
const generateServicePrice = () => {
  return faker.number.float({ min: 50, max: 500, precision: 0.01 });
};
const generateServiceName = () => {
  const services = [
    "Haircut", "Hair Coloring", "Balayage", "Manicure", "Pedicure", "Facial Treatment", "Full Body Massage", "Waxing", "Hair Styling", "Bridal Makeup"
  ];
  return faker.helpers.arrayElement(services);
};
const generateServices = () => {
  return Array.from({ length: 10 }, () => ({
    name: generateServiceName(),
    price: generateServicePrice(),
    description: generateServiceDescription(),
    image: "/placeholder.jpg",
    ServiceCategory: faker.commerce.department(),
  }));
};
const generateWorkers = () => {
  return Array.from({ length: 5 }, () => ({
    name: faker.name.fullName(),
    email: faker.internet.email(),
  }));
};

const generateSalons = () => {
  return Array.from({ length: 2 }, () => ({
    name: faker.company.name(), // Новий метод для генерації назви компанії
    location: faker.location.streetAddress(), // Оновлений метод для адреси
    image: "/placeholder.jpg", // Статичне зображення
    workers: [],
    services: [],
    tools: [],
    description: faker.lorem.paragraph(), // Генерація опису за допомогою faker
  }));
};

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Підключено до MongoDB");

    const db = client.db("BarberNetDB");

    //await db.collection("tools").insertMany(generateTools());
    //await db.collection("services").insertMany(generateServices());
    //await db.collection("workers").insertMany(generateWorkers());
    //await db.collection("salons").insertMany(generateSalons());

    console.log("Дані успішно додані до бази!");
  } catch (err) {
    console.error("Помилка при додаванні даних:", err);
  } finally {
    await client.close();
  }
}

seedDatabase();
