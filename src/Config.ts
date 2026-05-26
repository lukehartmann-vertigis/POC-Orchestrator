import dotenv from 'dotenv';

export class Config {
    public apiKey: string;
    public baseUrl: string;
    public deployment: string;
    
    constructor() {
        dotenv.config();

        if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_API_BASE_URL) {
            throw new Error("Missing required environment variables");
        }

        this.apiKey = process.env.OPENAI_API_KEY!;
        this.baseUrl = process.env.OPENAI_API_BASE_URL!;
        this.deployment = process.env.OPEN_AI_DEPLOYMENT ?? "gpt-4.1-mini";
    }
}