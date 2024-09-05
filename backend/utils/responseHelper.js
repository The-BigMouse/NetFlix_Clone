// Define error codes
export const errorCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// Define error messages
export const successMessage = {
  INVALID_EMAIL: "Invalid Email",
  SIGN_UP_SUCCSS: "User Signed Up Successfully",
  SIGN_IN_SUCCSS: "User Signed In Successfully",
  MOVIE_ADDED: "Movie Added Successfully",
};
export const errorMessage = {
  BAD_REQUEST: "Invalid request data. Please check your input and try again.",
  UNAUTHORIZED: "Please provide valid credentials.",
  FORBIDDEN:
    "Access denied. You do not have permission to access this resource.",
  NOT_FOUND: "User Not Exist",
  UNPROCESSABLE_ENTITY:
    "The request data was valid, but contains errors. Please correct them and try again.",
  INTERNAL_SERVER_ERROR:
    "An unexpected error occurred. Please try again later.",
  BAD_GATEWAY:
    "The server encountered an error while communicating with another service. Please try again later.",
  SERVICE_UNAVAILABLE:
    "Service is temporarily unavailable. Please try again later.",
  ALREADY_EXISTS: "User Already Exists",
};
