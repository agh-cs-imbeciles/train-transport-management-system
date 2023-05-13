import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [2, 'First name is too short'],
        maxLength: [32, 'First name is too long'],
        match: [/^\p{Lu}\p{Ll}+$/u, 'First name must be at least 2 characters long, start with uppercase followed by lowercase'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [2, 'Last name is too short'],
        maxLength: [32, 'Last name is too long'],
        match: [/^\p{Lu}\p{Ll}+$/u, 'Last name must be at least 2 characters long, start with uppercase followed by lowercase'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [5, 'Email is too short'],
        maxLength: [128, 'Email name is too long'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is not valid'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    address: {
        street: {
            name: {
                type: String,
                required: [true, 'Street name is required'],
                minLength: [2, 'Street name is too short'],
                maxLength: [64, 'Street name is too long'],
                trim: true
            },
            houseNumber: {
                type: String,
                required: [true, 'House number is required'],
                minLength: [1, 'House number is too short'],
                maxLength: [10, 'House number is too long'],
                trim: true
            },
            apartmentNumber: {
                type: String,
                required: [true, 'Apartment number is required'],
                minLength: [1, 'Apartment number is too short'],
                maxLength: [10, 'Apartment number is too long'],
                trim: true
            }  
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            minLength: [2, 'City is too short'],
            maxLength: [32, 'City is too long'],
            trim: true
        },
        zipCode: {
            type: String,
            required: [true, 'Zip code is required'],
            minLength: [1, 'Zip code is too short'],
            maxLength: [10, 'Zip code is too long'],
            trim: true
        }
    }
});

export default mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);
