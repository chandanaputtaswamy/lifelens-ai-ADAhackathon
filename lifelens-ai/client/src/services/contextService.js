// API service layer — centralizes all API calls to the backend
// This keeps the components clean and maintainable.

const BASE_URL = 'http://localhost:5000/api';

/**
 * POST /api/context
 * Sends user mood and activity to the backend.
 * Returns saved context + AI recommendation.
 */
export const submitContext = async ({ mood, activity }) => {
    const response = await fetch(`${BASE_URL}/context`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, activity }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit context');
    }

    return response.json(); // { success, data: { mood, activity, recommendation, type, reason } }
};

/**
 * GET /api/context
 * Retrieves all saved context entries.
 */
export const fetchContexts = async () => {
    const response = await fetch(`${BASE_URL}/context`);

    if (!response.ok) {
        throw new Error('Failed to fetch contexts');
    }

    return response.json(); // { success, count, data: [...] }
};
