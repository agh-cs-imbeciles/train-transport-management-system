import * as mongoose from 'mongoose';
import RailRoute from '../models/railRoute.js';

// Helper function
const joinByIds = name => ({
    $lookup: {
        from: 'stops',
        localField: `${name}.stopId`,
        foreignField: '_id',
        as: `${name}.stop`,
        pipeline: [
            {
                $lookup: {
                    from: 'places',
                    localField: 'placeId',
                    foreignField: '_id',
                    as: 'places',
                    pipeline: [
                        {
                            $unset: [ '__v' ]
                        }
                    ]
                }
            },
            {
                $project: {
                    '_id': true,
                    'name': true,
                    'place': { $first: '$places' }
                }
            }
        ]
    }
});

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

const getRailRouteQuery = async (req, res) => {
    const departureDateString = req.body.departureDate,
          arrivalDateString = req.body.arrivalDate,
          departureStopId = req.body.departureStopId,
          arrivalStopId = req.body.arrivalStopId;
    console.log(req.body);
    if (typeof departureDateString === 'undefined' && typeof arrivalDateString === 'undefined') {
        res.status(400);
        throw new Error('Departure and arrival dates are both undefined (unsent)');
    }
    if (typeof departureStopId === 'undefined') {
        res.status(400);
        throw new Error('Departure stop ID is undefined (unsent)');
    }
    if (departureStopId.length !== 24) {
        res.status(400);
        const lengthMessage = departureStopId.length < 24 ? 'short' : 'long';
        throw new Error(`Departure stop ID '${departureStopId}' is too ${lengthMessage} (24 characters)`);
    }
    if (typeof arrivalStopId === 'undefined') {
        res.status(400);
        throw new Error('Arrival stop ID is undefined (unsent)');
    }
    if (arrivalStopId.length !== 24) {
        res.status(400);
        const lengthMessage = arrivalStopId.length < 24 ? 'short' : 'long';
        throw new Error(`Arrival stop ID '${arrivalStopId}' is too ${lengthMessage} (24 characters)`);
    }

    const departureDate = new Date(departureDateString),
          arrivalDate = new Date(arrivalDateString);
    // if (!isNaN(departureDate.valueOf())
    //     && !isNaN(arrivalDate.valueOf())
    //     && arrivalDate - departureDate <= 0
    // ) {
    //     res.status(400);
    //     throw new Error('Arrival date is older than departure one');
    // }

    const matchStage = {};
    if (!isNaN(departureDate.valueOf())) {
        matchStage['departure.date'] = { $gte: departureDate };
    }
    else if (!isNaN(arrivalDate.valueOf())) {
        matchStage['arrival.date'] = { $lte: arrivalDate };
    }

    const departureId = new mongoose.Types.ObjectId(departureStopId),
          arrivalId = new mongoose.Types.ObjectId(arrivalStopId);
    matchStage.$and = [
        {
            $or: [
                { 'departure.stopId': departureId },
                { 
                    'stops': {
                        $elemMatch: { 'stopId': departureId } 
                    }
                }
            ]
        },
        {
            $or: [
                { 'arrival.stopId': arrivalId },
                { 
                    'stops': {
                        $elemMatch: { 'stopId': arrivalId } 
                    }
                }
            ]
        }
    ];

    const railRoutes = await RailRoute.aggregate([
        { $match: matchStage },
        joinByIds('departure'),
        joinByIds('arrival'),
        joinByIds('stops'),
        { $unset: [ '__v' ] }
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
    getRailRouteQuery,
    getRailRouteByDeparture,
    getRailRouteByArrival
};
