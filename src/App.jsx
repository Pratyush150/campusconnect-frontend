import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import Feed from './pages/Feed';
import { PaymentSuccess, PaymentCancel } from './pages/index';
import FindMentor from './pages/FindMentor'; // or FindMentors if that's the one you want
import Forum from './pages/Forum';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import LinkedInCallback from './pages/LinkedInCallback';
import NotificationWrapper from './components/NotificationWrapper';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/mentors" element={<FindMentor />} /> {/* or FindMentors */}
          <Route path="/forum" element={<Forum />} />
          <Route path="/linkedin/callback" element={<LinkedInCallback />} />
          {/* NotFound route should be last */}
          <Route path="*" element={<NotFound />} />

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
              <Profile />
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




