import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Egerie | Premium Payment Portal",
  description: "Accès sécurisé Egerie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className={styles.navbar}>
          <div className={styles.navContainer}>
            <Link href="/" className={styles.logo}>
              EGERIE
            </Link>
            <div className={styles.navLinks}>
              <Link href="/auth" className={styles.navLink}>Connexion</Link>
              <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
            </div>
          </div>
        </nav>
        <main className={styles.mainContent}>
          {children}
        </main>
      </body>
    </html>
  );
}
