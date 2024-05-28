import mongoose from "mongoose";

const databaseCon = async () => {
    try {
        mongoose.set("strictQuery", false);
        const connected = await mongoose.connect(process.env.CONN);
        console.log(`Database connected ${(await connected).connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default databaseCon;