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

// Get the median from an array of numbers
const getMedian = (arr) => {
  arr.sort((a, b) => a - b);
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
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
  
  // Індекс для полів, що використовуються в запитах
  await db.collection("appointments").createIndex({ workerId: 1 });  // Індекс для workerId (для запитів за працівниками)
  await db.collection("salons").createIndex({ "workers.workerId": 1 });  // Індекс для полів працівників
  await db.collection("salons").createIndex({ services: 1 });  // Індекс для полів послуг салону
  
  console.log("Індекси створено.");
};

// Drop indexes after the tests
const dropIndexes = async () => {
  const db = client.db("BarberNetDB");

  // Drop indexes
  await db.collection("appointments").dropIndex({ workerId: 1 });
  await db.collection("salons").dropIndex({ "workers.workerId": 1 });
  await db.collection("salons").dropIndex({ services: 1 });

  console.log("Індекси видалено.");
};

// Run the queries and collect times
const runQueries = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Example parameters for test queries
    const salonId = "67675ba901158c7702dae260";  // Replace with actual salon ID
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

    // 4. Log the median times for each query
    console.log("\nMedian query times without indexes:");
    for (const [query, times] of Object.entries(noIndexTimes)) {
      console.log(`${query}: ${getMedian(times)}ms`);
    }

    console.log("\nMedian query times with indexes:");
    for (const [query, times] of Object.entries(withIndexTimes)) {
      console.log(`${query}: ${getMedian(times)}ms`);
    }

    // 5. Drop the indexes after testing
    console.log("Dropping indexes...");
    await dropIndexes();
  } catch (err) {
    console.error("Error running queries:", err);
  } finally {
    await client.close();
  }
};

runQueries();
