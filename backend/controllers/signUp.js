import bcrypt from 'bcrypt';
import User from "../models/user.js";

const signUp = async (req, res) => {
    const body = req.body;
    if (!body.firstName) {
        res.status(400);
        throw new Error('First name of the user is undefined');
    }
    if (!body.lastName) {
        res.status(400);
        throw new Error('Last name of the user is undefined');
    }
    if (!body.email) {
        res.status(400);
        throw new Error('Email of the user is undefined');
    }
    if (!body.password) {
        res.status(400);
        throw new Error('Password of the user is undefined');
    }
    if (!body.address) {
        res.status(400);
        throw new Error('Address of the user is undefined');
    }
    if (!body.address.street) {
        res.status(400);
        throw new Error('Street of the user is undefined');
    }
    if (!body.address.street.name) {
        res.status(400);
        throw new Error('Street name of the user is undefined');
    }
    if (!body.address.street.houseNumber) {
        res.status(400);
        throw new Error('House number of the user is undefined');
    }
    if (!body.address.street.apartmentNumber) {
        res.status(400);
        throw new Error('House apartment of the user is undefined');
    }
    if (!body.address.city) {
        res.status(400);
        throw new Error('City of the user is undefined');
    }
    if (!body.address.zipCode) {
        res.status(400);
        throw new Error('Zip code of the user is undefined');
    }
    
    const hashedPassword = await bcrypt.hash(body.password, parseInt(process.env.SALT_ROUNDS));
    const newUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashedPassword,
        address: {
            street: {
                name: body.address.street.name,
                houseNumber: body.address.street.houseNumber,
                apartmentNumber: body.address.street.apartmentNumber
            },
            city: body.address.city,
            zipCode: body.address.zipCode
        }
    });

    console.log(newUser);

    res.json({ userId: newUser._id.toString() });
};

export { signUp };
