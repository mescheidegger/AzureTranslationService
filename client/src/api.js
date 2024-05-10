// api.js
export const translateBatch = async (texts, from, to) => {
    try {
        const response = await fetch('/api/translate-batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texts, from, to }),
        });
        const data = await response.json();
        return data.translations;
    } catch (error) {
        console.error('Error translating batch:', error);
        throw error;
    }
};

export const detectLanguage = async (text) => {
    try {
        const response = await fetch('/api/detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        return data.language;
    } catch (error) {
        console.error('Error detecting language:', error);
        throw error;
    }
};

const translateText = async (text, from, to) => {
    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, from, to }),
        });
        const data = await response.json();
        return data.translation;
    } catch (error) {
        console.error('Error translating text:', error);
        throw error;
    }
};

export const getSupportedLanguages = async () => {
    try {
        const response = await fetch('/api/languages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting supported languages:', error);
        throw error;
    }
};

export default translateText;