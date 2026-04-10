const UserContext = require('../models/UserContext');

// ─────────────────────────────────────────────────────────
// Helper: Determine if the current time is "late night"
// Late night is defined as 10 PM (22:00) to 4 AM (04:00)
// ─────────────────────────────────────────────────────────
const isLateNight = () => {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 4;
};

// ─────────────────────────────────────────────────────────
// Core Recommendation Engine (Rule-Based Logic)
// Takes a context object { mood, activity } and returns
// { recommendation, type, reason }
// ─────────────────────────────────────────────────────────
const generateRecommendation = (context) => {
    const mood = context.mood.toLowerCase().trim();
    const lateNight = isLateNight();
    const timeLabel = lateNight ? 'late at night' : 'right now';

    // Rule 1: Stressed + Late Night → prioritize relaxation
    if (mood === 'stressed' && lateNight) {
        return {
            recommendation: 'Take a short break and listen to calming music',
            type: 'relax',
            reason: `You reported feeling stressed late at night, so we suggested relaxation to help you unwind before sleep.`
        };
    }

    // Rule 2: Stressed (any time) → still suggest relaxation
    if (mood === 'stressed') {
        return {
            recommendation: 'Step away for 10 minutes — try deep breathing or a short walk',
            type: 'relax',
            reason: `You reported feeling stressed ${timeLabel}. A brief break can help reset your focus.`
        };
    }

    // Rule 3: Tired → encourage rest
    if (mood === 'tired') {
        return {
            recommendation: 'Consider resting or doing a light activity like stretching',
            type: 'rest',
            reason: `You reported feeling tired ${timeLabel}. Your body may need recovery time to restore your energy levels.`
        };
    }

    // Rule 4: Happy → encourage productivity
    if (mood === 'happy') {
        return {
            recommendation: 'Great time to be productive or try something new and exciting',
            type: 'productivity',
            reason: `You reported feeling happy ${timeLabel}. Positive moods boost cognitive performance — channel that energy!`
        };
    }

    // Rule 5: Default fallback
    return {
        recommendation: 'Maintain a balanced routine — consistency is the key to long-term wellness',
        type: 'balanced',
        reason: `Based on your current context, staying consistent with your daily habits will help keep you on track.`
    };
};

// ─────────────────────────────────────────────────────────
// @desc    Save user context and return recommendation
// @route   POST /api/context
// ─────────────────────────────────────────────────────────
exports.saveContext = async (req, res) => {
    try {
        const { mood, activity } = req.body;

        // Basic validation
        if (!mood || !activity) {
            return res.status(400).json({ error: 'Please provide both mood and activity' });
        }

        // Save context to MongoDB
        const newContext = await UserContext.create({ mood, activity });

        // Generate personalized recommendation based on mood and time
        const { recommendation, type, reason } = generateRecommendation({ mood, activity });

        // Respond with context data + the recommendation
        res.status(201).json({
            success: true,
            data: {
                mood: newContext.mood,
                activity: newContext.activity,
                timestamp: newContext.timestamp,
                recommendation,
                type,
                reason
            }
        });
    } catch (error) {
        console.error('Error saving context:', error);
        res.status(500).json({ error: 'Server Error: unable to save context' });
    }
};

// ─────────────────────────────────────────────────────────
// @desc    Retrieve all context entries (sorted newest first)
// @route   GET /api/context
// ─────────────────────────────────────────────────────────
exports.getContexts = async (req, res) => {
    try {
        // Fetch all entries, newest first
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
