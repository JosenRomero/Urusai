import fs from "fs";

export const getAudioBase64 = (audioPath: string) => {
  return fs.readFileSync(audioPath, {
    encoding: "base64"
  });
}