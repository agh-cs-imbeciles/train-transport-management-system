import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import { createReservation, getReservationById } from '../controllers/reservation.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Reservation]') + ` ${req.originalUrl}`);
    next();
});

// Route to create a new train
router.post('/', asyncHandler(createReservation));

// Route to get train information by ID
router.get('/:id', asyncHandler(getReservationById));

export default router;