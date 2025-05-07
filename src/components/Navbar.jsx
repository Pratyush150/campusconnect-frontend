import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Simple navigation bar
export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Feed</Link>
      <Link to="/resources">Resources</Link>
      {user ? (
        <>
          <span>Welcome, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
