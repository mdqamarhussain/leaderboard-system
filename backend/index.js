const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const ClaimHistory = require('./models/ClaimHistory');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://md__qamar:qamar123db@123@cluster0.jkoyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
