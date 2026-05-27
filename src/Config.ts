import dotenv from 'dotenv';

export class Config {
    public apiKey: string;
    public baseUrl: string;
    public agentName: string;
    public agentVersion: string;
    public appUserName: string;
    public appUserPassword: string;
    
    constructor() {
        dotenv.config();

        if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_API_BASE_URL || !process.env.APP_USER_NAME || !process.env.APP_USER_PASSWORD) {
            throw new Error("Missing required environment variables");
        }

        this.apiKey = process.env.OPENAI_API_KEY;
        this.baseUrl = process.env.OPENAI_API_BASE_URL;
        this.agentName = process.env.AGENT_NAME ?? "qa-test-agent";
        this.agentVersion = process.env.AGENT_VERSION ?? "5";
        this.appUserName = process.env.APP_USER_NAME;
        this.appUserPassword = process.env.APP_USER_PASSWORD;
    }
}