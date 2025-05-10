import {
  GoogleGenAI,
  ContentListUnion
} from "@google/genai";
import systemPrompt from "../utils/systemPrompt";
import { getAudioBase64 } from "../utils/utils";

export const analyzeAudio = async (audioPath: string, language: string, targetLanguage: string, mimeType: string, apiKey: string) => {
  try {

    const ai = new GoogleGenAI({ apiKey });

    const audio = getAudioBase64(audioPath);

    const contents: ContentListUnion = [
      { text: systemPrompt(language, targetLanguage) },
      {
        inlineData: {
          mimeType,
          data: audio
        }
      }
    ]
  
    const { text } = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents
    })

    if (!text) {
      throw { message: "error analyze audio", status: 500 }
    }

    return text;
    
  } catch (error) {
    throw error
  }
}
