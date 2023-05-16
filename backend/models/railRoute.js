import mongoose from 'mongoose';
import { PlaceSchema } from './place';

const RailRouteSchema = mongoose.Schema({
    trainId: {
        type: ObjectId,
        required: [true, 'Train ID of the rail route is required']
    },
    start: {
        type: PlaceSchema,
        required: [true, 'Start of the rail route is required']
    },
    end: {
        type: PlaceSchema,
        required: [true, 'End of the rail route is required']
    },
    stops: {
        type: [PlaceSchema],
        required: [true, 'Stops of the rail route are required']
    }
}, {
    timestamps: true
});

export default mongoose.model('RailRoute', RailRouteSchema);
