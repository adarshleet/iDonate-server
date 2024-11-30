import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const dbUri = process.env.DATABASE_URI;
        await mongoose.connect(dbUri);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default dbConnect
