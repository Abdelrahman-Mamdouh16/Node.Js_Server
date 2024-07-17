import { Router } from "express";
import { checkReservationOnSide, checkReservationOnTelehealth, createCheckoutSessionOnTelehealth, createReservationOnSide, createReservationOnTelehealth, deleteReservation, getAllReservation, getAppointmentById } from "../../controller/ReservationController/Reservation.Controller.js";

const router = Router();

//  check Reservation on side 
router.post('/checkReservation', checkReservationOnSide);

// create Reservation on side 
router.post('/create', createReservationOnSide);

//  checkOut session for Reservation on Telehealth call
router.post('/CheckoutSessionOnTelehealth', createCheckoutSessionOnTelehealth);

//  check Reservation on Telehealth call
router.post('/checkReservationOnTelehealth', checkReservationOnTelehealth);

// create Reservation on Telehealth call
router.post('/createReservationOnTelehealth', createReservationOnTelehealth);

//  Get all Reservation
router.post('/getAllReservation/:userId', getAllReservation);

//  Get Reservation by id
router.post('/getAppointment/:_id', getAppointmentById);

//  delete  Reservation
router.delete('/deleteReservation/:_id', deleteReservation);

export default router;