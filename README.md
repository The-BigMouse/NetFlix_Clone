# Netflix_Clone

- A fully responsive Netflix clone, where you can click on movie posters to watch trailers from YouTube using the IMDb Movie API.
  **Netflix Clone**: Click a poster and play the trailer seamlessly.

- You can scroll through the movie selections just like Netflix and move the mouse cursor for smooth scrolling.
- Play trailers from a wide selection of movies by simply clicking on the posters.

## Features:

- Responsive UI, similar to Netflix.
- Movie trailers play directly from YouTube.
- Dynamic movie listings fetched using the IMDb API.
- Includes navigation bar, banners, and movie rows.
  
## How It Works:

- All data is fetched from a third-party API (TMDB).
- Every time you refresh, the top poster and movie information will automatically change.

![Demo-Gif](preview/movie.png)

## Setup Instructions:

### Backend (Node.js + Express + MongoDB):

> **Note:** Make sure you have Node.js and MongoDB installed on your system.

1. **Clone the repository**:
    ```bash
    git clone https://github.com/The-BigMouse/NetFlix_Clone.git
    ```

2. **Navigate to the backend directory**:
    ```bash
    cd Netflix_Clone/backend
    ```

3. **Install the required backend dependencies**:
    ```bash
    npm install
    ```

4. **Run the backend server**:
    ```bash
    npm start
    ```
   The backend server will start on `http://localhost:8001`.

---

### Frontend (React.js):

> **Note:** Ensure you have the latest version of Node.js installed.

1. **Navigate to the frontend directory**:
    ```bash
    cd Netflix_Clone/frontend
    ```

2. **Install frontend dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend development server**:
    ```bash
    npm start
    ```
    The frontend server will start on `http://localhost:3000`.

---

### Running the Full App:

- Ensure both backend and frontend are running on separate terminals.
- The backend will be available on `http://localhost:8001`, and the frontend will run on `http://localhost:3000`.
  
---

## Technologies Used:

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **External APIs**: IMDb API (for movie data), YouTube API (for trailers)

---

## Getting TMDB API Key:

1. Go to the [TMDB website](https://www.themoviedb.org/).
2. Sign up and navigate to API settings.
3. Generate your API key and add it to the `.env` file in the backend.

---

