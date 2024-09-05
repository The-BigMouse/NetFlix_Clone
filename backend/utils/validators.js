import mongoose from "mongoose";

export const emailValidator = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(data)) {
    return true;
  }
  return false;
};

export const passwordValidator = (data) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (passwordRegex.test(data)) {
    return true;
  }
  return false;
};
