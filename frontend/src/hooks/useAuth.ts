import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return { login, logout, loading, error };
};