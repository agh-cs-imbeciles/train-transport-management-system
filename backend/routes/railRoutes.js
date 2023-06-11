import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import { insertRailRoute } from '../controllers/railRoutes.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[RailRoutes]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertRailRoute));

export default router;
