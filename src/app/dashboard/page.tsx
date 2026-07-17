"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import styles from './dashboard.module.css';

// Using a standard test key. Replace with yours in production.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function Dashboard() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(50);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  const handleCreatePaymentIntent = async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/payments',
        { amount, currency: 'eur' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClientSecret(res.data.clientSecret);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de l\'initialisation du paiement');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Tableau de bord</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>Déconnexion</button>
      </header>

      <div className={`glass-panel ${styles.paymentCard}`}>
        <h2>Effectuer un paiement</h2>
        <p className={styles.description}>
          Ce formulaire utilise Stripe Elements pour simuler une transaction sécurisée.
        </p>

        {!clientSecret ? (
          <div className={styles.paymentSetup}>
            <label className="label">Montant (EUR)</label>
            <input 
              type="number" 
              className="input-field" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))} 
              min="1"
            />
            <button onClick={handleCreatePaymentIntent} className="btn">
              Payer {amount} €
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm amount={amount} />
          </Elements>
        )}
      </div>
    </div>
  );
}
