import { ReactNode } from 'react';

export interface Route {
  path: string;
  label: string;
  icon: ReactNode;
  adminOnly: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    email: string;
    role: 'admin' | 'user';
  };
} 