import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import Feed from './pages/Feed';
import { PaymentSuccess, PaymentCancel } from './pages/index'; // or './pages/index'
import FindMentor from './pages/FindMentor';
import Forum from './pages/Forum';
import NotFound from './pages/NotFound';
import NotificationWrapper from './components/NotificationWrapper'; // make sure this exists

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/mentors" element={<FindMentor />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="*" element={<NotFound />} />
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
        </Routes>
        <NotificationWrapper />
      </Router>
    </AuthProvider>
  );
}



