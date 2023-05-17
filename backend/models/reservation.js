import mongoose from 'mongoose';

const ReservationSchema = mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: [true, 'User ID is required']
        },
        trainRouteId: {
            type: ObjectId,
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

export default mongoose.Model('Reservation', ReservationSchema);
export { ReservationSchema };
