import express from "express";
import { getReservations, submitReservation } from "../db/mydb.js";
import { MongoClient } from 'mongodb';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

const apiToken = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
const client = new MongoClient(apiToken);

// Handle form submission

router.post("/submit-reservation", async (req, res) => {
  try {
    const { name, phone, date, time, people, special } = req.body;

    console.log("Received data from the client:");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("People:", people);
    console.log("Special:", special)

    // Call your submitReservation function to insert data into MongoDB
    await submitReservation(name, phone, date, time, people, special);
    res.status(201).send("Reservation submitted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting reservation.");
  }
});

// Retrieve reservation details by name and phone
router.get("/reservation-details", async (req, res) => {
  try {
    const { name, phone } = req.query;
    console.log("Give data from the mago:");
    const reservations = await getReservations(name, phone);
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving reservation details.");
  }
});

router.get("/all-reservations", async (req, res) => {
  try {
    // Use the MongoDB collection where you store your reservations
    const reservationsCollection = client.db().collection('reservations');

    // Query MongoDB to retrieve all documents from the 'test.reservations' collection
    const allReservations = await reservationsCollection.find({}).toArray();

    // Send the retrieved data as a JSON response
    res.json(allReservations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving all reservations.");
  }
});



export default router;
