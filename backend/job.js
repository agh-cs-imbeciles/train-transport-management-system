import process from 'node:process';
import { archiveRailRoutes } from './database/triggers/railRoutesTrigger.js';

const run = async () => {
    await archiveRailRoutes();
    process.exit();
};

run();
