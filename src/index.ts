import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { getTestCases } from "./TestCases.js";
import { Config } from "./Config.js";
import { LoginPrompt } from "./prompts/login.js";
import { TestCasePrompt } from "./prompts/test-case.js";


export const main = async () => {

    const config = new Config();
    const tests = getTestCases();

    if (!tests[0]) throw new Error("No test cases found");

    console.log(config)


    // Create AI Project client
    const projectClient = new AIProjectClient(config.baseUrl, new DefaultAzureCredential());
    
    // Use the agent to create a conversation and generate a response
    const openAIClient = projectClient.getOpenAIClient();
    console.log("Fetching Tests...");

    // Create conversation with initial user message
    console.log("\nCreating conversation with initial user message...");
    const conversation = await openAIClient.conversations.create({
        items: [
            {
                role: "user",
                content: LoginPrompt(
                    "https://dev002-networks.apps.vertigisstudio.com/web/?buildversion=1.18.0.451-pr43860-pgs&app=26ee22c6c5cb46298a19227632507d1c",
                    config.appUserName,
                    config.appUserPassword
                )
            },
            {
                role: "user",
                content: TestCasePrompt(tests[0])
            }
        ]
    });

    console.log("Created conversation with initial user message (id: ");
    console.log(conversation.id);

    // Generate response using the agent
    console.log("\nGenerating response...");
    let response;
    try {
        response = await openAIClient.responses.create(
            {
                conversation: conversation.id,
            },
            {
                body: {
                    agent_reference: {
                        name: config.agentName,
                        version: config.agentVersion,
                        type: "agent_reference"
                    }
                },
            },
        );
    } catch (err: any) {
        const toolError = err?.error?.message ?? err?.message ?? String(err);
        console.error("\n[AGENT ERROR]", toolError);
        process.exit(1);
    }
    console.log("Response output: ");
    console.log(response.output_text);
}

main();