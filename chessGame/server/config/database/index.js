import mongoose from "mongoose";

const urlDataBase =
    "mongodb+srv://alien:ED2bzNhvnlOG3N5x@alien.77u7gvp.mongodb.net/";

async function connectDatabase() {
    try {
        await mongoose.connect(urlDataBase);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Connect to MongoDB failed", error);
    }
}

export default connectDatabase;
