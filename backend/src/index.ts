import express, { Application } from 'express'
import { clerkMiddleware } from '@clerk/express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import audiosRouter from './routes/audios.routes';
import './database/database'

const app: Application = express();

// Settings
app.set("port", process.env.PORT || 3001)

app.use(express.json());

app.use(clerkMiddleware());

// set up cors to allow us to accept requests from our client
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

// Routes
app.use("/api/audio", audiosRouter);

app.use("/uploads", express.static(path.resolve("uploads")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});