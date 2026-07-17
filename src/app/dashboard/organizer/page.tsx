"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function OrganizerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("create");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [photo, setPhoto] = useState("");
  const [candidateType, setCandidateType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [reward, setReward] = useState("");
  const [isPaidEntry, setIsPaidEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3005/api/events/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3005/api/applications/organizer", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateCandidateStatus = async (appId: number, status: 'ACCEPTED' | 'REJECTED') => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3005/api/applications/${appId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCandidates();
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch data on tab change
  useEffect(() => {
    if (activeTab === "events") fetchMyEvents();
    if (activeTab === "candidates") fetchCandidates();
  }, [activeTab]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3005/api/events", {
        title,
        description,
        date,
        city,
        neighborhood,
        photo,
        candidateType,
        requirements,
        reward,
        isPaidEntry
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      setTitle("");
      setDescription("");
      setDate("");
      setCity("");
      setNeighborhood("");
      setPhoto("");
      setCandidateType("");
      setRequirements("");
      setReward("");
      setIsPaidEntry(false);
      fetchMyEvents();
      setActiveTab("events");
    } catch (err) {
      alert("Erreur de création");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="min-h-screen pt-24 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#FCFBF9] pb-20">
      <header className="bg-white border-b border-border/40 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-serif text-primary tracking-wide uppercase">Égérie</h1>
            <Badge variant="outline" className="text-muted-foreground font-light tracking-widest uppercase">Espace Organisateur</Badge>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-primary uppercase tracking-widest text-[10px]">Déconnexion</Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex gap-8 border-b border-border/40 mb-10">
          <button onClick={() => setActiveTab("create")} className={`pb-4 px-2 uppercase tracking-widest text-sm font-medium transition-colors ${activeTab === "create" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}`}>Créer un Événement</button>
          <button onClick={() => setActiveTab("events")} className={`pb-4 px-2 uppercase tracking-widest text-sm font-medium transition-colors ${activeTab === "events" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}`}>Mes Événements</button>
          <button onClick={() => setActiveTab("candidates")} className={`pb-4 px-2 uppercase tracking-widest text-sm font-medium transition-colors ${activeTab === "candidates" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"}`}>Revue des Candidats</button>
        </div>

        {activeTab === "create" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif text-primary mb-2">Publier un Casting</h2>
            <p className="text-muted-foreground font-light mb-8">Touchez les meilleurs profils de votre région.</p>
            
            <Card className="rounded-none shadow-none border-border/40 p-8 bg-white">
              <form className="space-y-8" onSubmit={handleCreate}>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Titre de l'événement</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: Casting Fashion Week" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Type de candidat</label>
                    <input type="text" value={candidateType} onChange={(e) => setCandidateType(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: Miss, Mannequin Photo..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">URL de la photo (Optionnel)</label>
                    <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="https://..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Critères & Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border border-border focus:border-primary outline-none p-3 bg-transparent transition-colors min-h-[100px]" placeholder="Description de l'événement et critères recherchés..." />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Exigences Spécifiques</label>
                    <input type="text" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: Taille > 1m75" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Rémunération / Lots</label>
                    <input type="text" value={reward} onChange={(e) => setReward(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: 50 000 FCFA + Shooting" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Date de l'événement</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Ville</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: Douala" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Quartier (Optionnel)</label>
                    <input 
                      type="text" 
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" 
                      placeholder="Ex: Bonapriso" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="paid" 
                    className="accent-primary w-4 h-4"
                    checked={isPaidEntry}
                    onChange={(e) => setIsPaidEntry(e.target.checked)}
                  />
                  <label htmlFor="paid" className="text-sm font-medium text-foreground cursor-pointer">L'inscription à cet événement est payante pour les candidats.</label>
                </div>

                <Button type="submit" isLoading={isLoading} className="rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-widest text-xs w-full py-6 mt-4">
                  Publier l'événement
                </Button>
              </form>
            </Card>
          </div>
        )}

        {activeTab === "events" && (
           <div>
             <h2 className="text-2xl font-serif text-primary mb-6">Vos castings publiés</h2>
             <Card className="rounded-none shadow-none border-border/40 p-12 text-center text-muted-foreground font-light bg-white">
               {myEvents.length === 0 ? "Vous n'avez pas encore publié d'événement." : (
                 <div className="grid md:grid-cols-2 gap-4 text-left">
                   {myEvents.map(evt => (
                    <Card key={evt.id} className="rounded-none shadow-none border-border/40 hover:border-primary/30 transition-colors">
                      <CardHeader>
                        <CardTitle className="font-serif text-primary text-xl">{evt.title}</CardTitle>
                        <CardDescription>
                          Date : {new Date(evt.date).toLocaleDateString()}
                          <br />
                          Statut Votes : <strong className={evt.votingStatus === "OPEN" ? "text-green-600" : "text-red-500"}>{evt.votingStatus === "OPEN" ? "OUVERTS" : "FERMÉS"}</strong>
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex gap-2">
                        <Button 
                          onClick={() => toggleVoting(evt.id, evt.votingStatus || "CLOSED")}
                          variant={evt.votingStatus === "OPEN" ? "destructive" : "default"} 
                          className="flex-1 rounded-none text-[10px] tracking-widest uppercase"
                        >
                          {evt.votingStatus === "OPEN" ? "Fermer les votes" : "Ouvrir les votes"}
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-none text-[10px] tracking-widest uppercase" onClick={() => window.open(`/events/${evt.id}`, '_blank')}>
                          Voir la page
                        </Button>
                      </CardFooter>
                    </Card>
                   ))}
                 </div>
               )}
             </Card>
           </div>
        )}

        {activeTab === "candidates" && (
           <div>
             <h2 className="text-2xl font-serif text-primary mb-6">Revue des Candidats (Kanban)</h2>
             <Card className="rounded-none shadow-none border-border/40 p-8 bg-white">
               {candidates.length === 0 ? (
                 <div className="text-center text-muted-foreground font-light py-8">Aucun candidat pour le moment.</div>
               ) : (
                 <div className="space-y-4">
                   {candidates.map(app => (
                     <div key={app.id} className="flex justify-between items-center p-4 border border-border/50">
                       <div>
                         <h4 className="font-bold text-primary">{app.model.firstName} {app.model.lastName}</h4>
                         <p className="text-sm text-muted-foreground">Postule pour : {app.event.title}</p>
                         
                         {app.model.profile && (
                           <div className="mt-2 text-xs text-muted-foreground space-y-1">
                             <p><strong>Niveau :</strong> {app.model.profile.experienceLevel || "Non renseigné"}</p>
                             <p><strong>Mensurations :</strong> {app.model.profile.height ? `${app.model.profile.height}cm` : "-"} / {app.model.profile.weight ? `${app.model.profile.weight}kg` : "-"} • Poitrine: {app.model.profile.bust || "-"} • Taille: {app.model.profile.waist || "-"} • Hanches: {app.model.profile.hips || "-"}</p>
                             <p><strong>Physique :</strong> Peau {app.model.profile.skinColor || "-"} • Yeux {app.model.profile.eyeColor || "-"} • Cheveux {app.model.profile.hairColor || "-"}</p>
                           </div>
                         )}

                         <p className="text-xs text-muted-foreground mt-3">Status actuel : <span className="font-bold">{app.status}</span></p>
                         {app.message && (
                           <div className="mt-3 bg-gray-50 p-3 text-sm italic text-gray-700 border-l-2 border-primary">
                             "{app.message}"
                           </div>
                         )}
                       </div>
                       {app.status === 'PENDING' && (
                         <div className="flex gap-2">
                           <Button size="sm" onClick={() => updateCandidateStatus(app.id, 'ACCEPTED')} className="bg-green-600 hover:bg-green-700 text-white rounded-none">Accepter</Button>
                           <Button size="sm" variant="destructive" onClick={() => updateCandidateStatus(app.id, 'REJECTED')} className="rounded-none">Refuser</Button>
                         </div>
                       )}
                       {app.status !== 'PENDING' && (
                         <Badge variant={app.status === 'ACCEPTED' ? 'default' : 'destructive'} className="text-xs rounded-none">
                           {app.status}
                         </Badge>
                       )}
                     </div>
                   ))}
                 </div>
               )}
             </Card>
           </div>
        )}
      </main>
    </div>
  );
}
