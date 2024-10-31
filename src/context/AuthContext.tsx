import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types/routes.types';

interface AuthContextType {
  auth: AuthState;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  const login = (email: string) => {
    setAuth({
      isAuthenticated: true,
      user: { email }
    });
    navigate('/dashboard');
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 