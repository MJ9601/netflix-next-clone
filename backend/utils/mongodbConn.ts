import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/netflix";
const dbName = process.env.MONGODB_DB || "netflix";

// const uri = "mongodb://localhost:27017/netflix"; //local server;
// const dbName = "netflix";

let cachedClient: null | any = null;
let cachedDb: null | any = null;

if (!uri || !dbName) throw new Error("The uri or db name is not defined!");

export const connectToDB = async () => {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };

  const _client = new MongoClient(uri);

  const client = await _client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};
