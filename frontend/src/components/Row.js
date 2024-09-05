import React, { useState, useEffect, useMemo } from "react";
import axios from "../axios";
import "../Styles/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { addFavMovieRequest } from "../action/api";
import { useNavigate } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [imageDataState, setImageDataState] = useState([]);
  const [likedMovies, setLikedMovies] = useState(new Set()); // Set to track liked movies

  // Fetch movies from API
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    if (imageDataState.length >= 1) {
      const payload = {
        userId: localStorage.getItem("userId"),
        favMovies: imageDataState,
      };
      const response = addFavMovieRequest(payload);
      console.log("ADDING MOVIES ::::::", response);
      if (response) {
        setImageDataState([]);
      }
    }
  }, [imageDataState]);

  // Youtube player options
  const opts = useMemo(
    () => ({
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    }),
    []
  );

  // Handle clicking on a movie poster
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          } else {
            console.error("Trailer not found.");
          }
        })
        .catch((error) => console.error("Failed to find trailer:", error));
    }
  };

  const handleLiked = (movie) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/signup");
    } else {
      const data = {
        title: movie?.title,
        poster_path: movie?.poster_path,
        overview: movie?.overview,
        backdrop_path: movie?.backdrop_path,
      };

      // Check if the movie is already liked
      if (likedMovies.has(movie.id)) {
        // If already liked, remove from likedMovies and imageDataState
        setLikedMovies((prev) => {
          const newSet = new Set(prev);
          newSet.delete(movie.id);
          return newSet;
        });
        setImageDataState((prev) =>
          prev.filter((item) => item.title !== movie.title)
        );
      } else {
        // If not liked, add to likedMovies and imageDataState
        setLikedMovies((prev) => new Set(prev).add(movie.id));
        setImageDataState((prev) => [...prev, data]);
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <div key={movie.id} className="row__posterWrapper">
            <img
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || movie.title || movie.original_name}
            />
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              {likedMovies.has(movie.id) ? (
                <MdOutlineFavorite
                  style={{ color: "red", fontSize: "24px" }}
                  onClick={() => handleLiked(movie)}
                />
              ) : (
                <MdOutlineFavoriteBorder
                  style={{ color: "red", fontSize: "24px" }}
                  onClick={() => handleLiked(movie)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
