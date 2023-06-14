import mongoose from 'mongoose';
import { RailRouteSchema } from './railRoute.js';

export default mongoose.model('RailRouteLog', RailRouteSchema);
