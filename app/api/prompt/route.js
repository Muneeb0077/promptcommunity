import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (req) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate('creator'); 
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch prompts due to some error", { status: 500 });
    }
}
