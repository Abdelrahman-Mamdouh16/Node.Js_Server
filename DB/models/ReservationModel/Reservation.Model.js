import mongoose from "mongoose";

const ReservationSchema = mongoose.Schema({
    userId: { type: String, required: [true, "userId is required"] },
    doctorId: { type: String, required: [true, "doctorId is required"] },
    // doctorInfo: { type: String, required: [true, "doctorInfo is required"] },
    // userInfo: { type: String, required: [true, "userInfo is required"] },
    date: { type: String, required: [true, "data is required"] },
    status: { type: String, required: [true, "status is required"], default: 'pending' },
    timeStart: { type: String, required: [true, "timeStart is required"] },
    timeEnd: { type: String, required: [true, "timeEnd is required"] },
    where: { type: String }

}
    , {
        timestamps: true,
    }
); 
const ReservationModel = mongoose.model("Reservation",ReservationSchema)
export default ReservationModel;