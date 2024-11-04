import { LoadingSpinner } from './LoadingSpinner';

export const ContentLoader = () => (
  <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  </div>
); 