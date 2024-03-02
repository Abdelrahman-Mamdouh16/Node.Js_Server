import { Router } from "express";
import { UpdatePass, UserLogin, UserRegister, userDetails } from "../../controller/userController/user.controller.js";
import { authMiddleware } from "../../../Middlewares/auth.middleware.js";


const router = Router();

// user register
router.post("/register", UserRegister);

// user login
router.post("/login", UserLogin);

// user Details
router.post('/userDetails/:id',authMiddleware,userDetails)

// user Details
router.patch('/userAccount/UpdatePass/:id',UpdatePass)

export default router;
