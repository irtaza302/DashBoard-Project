import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  children: React.ReactNode;
  component: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ComponentErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in ${this.props.component}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg bg-red-50 p-4">
          <div className="flex items-center space-x-3 text-red-600 mb-2">
            <XCircleIcon className="h-5 w-5" />
            <h3 className="text-sm font-medium">
              Error in {this.props.component}
            </h3>
          </div>
          <p className="text-sm text-red-600 mt-1">
            {this.state.error?.message || 'Something went wrong'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-3 text-sm text-red-600 hover:text-red-500"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 