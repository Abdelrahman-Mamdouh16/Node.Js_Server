import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  description: { type: String, required: [true, "description is required"] },
  rate: { type: String, required: [true, "rate is required"] },
  specialization: { type: String, required: [true, "specialization is required"] },
  address: { type: String, required: [true, "address is required"] },
  city: { type: String, required: [true, "city is required"] },
  area: { type: String, required: [true, "city is required"] },
  cost: { type: String, required: [true, "cost is required"] },
  timeStart: { type: String, required: [true, "timeStart is required"] },
  timeEnd: { type: String, required: [true, "timeEnd is required"] },
}, {
  timestamps: true,
});
const doctor = mongoose.model("Doctor",doctorSchema)
export default doctor;
