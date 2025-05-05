import express, { Application } from 'express'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import audiosRouter from './routes/audios.routes';
import './database/database'

const app: Application = express();

// Settings
app.set("port", process.env.PORT || 3001)

app.use(express.json());

// Routes
app.use("/api/audio", audiosRouter);

app.use("/uploads", express.static(path.resolve("uploads")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});