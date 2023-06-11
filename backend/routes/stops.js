import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import {
    insertRailStop,
    getRailStopById,
    getAllRailStops,
    getRailStopByName,
    getRailStopsByPlace } from '../controllers/stops.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[RailStops]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertRailStop));
router.get('/id/:id', asyncHandler(getRailStopById));
router.get('/all', asyncHandler(getAllRailStops));
router.get('/name/:name', asyncHandler(getRailStopByName));
router.get('/place', asyncHandler(getRailStopsByPlace));

export default router;
