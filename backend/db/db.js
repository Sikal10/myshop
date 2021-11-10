import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected".yellow.bold);
        return;
    }

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDB connected ${connection.connection.host}`.underline.blue.bold);
    } catch (err) {
        console.log(`Error: ${err.message}`.red.bold.underline);
        process.exit(1);
    }
}

export default connectDB;