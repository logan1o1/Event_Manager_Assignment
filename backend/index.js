import express from 'express';
import http from 'http';
import  dotenv  from 'dotenv';
import cookieParser from "cookie-parser";
import connectToDb from "./db/connectToDb.js";
import authRouter from "./routes/auth.route.js";
import setupSocket from './socket/socket.js';
import eventRouter from './routes/event.route.js';
import path from 'path';

const __dirname = path.resolve();

dotenv.config();
const PORT = process.env.PORT || 8000

const app = express();
const server = http.createServer(app);
const io = setupSocket(server)
app.set('io', io);

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

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToDb();
    console.log("server is running on port: ", PORT);
})