import * as mongoose from 'mongoose';
import Stop from '../models/stop.js';

const insertRailStop = async (req, res) => {
    const body = req.body;

    const newStop = await Stop.create({
        name: body.name,
        placeId: new mongoose.Types.ObjectId(body.placeId)
    });
    console.log(newStop);

    res.json({ railStopId: newStop._id.toString() })
};

const getRailStopById = async (req, res) => {
    const railStopId = req.params.id;

    if (typeof railStopId !== 'string') {
        res.status(400);
        throw new Error('Rail stop ID is not string type');
    }
    if (railStopId.length !== 24) {
        res.status(400);
        throw new Error(`Rail stop is too ${railStopId.length < 24 ? 'short' : 'long'} (24 characters)`);
    }

    const place = await Place.findById(railStopId);
    if (!place) {
        res.status(404);
        throw new Error(`Rail stop ${railStopId} not found`);
    }
    
    res.json(place);
};

const getAllRailStops = async (req, res) => {

};

const getRailStopByName = async (req, res) => {
    // const placeName = req.params.name;

    // if (typeof placeName !== 'string') {
    //     res.status(400);
    //     throw new Error('Place name is not string type');
    // }

    // const place = await Place.findOne({
    //     name: { $regex: new RegExp(`.*${placeName}.*`) }
    // });
    // if (!place) {
    //     res.status(404);
    //     throw new Error(`Place ${placeName} not found`);
    // }
    
    // res.json(place);
};

const getRailStopsByPlace = async (req, res) => {
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
    insertRailStop,
    getAllRailStops,
    getRailStopById,
    getRailStopByName,
    getRailStopsByPlace
};
