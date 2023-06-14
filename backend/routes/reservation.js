import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import {
    createReservation,
    getReservationById,
    getReservationsByUserId } from '../controllers/reservation.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Reservation]') + ` ${req.originalUrl}`);
    next();
});

// Route to create a new reservations
router.post('/', asyncHandler(createReservation));
// Route to get reservation information by ID
router.get('/:id', asyncHandler(getReservationById));
// Route to get all reservation informations by user ID
router.get('/userid/:id', asyncHandler(getReservationsByUserId));

export default router;
