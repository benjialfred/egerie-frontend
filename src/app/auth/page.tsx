"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('MODEL');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email, password } 
        : { email, password, firstName, lastName, role };

      const res = await axios.post(`http://localhost:3005${endpoint}`, payload);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      } else {
        setIsLogin(true);
        setError('Inscription réussie ! Veuillez vous connecter.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBF9] p-4">
      <Card className="w-full max-w-md shadow-xl border-border/60 rounded-none bg-white">
        <CardHeader className="text-center pb-6 pt-8">
          <CardTitle className="text-3xl font-serif text-primary">
            {isLogin ? 'Connexion' : 'Rejoindre Égérie'}
          </CardTitle>
          <CardDescription className="font-light mt-2">
            {isLogin ? 'Accédez à votre espace exclusif' : 'Créez votre compte pour accéder à la plateforme'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className={`p-3 mb-6 text-sm text-center border ${error.includes('réussie') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Prénom</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Nom</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Vous êtes :</label>
                  <select 
                    className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors cursor-pointer" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="MODEL">Un Modèle / Talent</option>
                    <option value="ORGANIZER">Un Organisateur (Agence/Comité)</option>
                  </select>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Adresse Email</label>
              <input 
                type="email" 
                required 
                className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Mot de passe</label>
              <input 
                type="password" 
                required 
                className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            
            <Button type="submit" isLoading={isLoading} className="w-full rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-widest text-xs py-6 mt-4">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/40 pt-6 pb-8 bg-gray-50/50">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
            <button 
              type="button" 
              className="text-primary hover:text-accent font-medium uppercase tracking-widest text-xs transition-colors"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
