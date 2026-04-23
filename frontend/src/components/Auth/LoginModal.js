import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-overlay" onClick={onClose}>
      <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
        <h2>SIGN IN</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'SIGN IN'}
          </button>
        </form>
        <p className="switch-auth">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-button">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;