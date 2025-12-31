
import { GoogleGenAI } from "@google/genai";

export const generateNewYearGreeting = async (name?: string, customPrompt?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  let prompt = '';
  
  if (customPrompt) {
    prompt = customPrompt;
  } else {
    prompt = name 
      ? `Tuliskan ucapan selamat tahun baru yang sangat menyentuh hati, inspiratif, dan penuh harapan untuk seseorang bernama ${name}. Gunakan bahasa Indonesia yang indah dan puitis untuk menyambut tahun 2026. Maksimal 3 kalimat.`
      : `Tuliskan ucapan selamat tahun baru yang inspiratif dan penuh semangat untuk tahun 2026 dalam bahasa Indonesia. Singkat saja, maksimal 2 kalimat.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text || "Semoga tahun 2026 membawa kebahagiaan dan kesuksesan yang tak terhingga bagi kita semua. Selamat Tahun Baru!";
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "Selamat Tahun Baru 2026! Semoga tahun ini dipenuhi dengan cinta, kedamaian, dan kemakmuran.";
  }
};
