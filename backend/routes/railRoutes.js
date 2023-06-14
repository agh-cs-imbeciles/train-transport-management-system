import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import {
    insertRailRoute,
    getRailRouteById,
    getRailRouteQuery,
    getRailRouteByDeparture,
    getRailRouteByArrival } from '../controllers/railRoutes.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[RailRoutes]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertRailRoute));
router.get('/id/:id', asyncHandler(getRailRouteById));
router.get('/query', asyncHandler(getRailRouteQuery));
// router.get('/departure/:id', asyncHandler(getRailRouteByDeparture));
// router.get('/arrival/:id', asyncHandler(getRailRouteByArrival));

export default router;
