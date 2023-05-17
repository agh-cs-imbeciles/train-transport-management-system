import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import { signUp } from '../controllers/signUp.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Sign-up]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(signUp));

export default router;
