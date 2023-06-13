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
        4. [Trains](#trains-collection)
        5. [Rail routes]()
        6. [Reservations](#reservations-collection)
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
        4. [Trains](#trains)
            - [Insert a new train](#insert-a-new-train)
            - [Get a train by its ID](#get-a-train-by-its-id)
            - [Get a list of selected types seats from selected train](#get-a-seats-by-its-type)
        5. [Rail routes](#rail-routes)
            - [Insert a new rail route](#insert-a-new-rail-stop)
            - [Get a rail route by its ID](#get-a-rail-route-by-its-id)
            - [Get all rail routes by departure or arrival date](#get-all-rail-routes-by-departure-or-arrival-date)
            - []()
            - []()
        6. [Reservations](#reservations)
            - [Insert a new Reservation](#insert-a-new-train)
            - [Get a reservation by its ID](#get-a-train-by-its-id)



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

- Source code: [stops.js](./models/stop.js)
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

#### Trains collection
Defines all currently active trains and their seats.

- Source code: [train.js](./models/train.js)
- Source code preview:  
    `TrainSchema`
    ```js
    {
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
    }
    ```

    `TrainSeatSchema`
    ```js
    {
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
    }
    ```

#### Rail routes collection
Defines all currently on- or furthergoing rail routes.

- Source code: [railRoute.js](./models/railRoute.js)
- Source code preview:  
    `RailRouteSchema`
    ```js
    {
        trainId: {
            type: mongoose.ObjectId,
            required: [true, 'Train ID of the rail route is required']
        },
        ticketsCost: {
            type: Map,
            of: Number,
            required: [true, 'Tickets cost map of the rail route is required']
        },
        departure: {
            stopId: {
                type: mongoose.ObjectId,
                required: [true, 'Departure stop ID of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Departure stop of the rail is required']
            }
        },
        arrival: {
            stopId: {
                type: mongoose.ObjectId,
                required: [true, 'Arrival stop ID of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Arrival date of the rail is required']
            }
        },
        stops: [{
            stopId: {
                type: mongoose.ObjectId,
                required: [true, 'Stop ID of the rail route is required']
            },
            date: {
                type: Date,
                required: [true, 'Stop date of the rail is required']
            }
        }]
    },
    {
        timestamps: true
    }
    ```

    ##### Example of the extended `RailRouteSchema`:
    ```json
    {
        "_id": "6487e6faecffa599c1d815ce",
        "trainId": "6485f91a69d92892eb4b0965",
        "ticketsCost": {
            "firstClass": 400,
            "standard": 20
        },
        "departure": {
            "stopId": "6485e52712372c03b8747898",
            "date": "2023-06-17T08:30:00.000Z",
        "stop": [
            {
                "_id": "6485e52712372c03b8747898",
                "name": "Zakopane",
                "place": {
                    "_id": "6485063716691550652486e6",
                    "name": "Zakopane"
                }
            }
        ]
        },
        "arrival": {
            "stopId": "6485e34012372c03b874786e",
            "date": "2023-06-17T10:04:00.000Z",
            "stop": [
                {
                    "_id": "6485e34012372c03b874786e",
                    "name": "Kraków Główny",
                    "place": {
                        "_id": "648503a7221f629a17f924b8",
                        "name": "Kraków"
                    }
                }
            ]
        },
        "stops": {
        "stop": [
            {
                "_id": "6485e37512372c03b8747876",
                "name": "Kraków Łagiewniki",
                "place": {
                    "_id": "648503a7221f629a17f924b8",
                    "name": "Kraków"
                }
            },
            {
                "_id": "6485e41012372c03b8747882",
                "name": "Radziszów",
                "place": {
                    "_id": "648504db16691550652486ae",
                    "name": "Radziszów"
                }
            },
            {
                "_id": "6485e4d112372c03b874788e",
                "name": "Skawa Środkowa",
                "place": {
                    "_id": "6485058816691550652486ce",
                    "name": "Skawa"
                }
            },
            {
                "_id": "6485e51012372c03b8747894",
                "name": "Nowy Targ",
                "place": {
                    "_id": "648505f316691550652486de",
                    "name": "Nowy Targ"
                }
            }
        ]
        },
        "createdAt": "2023-06-13T03:48:10.171Z",
        "updatedAt": "2023-06-13T03:48:10.171Z"
  }
  ```

#### Reservations collection
Defines all currently active reservations, grouped by `userId`.

- Source code: [reservation.js](./models/reservation.js)
- Source code preview:  
    `ReservationSchema`
    ```js
    {
        userId: {
            type: mongoose.ObjectId,
            required: [true, 'User ID is required']
        },
        railRouteId: {
            type: mongoose.ObjectId,
            required: [true, 'Train route ID is required']
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


### Rail routes

Source code
- [rail routes controller](./controllers/railRoutes.js),
- [rail routes route](./routes/railRoutes.js)

#### Insert a new rail stop
- URL: `/rail/routes`,
- Method: `PUT`,
- Required body: [full rail route schema](#rail-routes)  
    _Example body_:
    ```json
    {
        "trainId": "6485f91a69d92892eb4b0965",
        "ticketsCost": {
            "firstClass": 250,
            "standard": 150
        },
        "departure": {
            "stopId": "648508346ebe5f779de65375",
            "date": "2023-06-13T03:33+02:00"
        },
        "arrival": {
            "stopId": "6485e34012372c03b874786e",
            "date": "2023-06-13T04:45+02:00"
        },
        "stops": [
            {
                "stopId": "6485e4fc12372c03b8747892",
                "date": "2023-06-13T03:52+02:00"
            },
            {
                "stopId": "6485e49f12372c03b8747888",
                "date": "2023-06-13T04:02+02:00"
            },
            {
                "stopId": "6485e37512372c03b8747876",
                "date": "2023-06-13T04:36+02:00"
            }
        ]
    }
    ```

#### Get a rail routes by its ID
- URL: `/rail/routes/id/:id`,
- Method: `GET`,
- Required body: none
- Returns: `RailRouteSchema`  
`string :id` - 24-character id of stop

#### Get all rail routes by departure or arrival date
- URL: `/rail/stops/all`,
- Method: `GET`,
- Required body:
- Returns: [extended `[RailRouteSchema]`](#example-of-the-extended-railrouteschema)  


### Trains

Source code
- [trains controller](./controllers/train.js),
- [trains route](./routes/trains.js)

#### Insert a new train
- URL: `/trains`,
- Method: `POST`,
- Required body: [full trains schema](#trains-collection)

#### Get a train by its ID
- URL: `/trains/:id`,
- Method: `GET`,
- Required body: none
- Returns: `TrainSchema`  

#### Get a seats by its type
- URL: `/trains/:id/seats/:listOfSeatTypes`, seperated by `,`,
- Method: `GET`,
- Required body: none
- Returns: List of `TrainSeatSchema`  


### Reservations

Source code
- [reservations controller](./controllers/reservation.js),
- [reservation route](./routes/reservation.js)

#### Insert a new reservation
- URL: `/reservation`,
- Method: `POST`,
- Required body: [full reservation schema](#reservations-collection)

#### Get a reservation by its ID
- URL: `/reservation/:id`,
- Method: `GET`,
- Required body:
    ```json
    {
    "departureDate": "2023-06-13T04:00+02:00",
    "arrivalDate": "2023-06-20T04:00+02:00"
    }
    ```
- Returns: `ReservationSchema`  
