import * as mongoose from 'mongoose';
import chalk from 'chalk';
import Reservation from '../models/reservation.js';

const createReservation = async (req, res) => {
    try {
        const body = req.body;

        // Validate the required fields
        if (!body.userId) {
            throw new Error('User ID is undefined');
        }
        if (!body.railRouteId) {
            throw new Error('Train route ID is undefined');
        }
        if (!body.seats || body.seats.length === 0) {
            throw new Error('Seats array is empty or undefined');
        }

        // Create a new reservation
        const newReservation = await Reservation.create({
            userId: body.userId,
            railRouteId: body.railRouteId,
            seats: body.seats
        });

        res.json({ reservationId: newReservation._id.toString() });
    } catch (error) {
      console.log(chalk.red.bold('[Create Reservaion] Error:'), error);
      res.status(400).json({ error: error.message });
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;

        // Find the reservation by ID
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            throw new Error(`Reservation of ID ${reservationId} not found`);
        }

        console.log(chalk.cyan.bold('[Get reservation by user ID]') + ` Reservation found: ${reservation._id}`);
  
        res.json(reservation);
    } catch (error) {
        console.log(chalk.red.bold('[Get reservation by ID] Error:'), error);
        res.status(400).json({ error: error.message });
    }
};

const getReservationsByUserId = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);

        // Find the reservation by user ID
        const reservations = await Reservation.find({ userId });

        if (reservations.length === 0) {
            throw new Error(`Reservations of user ID ${userId} not found`);
        }

        console.log(chalk.cyan.bold('[Get reservations by user ID]') + ` Reservations found`);

        res.json(reservations);
    }
    catch (error) {
        console.log(chalk.red.bold('[Get reservations by user ID] Error:'), error);
        res.status(400).json({ error: error.message });
    }
};

export { createReservation, getReservationById, getReservationsByUserId };