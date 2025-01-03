const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://artemarabadzhy:545454@barbernetcluster.nt61oft.mongodb.net/?retryWrites=true&w=majority&appName=BarberNetCluster";

const client = new MongoClient(uri);

// Функція для видалення записів із неправильними зображеннями
async function deleteServicesWithWrongImages() {
  try {
    await client.connect(); // Підключення до MongoDB
    console.log("Підключено до MongoDB");

    const db = client.db("BarberNetDB");
    const result = await db.collection("services").deleteMany({
      image: { $regex: /^https/ }, // Умова: поле image починається з http
    });

    console.log(`Видалено ${result.deletedCount} записів із неправильними зображеннями.`);
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
