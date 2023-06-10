import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import { insertPlace } from '../controllers/places.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Places]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertPlace));

export default router;
