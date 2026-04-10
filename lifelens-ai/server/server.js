// Entry point for the backend server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contextRoutes = require('./routes/contextRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from React frontend
app.use(express.json()); // Parse incoming JSON payloads

// Mount routes
// All requests starting with /api/context will be handled by contextRoutes
app.use('/api/context', contextRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.send('LifeLens AI Backend is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
