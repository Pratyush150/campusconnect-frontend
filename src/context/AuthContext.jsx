import { createContext, useContext, useState } from 'react';

// Create context for global auth state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login function to update user state
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  // Logout function to clear auth
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
