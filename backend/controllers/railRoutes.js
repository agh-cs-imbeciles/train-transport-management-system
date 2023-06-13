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
    const departureDateString = req.body.departureDate,
          arrivalDateString = req.body.arrivalDate;
    console.log(req.body);
    if (typeof departureDateString === 'undefined' && typeof arrivalDateString === 'undefined') {
        res.status(400);
        throw new Error('Departure and arrival dates are both undefined (unsent)');
    }

    // if (!departureDateString) {
    //     res.status(400);
    //     throw new Error('Departure date of the rail route is undefined (unsent)');
    // }
    // if (departureDateString !== 'string') {
    //     res.status(400);
    //     throw new Error('Departure date of the rail route is not string type');
    // }
    // if (!arrivalDateString) {
    //     res.status(400);
    //     throw new Error('Arrival date of the rail route is undefined (unsent)');
    // }
    // if (arrivalDateString !== 'string') {
    //     res.status(400);
    //     throw new Error('Arrival date of the rail route is not string type');
    // }

    const departureDate = new Date(departureDateString),
          arrivalDate = new Date(arrivalDateString);
    if (!isNaN(departureDate.valueOf())
        && !isNaN(arrivalDate.valueOf())
        && arrivalDate - departureDate <= 0
    ) {
        res.status(400);
        throw new Error('Arrival date is older than departure one');
    }

    const matchStage = {};
    if (!isNaN(departureDate.valueOf())) {
        matchStage['departure.date'] = { $gte: departureDate };
    }
    if (!isNaN(arrivalDate.valueOf())) {
        matchStage['arrival.date'] = { $gte: arrivalDate };
    }
    console.log(matchStage);

    const railRoutes = await RailRoute.aggregate([
        { $match: matchStage },
        {
            $lookup: {
                from: 'stops',
                localField: 'departure.stopId',
                foreignField: '_id',
                as: 'departure.stop',
                pipeline: [
                    {
                        $lookup: {
                            from: 'places',
                            localField: 'placeId',
                            foreignField: '_id',
                            as: 'places'
                        }
                    },
                    {
                        $project: {
                            '__v': false,
                            '_id': true,
                            'name': true,
                            'place': { $first: '$places' }
                        }
                    }
                ]
            }
        }
        // {
        //     $lookup: {
        //         from: 'places',
        //         localField: 'placeId',
        //         foreignField: '_id',
        //         as: 'place',
        //         pipeline: [
        //             { $match: matchStage },
        //             {
        //                 $project: {
        //                     '_id': false,
        //                     'name': true,
        //                     'province': true
        //                 }
        //             }
        //         ]
        //     }
        // },
        // { $match: { 'place.0': { $exists: true } } },
        // {
        //     $project: {
        //         '_id': false,
        //         'name': true,
        //         'place': true
        //     }
        // }
    ])
        .exec();

    if (railRoutes.length === 0) {
        res.status(404);
        throw new Error(`Rail routes not found`);
    }

    // console.log(railRoutes);
    
    res.json(railRoutes);
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
