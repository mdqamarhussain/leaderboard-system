// seed.js
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/leaderboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  { name: 'Rahul' },
  { name: 'Kamal' },
  { name: 'Sanak' },
  { name: 'Ravi' },
  { name: 'Sita' },
  { name: 'Priya' },
  { name: 'Anil' },
  { name: 'Neha' },
  { name: 'Vikram' },
  { name: 'Rajesh' },
];

User.insertMany(users)
  .then(() => {
    console.log('Users seeded');
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
