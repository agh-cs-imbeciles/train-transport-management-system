import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import signUpRouter from './routes/signUp.js';
import loginRouter from './routes/login.js';
import railRoutesRouter from './routes/railRoutes.js';
import railStopsRouter from './routes/stops.js';
import placesRouter from './routes/places.js';
import { connect } from './config/database.js';
const app = express();

// Initializing dotenv
const env = dotenv.config();
dotenvExpand.expand(env);

const port = process.env.SERVER_PORT;

// Connect with the MongoDB database 
connect();

// Setup a middleware to allow CORS
app.use(cors());
// Setup middlewares to parse the post body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/rail/routes', railRoutesRouter);
app.use('/rail/stops', railStopsRouter);
app.use('/places', placesRouter);

app.get('/', (req, res) => {
    res.send('TTMS backend works!');
});

app.listen(port, () => {
    console.log('Server started');
    console.log(`Listening on: ${process.env.SERVER_URL}/`);
});
