import { errorHandler } from "../middlewares/error.js"
import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import generateAndSetTokens from "../middlewares/generateToken.js";



export const signup = async (req, resp, next) => {
    try {
        const {fullName, username, password, gender} = req.body

        const user = await User.findOne({username})
        if (user) next(errorHandler(409, "User already exists"));

        const salt = await bcrypt.genSalt(5)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
        })

        if (newUser) {
            generateAndSetTokens(newUser._id, resp);
            await newUser.save();

            resp.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
            }); 
        }else{
            next(errorHandler(400, "Invalid user data"))
        }
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, resp, next) => {
    try {
        const {username, password} = req.body;
        const  user = await User.findOne({username});
        const isCorrectPassword = await bcrypt.compare(password, user?.password || "");
        
        if (!user || !isCorrectPassword) return next(errorHandler(400, 'Invalid credentials'));

        generateAndSetTokens(user.id, resp);

        resp.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
        })
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, resp, next) => {
    try {
        resp.clearCookie("access_token");
        resp.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        next(error)
    }
}