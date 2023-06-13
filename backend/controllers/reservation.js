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
            throw new Error('Reservation not found');
        }

        console.log(chalk.cyan.bold('[Get Reservation by ID]') + ` Reservation found: ${reservation.name}`);
  
        res.json(reservation);
      } catch (error) {
        console.log(chalk.red.bold('[Get Reservation by ID] Error:'), error);
        res.status(400).json({ error: error.message });
      }
};

export { createReservation, getReservationById };