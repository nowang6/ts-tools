import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { ProxyAgent } from "undici";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const proxyURL = process.env.PROXY_URL;

const provider = createOpenAICompatible({
  name: "provider-name",
  baseURL: "https://api.deepseek.com",
  apiKey: apiKey,
  includeUsage: true, // Include usage information in streaming responses
  fetch: proxyURL
    ? (input, init) =>
        fetch(input, { ...init, dispatcher: new ProxyAgent(proxyURL) })
    : undefined,
});

const model = provider("deepseek-chat");

import { streamText } from "ai";

async function chat() {
  const { textStream } = streamText({
    model: model,
    messages: [{ role: "user", content: "Hello, local model!" }],
    temperature: 0.7,
    maxOutputTokens: 512,
  });

  for await (const delta of textStream) {
    process.stdout.write(delta);
  }
}

chat();
