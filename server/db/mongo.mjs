import { MongoClient } from 'mongodb';

const uri = process.env.DB_QUERY_STRING;

const inferDbNameFromUri = (value) => {
  try {
    const parsed = new URL(value);
    const name = parsed.pathname?.replace(/^\//, '')?.trim();
    return name || null;
  } catch {
    return null;
  }
};

const dbName = process.env.DB_NAME || inferDbNameFromUri(uri) || 'brandsamor';

if (!uri) {
  throw new Error('DB_QUERY_STRING is required.');
}

let cached = globalThis.__brandsamorMongo;
if (!cached) {
  cached = globalThis.__brandsamorMongo = { client: null, db: null, promise: null };
}

export async function getMongoDb() {
  if (cached.db) return cached.db;

  if (!cached.promise) {
    cached.promise = (async () => {
      const client = new MongoClient(uri, {});
      await client.connect();
      const db = client.db(dbName);
      cached.client = client;
      cached.db = db;
      return db;
    })();
  }

  cached.db = await cached.promise;
  return cached.db;
}

