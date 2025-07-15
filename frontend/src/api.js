// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Get all users (for leaderboard and selection)
export const getUsers = () => axios.get(`${BASE_URL}/users`);

// Add a new user
export const addUser = (name) => axios.post(`${BASE_URL}/users`, { name });

// Claim random points for a user
export const claimPoints = (userId) => axios.post(`${BASE_URL}/claim`, { userId });

// Get claim history
export const getClaimHistory = () => axios.get(`${BASE_URL}/history`);
