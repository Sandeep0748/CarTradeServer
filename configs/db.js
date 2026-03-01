import mongoose from "mongoose";

// for database connection *
const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    await mongoose.connect(`${process.env.MONGO_URI}car-rental`);
  } catch (error) {
    console.log(error.message)
  }
};

export default connectDB;
