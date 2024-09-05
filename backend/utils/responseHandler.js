/**
 * Builds a standardized success response.
 *
 * @param {Object} res - The Express response object.
 * @param {Number} statusCode - The HTTP status code.
 * @param {Object} data - The response data.
 * @param {String} [message] - Optional message for the response.
 */
export const successResponse = (res, data = null) => {
  const statusCode = 200;
  const response = {
    status: true,
    data,
  };

  res.status(statusCode).json(response);
};

/**
 * Builds a standardized error response.
 *
 * @param {Object} res - The Express response object.
 * @param {Number} statusCode - The HTTP status code.
 * @param {String} error - The error message.
 * @param {Object} [details] - Optional details about the error.
 */
export const errorResponse = (res, statusCode = 500, error) => {
  const response = {
    status: false,
    error,
  };

  res.status(statusCode).json(response);
};
