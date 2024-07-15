import { Router } from "express";
// import { DocSearch, addNewDoc, getDocById } from "../../controller/doctorController/doctor.controller.js";
import { DocSearch, addNewDoc, getDocById } from './../../controller/doctorOnTelehealthController/doctorOnTelehealth.controller.js';

const router = Router();

// addNewDoc
router.post('/addNewDoc', addNewDoc);

// get Doctors for Search
router.post('/DocSearch', DocSearch);

// get Doctor by id
router.get('/getDocById/:id', getDocById);


export default router;