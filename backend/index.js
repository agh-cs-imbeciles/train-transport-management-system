import express from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import loginRouter from './routes/login.js';
const app = express();

// Initializing dotenv
const env = dotenv.config();
dotenvExpand.expand(env);

const port = process.env.SERVER_PORT;

app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.send('TTMS backend works!');
});

app.listen(port, () => {
    console.log('Server started');
    console.log(`Listening on: ${process.env.SERVER_URL}/`);
});
