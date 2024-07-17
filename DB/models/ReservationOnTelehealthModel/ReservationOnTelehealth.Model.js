import mongoose from "mongoose";

const ReservationOnTelehealthSchema = mongoose.Schema({
    userId: { type: String, required: [true, "userId is required"] },
    doctorId: { type: String, required: [true, "doctorId is required"] },
    date: { type: String, required: [true, "data is required"] },
    status: { type: String, required: [true, "status is required"], default: 'pending' },
    timeStart: { type: String, required: [true, "timeStart is required"] },
    timeEnd: { type: String, required: [true, "timeEnd is required"] },
    where: { type: String, required: [true, "location is required"] }
}
    , {
        timestamps: true,
    }
);
const ReservationOnTelehealthModel = mongoose.model("ReservationOnTelehealth", ReservationOnTelehealthSchema)
export default ReservationOnTelehealthModel;