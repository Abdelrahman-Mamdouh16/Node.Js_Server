import mongoose from "mongoose";

const topOffersSchema = mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },

    oldPrice: { type: Number, required: [true, "oldPrice is required"] },

    newPrice: { type: Number, required: [true, "newPrice is required"] },

    Offers: { type: Number, required: [true, "Offers is required"] },

    img: { type: String, required: [true, "img is required"] },

})
const topOffer = mongoose.model("topOffer", topOffersSchema)
export default topOffer;