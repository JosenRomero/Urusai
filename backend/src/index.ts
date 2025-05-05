import express, { Application } from 'express'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import './database/database'

const app: Application = express();

// Settings
app.set("port", process.env.PORT || 3001)

app.use("/uploads", express.static(path.resolve("uploads")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});