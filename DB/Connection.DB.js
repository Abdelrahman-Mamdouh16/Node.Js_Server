import mongoose from "mongoose";
import colors from "colors";

// const connectionDB = async () => {
//   try {
//     await mongoose
//       .connect("mongodb://127.0.0.1:27017/OnlineDoc")
//       .then(() => console.log("MongoDB server is Connected!".bgGreen.white));
//   } catch (error) {
//     console.log(`Mongoose connection error: ${error}`.bgRed.white);
//   }
// };

// export default connectionDB;


import { MongoClient, ServerApiVersion } from'mongodb';
const uri = "mongodb+srv://AbdelrahmanMamdouh:QHHQz2i5YTXFj7CU@abdelrahmanmamdouh.pao3pnm.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

 const connectionDB = async () => {
    try {
      await mongoose
        .connect(uri)
        .then(() => console.log("MongoDB server is Connected!".bgGreen.white));
    } catch (error) {
      console.log(`Mongoose connection error: ${error.message}`.bgRed.white);
    }
  };
export default connectionDB;
