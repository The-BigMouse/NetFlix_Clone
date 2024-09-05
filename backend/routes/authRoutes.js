import express from "express";
import { userSignIn } from "../controllers/signInController.js";
import { userSignUp } from "../controllers/signUpController.js";
const authRouter = express.Router();
authRouter.post("/signIn", userSignIn);
authRouter.post("/signUp", userSignUp);
export default authRouter;
