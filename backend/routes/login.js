import express from 'express';
import chalk from 'chalk';
const router = express();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Login]') + ` ${req.originalUrl}`);
    next();
});

router.post('/', (req, res) => {
    res.send('Success');
});

export default router;
