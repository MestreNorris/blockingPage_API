import { MongoClient } from 'mongodb'

const { MONGODB_URI, MONGODB_DB } = process.env;
const client = new MongoClient(MONGODB_URI);
var db;

export async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db(MONGODB_DB);
        return db;
    } catch (error) { return null }
};