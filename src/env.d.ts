declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_API_URL: string;
            MONGODB_URI: string;
            NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

export {}; 