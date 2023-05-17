import express from 'express';
import chalk from 'chalk';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Trains]') + ` ${req.originalUrl}`);
    next();
});

// Get all trains
router.get('/', (req, res) => {
    res.send('Success');
});

// Get train by id
router.get('/:id', (req, res) => {
    res.send('Success');
});

export default router;
