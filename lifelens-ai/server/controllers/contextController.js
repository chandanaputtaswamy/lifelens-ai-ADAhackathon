const UserContext = require('../models/UserContext');

// @desc    Save user context (mood and activity)
// @route   POST /api/context
exports.saveContext = async (req, res) => {
    try {
        const { mood, activity } = req.body;

        // Basic validation
        if (!mood || !activity) {
            return res.status(400).json({ error: 'Please provide both mood and activity' });
        }

        // Create new context entry in db
        const newContext = await UserContext.create({ mood, activity });

        res.status(201).json({
            success: true,
            data: newContext
        });
    } catch (error) {
        console.error('Error saving context:', error);
        res.status(500).json({ error: 'Server Error: unable to save context' });
    }
};

// @desc    Retrieve all context entries
// @route   GET /api/context
exports.getContexts = async (req, res) => {
    try {
        // Fetch all context entries sorted by timestamp descending (newest first)
        const contexts = await UserContext.find().sort({ timestamp: -1 });

        res.status(200).json({
            success: true,
            count: contexts.length,
            data: contexts
        });
    } catch (error) {
        console.error('Error fetching contexts:', error);
        res.status(500).json({ error: 'Server Error: unable to fetch contexts' });
    }
};
