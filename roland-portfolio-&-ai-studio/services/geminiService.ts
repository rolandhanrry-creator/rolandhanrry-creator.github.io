import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

// Initialize the API client
// The API key is guaranteed to be in process.env.API_KEY per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Generates text content based on a prompt.
 */
export const generateRefinedPrompt = async (userInput: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userInput,
      config: {
        systemInstruction: `You are Roland AI Prompt Assistant. 
        Your goal is to take a simple user idea and refine it into a highly detailed, professional, and creative prompt suitable for high-quality image generation or complex text tasks.
        Return ONLY the refined prompt text. Do not add introductory or concluding remarks.`,
        temperature: 0.7,
      },
    });
    
    return response.text || "Sorry, I couldn't generate a prompt at this time.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};

/**
 * Creates a chat session.
 */
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: `You are Roland AI Assistant, a helpful, witty, and knowledgeable virtual assistant residing on Roland's personal portfolio website.
      Your tone is professional yet friendly and slightly stylish, matching the 'Smiley Sans' aesthetic of the site.
      You can answer questions about design, coding, or just chat casually.
      Keep responses concise and helpful.`,
    },
  });
};

/**
 * Sends a message to the chat session.
 */
export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "";
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
