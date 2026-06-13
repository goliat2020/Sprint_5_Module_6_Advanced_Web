const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getMetrics = async (metric, developer = null) => {
    const url = developer
        ? `${API_URL}/metrics/${metric}?developer=${encodeURIComponent(developer)}`
        : `${API_URL}/metrics/${metric}`;

    const response = await fetch(url);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
};