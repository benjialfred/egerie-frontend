import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>L'Élégance du Paiement</h1>
        <p className={styles.subtitle}>
          Bienvenue sur le portail sécurisé Egerie. Une expérience premium pour gérer vos transactions.
        </p>
        <div className={styles.actions}>
          <Link href="/auth" className="btn">Commencer</Link>
        </div>
      </div>
    </div>
  );
}
