import { connect } from "mongoose";

const URI: string = process.env.URI_DB!;

export const connection = ( async () => {
  try {
    await connect(URI);
    console.log("DB is connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
})();