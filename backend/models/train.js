import mongoose from 'mongoose';

const TrainSeatSchema = mongoose.Schema({
    seatId: {
        type: String,
        required: [true, 'Seat ID is required'],
        minLength: [1, 'Seat ID is too short'],
        maxLength: [16, 'Seat ID is too long'],
        trim: true
    },
    types: {
        type: Map,
        of: Number
    },
    position: {
        row: {
            type: Number,
            required: [true, 'Seat row is required'],
            min: [1, 'Seat row is too low'],
            max: [512, 'Seat row is too high']
        },
        column: {
            type: Number,
            required: [true, 'Seat column is required'],
            min: [1, 'Seat column is too low'],
            max: [32, 'Seat column is too high']
        }
    }
});

const TrainSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [1, 'Name is too short'],
        maxLength: [48, 'Name is too long'],
        trim: true
    },
    types: {
        type: Map,
        required: [true, 'Type map is required'],
        of: Number
    },
    manufacturerInfo: {
        manufacturer: {
            type: String,
            required: [true, 'Manufacturer name is required'],
            minLength: [1, 'Manufacturer name is too short'],
            maxLength: [48, 'Manufacturer name is too long'],
            trim: true
        },
        model: {
            type: String,
            required: [true, 'Model is required'],
            minLength: [1, 'Model is too short'],
            maxLength: [32, 'Model is too long'],
            trim: true
        },
        createdAtYear: {
            type: Number,
            min: [1804, 'Created at year is lower than 1804'],
            max: [new Date().getFullYear(), 'Created at year is greater than current year']
        }
    },
    obtainedAtYear: {
        type: Number,
        required: [true, 'Obtained at year is required'],
        min: [2023, 'Obtained at year is lower than 2023'],
        max: [new Date().getFullYear(), 'Obtained at year is greater than current year']
    },
    inspections: [
        {
            year: {
                type: Number,
                required: [true, 'Inspection year is required'],
                min: [1804, 'Inspection year is lower than 1804'],
                max: [new Date().getFullYear(), 'Inspection year is greater than current year']
            }
        }
    ],
    seats: {
        type: Map,
        of: TrainSeatSchema,
        required: [true, 'Seats map is required']
    }
});

export default mongoose.Model('Train', TrainSchema);
export { TrainSeatSchema };
