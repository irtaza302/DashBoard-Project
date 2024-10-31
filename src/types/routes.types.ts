import { ReactNode } from 'react';

export interface Route {
  path: string;
  label: string;
  icon: ReactNode;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    email: string;
  };
} 