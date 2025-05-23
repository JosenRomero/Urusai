import express, { Application } from 'express'
import { clerkMiddleware } from '@clerk/express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import notFound from './middlewares/notFound';
import handleErrors from './middlewares/handleErrors';

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
app.use("/", audiosRouter);

app.use("/uploads", express.static(path.resolve("uploads")));

app.use(notFound);
app.use(handleErrors);

export default app