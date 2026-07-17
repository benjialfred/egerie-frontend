"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './auth.module.css';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email, password } 
        : { email, password, firstName, lastName };

      const res = await axios.post(`http://localhost:3000${endpoint}`, payload);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      } else {
        setIsLogin(true);
        setError('Inscription réussie ! Veuillez vous connecter.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={`glass-panel ${styles.authBox}`}>
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.nameFields}>
              <div>
                <label className="label">Prénom</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div>
                <label className="label">Nom</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
            </div>
          )}
          
          <label className="label">Adresse Email</label>
          <input 
            type="email" 
            className="input-field" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <label className="label">Mot de passe</label>
          <input 
            type="password" 
            className="input-field" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
        
        <p className={styles.switchMode}>
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <button className={styles.switchBtn} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
}
