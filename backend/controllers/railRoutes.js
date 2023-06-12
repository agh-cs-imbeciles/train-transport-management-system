import RailRoute from '../models/railRoute.js';

const insertRailRoute = async (req, res) => {
    const body = req.body;

    RailRoute.create({
        trainId: ObjectId(body.trainId),
        departure: {
            stop: {
                name: body.departure.stop.name,
                place: {
                    name: body.departure.stop.place.name,
                    province: body.departure.stop.place.province
                }
            },
            date: new Date(body.departure.date)
        },
        arrival: {
            stop: {
                name: body.arrival.stop.name,
                place: {
                    name: body.arrival.stop.place.name,
                    province: body.arrival.stop.place.province
                }
            },
            date: new Date(body.arrival.date)
        },
        stops: body.stops
    });
};

const getRailRoute = async (req, res) => {
    const id = 0;
    const matchingRoute = RailRoute.findById(id);
    if (!matchingRoute) {
        res
    }
};

const getAllRailRoutes = async (req, res) => {

};

export { insertRailRoute, getRailRoute, getAllRailRoutes };
