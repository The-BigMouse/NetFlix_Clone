import pkg from "mongoose";
const { Schema, models, model } = pkg;
const userCollection = process.env.USER_COLLECTION;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Number,
    default: Number(Date.now()),
  },
  createdAt: {
    type: Number,
    default: Number(Date.now()),
  },
});

export default models[userCollection] || model(userCollection, userSchema);
