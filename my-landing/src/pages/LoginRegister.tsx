
import { useState } from 'react';
import './LoginRegister.scss';

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        console.log('Register:', { username, email, password });
        // await fake API call
      } else {
        console.log('Login:', { email, password });
        // await fake API call
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page login-register-page">
      <div className={`form-container ${isRegistering ? 'flipped' : ''}`}>
        <div className="form-header">
          <button
            className={`mode-toggle ${isRegistering ? 'register' : 'login'}`}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          {isRegistering && (
            <label>
              Username:
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
              />
            </label>
          )}
          <label>
            Email:
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </label>
          {isRegistering && (
            <label>
              Confirm Password:
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••"
              />
            </label>
          )}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Please wait...' : isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
