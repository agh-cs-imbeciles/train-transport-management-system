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
    const id = 0;
    const matchingRoute = RailRoute.findById(id);
    if (!matchingRoute) {
        res
    }
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
