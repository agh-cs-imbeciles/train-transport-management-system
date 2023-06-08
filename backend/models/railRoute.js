import mongoose from 'mongoose';
import { StopSchema } from './stop';

const RailRouteSchema = mongoose.Schema(
    {
        trainId: {
            type: ObjectId,
            required: [true, 'Train ID of the rail route is required']
        },
        departure: {
            stop: {
                type: StopSchema,
                required: [true, 'Departure stop of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Departure stop of the rail is required']
            }
        },
        arrival: {
            stop: {
                type: StopSchema,
                required: [true, 'Arrival stop of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Arrival date of the rail is required']
            }
        },
        stops: [{
            stop: {
                type: StopSchema,
                required: [true, 'Stop of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Stop date of the rail is required']
            }
        }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('RailRoute', RailRouteSchema);
export { RailRouteSchema };
