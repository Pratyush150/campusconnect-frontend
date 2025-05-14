import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import Feed from './pages/Feed';
import { PaymentSuccess, PaymentCancel } from './pages/index';
import FindMentors from './pages/FindMentors'; // Use only the plural version
import Forum from './pages/Forum';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import LinkedInCallback from './pages/LinkedInCallback';
import NotificationWrapper from './components/NotificationWrapper';
import VerifyEmail from './components/VerifyEmail';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/mentors" element={<FindMentors />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/linkedin/callback" element={<LinkedInCallback />} />
          <Route path="*" element={<NotFound />} />

          {/* Mentor public profile (view mode) */}
          <Route 
            path="/mentors/:id" 
            element={
              <ProtectedRoute>
                <Profile mode="view" />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes */}
          <Route path="/resources" element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }/>
          <Route path="/" element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile mode="edit" />
            </ProtectedRoute>
          }/>
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }/>
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }/>
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }/>
        </Routes>
        <NotificationWrapper />
      </Router>
    </AuthProvider>
  );
}

