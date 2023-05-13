const express = require('express');
const router = express.Router();
const chalk = require('chalk');

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Login]') + ` ${req.originalUrl}`);
    next();
});

router.post('/', (req, res) => {
    res.send('Success');
});

module.exports = router;
