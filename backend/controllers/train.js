import chalk from 'chalk';
import Train from '../models/train.js';

const createTrain = async (req, res) => {
  try {
    const body = req.body;

    // Validate the required fields
    if (!body.name) {
      throw new Error('Name is undefined');
    }
    if (!body.types) {
      throw new Error('Type map is undefined');
    }
    if (!body.manufacturerInfo || !body.manufacturerInfo.manufacturer || !body.manufacturerInfo.model) {
      throw new Error('Manufacturer information is incomplete');
    }
    if (!body.obtainedAtYear) {
      throw new Error('Obtained at year is undefined');
    }
    if (!body.seats) {
      throw new Error('Seats map is undefined');
    }

    // Create a new train object
    const newTrain = await Train.create({
      name: body.name,
      types: body.types,
      manufacturerInfo: {
        manufacturer: body.manufacturerInfo.manufacturer,
        model: body.manufacturerInfo.model,
        createdAtYear: body.manufacturerInfo.createdAtYear || new Date().getFullYear(),
      },
      obtainedAtYear: body.obtainedAtYear,
      inspections: body.inspections || [],
      seats: body.seats,
    });

    // // Save the new train to the database
    // const savedTrain = await newTrain.create();

    console.log(chalk.cyan.bold('[Create Train]') + ' New train inserted:', newTrain);

    res.json({ trainId: newTrain._id.toString() });
  } catch (error) {
    console.log(chalk.red.bold('[Create Train] Error:'), error);
    res.status(400).json({ error: error.message });
  }
};

const getTrainById = async (req, res) => {
    try {
      const trainId = req.params.id;
  
      // Find the train by ID
      const train = await Train.findById(trainId);
  
      if (!train) {
        throw new Error(`Train with ID ${trainId} not found`);
      }
  
      console.log(chalk.cyan.bold('[Get Train by ID]') + ` Train found: ${train.name}`);
  
      res.json(train);
    } catch (error) {
      console.log(chalk.red.bold('[Get Train by ID] Error:'), error);
      res.status(400).json({ error: error.message });
    }
  };


  const getTrainSeats = async (req, res) => {
    try {
      const trainId = req.params.id;
      const listOfSeatTypes = req.params.listOfSeatTypes.split(',');
      
  
      // Find the train by ID
      const train = await Train.findById(trainId);
  
      if (!train) {
        throw new Error(`Train with ID ${trainId} not found`);
      }
  
      // Filter the seats based on the provided seat types
      const filteredSeats = [];
      // Iterate through each seat in the train
      for (const seat of train.seats.values()) {
        for (const seatType of listOfSeatTypes) {
          if (seat.types.get(seatType)) {
            filteredSeats.push(seat);
            break;
          }
        }
      }
  
      console.log(chalk.cyan.bold('[Get Train Seats]') + ` Seats found for train: ${train.name}`);
  
      res.json(filteredSeats);
    } catch (error) {
      console.log(chalk.red.bold('[Get Train Seats] Error:'), error);
      res.status(400).json({ error: error.message });
    }
};


export { createTrain, getTrainById, getTrainSeats };