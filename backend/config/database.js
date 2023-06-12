import mongoose from 'mongoose';
import chalk from 'chalk';

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(chalk.green.bold('[Success]') + ` Connected to MongoDB Atlas`);
    }
    catch (error) {
        console.log(chalk.red.bold('[Error]') + ` ${error}`);
        process.exit(1);
    }
};

export { connect };