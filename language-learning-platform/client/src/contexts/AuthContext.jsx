import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post('/users/login', { username, password });
      const { user, token } = response.data; // 获取返回的user和token
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); // 保存user数据
      localStorage.setItem('jwtToken', token); // 保存token
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username, password, role) => {
    setLoading(true);
    try {
      const response = await axios.post('/users/register', { username, password, role });
      const { user, token } = response.data; // 获取返回的user和token
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); // 保存user数据
      localStorage.setItem('jwtToken', token); // 保存token
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken'); // 清除token
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('jwtToken');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser)); // 如果有用户数据，恢复登录状态
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      localStorage.removeItem('user');
      localStorage.removeItem('jwtToken');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadingUser: loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
