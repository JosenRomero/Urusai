import express, { Application } from 'express'

const app: Application = express();

// Settings
app.set("port", process.env.PORT || 3001)

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});