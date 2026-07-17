"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3005/api/auth/password", {
        oldPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Mot de passe mis à jour avec succès. Veuillez vous reconnecter.");
      localStorage.removeItem("token");
      window.location.href = "/auth";
    } catch (err) {
      alert("Erreur: Ancien mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-serif text-primary mb-8">Paramètres</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="rounded-none border-border/50">
            <CardHeader>
              <CardTitle className="font-serif">Apparence (Thèmes)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Personnalisez l'ambiance de la plateforme Égérie.</p>
              <div className="flex flex-col gap-3">
                <Button variant="outline" onClick={() => changeTheme("light")} className="justify-start rounded-none">
                  <span className="w-4 h-4 rounded-full bg-[#FCFBF9] border border-gray-300 mr-3"></span>
                  Light (Classique)
                </Button>
                <Button variant="outline" onClick={() => changeTheme("dark")} className="justify-start rounded-none">
                  <span className="w-4 h-4 rounded-full bg-[#0F172A] border border-gray-600 mr-3"></span>
                  Dark (Midnight)
                </Button>
                <Button variant="outline" onClick={() => changeTheme("gold")} className="justify-start rounded-none">
                  <span className="w-4 h-4 rounded-full bg-black border border-[#C69C3B] mr-3"></span>
                  Gold (Glamour VIP)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-border/50">
            <CardHeader>
              <CardTitle className="font-serif">Sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Ancien mot de passe</label>
                  <input type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Nouveau mot de passe</label>
                  <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full rounded-none uppercase tracking-widest text-xs mt-4">
                  Changer le mot de passe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
