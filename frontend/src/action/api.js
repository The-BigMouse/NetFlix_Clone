import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
export const userSignUpRequest = async (payload) => {
  try {
    const endPoint = "/auth/signUp";
    const url = `${apiBaseUrl}${endPoint}`;
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("SIGN UP RESPONSE >>>>>>>>>", response);
    return response;
  } catch (err) {
    console.log("Error To Sign Up User : ", err);
  }
};

export const userSignInRequest = async (payload) => {
  try {
    const endPoint = "/auth/signIn";
    const url = `${apiBaseUrl}${endPoint}`;
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("SIGN IN RESPONSE >>>>>>>>>", response);
    return response.data;
  } catch (err) {
    console.log("Error To Sign In User : ", err);
  }
};

export const addFavMovieRequest = async (payload) => {
  try {
    const endPoint = "/movies/addMovies";
    const url = `${apiBaseUrl}${endPoint}`;
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("ADD MOVIE RESPONSE >>>>>>>>>", response);
    return response.data;
  } catch (err) {
    console.log("Error To Add Fav Movies : ", err);
  }
};

export const getFavMovieRequest = async (userId) => {
  try {
    const endPoint = "/movies/getFavMovies";
    const url = `${apiBaseUrl}${endPoint}?userId=${userId}`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("GET MOVIE RESPONSE >>>>>>>>>", response);
    return response.data;
  } catch (err) {
    console.log("Error To Get Fav Movies : ", err);
  }
};
