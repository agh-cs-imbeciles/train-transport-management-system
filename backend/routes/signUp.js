import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
const router = express();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Sign-up]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(async (req, res) => {
    res.send('Success');
}));

export default router;
