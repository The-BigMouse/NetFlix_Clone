import mongoose from "mongoose";
import { create, findOne, updateOne } from "../config/db_Operation.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import {
  errorCodes,
  errorMessage,
  successMessage,
} from "../utils/responseHelper.js";

export const addFavMovie = async (req, res) => {
  try {
    const { userId, favMovies } = req.body;
    let existingUser = await findOne(process.env.MOVIE_COLLECTION, { userId });

    if (existingUser) {
      const updateResult = await updateOne(
        process.env.MOVIE_COLLECTION,
        { userId },
        {
          $push: { movies: { $each: favMovies } },
          $set: { updatedAt: Date.now() },
        }
      );
      if (updateResult.modifiedCount === 0) {
        return errorResponse(
          res,
          errorCodes.INTERNAL_SERVER_ERROR,
          errorMessage.INTERNAL_SERVER_ERROR
        );
      }
    } else {
      const newUserMovieList = {
        userId,
        movies: favMovies,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await create(process.env.MOVIE_COLLECTION, newUserMovieList);
    }
    return successResponse(res, successMessage.MOVIE_ADDED);
  } catch (err) {
    console.log("Error to Add Movie in Favourite List : ", err);
    return errorResponse(
      res,
      errorCodes.INTERNAL_SERVER_ERROR,
      errorMessage.INTERNAL_SERVER_ERROR
    );
  }
};
