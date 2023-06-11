import * as mongoose from 'mongoose';
import Place from '../models/place.js';

const insertPlace = async (req, res) => {
    const body = req.body;

    const newPlace = await Place.create({
        name: body.name,
        province: body.province
    });
    console.log(newPlace);

    res.json({ placeId: newPlace._id.toString() });
};

const getPlaceById = async (req, res) => {
    const placeId = req.params.id;

    // if (!placeId) {
    //     res.status(400);
    //     throw new Error('Place ID hasn\'t been sent');
    // }
    if (typeof placeId !== 'string') {
        res.status(400);
        throw new Error('Place ID is not string type');
    }
    if (placeId.length !== 24) {
        res.status(400);
        throw new Error(`Place ID is too ${placeId.length < 24 ? 'short' : 'long'} (24 characters)`);
    }

    const place = await Place.findById(placeId);
    if (!place) {
        res.status(404);
        throw new Error(`Place ${placeId} not found`);
    }
    
    res.json(place);
};

const getAllPlaceNames = async (req, res) => {

};

const getPlaceByName = async (req, res) => {
    const placeName = req.params.name;

    if (typeof placeName !== 'string') {
        res.status(400);
        throw new Error('Place name is not string type');
    }

    const place = await Place.findOne({
        name: { $regex: new RegExp(`.*${placeName}.*`) }
    });
    if (!place) {
        res.status(404);
        throw new Error(`Place ${placeName} not found`);
    }
    
    res.json(place);
};

const getPlacesByProvince = async (req, res) => {
    const province = req.params.province;

    if (typeof province !== 'string') {
        res.status(400);
        throw new Error(`Place province is not string type`);
    }


    const places = await Place.find({
        province: { $regex: new RegExp(`.*${province}.*`) }
    })
        .exec();
    if (places.length === 0) {
        res.status(404);
        throw new Error(`Places with province '${province}' not found`);
    }
    
    res.json(places);
};

export { insertPlace, getAllPlaceNames, getPlaceById, getPlaceByName, getPlacesByProvince };
