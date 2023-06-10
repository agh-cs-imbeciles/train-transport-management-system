import { ObjectId } from 'mongoose';
import Stop from '../models/stop.js';

const insertRailStop = async (req, res) => {
    const body = req.body;

    const newStop = await Stop.create({
        name: body.name,
        placeId: ObjectId(body.placeId)
    });
    console.log(newStop);

    res.json({ railStopId: newStop._id.toString() })
};

export { insertRailStop };
