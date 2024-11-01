import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.details || error.response?.data?.error || 'An error occurred';
        console.error('API Error:', error.response?.data);
        toast.error(message);
        return message;
    }
    
    const errorMessage = 'An unexpected error occurred';
    console.error('Unexpected error:', error);
    toast.error(errorMessage);
    return errorMessage;
}; 