"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function EventPublicPage() {
  const params = useParams();
  const { id } = params;
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/api/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleVote = async (applicationId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Veuillez vous connecter pour voter.");
      window.location.href = "/auth";
      return;
    }

    setIsVoting(true);
    try {
      // Tentative de vote gratuit
      await axios.post("http://localhost:3005/api/votes", {
        eventId: id,
        applicationId,
        isPaid: false
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("🎉 Votre vote gratuit a été pris en compte !");
      fetchEvent(); // Refresh stats
    } catch (err: any) {
      if (err.response?.data?.requiresPayment) {
        // Lancer la modale de paiement (Simulation Nelsius Pay)
        const confirmPayment = window.confirm(`Vous avez déjà utilisé votre vote gratuit.\nUn vote supplémentaire coûte 500 FCFA via Nelsius Pay.\nVoulez-vous payer pour ajouter un vote ?`);
        if (confirmPayment) {
          try {
            await axios.post("http://localhost:3005/api/votes", {
              eventId: id,
              applicationId,
              isPaid: true
            }, { headers: { Authorization: `Bearer ${token}` } });
            alert("💳 Paiement Nelsius Pay validé. Votre vote supplémentaire est comptabilisé !");
            fetchEvent();
          } catch (paymentErr) {
            alert("Erreur lors de l'enregistrement du vote payant.");
          }
        }
      } else {
        alert(err.response?.data?.error || "Erreur lors du vote.");
      }
    } finally {
      setIsVoting(false);
    }
  };

  const handleShare = (candidateName: string) => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert(`Lien de partage copié ! Encouragez vos amis à voter pour ${candidateName}.`);
  };

  if (isLoading) return <div className="min-h-screen text-center pt-24">Chargement...</div>;
  if (!event) return <div className="min-h-screen text-center pt-24">Événement introuvable.</div>;

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          {event.photo && <img src={event.photo} alt={event.title} className="w-full h-[400px] object-cover mb-8 rounded-none shadow-xl" />}
          <Badge variant="outline" className="mb-4">{event.votingStatus === 'OPEN' ? 'VOTES OUVERTS' : 'VOTES FERMÉS'}</Badge>
          <h1 className="text-5xl font-serif text-primary mb-4">{event.title}</h1>
          <p className="text-muted-foreground text-lg">{event.description}</p>
        </div>

        {event.votingStatus === 'OPEN' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {event.applications.map((app: any) => (
              <div key={app.id} className="bg-white border border-border/50 p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow relative">
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center rounded-full font-bold">
                  {app.votes?.length || 0}
                </div>
                
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-accent">
                  {app.model.profile?.photos?.[0] ? (
                    <img src={app.model.profile.photos[0]} alt={app.model.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Pas de photo</div>
                  )}
                </div>
                
                <h3 className="text-2xl font-serif text-primary mb-2">{app.model.firstName} {app.model.lastName}</h3>
                <p className="text-sm text-muted-foreground mb-6 h-12 overflow-hidden">{app.model.profile?.bio || "Aucune biographie."}</p>
                
                <div className="w-full space-y-3 mt-auto">
                  <Button 
                    onClick={() => handleVote(app.id)} 
                    disabled={isVoting}
                    className="w-full rounded-none bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-widest uppercase"
                  >
                    Voter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleShare(app.model.firstName)}
                    className="w-full rounded-none tracking-widest uppercase text-xs"
                  >
                    Partager (Social)
                  </Button>
                </div>
              </div>
            ))}
            {event.applications.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-12">Aucun candidat n'a encore été sélectionné pour ce casting.</p>
            )}
          </div>
        ) : (
          <div className="bg-red-50 text-red-500 border border-red-200 p-8 text-center text-xl font-serif">
            Les votes ne sont pas encore ouverts ou sont terminés pour cet événement.
          </div>
        )}
      </div>
    </div>
  );
}
