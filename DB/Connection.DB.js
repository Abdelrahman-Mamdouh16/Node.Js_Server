import mongoose from "mongoose";
import colors from "colors";

const connectionDB = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/OnlineDoc")
      .then(() => console.log("MongoDB server is Connected!".bgGreen.white));
  } catch (error) {
    console.log(`Mongoose connection error: ${error}`.bgRed.white);
  }
};

export default connectionDB;
