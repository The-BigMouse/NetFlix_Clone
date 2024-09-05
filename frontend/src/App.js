import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/HomePage";
import SignIn from "./components/signInPage";
import SignUp from "./components/signUpPage";
import Favourite from "./components/FavMoviePage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favourites" element={<Favourite />} />
      </Routes>
    </div>
  );
}

export default App;
