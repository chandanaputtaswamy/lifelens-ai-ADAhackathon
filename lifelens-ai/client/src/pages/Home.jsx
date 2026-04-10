import React, { useState } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import { submitContext } from '../services/contextService';
import './Home.css';

// Mood options offered to the user
const MOODS = ['Happy', 'Stressed', 'Tired'];

/**
 * Home Page
 * The main screen where users choose their mood, enter their activity,
 * and receive a personalized recommendation from LifeLens AI.
 */
const Home = () => {
    // Form state
    const [selectedMood, setSelectedMood] = useState('');
    const [activity, setActivity] = useState('');

    // API state
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!selectedMood) {
            setError('Please select your current mood.');
            return;
        }
        if (!activity.trim()) {
            setError('Please describe what you are doing.');
            return;
        }

        setError('');
        setLoading(true);
        setRecommendation(null); // clear old result

        try {
            // Post context to backend, receive recommendation
            const result = await submitContext({ mood: selectedMood, activity });
            setRecommendation(result.data);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            {/* Page header */}
            <header className="home__header">
                <div className="home__logo">🔍</div>
                <h1 className="home__title">LifeLens AI</h1>
                <p className="home__subtitle">
                    Your context-aware digital companion — tell us how you feel and what you're up to.
                </p>
            </header>

            {/* Input form */}
            <main className="home__main">
                <form className="context-form" onSubmit={handleSubmit}>

                    {/* Mood selector */}
                    <fieldset className="form-group">
                        <legend className="form-label">How are you feeling right now?</legend>
                        <div className="mood-options">
                            {MOODS.map((mood) => (
                                <button
                                    type="button"
                                    key={mood}
                                    className={`mood-btn mood-btn--${mood.toLowerCase()} ${selectedMood === mood ? 'mood-btn--selected' : ''}`}
                                    onClick={() => setSelectedMood(mood)}
                                    aria-pressed={selectedMood === mood}
                                >
                                    {mood === 'Happy' && '😊 '}
                                    {mood === 'Stressed' && '😟 '}
                                    {mood === 'Tired' && '😴 '}
                                    {mood}
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    {/* Activity input */}
                    <div className="form-group">
                        <label htmlFor="activity" className="form-label">
                            What are you currently doing?
                        </label>
                        <input
                            id="activity"
                            type="text"
                            className="form-input"
                            placeholder="e.g. studying, working out, cooking..."
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                        />
                    </div>

                    {/* Error message */}
                    {error && <p className="form-error">⚠️ {error}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : '✨ Get My Recommendation'}
                    </button>
                </form>

                {/* Recommendation card — appears after submission */}
                {recommendation && (
                    <RecommendationCard
                        recommendation={recommendation.recommendation}
                        type={recommendation.type}
                        reason={recommendation.reason}
                        mood={recommendation.mood}
                        activity={recommendation.activity}
                    />
                )}
            </main>
        </div>
    );
};

export default Home;
