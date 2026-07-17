"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function DashboardRouter() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/auth');
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role === 'ORGANIZER') {
        router.push('/dashboard/organizer');
      } else {
        router.push('/dashboard/model');
      }
    } catch (err) {
      console.error('Invalid token', err);
      localStorage.removeItem('token');
      router.push('/auth');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFBF9]">
        <p className="text-muted-foreground animate-pulse">Redirection vers votre espace...</p>
      </div>
    );
  }

  return null;
}
