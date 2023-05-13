const mongoose = require('mongoose');

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
            type: String,
            required: [true, 'Street is required'],
            minLength: [2, 'Street is too short'],
            maxLength: [64, 'Street is too long'],
            trim: true
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