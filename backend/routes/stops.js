import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import {
    insertStop,
    getStopById,
    getAllStops,
    getStopByName,
    getStopsByPlace } from '../controllers/stops.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Stops]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertStop));
router.get('/id/:id', asyncHandler(getStopById));
router.get('/all', asyncHandler(getAllStops));
router.get('/name/:name', asyncHandler(getStopByName));
router.get('/place', asyncHandler(getStopsByPlace));

export default router;
