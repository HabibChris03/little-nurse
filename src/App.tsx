import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext';

// Pages & Layout
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Queue from './pages/Queue';
import Wallet from './pages/Wallet';
import AdminChat from './pages/AdminChat';
import Layout from './layouts/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load large components for code splitting
const Auth = React.lazy(() => import('./pages/Auth'));
const Consultation = React.lazy(() => import('./pages/Consultation'));
const MedicalLibrary = React.lazy(() => import('./pages/MedicalLibrary'));
const ReviewReport = React.lazy(() => import('./pages/ReviewReport'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Profile = React.lazy(() => import('./pages/Profile'));

// Protected Route — redirects to /auth if no user
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppContext();
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/auth" element={
            <Suspense fallback={<LoadingSpinner text="Loading Authentication..." />}>
              <Auth />
            </Suspense>
          } />

          {/* All protected app pages share the persistent Layout (sidebar + header) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="reports"         element={<Reports />} />
            <Route path="queue"           element={<Queue />} />
            <Route path="consultation"    element={
              <Suspense fallback={<LoadingSpinner text="Loading Consultation..." />}>
                <Consultation />
              </Suspense>
            } />
            <Route path="wallet"          element={<Wallet />} />
            <Route path="admin-chat"      element={<AdminChat />} />
            <Route path="medical-library" element={
              <Suspense fallback={<LoadingSpinner text="Loading Medical Library..." />}>
                <MedicalLibrary />
              </Suspense>
            } />
            <Route path="review-report"   element={
              <Suspense fallback={<LoadingSpinner text="Loading Review Report..." />}>
                <ReviewReport />
              </Suspense>
            } />
            <Route path="notifications"   element={
              <Suspense fallback={<LoadingSpinner text="Loading Notifications..." />}>
                <Notifications />
              </Suspense>
            } />
            <Route path="profile"         element={
              <Suspense fallback={<LoadingSpinner text="Loading Profile..." />}>
                <Profile />
              </Suspense>
            } />
          </Route>

          {/* Catch-all — always fall back to Dashboard (never blank) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
