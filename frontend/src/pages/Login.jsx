import React, { useState } from 'react';
import '../style/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="header">
          <h1>Se connecter</h1>
          <br></br>
        </div>

        <h2 className="welcome-text">Bienvenue</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Mot de passe"
          />

          <button type="submit" className="submit-btn">
            Continuer
          </button>
        </form>

        <Link to="/account-creation" className="create-account-btn">
            Créer un compte
          </Link>

        <div className="divider">
          <span>ou</span>
        </div>

        <button className="social-btn">
          Continuer avec Google
        </button>
        
        <button className="social-btn">
          Continuer avec Apple
        </button>
      </div>
    </div>
  );
};

export default Login;