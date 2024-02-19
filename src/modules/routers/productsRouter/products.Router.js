import { Router } from "express";
import { topOffers, topSpecialties } from "../../controller/productsController/products.Controller.js";

const router = Router();

// topOffers product Details
router.get('/topOffers', topOffers)

// topSpecialties product Details
router.get('/topSpecialties', topSpecialties)


export default router;