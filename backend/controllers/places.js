import Place from '../models/place.js';

const insertPlace = async (req, res) => {
    const body = req.body;

    const newPlace = await Place.create({
        name: body.name,
        province: body.name
    });
    console.log(newPlace);

    res.json({ placeId: newPlace._id.toString() });
};

export { insertPlace };
