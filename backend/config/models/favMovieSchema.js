import pkg from "mongoose";
const { Schema, models, model } = pkg;
const movieCollection = process.env.MOVIE_COLLECTION;

const movieSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  movies: [
    {
      title: {
        type: String,
        required: true,
      },
      poster_path: {
        type: String,
      },
      overview: {
        type: String,
      },
      backdrop_path: {
        type: String,
      },
    },
  ],
  updatedAt: {
    type: Number,
    default: Number(Date.now()),
  },
  createdAt: {
    type: Number,
    default: Number(Date.now()),
  },
});

export default models[movieCollection] || model(movieCollection, movieSchema);
