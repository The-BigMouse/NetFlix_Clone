import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "../Styles/Banner.css";
import { useNavigate } from "react-router-dom";
import { getFavMovieRequest } from "../action/api";
function Banner() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleGetFavouriteMovies = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const response = await getFavMovieRequest(userId);
      if (response && response.data && response.data?.movies) {
        navigate("/favourites", { state: { movies: response.data?.movies } });
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
           )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner__button">Play</button>
          <button
            className="banner__button"
            onClick={() => handleGetFavouriteMovies()}
          >
            My Favourite
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>

        <div className="banner--fadeBottom" />
      </div>
    </header>
  );
}

export default Banner;
