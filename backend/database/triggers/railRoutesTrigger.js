import chalk from 'chalk';
import { connect } from '../connection.js';
import RailRoute from '../../models/railRoute.js';
import RailRouteLog from '../../models/railRouteLog.js';

const archiveRailRoutes = async () => {
    console.log(chalk.yellow.bold('[Archive rail routes]') + ' Connecting...');
    await connect();

    console.log(chalk.yellow.bold('[Archive rail routes]') + ' Archiving...');

    const query = { 'arrival.date': { $lt: new Date() } }
    const outdatedRailRoutes = await RailRoute.find(query);
    await RailRouteLog.insertMany(outdatedRailRoutes);
    // await RailRoute.deleteMany(outdatedRailRoutes);

    console.log(chalk.yellow.bold('[Archive rail routes]') + ' Successfully finished');
};

export { archiveRailRoutes };
