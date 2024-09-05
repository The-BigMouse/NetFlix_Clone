import express from "express";
import http from "http";
import "dotenv/config";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS middleware before defining routes
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// Handling preflight OPTIONS requests
app.options("*", cors(corsOptions)); // Delegate preflight requests to the CORS middleware

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
