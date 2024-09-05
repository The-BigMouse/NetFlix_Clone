import React from "react";
import "../Styles/favMovies.css"; // Assuming you're using the same CSS file
import { useLocation } from "react-router-dom";
function Favourite() {
  const location = useLocation();
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const { movies } = location.state || {};
  return (
    <div className="movie-grid-container">
      <h2 className="section-title">Favourite Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <img
              src={`${baseUrl}${movie?.poster_path}`}
              alt={`${movie?.title}`}
              className="movie-poster"
            />
            <h3 className="movie-title">{movie?.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourite;
