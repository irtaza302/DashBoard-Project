import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface ApiErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ApiErrorFallback = ({ error, resetErrorBoundary }: ApiErrorFallbackProps) => {
  useEffect(() => {
    const errorMessage = error.message || 'Failed to fetch data. Please try again later.';
    toast.error(errorMessage);
  }, [error]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}; 