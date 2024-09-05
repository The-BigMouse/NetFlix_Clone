import { create, findOne } from "../config/db_Operation.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import {
  errorCodes,
  errorMessage,
  successMessage,
} from "../utils/responseHelper.js";
import { emailValidator, passwordValidator } from "../utils/validators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!emailValidator(email) || !passwordValidator(password)) {
      return errorResponse(
        res,
        errorCodes.BAD_REQUEST,
        errorMessage.BAD_REQUEST
      );
    }
    console.log(">>>>>>>>>>>>>>>>>>>>.", req.body);
    const isUserExist = await findOne(process.env.USER_COLLECTION, { email });
    if (isUserExist) {
      return errorResponse(
        res,
        errorCodes.BAD_REQUEST,
        errorMessage.ALREADY_EXISTS
      );
    }
    const saltRounds = parseInt(process.env.SALTROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const payload = {
      email: email,
      password: hashedPassword,
    };
    await create(process.env.USER_COLLECTION, payload);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }); // Token expires in 24 hours

    res.cookie("jwtToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return successResponse(res, {
      message: successMessage.SIGN_UP_SUCCSS,
      token: token,
    });
  } catch (err) {
    console.log("Error to Create User : ", err);
    return errorResponse(
      res,
      errorCodes.INTERNAL_SERVER_ERROR,
      errorMessage.INTERNAL_SERVER_ERROR
    );
  }
};
