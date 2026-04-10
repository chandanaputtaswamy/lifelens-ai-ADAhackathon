const mongoose = require('mongoose');

// Define the schema for user context data
const userContextSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: [true, 'Please provide a mood (e.g., Happy, Stressed, Tired)']
    },
    activity: {
        type: String,
        required: [true, 'Please provide the current activity']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
module.exports = mongoose.model('UserContext', userContextSchema);
