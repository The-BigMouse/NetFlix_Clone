import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHandler.js";
import { errorCodes, errorMessage } from "../utils/responseHelper.js";
export const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token)
    return errorResponse(
      res,
      errorCodes.UNAUTHORIZED,
      errorMessage.UNAUTHORIZED
    );

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return errorResponse(res, errorCodes.FORBIDDEN, errorMessage.FORBIDDEN);
    req.user = user;
    next();
  });
};
