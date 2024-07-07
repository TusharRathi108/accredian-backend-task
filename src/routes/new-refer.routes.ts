import express from "express";
const router = express.Router();

// post the refer form data.
router.post("/refer", (req, res) => {
  return res.json({ message: "Post Api Test" }).status(200);
});

export default router;
