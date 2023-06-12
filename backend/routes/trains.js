import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import { createTrain, getTrainById, getTrainSeats } from '../controllers/train.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Trains]') + ` ${req.originalUrl}`);
    next();
});

// Route to create a new train
router.post('/', asyncHandler(createTrain));

router.get('/:id/seats/:listOfSeatTypes', asyncHandler(getTrainSeats));

// Route to get train information by ID
router.get('/:id', asyncHandler(getTrainById));



export default router;
