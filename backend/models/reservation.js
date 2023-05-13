const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: [true, 'User ID is required']
        },
        trainRideId: {
            type: ObjectId,
            required: [true, 'Train ride ID is required']
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

module.exports = mongoose.model('Reservation', reservationSchema);
