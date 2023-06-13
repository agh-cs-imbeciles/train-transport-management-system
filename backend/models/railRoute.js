import * as mongoose from 'mongoose';

const RailRouteSchema = mongoose.Schema(
    {
        trainId: {
            type: mongoose.ObjectId,
            required: [true, 'Train ID of the rail route is required']
        },
        ticketsCost: {
            type: Map,
            of: Number,
            required: [true, 'Tickets cost map of the rail route is required']
        },
        departure: {
            stopId: {
                type: mongoose.ObjectId,
                required: [true, 'Departure stop ID of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Departure stop of the rail is required']
            }
        },
        arrival: {
            stopId: {
                type: mongoose.ObjectId,
                required: [true, 'Arrival stop ID of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Arrival date of the rail is required']
            }
        },
        stops: [{
            stopId: {
                type: mongoose.ObjectId,
                required: [true, 'Stop ID of the rail route is required']
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
