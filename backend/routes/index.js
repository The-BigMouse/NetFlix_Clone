import express from "express";
import authRouter from "./authRoutes.js";
import favMovieRouter from "./likedMoviesRoutes.js";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/movies", favMovieRouter);
export default router;
