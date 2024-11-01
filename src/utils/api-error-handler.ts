import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import * as Sentry from '@sentry/react';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    Sentry.captureException(error);
    return message;
  }
  
  const errorMessage = 'An unexpected error occurred';
  toast.error(errorMessage);
  Sentry.captureException(error);
  return errorMessage;
}; 