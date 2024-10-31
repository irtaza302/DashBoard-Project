import { LoadingSpinner } from './LoadingSpinner';

export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-gray-600 animate-pulse">Loading...</p>
    </div>
  </div>
); 