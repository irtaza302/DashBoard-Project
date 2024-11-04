import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    if (process.env.NODE_ENV === 'production') {
      // Log to your error reporting service
      console.error('Production error:', error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const routeError = useRouteError() as Error | Response | null;
  const errorMessage = error?.message || 'Something went wrong';

  const getErrorMessage = (error: Error | Response | null): string => {
    if (!error) return 'Unknown error occurred';
    if (error instanceof Response) return `${error.status} ${error.statusText}`;
    if (error instanceof Error) return error.message;
    return 'Unknown error occurred';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 text-red-600 mb-4">
          <XCircleIcon className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Application Error</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">{errorMessage}</p>
          
          {routeError && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-700">
                Route Error: {getErrorMessage(routeError)}
              </p>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 