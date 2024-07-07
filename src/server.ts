import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import insights from "./routes/insights.routes";

// loads environment variables.
dotenv.config();

// create express server.
const app = express();
const PORT = process.env.PORT || 3000;

// use cors.
app.use(cors());

// calling api routes.
// app.use("/api", insights);

// start express server.
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
