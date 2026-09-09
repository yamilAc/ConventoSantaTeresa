import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [username, setUsername] = useState(localStorage.getItem('admin_user'));

  function login(tok, user) {
    localStorage.setItem('admin_token', tok);
    localStorage.setItem('admin_user', user);
    setToken(tok);
    setUsername(user);
  }

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
