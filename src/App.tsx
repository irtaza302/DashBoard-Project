import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './context/AuthContext';

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: JSX.Element }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
