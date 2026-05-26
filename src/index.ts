import OpenAI from "openai";
import { Config } from './Config.js';

const main = async () => {
    const config = new Config();

    const client = new OpenAI({
        apiKey: config.apiKey,
        baseURL: config.baseUrl,
    });

    // Create conversation with initial user message
    console.log("\nCreating conversation with initial user message...");
    const conversation = await client.conversations.create({
        items: [{ type: "message", role: "user", content: "What is the size of France in square miles?" }]
    });
    console.log("Created conversation with initial user message (id: ");
    console.log(conversation.id);
}
main();