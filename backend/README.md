# Train transport management system
`Express` backend application  

#### Build on machine with

`Node.js`: 18.15.0  
`npm`: 9.6.6


## Table of contents
1. [Instructions how to run](#instructions-how-to-run)
2. [Database](#database)
    1. [Collections](#collections)
        1. [Users](#users)
        2. [Reservations](#reservations)
3. [Backend application](#backend-application)


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
Contains __X__ collections.

#### Users
Defines users of the application, clients and staff but without checking their roles.

- Source code: [user.js](./models/user.js)
- Source code preview:  
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
```

#### Reservations
Defines all currently active reservations, grouped by `userId`.

- Source code: [reservation.js](./models/reservation.js)
- Source code preview:  
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

## Endpoints

### Account

#### Sign-up
- URL: `/signup`,
- Method: 'PUT',
- Required body: [full user schema](./models/user.js)

##### _Code_:
- [sign-up controller](./controllers/signUp.js),
- [sign-up route](./routes/signUp.js)

#### Login
- URL: `/login`,
- Method: 'POST',
- Required body: email and plain password
```json
{ "email": "", "password": "" }
```

##### _Code_:
- [login controller](./controllers/login.js),
- [login route](./routes/login.js)