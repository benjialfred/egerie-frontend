"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ModelDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("feed");
  const [events, setEvents] = useState<any[]>([]);
  const [myApplications, setMyApplications] = useState<any[]>([]);

  // Profile states
  const [bio, setBio] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [skinColor, setSkinColor] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3005/api/events", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    const fetchMyApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3005/api/applications/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    if (activeTab === "feed") fetchEvents();
    if (activeTab === "applications") fetchMyApplications();
  }, [activeTab]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3005/api/profiles", {
        bio,
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        bust: bust ? parseFloat(bust) : undefined,
        waist: waist ? parseFloat(waist) : undefined,
        hips: hips ? parseFloat(hips) : undefined,
        eyeColor,
        hairColor,
        skinColor,
        shoeSize: shoeSize ? parseFloat(shoeSize) : undefined,
        experienceLevel
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      alert("Erreur lors de la mise à jour du profil.");
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3005/api/applications", { 
        eventId: selectedEvent.id,
        message 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Candidature envoyée avec succès !");
      setSelectedEvent(null);
      setMessage("");
    } catch (err) {
      alert("Erreur lors de la candidature. Vous avez peut-être déjà postulé.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] pb-20">
      <header className="bg-white border-b border-border/40 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-serif text-primary tracking-wide uppercase">Égérie</h1>
            <Badge variant="outline" className="text-muted-foreground font-light tracking-widest uppercase">Espace Modèle</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="gold" className="uppercase tracking-widest text-[10px] h-8">Booster mon profil</Button>
            <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-primary uppercase tracking-widest text-[10px]">Déconnexion</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex gap-8 border-b border-border/40 mb-10">
          <nav className="flex w-full">
            <button onClick={() => setActiveTab("feed")} className={`flex-1 py-4 text-sm font-medium tracking-widest uppercase transition-colors ${activeTab === "feed" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-primary"}`}>Feed Castings</button>
            <button onClick={() => setActiveTab("applications")} className={`flex-1 py-4 text-sm font-medium tracking-widest uppercase transition-colors ${activeTab === "applications" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-primary"}`}>Mes Candidatures</button>
            <button onClick={() => setActiveTab("profile")} className={`flex-1 py-4 text-sm font-medium tracking-widest uppercase transition-colors ${activeTab === "profile" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-primary"}`}>Mon Profil</button>
          </nav>
        </div>

        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-serif text-primary mb-6">Informations du Profil</h2>
            <Card className="rounded-none shadow-none border-border/40 p-8 bg-white">
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Bio / Présentation</label>
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border border-border focus:border-primary outline-none p-3 bg-transparent transition-colors min-h-[100px]" placeholder="Présentez-vous en quelques mots..." />
                </div>
                
                <h3 className="text-lg font-serif text-primary mt-8 mb-4 border-b pb-2">Mensurations</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Taille (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Poids (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Pointure</label>
                    <input type="number" value={shoeSize} onChange={(e) => setShoeSize(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Poitrine (cm)</label>
                    <input type="number" value={bust} onChange={(e) => setBust(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Taille (cm)</label>
                    <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Hanches (cm)</label>
                    <input type="number" value={hips} onChange={(e) => setHips(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                </div>

                <h3 className="text-lg font-serif text-primary mt-8 mb-4 border-b pb-2">Attributs Physiques & Expérience</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Couleur de peau</label>
                    <input type="text" value={skinColor} onChange={(e) => setSkinColor(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Niveau d'expérience</label>
                    <input type="text" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: Débutant, Intermédiaire, Pro" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Couleur des yeux</label>
                    <input type="text" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Couleur des cheveux</label>
                    <input type="text" value={hairColor} onChange={(e) => setHairColor(e.target.value)} className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" />
                  </div>
                </div>

                <Button type="submit" isLoading={isLoading} className="rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-widest text-xs w-full py-6 mt-8">
                  Mettre à jour mon profil
                </Button>
              </form>
            </Card>
          </div>
        )}

        {activeTab === "feed" && (
          <div>
            <h2 className="text-2xl font-serif text-primary mb-2">Castings Disponibles</h2>
            <p className="text-muted-foreground font-light mb-8">Parcourez les offres et postulez en un clic.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((evt: any) => (
                <Card key={evt.id} className="rounded-none shadow-none border-border/40 hover:border-primary/30 transition-colors bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="rounded-none text-xs font-light tracking-wider bg-accent/10 border-accent text-accent-foreground">Nouveau</Badge>
                      {evt.candidateType && <Badge variant="secondary" className="rounded-none text-xs">{evt.candidateType}</Badge>}
                    </div>
                  <CardTitle className="text-xl font-serif text-primary mt-2">{evt.title}</CardTitle>
                  <CardDescription className="font-light mt-2 text-sm">{evt.description ? evt.description.substring(0, 100) + '...' : ''}</CardDescription>
                  <div className="mt-4 text-xs text-muted-foreground space-y-1">
                    <p>📍 {evt.city} {evt.neighborhood ? `• ${evt.neighborhood}` : ""}</p>
                    {evt.reward && <p>🎁 {evt.reward}</p>}
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedEvent(evt)}
                    className="w-full rounded-none border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors uppercase tracking-widest text-xs"
                  >
                    Voir & Postuler
                  </Button>
                </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif text-primary mb-6">Éditer mes mensurations</h2>
            <Card className="rounded-none shadow-none border-border/40 p-8 bg-white">
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Taille (cm)</label>
                    <input type="number" className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: 175" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Poids (kg)</label>
                    <input type="number" className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: 60" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Couleur de peau / Carnation</label>
                  <input type="text" className="w-full border-b border-border focus:border-primary outline-none py-2 bg-transparent transition-colors" placeholder="Ex: Ébène, Métisse..." />
                </div>
                <Button className="rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-widest text-xs py-6 w-full mt-4">Enregistrer les mensurations</Button>
              </form>
            </Card>
          </div>
        )}

        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-serif text-primary mb-6">Suivi de vos candidatures</h2>
            <Card className="rounded-none shadow-none border-border/40 bg-white">
               {myApplications.length === 0 ? (
                 <div className="p-12 text-center text-muted-foreground font-light">
                   Vous n'avez pas encore postulé à un casting. Vos candidatures (En attente, Accepté, Refusé) apparaîtront ici.
                 </div>
               ) : (
                 <div className="space-y-0 divide-y divide-border/50">
                   {myApplications.map(app => (
                     <div key={app.id} className="p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                       <div>
                         <h4 className="font-bold text-primary text-lg font-serif">{app.event.title}</h4>
                         <p className="text-sm text-muted-foreground mt-1">Ville : {app.event.city}</p>
                       </div>
                       <Badge variant={app.status === 'ACCEPTED' ? 'default' : app.status === 'REJECTED' ? 'destructive' : 'outline'} className="rounded-none uppercase tracking-widest text-xs px-4 py-2">
                         {app.status === 'PENDING' ? 'En Attente' : app.status === 'ACCEPTED' ? 'Acceptée' : 'Refusée'}
                       </Badge>
                     </div>
                   ))}
                 </div>
               )}
            </Card>
          </div>
        )}

      </main>

      {/* Modal de Candidature */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <Card className="max-w-xl w-full rounded-none bg-white p-6 shadow-2xl relative">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary font-light"
            >
              Fermer ✕
            </button>
            <h2 className="text-2xl font-serif text-primary mb-2">Fiche de Casting</h2>
            <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
            
            <div className="bg-[#FCFBF9] p-4 border border-border/50 mb-6 text-sm font-light leading-relaxed">
              {selectedEvent.photo && (
                <img src={selectedEvent.photo} alt={selectedEvent.title} className="w-full h-48 object-cover mb-4 border border-border/30" />
              )}
              <p className="mb-2"><strong>Date de l'événement :</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Lieu :</strong> {selectedEvent.city} {selectedEvent.neighborhood ? `(${selectedEvent.neighborhood})` : ''}</p>
              {selectedEvent.candidateType && <p className="mb-2"><strong>Profil recherché :</strong> {selectedEvent.candidateType}</p>}
              {selectedEvent.reward && <p className="mb-2"><strong>Rémunération / Lots :</strong> {selectedEvent.reward}</p>}
              <p className="mb-2"><strong>Description :</strong><br/>{selectedEvent.description || "-"}</p>
              {selectedEvent.requirements && <p><strong>Critères exigés :</strong><br/>{selectedEvent.requirements}</p>}
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Motivations & Atouts (Optionnel)</label>
                <textarea 
                  className="w-full border border-border focus:border-primary outline-none p-3 bg-transparent transition-colors min-h-[120px] text-sm"
                  placeholder="Expliquez en quelques mots pourquoi vous correspondez à ce casting..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" isLoading={isLoading} className="w-full rounded-none bg-primary hover:bg-primary/90 text-white uppercase tracking-widest text-xs py-6">
                Confirmer ma candidature
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
