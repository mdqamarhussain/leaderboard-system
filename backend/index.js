const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const ClaimHistory = require('./models/ClaimHistory');

require('dotenv').config(); // Load env vars

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all users (leaderboard)
app.get('/api/users', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

// Add a new user
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.json(user);
});

// Claim points for a user
app.post('/api/claim', async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;
  const user = await User.findByIdAndUpdate(userId, { $inc: { totalPoints: points } }, { new: true });
  await ClaimHistory.create({ userId, pointsClaimed: points });
  res.json({ user, points });
});

// Get claim history
app.get('/api/history', async (req, res) => {
  const history = await ClaimHistory.find().populate('userId', 'name').sort({ claimedAt: -1 });
  res.json(history);
});

// Use environment port (for Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
