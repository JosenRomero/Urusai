import { connect, mongo } from "mongoose";

const URI: string = process.env.URI_DB!;

export let bucket: mongo.GridFSBucket;

export const connection = ( async () => {
  try {

    const conn = await connect(URI);

    let db = conn.connections[0].db

    if (!db) {
      throw "error: connections";
    }

    bucket = new mongo.GridFSBucket(db, {
      bucketName: "Audios"
    });

    console.log("DB is connected");

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
})();