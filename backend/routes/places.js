import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import {
    insertPlace,
    getAllPlaces,
    getPlaceById,
    getPlaceByName,
    getPlacesByProvince } from '../controllers/places.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log(chalk.cyan.bold('[Places]') + ` ${req.originalUrl}`);
    next();
});

router.put('/', asyncHandler(insertPlace));
router.get('/id/:id', asyncHandler(getPlaceById));
router.get('/all', asyncHandler(getAllPlaces));
router.get('/name/:name', asyncHandler(getPlaceByName));
router.get('/province/:name', asyncHandler(getPlacesByProvince));

export default router;
