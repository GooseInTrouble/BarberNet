const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://artemarabadzhy:545454@barbernetcluster.nt61oft.mongodb.net/?retryWrites=true&w=majority&appName=BarberNetCluster";
const client = new MongoClient(uri);

// Log execution time and return duration
const logExecutionTime = async (operationName, operation) => {
  const start = Date.now();
  await operation();
  const end = Date.now();
  return end - start;
};

// Get the 99th percentile from an array of numbers
const getPercentile = (arr, percentile) => {
  arr.sort((a, b) => a - b);  // Сортуємо масив за зростанням
  const index = (percentile / 100) * (arr.length - 1); // Перерахунок для правильного індексу

  // Якщо індекс не ціле число, обчислюємо відносно двох сусідніх значень
  if (index % 1 === 0) {
    return arr[index];  // Якщо індекс ціле число, просто повертаємо значення на цьому індексі
  } else {
    const lowerIndex = Math.floor(index);  // Індекс меншого елемента
    const upperIndex = Math.ceil(index);   // Індекс більшого елемента
    const fraction = index - lowerIndex;   // Різниця між індексами
    return arr[lowerIndex] + fraction * (arr[upperIndex] - arr[lowerIndex]);  // Інтерполяція
  }
};

// Query 1: Get available workers for a specific salon
const getAvailableWorkers = async (salonId) => {
  const db = client.db("BarberNetDB");
  const salon = await db.collection("salons").findOne({ _id: salonId });
  return salon ? salon.workers : [];
};

// Query 2: Get service details
const getServiceDetails = async (serviceId) => {
  const db = client.db("BarberNetDB");
  return await db.collection("services").findOne({ _id: serviceId });
};

// Query 4: Get services for a salon
const getServicesForSalon = async (salonId) => {
  const db = client.db("BarberNetDB");
  const salon = await db.collection("salons").findOne({ _id: salonId });
  return salon ? salon.services : [];
};

// Query 5: Get all salons
const getAllSalons = async () => {
  const db = client.db("BarberNetDB");
  return await db.collection("salons").find({}).toArray();
};

// Create indexes for performance improvement
const createIndexes = async () => {
  const db = client.db("BarberNetDB");
  
    // Create index for fields used in queries
    await db.collection("appointments").createIndex({ workerId: 1 });  // Index for workerId (for worker queries)
    await db.collection("salons").createIndex({ "workers.workerId": 1 });  // Index for workers field
    await db.collection("salons").createIndex({ services: 1 });  // Index for services field in salons
  
    console.log("Indexes created.");
};

// Run the queries and collect times
const runQueries = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Example parameters for test queries
    const salonId = "67675ba901158c7702dae260"; 
    const serviceId = "6767544baacdfd72cc81ea57";

    // Arrays to store execution times
    let noIndexTimes = {
      "Get Available Workers (No Index)": [],
      "Get Service Details (No Index)": [],
      "Get Services for Salon (No Index)": [],
      "Get All Salons (No Index)": [],
    };

    let withIndexTimes = {
      "Get Available Workers (With Index)": [],
      "Get Service Details (With Index)": [],
      "Get Services for Salon (With Index)": [],
      "Get All Salons (With Index)": [],
    };

    // 1. Run queries without indexes
    console.log("Running queries without indexes...");
    for (let i = 0; i < 10; i++) {
      noIndexTimes["Get Available Workers (No Index)"].push(await logExecutionTime("Get Available Workers (No Index)", () => getAvailableWorkers(salonId)));
      noIndexTimes["Get Service Details (No Index)"].push(await logExecutionTime("Get Service Details (No Index)", () => getServiceDetails(serviceId)));
      noIndexTimes["Get Services for Salon (No Index)"].push(await logExecutionTime("Get Services for Salon (No Index)", () => getServicesForSalon(salonId)));
      noIndexTimes["Get All Salons (No Index)"].push(await logExecutionTime("Get All Salons (No Index)", getAllSalons));
    }

    // 2. Create indexes
    console.log("Creating indexes...");
    await createIndexes();
    console.log("Indexes created.");

    // 3. Run queries with indexes
    console.log("Running queries with indexes...");
    for (let i = 0; i < 10; i++) {
      withIndexTimes["Get Available Workers (With Index)"].push(await logExecutionTime("Get Available Workers (With Index)", () => getAvailableWorkers(salonId)));
      withIndexTimes["Get Service Details (With Index)"].push(await logExecutionTime("Get Service Details (With Index)", () => getServiceDetails(serviceId)));
      withIndexTimes["Get Services for Salon (With Index)"].push(await logExecutionTime("Get Services for Salon (With Index)", () => getServicesForSalon(salonId)));
      withIndexTimes["Get All Salons (With Index)"].push(await logExecutionTime("Get All Salons (With Index)", getAllSalons));
    }

    // 4. Log the 99th percentile query times for each query
    console.log("\n99th percentile query times without indexes:");
    for (const [query, times] of Object.entries(noIndexTimes)) {
      console.log(`${query}: ${getPercentile(times, 99)}ms`);
    }

    console.log("\n99th percentile query times with indexes:");
    for (const [query, times] of Object.entries(withIndexTimes)) {
      console.log(`${query}: ${getPercentile(times, 99)}ms`);
    }

  } catch (err) {
    console.error("Error running queries:", err);
  } finally {
    await client.close();
  }
};

runQueries();
