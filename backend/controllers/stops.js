import * as mongoose from 'mongoose';
import Stop from '../models/stop.js';

const insertStop = async (req, res) => {
    const body = req.body;

    const newStop = await Stop.create({
        name: body.name,
        placeId: new mongoose.Types.ObjectId(body.placeId)
    });
    console.log(newStop);

    res.json({ stopId: newStop._id.toString() })
};

const getStopById = async (req, res) => {
    const stopId = req.params.id;

    if (typeof stopId !== 'string') {
        res.status(400);
        throw new Error('Stop ID is not string type');
    }
    if (stopId.length !== 24) {
        res.status(400);
        const lengthMessage = stopId.length < 24 ? 'short' : 'long';
        throw new Error(`Stop ID is too ${lengthMessage} (24 characters)`);
    }

    const stop = await Stop.findById(stopId);
    if (!stop) {
        res.status(404);
        throw new Error(`Stop ${stopId} not found`);
    }
    
    res.json(stop);
};

const getAllStops = async (req, res) => {

};

const getStopByName = async (req, res) => {
    const stopName = req.params.name;

    if (typeof stopName !== 'string') {
        res.status(400);
        throw new Error('Stop name is not string type');
    }

    const stop = await Stop.findOne({
        name: { $regex: new RegExp(`.*${stopName}.*`) }
    });
    if (!stop) {
        res.status(404);
        throw new Error(`Stop '${stopName}' not found`);
    }
    
    res.json(stop);
};

const getStopsByPlace = async (req, res) => {
    // const provinceName = req.params.name;

    // if (typeof provinceName !== 'string') {
    //     res.status(400);
    //     throw new Error(`Place province is not string type`);
    // }

    // const places = await Place.find({
    //     province: { $regex: new RegExp(`.*${provinceName}.*`) }
    // })
    //     .exec();
    // if (places.length === 0) {
    //     res.status(404);
    //     throw new Error(`Places with province '${provinceName}' not found`);
    // }
    
    // res.json(places);
};

export {
    insertStop,
    getAllStops,
    getStopById,
    getStopByName,
    getStopsByPlace
};
