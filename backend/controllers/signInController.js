import { findOne } from "../config/db_Operation.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import {
  errorCodes,
  errorMessage,
  successMessage,
} from "../utils/responseHelper.js";
import { emailValidator, passwordValidator } from "../utils/validators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!emailValidator(email) || !passwordValidator(password)) {
      return errorResponse(
        res,
        errorCodes.BAD_REQUEST,
        errorMessage.BAD_REQUEST
      );
    }
    const user = await findOne(process.env.USER_COLLECTION, { email });
    if (!user) {
      return errorResponse(res, errorCodes.BAD_REQUEST, errorMessage.NOT_FOUND);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return errorResponse(
        res,
        errorCodes.UNAUTHORIZED,
        errorMessage.UNAUTHORIZED
      );
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }); // Token expires in 24 hours

    res.cookie("jwtToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return successResponse(res, {
      message: successMessage.SIGN_IN_SUCCSS,
      userId: user._id,
    });
  } catch (err) {
    console.log("Error to Sign In User : ", err);
    return errorResponse(
      res,
      errorCodes.INTERNAL_SERVER_ERROR,
      errorMessage.INTERNAL_SERVER_ERROR
    );
  }
};
