import { TOKEN_AXIOM } from '@constants/index';

const logger = async (message: string, level: 'info' | 'error' | 'warn' = 'info', meta: Record<string, any> = {}) => {
    try {
        const AXIOM_INGEST_URL = 'https://api.axiom.co/v1/datasets/dufan-snap/ingest'; // Ganti nama dataset
        const AXIOM_TOKEN = `Bearer ${TOKEN_AXIOM}`; // Ganti dengan token

        const event = {
            message,
            level,
            timestamp: new Date().toISOString(),
            ...meta,
        };

        await fetch(AXIOM_INGEST_URL, {
            method: 'POST',
            headers: {
                'Authorization': AXIOM_TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([event]), // Axiom menerima array of events
        });
    } catch (err) {
        console.error('Failed to log to Axiom', err);
    }
};

export default logger
