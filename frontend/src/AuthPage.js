import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import TickrAnimation from './TickrAnimation';

const API_BASE = 'http://localhost:8080';

const AuthPage = () => {
  const navigate = useNavigate();

  // Animation state
  const [showAnimation, setShowAnimation] = useState(() => {
    return sessionStorage.getItem('animationPlayed') !== 'true';
  });

  const handleAnimationComplete = () => {
    sessionStorage.setItem('animationPlayed', 'true');
    setShowAnimation(false);
  };

  const [tab, setTab] = useState('login');

  // Login state
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError]       = useState('');
  const [loginLoading, setLoginLoading]   = useState(false);

  // Register state
  const [regName, setRegName]         = useState('');
  const [regEmail, setRegEmail]       = useState('');
  const [regPhone, setRegPhone]       = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm]   = useState('');
  const [regError, setRegError]       = useState('');
  const [regSuccess, setRegSuccess]   = useState('');
  const [regLoading, setRegLoading]   = useState(false);

  // ---- LOGIN ----
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('tickr_token', data.token);
        localStorage.setItem('tickr_user', JSON.stringify({
          email: data.email,
          name: data.name,
          role: data.role,
          userId: data.userId,
        }));
        navigate('/');
      } else {
        setLoginError(data.error || data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setLoginError('Unable to connect to server. Please make sure the backend is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  // ---- REGISTER ----
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (regPassword !== regConfirm) {
      setRegError('Passwords do not match.');
      return;
    }

    if (regPassword.length < 8) {
      setRegError('Password must be at least 8 characters.');
      return;
    }

    setRegLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          phone: regPhone,
        }),
      });

      const data = await res.json();

      if (res.ok || res.status === 201) {
        setRegSuccess('Account created! You can now sign in.');
        setRegName('');
        setRegEmail('');
        setRegPhone('');
        setRegPassword('');
        setRegConfirm('');
        setTimeout(() => setTab('login'), 1500);
      } else {
        setRegError(data.error || data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setRegError('Unable to connect to server. Please make sure the backend is running.');
    } finally {
      setRegLoading(false);
    }
  };

  // Show animation first
  if (showAnimation) {
    return <TickrAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-bg-overlay" />

      <div className="auth-logo">Tickr</div>
      <p className="auth-tagline">TICKETING MADE EASY</p>

      <div className="auth-card">

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => { setTab('login'); setLoginError(''); }}
          >
            SIGN IN
          </button>
          <button
            className={`auth-tab ${tab === 'register' ? 'auth-tab--active' : ''}`}
            onClick={() => { setTab('register'); setRegError(''); setRegSuccess(''); }}
          >
            REGISTER
          </button>
          <div className={`auth-tab-indicator ${tab === 'register' ? 'auth-tab-indicator--right' : ''}`} />
        </div>

        {/* LOGIN FORM */}
        {tab === 'login' && (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label>EMAIL</label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="auth-field">
              <label>PASSWORD</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {loginError && <div className="auth-error">{loginError}</div>}
            <button type="submit" className="auth-submit" disabled={loginLoading}>
              {loginLoading ? (
                <span className="auth-loading"><span /><span /><span /></span>
              ) : 'SIGN IN'}
            </button>
            <p className="auth-switch">
              Don't have an account?{' '}
              <span onClick={() => setTab('register')}>Register here</span>
            </p>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === 'register' && (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-field">
              <label>FULL NAME</label>
              <input
                type="text"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
            <div className="auth-field">
              <label>EMAIL</label>
              <input
                type="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="auth-field">
              <label>PHONE (optional)</label>
              <input
                type="tel"
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                placeholder="555-123-4567"
              />
            </div>
            <div className="auth-field">
              <label>PASSWORD</label>
              <input
                type="password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
              />
            </div>
            <div className="auth-field">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                value={regConfirm}
                onChange={e => setRegConfirm(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {regError   && <div className="auth-error">{regError}</div>}
            {regSuccess && <div className="auth-success">{regSuccess}</div>}
            <button type="submit" className="auth-submit" disabled={regLoading}>
              {regLoading ? (
                <span className="auth-loading"><span /><span /><span /></span>
              ) : 'CREATE ACCOUNT'}
            </button>
            <p className="auth-switch">
              Already have an account?{' '}
              <span onClick={() => setTab('login')}>Sign in here</span>
            </p>
          </form>
        )}
      </div>

      <p className="auth-footer">© 2025 Tickr. All rights reserved.</p>
    </div>
  );
};

export default AuthPage;