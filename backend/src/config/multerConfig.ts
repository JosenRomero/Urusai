import multer from "multer";
import { v4 as uuid } from 'uuid';
import path from 'path';

// multer wil save the audio in the uploads folder
const storage = multer.diskStorage({

  destination: 'uploads',

  filename: (req, file, callback) => {
    let fileName = uuid() + path.extname(file.originalname);
    callback(null, fileName);
  }

});

const multerConfig = multer({ 
  storage,
  limits: {
    fileSize: 50000 // 50 KB
  },
  fileFilter: (req, file, callback) => {
    
    const allowedExtensions = [".mp3", ".ogg", ".wav"]
    const ext = path.extname(file.originalname)

    if (!allowedExtensions.includes(ext)) {
      return callback(new Error("Only MP3, WAV or OGG files are allowed"))
    }

    callback(null, true);
    
  },
});

export default multerConfig;