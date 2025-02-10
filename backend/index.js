import express from 'express';
import http from 'http';
import  dotenv  from 'dotenv';
import cookieParser from "cookie-parser";
import connectToDb from "./db/connectToDb.js";
import authRouter from "./routes/auth.route.js";
import setupSocket from './socket/socket.js';
import eventRouter from './routes/event.route.js';


dotenv.config();
const PORT = process.env.PORT || 8000

const app = express();
const server = http.createServer(app);
setupSocket(server)

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/events', eventRouter)

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