import mongoose from 'mongoose';
import { PlaceSchema } from './place';

const RailRouteSchema = mongoose.Schema(
    {
        trainId: {
            type: ObjectId,
            required: [true, 'Train ID of the rail route is required']
        },
        departure: {
            place: {
                type: PlaceSchema,
                required: [true, 'Departure place of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Departure date of the rail is required']
            }
        },
        arrival: {
            place: {
                type: PlaceSchema,
                required: [true, 'Arrival place of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Arrival date of the rail is required']
            }
        },
        stops: [{
            place: {
                type: PlaceSchema,
                required: [true, 'Stop place of the rail route is required']
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
