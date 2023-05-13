const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const loginRouter = require('./routes/login');

// Initializing dotenv
const env = dotenv.config();
dotenvExpand.expand(env);

const port = process.env.PORT;

app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.send('TTMS backend works!');
});

app.listen(port, () => {
    console.log('Server started');
    console.log(`Listening on: ${process.env.SERVER_URL}/`);
});