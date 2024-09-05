import { findOne } from "../config/db_Operation.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import { errorCodes, errorMessage } from "../utils/responseHelper.js";

export const getFavMovie = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return errorResponse(
        res,
        errorCodes.BAD_REQUEST,
        errorMessage.BAD_REQUEST
      );
    }
    const movies = await findOne(process.env.MOVIE_COLLECTION, { userId });
    return successResponse(res, movies);
  } catch (err) {
    console.log("Error to Get Favourite Movies: ", err);
    return errorResponse(
      res,
      errorCodes.INTERNAL_SERVER_ERROR,
      errorMessage.INTERNAL_SERVER_ERROR
    );
  }
};
