import RailRoute from '../models/railRoute.js';

const getRailRoute = async (req, res) => {
    const id = 0;
    const matchingRoute = RailRoute.findById(id);
    if (!matchingRoute) {
        res
    }
};

const getAllRailRoutes = async (req, res) => {

};

export { getRailRoute, getAllRailRoutes };
