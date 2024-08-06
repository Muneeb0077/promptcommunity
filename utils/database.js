import mongoose from "mongoose";

let isConnected= false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("Using existing connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        isConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
};