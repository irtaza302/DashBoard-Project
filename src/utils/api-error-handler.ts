import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return message;
  }
  
  toast.error('An unexpected error occurred');
  return 'An unexpected error occurred';
}; 