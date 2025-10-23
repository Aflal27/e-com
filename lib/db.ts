import mongoose from 'mongoose'

interface GlobalWithMongoose {
  mongooseConn?: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

const globalAny = global as unknown as GlobalWithMongoose

let cached = globalAny.mongooseConn
if (!cached) {
  cached = globalAny.mongooseConn = { conn: null, promise: null }
}

export async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI as string | undefined
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable')
  }
  if (cached!.conn) return cached!.conn
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
    })
  }
  cached!.conn = await cached!.promise
  return cached!.conn
}
