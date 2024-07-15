import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectionDB from "./DB/Connection.DB.js";
import userRouter from "./src/modules/routers/patientRouter/patient.router.js";
import cors from 'cors';
import productRouter from "./src/modules/routers/productsRouter/products.Router.js";
import docRouter from "./src/modules/routers/doctorRouter/doctor.router.js";
import ReservationRouter from "./src/modules/routers/ReservationRouter/Reservation.Router.js";
import docOnTelehealthRouter from "./src/modules/routers/doctorOnTelehealthRouter/doctorOnTelehealth.router.js";
// rest objects
const app = express();
const port = 8080;

// mondoDB Connection
connectionDB();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Apis
// user Api
app.use('/user', userRouter);
// product Api
app.use('/product', productRouter)
// doctor Api
app.use('/doctor', docRouter)
// doctorOnTelehealth  Api
app.use('/doctorOnTelehealth',docOnTelehealthRouter)

// doctor Api
app.use('/Reservation', ReservationRouter)


// routes
app.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Server is running",
  });
});
app.listen(port, () =>
  console.log(`Server are listening on port ${port}!`.bgCyan.white)
);
