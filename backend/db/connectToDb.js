import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conected to mongodb");
    } catch (error) {
        console.log("failed to connect to db: ", error.message);
    }
}

export default connectToDb;