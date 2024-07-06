import { Router } from "express";
import { checkReservation, createReservation } from "../../controller/ReservationController/Reservation.Controller.js";

const router=Router();

// create create Reservation
router.post('/checkReservation', checkReservation)
// create create Reservation
router.post('/create', createReservation)

export default router;