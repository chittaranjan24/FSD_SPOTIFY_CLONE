import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export async function registerUser(req, res) {
    try {
        const { email, password, fullName: { firstName, lastName }} = req.body;

        const isUserAlreadyRegistered = await userModel.findOne({ email });

        if (isUserAlreadyRegistered) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            password: hashedPassword,
            fullName: {
                firstName,
                lastName
            }
        });

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, config.JWT_SECRET, { expiresIn: '2d' });

        res.cookie("token", token);

        return res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            } 
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}