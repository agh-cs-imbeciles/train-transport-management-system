import * as util from 'node:util';
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
    const stops = await Stop.find({}).exec();
    if (stops.length === 0) {
        res.status(404);
        throw new Error(`Stops ${stopId} not found`);
    }

    res.json(stops);
};

const getStopByName = async (req, res) => {
    const stopName = req.params.name;

    if (typeof stopName !== 'string') {
        res.status(400);
        throw new Error('Stop name is not string type');
    }

    const stop = await Stop.findOne({
        name: { $regex: new RegExp(`.*${stopName}.*`, 'i') }
    });
    if (!stop) {
        res.status(404);
        throw new Error(`Stop '${stopName}' not found`);
    }
    
    res.json(stop);
};

const getStopsByPlace = async (req, res) => {
    const { placeName, provinceName } = req.query;
    
    if (typeof placeName === 'undefined' && typeof provinceName === 'undefined') {
        res.status(400);
        throw new Error(`Place and province names are both undefined`);
    }

    const matchStage = {};
    if (typeof placeName === 'string') {
        matchStage.name = { $regex: new RegExp(`.*${placeName}.*`, 'i') };
    }
    if (typeof provinceName === 'string') {
        matchStage.province = { $regex: new RegExp(`.*${provinceName}.*`, 'i') };
    }

    const stops = await Stop.aggregate([
        {
            $lookup: {
                from: 'places',
                localField: 'placeId',
                foreignField: '_id',
                as: 'place',
                pipeline: [
                    { $match: matchStage },
                    {
                        $project: {
                            '_id': false,
                            'name': true,
                            'province': true
                        }
                    }
                ]
            }
        },
        { $match: { 'place.0': { $exists: true } } },
        {
            $project: {
                '_id': false,
                'name': true,
                'place': true
            }
        }
    ])
        .exec();

    // console.log(util.inspect(stops, false, null, true));

    if (stops.length === 0) {
        res.status(404);
        throw new Error(`Stops not found`);
    }
    
    res.json(stops);
};

export {
    insertStop,
    getAllStops,
    getStopById,
    getStopByName,
    getStopsByPlace
};
