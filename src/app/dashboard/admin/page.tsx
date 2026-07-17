"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [agencies, setAgencies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAgencies = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3005/api/admin/agencies", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgencies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  const handleVerify = async (id: number, isVerified: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3005/api/admin/agencies/${id}/verify`, { isVerified }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Agence ${isVerified ? 'approuvée' : 'révoquée'} avec succès.`);
      fetchAgencies();
    } catch (err) {
      alert("Erreur lors de la modification.");
    }
  };

  if (isLoading) return <div className="min-h-screen pt-24 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <main className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-serif text-primary mb-2">Administration Centrale</h1>
        <p className="text-muted-foreground mb-8">Gérez les approbations des organisateurs et les revenus générés par les votes.</p>

        <h2 className="text-xl font-serif text-primary mb-4 border-b pb-2">Agences / Organisateurs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
            <Card key={agency.id} className="rounded-none border-border/50 shadow-none">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-serif">{agency.agencyName}</CardTitle>
                  <Badge variant={agency.isVerified ? "default" : "destructive"} className="rounded-none text-[10px]">
                    {agency.isVerified ? "Vérifiée" : "En attente"}
                  </Badge>
                </div>
                <CardDescription className="text-xs">Propriétaire: {agency.user.firstName} {agency.user.lastName} ({agency.user.email})</CardDescription>
              </CardHeader>
              <CardContent className="text-sm font-light space-y-2">
                <p><strong>Contact:</strong> {agency.contactInfo || "-"}</p>
                <p><strong>Description:</strong> {agency.description || "-"}</p>
                {agency.verificationDocument ? (
                  <a href={agency.verificationDocument} target="_blank" className="text-blue-500 hover:underline">📄 Voir le document justificatif</a>
                ) : (
                  <p className="text-red-500 italic">Aucun document fourni</p>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                {!agency.isVerified ? (
                  <Button onClick={() => handleVerify(agency.id, true)} className="flex-1 rounded-none bg-green-600 hover:bg-green-700 text-white uppercase text-[10px] tracking-widest">Approuver</Button>
                ) : (
                  <Button onClick={() => handleVerify(agency.id, false)} variant="destructive" className="flex-1 rounded-none uppercase text-[10px] tracking-widest">Révoquer</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
