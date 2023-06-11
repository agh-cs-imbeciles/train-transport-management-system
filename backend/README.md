# Train transport management system

`Express` backend application

`Express` backend application  

#### Build on machine with

`Node.js`: 18.15.0  



`npm`: 9.6.6


## Table of contents
1. [Instructions how to run](#instructions-how-to-run)
2. [Database](#database)
    1. [Collections](#collections)
        1. [Users](#users-collections)
        2. [Places](#places-collection)
        3. [Stops](#stops-collection)
        4. [Reservations](#reservations-collection)
3. [Backend application](#backend-application)
    1. [API endpoints](#api-endpoints)
        1. [Account](#account)
            1. [Sign-up](#sign-up)
            2. [Login](#login)
        2. [Places](#places)
            - [Insert a new place](#insert-a-new-place)
            - [Get a place by its ID](#get-a-place-by-its-id)
            - [Get all places](#get-all-places)
            - [Get a place by its name](#get-a-place-by-its-name)
            - [Get all places by their province name](#get-all-places-by-their-province-name)
        3. [Stops](#stops)
            - [Insert a new stop](#insert-a-new-stop)
            - [Get a stop by its ID](#get-a-stop-by-its-id)
            - [Get all stops](#get-all-stops)
            - [Get a stop by its name](#get-a-stop-by-its-name)
            - [Get all stops by their place](#get-all-stops-by-their-place)



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

#### Users collection
Defines users of the application, clients and staff but without checking their roles.

- Source code: [user.js](./models/user.js)
- Source code preview:  
`UserSchema`
```js
{
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
}
```

#### Places collection
Defines places - cities, towns and villages.

- Source code: [place.js](./models/place.js)
- Source code preview:  
`PlaceSchema`
```js
{
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
}
```

#### Stops collection
Defines stops, contains `placeId`, so that it's combined with `Place` collection.

- Source code: [stops.js](./models/stops.js)
- Source code preview:  
`StopSchema`
```js
{
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
}
```

#### Reservations collections
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
}
```

## Backend application

## API Endpoints

### Account
#### Sign-up
- URL: `/signup`,
- Method: `PUT`,
- Required body: [full user schema](#users)

##### _Source code_:
- [sign-up controller](./controllers/signUp.js),
- [sign-up route](./routes/signUp.js)

#### Login
- URL: `/login`,
- Method: `POST`,
- Required body:  
    `string email` - email  
    `string password` - plain password
```json
{ "email": "", "password": "" }
```

##### _Source code_:
- [login controller](./controllers/login.js),
- [login route](./routes/login.js)


### Places

Source code
- [places controller](./controllers/places.js),
- [places route](./routes/places.js)

#### Insert a new place
- URL: `/places`,
- Method: `PUT`,
- Required body: [full place schema](#places-collection)

#### Get a place by its ID
- URL: `/places/id/:id`,
- Method: `GET`,
- Required body: none
- Returns: `PlaceSchema`  
`string :id` - 24-character id of place

#### Get all places
- URL: `/places/all`,
- Method: `GET`,
- Required body: none
- Returns: `[PlaceSchema]`  

#### Get a place by its name
- URL: `/places/name/:name`,
- Method: `GET`,
- Required body: none
- Returns: `PlaceSchema` (best matched)  
`string :name` - name of place

#### Get all places by their province name
- URL: `/places/province/:name`,
- Method: `GET`,
- Required body: none
- Returns: `[PlaceSchema]`  
`string :name` - name of province


### Stops

Source code
- [stops controller](./controllers/stops.js),
- [stops route](./routes/stops.js)

#### Insert a new stop
- URL: `/rail/stops`,
- Method: `PUT`,
- Required body: [full stop schema](#stops-collection)

#### Get a stop by its ID
- URL: `/rail/stops/id/:id`,
- Method: `GET`,
- Required body: none
- Returns: `StopSchema`  
`string :id` - 24-character id of stop

#### Get all stops
- URL: `/rail/stops/all`,
- Method: `GET`,
- Required body: none
- Returns: `[StopSchema]`  

#### Get a stop by its name
- URL: `/rail/stop/name/:name`,
- Method: `GET`,
- Required body: none
- Returns: `StopSchema` (best matched)  
`string :name` - name of stop

#### Get all stops by their place
- URL: `/rail/stops/place`,
- Method: `GET`,
- Required body: place and/or province names  
    `string placeName` - name of the place, through which a filter be applied  
    `string provinceName` - name of the province, through which a filter be applied  
- Returns: `[StopSchema]`

_Example request_:
```
/rail/stops/place?placeName=Mszana&provinceName=polskie
```
