import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeLogo(imageUrl: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: "Analyze this logo and provide a color palette in HEX format. Also, identify the main text in the logo and suggest a theme name based on it. Return the result as JSON." },
          { inlineData: { mimeType: "image/png", data: imageUrl.split(',')[1] } }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json"
    }
  });
  return JSON.parse(response.text);
}
