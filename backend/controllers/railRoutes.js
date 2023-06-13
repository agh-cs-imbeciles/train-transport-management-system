import * as mongoose from 'mongoose';
import RailRoute from '../models/railRoute.js';

const insertRailRoute = async (req, res) => {
    const body = req.body;

    const newRailRoute = await RailRoute.create({
        trainId: new mongoose.Types.ObjectId(body.trainId),
        ticketsCost: {
            'firstClass': body.ticketsCost.firstClass,
            'standard': body.ticketsCost.standard
        },
        departure: {
            stopId: new mongoose.Types.ObjectId(body.departure.stopId),
            date: new Date(body.departure.date)
        },
        arrival: {
            stopId: new mongoose.Types.ObjectId(body.arrival.stopId),
            date: new Date(body.arrival.date)
        },
        stops: body.stops
    });
    console.log(newRailRoute);

    res.json({ railRouteId: newRailRoute._id });
};

const getRailRouteById = async (req, res) => {
    const railRouteId = req.params.id;

    if (typeof railRouteId !== 'string') {
        res.status(400);
        throw new Error(`Rail route ID ${railRouteId} is not string type`);
    }
    if (railRouteId.length !== 24) {
        res.status(400);
        const lengthMessage = railRouteId.length < 24 ? 'short' : 'long';
        throw new Error(`Rail route ID is too ${lengthMessage} (24 characters)`);
    }

    const railRoute = await RailRoute.findById(railRouteId);
    if (!railRoute) {
        res.status(404);
        throw new Error(`Rail route ${railRouteId} not found`);
    }
    
    res.json(railRoute);
};

const getRailRouteByDate = async (req, res) => {

};

const getRailRouteByDeparture = async (req, res) => {

};

const getRailRouteByArrival = async (req, res) => {

};

export {
    insertRailRoute,
    getRailRouteById,
    getRailRouteByDate,
    getRailRouteByDeparture,
    getRailRouteByArrival
};
