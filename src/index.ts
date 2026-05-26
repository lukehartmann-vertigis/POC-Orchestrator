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
    const response = await client.responses.create({
        model: config.deployment,
        temperature: 0,
        max_output_tokens: 300,
        input: [
            { role: "system", content: 'You are a helpful assistant.' },
            { role: "user", content: "Give a Test Answer" }
        ]
    });
    console.log(response?.output[0]);
}
main();