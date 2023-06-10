import mongoose from 'mongoose';
import { PlaceSchema } from './place.js';

const StopSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of the stop is required'],
        minLength: [2, 'Name of the stop is too short'],
        maxLength: [48, 'Name of the stop is too long'],
        trim: true
    },
    placeId: {
        type: mongoose.ObjectId,
        required: [true, 'Place id of the stop is required']
    }
});

export default mongoose.model('Stop', StopSchema);
export { StopSchema };
