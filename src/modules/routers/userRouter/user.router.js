import { Router } from "express";
import { UserLogin, UserRegister, userDetails } from "../../controller/userController/user.controller.js";
import { authMiddleware } from "../../../Middlewares/auth.middleware.js";


const router = Router();

// user register
router.post("/register", UserRegister);

// user login
router.post("/login", UserLogin);

// user Details
router.post('/userDetails/:id',authMiddleware,userDetails)

// user Details
router.get('/userDetails/:id',authMiddleware,userDetails)

export default router;
