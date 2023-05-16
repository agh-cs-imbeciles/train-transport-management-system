import mongoose from "mongoose";

const PlaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of the place is required'],
        minLength: [2, 'Name of the place is too short'],
        maxLength: [48, 'Name of the place is too long'],
        trim: true
    },
    province: {
        type: String,
        required: [true, 'Province of the place is required'],
        minLength: [2, 'Province of the place is too short'],
        maxLength: [48, 'Province of the place is too long'],
        trim: true
    }
});

export default mongoose.model('Place', PlaceSchema);
export { PlaceSchema };
