import express from "express";
import User from "../models/User.js";
import ClaimHistory from "../models/ClaimHistory.js";

const router = express.Router();

// Get all users with ranking
router.get("/users", async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const rankedUsers = users.map((user, index) => ({
    ...user._doc,
    rank: index + 1,
  }));
  res.json(rankedUsers);
});

// Add new user
router.post("/users", async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.json(user);
});

// Claim points
router.post("/claim", async (req, res) => {
  const { userId } = req.body;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  await User.findByIdAndUpdate(userId, { $inc: { totalPoints: randomPoints } });

  const history = new ClaimHistory({ userId, points: randomPoints });
  await history.save();

  res.json({ userId, points: randomPoints });
});

// Get claim history
router.get("/history", async (req, res) => {
  const history = await ClaimHistory.find().populate("userId", "name").sort({ claimedAt: -1 });
  res.json(history);
});

export default router;
