"use client";

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import styles from './dashboard.module.css';

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'Une erreur est survenue.');
      setIsLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3001/dashboard?success=true',
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Une erreur est survenue lors de la confirmation.');
    } else {
      setIsSuccess(true);
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className={styles.successMessage}>
        <h3>Paiement réussi !</h3>
        <p>Merci pour votre paiement de {amount} €.</p>
        <button className="btn" onClick={() => window.location.reload()}>Faire un autre paiement</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <PaymentElement />
      {error && <div className={styles.error}>{error}</div>}
      <button disabled={isLoading || !stripe || !elements} className="btn" style={{ width: '100%', marginTop: '1.5rem' }}>
        {isLoading ? 'Traitement...' : `Confirmer et payer ${amount} €`}
      </button>
    </form>
  );
}
