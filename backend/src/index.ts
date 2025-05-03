import express, { Application } from 'express'
import dotenv from 'dotenv';

dotenv.config();

import './database/database'

const app: Application = express();

// Settings
app.set("port", process.env.PORT || 3001)

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});