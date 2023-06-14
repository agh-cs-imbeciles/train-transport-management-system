import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import {
    insertRailRoute,
    getRailRouteById,
    getRailRouteQuery,
    getVacantSeatsById,
    getRailRouteByDeparture,
    getRailRouteByArrival } from '../controllers/railRoutes.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[RailRoutes]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertRailRoute));
router.get('/id/:id', asyncHandler(getRailRouteById));
router.post('/query', asyncHandler(getRailRouteQuery));
// Route to get all vacant seat informations by rail route ID
router.get('/seats/:id', asyncHandler(getVacantSeatsById));
// router.get('/departure/:id', asyncHandler(getRailRouteByDeparture));
// router.get('/arrival/:id', asyncHandler(getRailRouteByArrival));

export default router;
