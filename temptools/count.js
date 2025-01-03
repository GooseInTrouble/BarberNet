const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://artemarabadzhy:545454@barbernetcluster.nt61oft.mongodb.net/?retryWrites=true&w=majority&appName=BarberNetCluster";

const client = new MongoClient(uri);
async function countDocuments() {
    try {
        await client.connect();
        console.log("Підключено до MongoDB");

        const db = client.db("BarberNetDB");
        const collections = await db.listCollections().toArray();

        for (const collection of collections) {
            const count = await db.collection(collection.name).countDocuments();
            console.log(`Колекція '${collection.name}' має ${count} записів.`);
        }
    } catch (err) {
        console.error("Помилка при підрахунку документів:", err);
    } finally {
        await client.close();
    }
}

countDocuments();
