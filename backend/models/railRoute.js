import mongoose from 'mongoose';

const RailRouteSchema = mongoose.Schema({
    trainId: {
        type: ObjectId,
        required: [true, 'Train ID is required']
    },
    
}, {
    timestamps: true
});

export default mongoose.model('RailRoute', RailRouteSchema);
