import { Router } from "express";
import { checkReservation, createReservation, deleteReservation, getAllReservation, getAppointmentById } from "../../controller/ReservationController/Reservation.Controller.js";

const router=Router();

//  check Reservation
router.post('/checkReservation', checkReservation);
// create Reservation
router.post('/create', createReservation);
//  Get all Reservation
router.post('/getAllReservation/:userId', getAllReservation);
//  Get Reservation by id
router.post('/getAppointment/:_id', getAppointmentById);
//  delete  Reservation
router.delete('/deleteReservation/:_id', deleteReservation);

export default router;