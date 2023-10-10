import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const apiToken = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
const client = new MongoClient(apiToken);



export const connectDatabase = async () => {
    try {
        const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db();

        return { client, db };
    } catch (error) {
        throw error;
    }
};

export const submitReservation = async (name, phone, date, time, people,special) => {
    try {
        const { db, client } = await connectDatabase();

        // Insert reservation into the database
        await db.collection('reservations').insertOne({
            name: name,
            phone: phone,
            date: date,
            time: time,
            people: people,
            special: special
        });

        client.close();
    } catch (error) {
        throw error;
    }
};

export const getReservations = async (name, phone) => {
    try {
        const { db, client } = await connectDatabase();

        // Query reservations based on name and phone
        const reservations = await db.collection('reservations').find({ name, phone }).toArray();

        client.close();
        return reservations;
    } catch (error) {
        throw error;
    }
};
