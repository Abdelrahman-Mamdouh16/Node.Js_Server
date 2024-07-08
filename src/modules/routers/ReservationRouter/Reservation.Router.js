import { Router } from "express";
import { checkReservation, createReservation, deleteReservation, getAllReservation } from "../../controller/ReservationController/Reservation.Controller.js";

const router=Router();

//  check Reservation
router.post('/checkReservation', checkReservation);
// create Reservation
router.post('/create', createReservation);
//  Get all Reservation
router.post('/getAllReservation/:userId', getAllReservation);
//  Get all Reservation
router.delete('/deleteReservation/:_Id', deleteReservation);

export default router;