import { app, server } from "./socket/socket.js";
import express from 'express';
import  dotenv  from 'dotenv';
import cookieParser from "cookie-parser";
import connectToDb from "./db/connectToDb.js";


dotenv.config();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cookieParser());



app.use((err, req, resp, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return resp.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

server.listen(PORT, () => {
    connectToDb();
    console.log("server is running on port: ", PORT);
})