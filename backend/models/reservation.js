import mongoose from 'mongoose';

const ReservationSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.ObjectId,
            required: [true, 'User ID is required']
        },
        railRouteId: {
            type: mongoose.ObjectId,
            required: [true, 'Train route ID is required']
        },
        seats: [
            {
                seatId: {
                    type: String,
                    required: [true, 'Seat ID is required']
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Reservation', ReservationSchema);
export { ReservationSchema };
