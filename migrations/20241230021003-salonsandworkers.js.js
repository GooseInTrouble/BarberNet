const { MongoClient } = require('mongodb');

// Функція для оновлення масиву робітників у салонах
module.exports = {
  up: async (db) => {
    const salonsCollection = db.collection("salons");
    const workersCollection = db.collection("workers");

    const workers = await workersCollection.find().toArray();
    const workerIds = workers.map(worker => worker._id.toString());

    const salons = await salonsCollection.find().toArray();

    let usedWorkers = [];

    for (let salon of salons) {
      const availableWorkers = workerIds.filter(workerId => !usedWorkers.includes(workerId));

      if (availableWorkers.length > 0) {
        const randomWorkerId = availableWorkers[Math.floor(Math.random() * availableWorkers.length)];
        salon.workers.push(randomWorkerId);
        usedWorkers.push(randomWorkerId);

        await salonsCollection.updateOne(
          { _id: salon._id },
          { $set: { workers: salon.workers } }
        );
        console.log(`Додано робітника до салону: ${salon.name}`);
      } else {
        console.log(`Не залишилось доступних робітників для салону: ${salon.name}`);
      }
    }
  },
  down: async (db) => {
    const salonsCollection = db.collection("salons");
    const workersCollection = db.collection("workers");

    // Для відкату (якщо потрібно)
    const workers = await workersCollection.find().toArray();
    const workerIds = workers.map(worker => worker._id.toString());

    for (let salon of salons) {
      salon.workers = salon.workers.filter(workerId => !workerIds.includes(workerId));

      await salonsCollection.updateOne(
        { _id: salon._id },
        { $set: { workers: salon.workers } }
      );
      console.log(`Видалено робітників для салону: ${salon.name}`);
    }
  }
};
