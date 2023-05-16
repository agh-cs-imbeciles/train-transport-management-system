import bcrypt from 'bcrypt';
import chalk from 'chalk';
import User from "../models/user.js";

const login = async (req, res) => {
    try {
        const body = req.body;

        if (!body.email) {
            throw new Error('Email is undefined');
        }
        if (!body.password) {
            throw new Error('Password is undefined');
        }
    
        const matchingUser = await User.findOne({ email: body.email });
        if (!matchingUser) {
            throw new Error(`User of email "${body.email}" doesn't exist`);
        }
        if (!await bcrypt.compare(body.password, matchingUser.password)) {
            throw new Error(`Wrong password`)
        }
    
        console.log(chalk.cyan.bold('[Login]') + ` Found user: ${matchingUser.email}`);
    
        res.json({ userId: matchingUser._id });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

export { login };
