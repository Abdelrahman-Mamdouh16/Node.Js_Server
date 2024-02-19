import mongoose from "mongoose";

const topSpecialtiesSchema = mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },

    img: { type: String, required: [true, "img is required"] },

})
const topSpecialties = mongoose.model("topSpecialtie", topSpecialtiesSchema)
export default topSpecialties;