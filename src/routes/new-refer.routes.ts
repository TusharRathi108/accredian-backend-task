import express from "express";
import { newRefer } from "../controllers/new-refer.controller";

const router = express.Router();

// post the refer form data.
router.post("/refer", newRefer);

export default router;
