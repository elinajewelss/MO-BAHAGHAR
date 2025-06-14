
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GroundingMetadata } from '../types'; // Assuming types.ts is in the parent directory

// Ensure API_KEY is accessed correctly as per prompt.
// The index.tsx ensures process.env.API_KEY is available.
const API_KEY = process.env.API_KEY || "";

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const textModel = 'gemini-2.5-flash-preview-04-17';

interface BioPromptData {
  name?: string;
  age?: string;
  occupation?: string;
  hobbies?: string;
  partnerExpectations?: string;
  gender?: string;
  religion?: string;
  city?: string;
}

export const generateBioSuggestion = async (data: BioPromptData): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject(new Error("Gemini API Key not configured. Cannot generate bio."));
  }
  
  let prompt = `Generate a warm, engaging, and positive matrimonial profile bio of about 100-150 words. The bio should sound natural and appealing.`;
  prompt += `\n\nKey details to incorporate if available:`;
  if (data.name) prompt += `\n- Name: ${data.name} (Mention it subtly if at all, focus on characteristics)`;
  if (data.age) prompt += `\n- Age: ${data.age}`;
  if (data.gender) prompt += `\n- Gender: ${data.gender}`;
  if (data.occupation) prompt += `\n- Occupation: ${data.occupation}`;
  if (data.city) prompt += `\n- Location: Based in ${data.city}`;
  if (data.religion) prompt += `\n- Values: May mention connection to values from ${data.religion} background if relevant, but keep it broad and inclusive.`;
  if (data.hobbies) prompt += `\n- Enjoys: ${data.hobbies}`;
  prompt += `\n\nFocus on personality, values, and what they might be looking for in a partner (e.g., "looking for a meaningful connection built on respect and understanding").`;
  if (data.partnerExpectations) {
    prompt += `\n- Specifically looking for someone who is: ${data.partnerExpectations}.`;
  }
  prompt += `\n\nMake it sound authentic and inviting. Avoid clichés if possible. Write in the first person.`;


  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: textModel,
        contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating bio with Gemini:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Invalid Gemini API Key. Please check your configuration.");
    }
    throw new Error("Failed to generate bio suggestion. The AI service might be temporarily unavailable.");
  }
};

// Example of a function that might use grounding (not used in current app flow but demonstrates capability)
export const getRecentMatrimonialTrends = async (): Promise<{ text: string; sources?: GroundingMetadata }> => {
  if (!API_KEY) {
    return Promise.reject(new Error("Gemini API Key not configured."));
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: textModel,
      contents: "What are some recent trends in online matrimonial services in India for 2024? Focus on user expectations and popular features.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata as GroundingMetadata | undefined;

    return {
      text: response.text.trim(),
      sources: groundingMetadata
    };
  } catch (error) {
    console.error("Error fetching trends with Gemini and Google Search:", error);
    throw new Error("Failed to fetch matrimonial trends.");
  }
};
