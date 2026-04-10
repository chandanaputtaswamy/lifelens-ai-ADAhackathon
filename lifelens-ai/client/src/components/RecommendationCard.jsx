import React from 'react';
import './RecommendationCard.css';

// Maps recommendation type to an emoji icon for visual clarity
const typeMeta = {
    relax: { icon: '🎵', label: 'Relax' },
    rest: { icon: '😴', label: 'Rest' },
    productivity: { icon: '🚀', label: 'Productivity' },
    balanced: { icon: '⚖️', label: 'Balanced' },
};

/**
 * RecommendationCard
 * Displays the recommendation, type badge, and AI-generated reason.
 * Changes color theme dynamically based on the recommendation type.
 *
 * Props:
 *   - recommendation (string): The suggestion text
 *   - type (string): relax | rest | productivity | balanced
 *   - reason (string): Explanation of why this recommendation was made
 *   - mood (string): User's reported mood
 *   - activity (string): User's reported activity
 */
const RecommendationCard = ({ recommendation, type, reason, mood, activity }) => {
    const meta = typeMeta[type] || typeMeta['balanced'];

    return (
        <div className={`recommendation-card recommendation-card--${type}`}>
            {/* Header: icon + type badge */}
            <div className="rec-card__header">
                <span className="rec-card__icon">{meta.icon}</span>
                <span className="rec-card__badge">{meta.label}</span>
            </div>

            {/* Context summary */}
            <p className="rec-card__context">
                You feel <strong>{mood}</strong> while <strong>{activity}</strong>
            </p>

            {/* Main recommendation */}
            <h2 className="rec-card__recommendation">{recommendation}</h2>

            {/* Divider */}
            <hr className="rec-card__divider" />

            {/* AI Reason / explanation */}
            <div className="rec-card__reason">
                <span className="rec-card__reason-label">🧠 Why this?</span>
                <p>{reason}</p>
            </div>
        </div>
    );
};

export default RecommendationCard;
