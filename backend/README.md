# Train transport management system
<<<<<<< HEAD
<<<<<<< HEAD
`Express` backend application
=======
=======
>>>>>>> 179ff70a4007d54e5911a2ecf17af48693b3d3f3
`Express` backend application  

#### Build on machine with

`Node.js`: 18.15.0  
<<<<<<< HEAD
`npm`: 9.6.6  

>>>>>>> local
=======
`npm`: 9.6.6


## Table of contents
1. [Instructions how to run](#instructions-how-to-run)
2. [Database](#database)
    1. [Collections](#collections)
        1. [Users](#users)
        2. [Reservations](#reservations)
3. [Backend application](#backend-application)

>>>>>>> 179ff70a4007d54e5911a2ecf17af48693b3d3f3

## Instructions how to run
1. Clone the repository
    ```
    git@github.com:agh-cs-imbeciles/train-transport-management-system.git
    ```
2. Go the _backend_ directory
    ```
    cd backend
    ```
3. Install node packages
    ```
    npm install
    npm install --save-dev
    ```
4. Run development server
    ```
    npm run dev
    ```


## Database
The database is document-oriented, runned on `MongoDB`, more precisely [MongoDB Atlas](https://www.mongodb.com/atlas/database).

### Collections
Contains X collections.

#### Users
Defines users of the application, clients and staff but without checking their roles.

`UserSchema`
```js
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
```

#### Reservations
Defines all currently active reservations, grouped by `userId`.

`ReservationSchema`
```js
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
```

## Backend application
