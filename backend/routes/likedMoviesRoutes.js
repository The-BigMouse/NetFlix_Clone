import express from "express";
import { addFavMovie } from "../controllers/addFavMovieController.js";
import { getFavMovie } from "../controllers/getFavMovieController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const favMovieRouter = express.Router();
favMovieRouter.post("/addMovies", authenticateToken, addFavMovie);
favMovieRouter.get("/getFavMovies", authenticateToken, getFavMovie);
export default favMovieRouter;
