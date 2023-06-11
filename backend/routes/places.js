import express from 'express';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import {
    insertPlace,
    getAllPlaceNames,
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
router.get('/name/all', asyncHandler(getAllPlaceNames));
router.get('/name/:name', asyncHandler(getPlaceByName));
router.get('/province/:province', asyncHandler(getPlacesByProvince));

export default router;
