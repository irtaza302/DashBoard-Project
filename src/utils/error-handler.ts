export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number,
        public code?: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleError = (error: unknown) => {
    if (error instanceof AppError) {
        return {
            message: error.message,
            statusCode: error.statusCode,
            code: error.code
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
            statusCode: 500,
            code: 'INTERNAL_SERVER_ERROR'
        };
    }

    return {
        message: 'An unexpected error occurred',
        statusCode: 500,
        code: 'UNKNOWN_ERROR'
    };
}; 