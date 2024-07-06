import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  date: { type: String, required: [true, "date is required"] },
  hight: { type: String, required: [true, "hight is required"] },
  weight: { type: String, required: [true, "weight is required"] },
}, {
  timestamps: true,
});
const User = mongoose.model("User",userSchema)
export default User;
