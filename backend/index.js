import express from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import signUpRouter from './routes/signUp.js';
import loginRouter from './routes/login.js';
import { connect } from './config/database.js';
const app = express();

// Initializing dotenv
const env = dotenv.config();
dotenvExpand.expand(env);

const port = process.env.SERVER_PORT;

connect();

app.use('/signup', signUpRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.send('TTMS backend works!');
});

app.listen(port, () => {
    console.log('Server started');
    console.log(`Listening on: ${process.env.SERVER_URL}/`);
});
