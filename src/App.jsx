import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import Feed from './pages/Feed';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
      </Router>
    </AuthProvider>
  );
}


