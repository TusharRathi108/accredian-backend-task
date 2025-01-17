import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// routes
import refer from "./routes/new-refer.routes";

// loads environment variables.
dotenv.config();

// create express server.
const app = express();
const PORT = process.env.PORT || 3000;

// use cors.
app.use(cors());
app.use(express.json());

// calling api routes.
app.use("/api", refer);

// start express server.
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
