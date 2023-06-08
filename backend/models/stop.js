import mongoose from 'mongoose';
import { PlaceSchema } from './place';

const StopSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of the stop is required'],
        minLength: [2, 'Name of the stop is too short'],
        maxLength: [48, 'Name of the stop is too long'],
        trim: true
    },
    place: {
        type: PlaceSchema,
        required: [true, 'Place of the stop is required']
    }
});

export default mongoose.model('Stop', StopSchema);
export { StopSchema };
