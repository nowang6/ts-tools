import OpenAI from "openai";
import { ProxyAgent } from "undici";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const proxyURL = process.env.PROXY_URL;

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: apiKey,
  fetchOptions: proxyURL ? { dispatcher: new ProxyAgent(proxyURL) } : undefined
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();



