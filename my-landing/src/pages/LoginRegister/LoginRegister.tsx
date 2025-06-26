import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.scss';

const LoginRegister = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        console.log('Register:', { username, email, password });
      } else {
        console.log('Login:', { email, password });
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page login-register-page">
      <button
        className={`home-button ${clicked ? 'clicked' : ''}`}
        onClick={handleBackClick}
      >
        Home
      </button>

      <div className={`form-wrapper flip-container ${mode === 'register' ? 'flipped' : ''}`}>
        <div className="form-header">
          <button className="mode-toggle" onClick={toggleMode}>
            {mode === 'login' ? (
              <>
                Login <span className="arrow">→</span>
              </>
            ) : (
              <>
                <span className="arrow">←</span> Register
              </>
            )}
          </button>
        </div>

        <div className="flipper">
          <form
            onSubmit={handleSubmit}
            className={`form-content front ${mode === 'login' ? 'visible' : 'hidden'}`}
          >
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Login'}
            </button>
          </form>

          <form
            onSubmit={handleSubmit}
            className={`form-content back ${mode === 'register' ? 'visible' : 'hidden'}`}
          >
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
