import mongoose from 'mongoose';

const {
    MONGO_URI,
} = process.env;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
}

export const connectToMongo = async () => {
    return mongoose.connect(MONGO_URI);
}
