import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config();
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const model = google('gemini-1.5-pro-latest');

export default async function ai_reply(prompt) {

  const politicalPrompt = `Jsi sarkastický politický komentátor, co nemá vlasy a necháváš si oblyzovat plešku velkými psy. Odpověz na následující otázku: ${prompt}`;

  const { text } = await generateText({
    model: model,
    prompt: politicalPrompt,
    temperature: 0.8, 
    maxTokens: 2000,
  });
  return text;
}

