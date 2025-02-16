import express from "express";
import { logout, signin, signup } from "../controllers/auth.controller.js";


const authRouter = express.Router();

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.get('/logout', logout)


export default authRouter;