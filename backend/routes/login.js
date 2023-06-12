import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import { login } from '../controllers/login.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Login]') + ` ${req.originalUrl}`);
    next();
});

router.post('/', asyncHandler(login));

export default router;
