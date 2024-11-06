import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import RequireAuth from './components/RequireAuth';
import AdminRoute from './components/auth/AdminRoute';
import { PageLoader } from './components/common/PageLoader';
import { Provider } from 'react-redux';
import { store } from './store';

// Lazy loaded components
const Account = React.lazy(() => import('./pages/Account'));
const DashboardLayout = React.lazy(() => import('./components/layout/DashboardLayout'));
const LoginForm = React.lazy(() => import('./components/auth/LoginForm'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const About = React.lazy(() => import('./pages/About'));
const Profile = React.lazy(() => import('./pages/Profile'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <Suspense fallback={<PageLoader />}>
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
                    
                    {/* Admin Route */}
                    <Route
                      path="account"
                      element={
                        <AdminRoute>
                          <Account />
                        </AdminRoute>
                      }
                    />
                  </Route>
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Suspense>
              <Toaster position="top-right" />
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
