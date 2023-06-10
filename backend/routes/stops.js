import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import { insertRailStop } from '../controllers/stops.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[RailStops]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertRailStop));

export default router;
