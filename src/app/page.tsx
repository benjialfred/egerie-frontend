import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles, ArrowRight, Star, ShieldCheck, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Premium */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-32 overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Badge variant="outline" className="mb-8 py-1.5 px-6 text-xs font-medium tracking-[0.2em] rounded-full border-[#C69C3B]/50 text-[#C69C3B] bg-black/50 backdrop-blur-md uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(198,156,59,0.2)]">
            <Sparkles className="w-3 h-3" />
            L'Élite du Mannequinat Africain
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
            Révélez votre potentiel.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C69C3B] via-[#E2C779] to-[#C69C3B]">
              Devenez l'Égérie.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 font-light leading-relaxed drop-shadow-md">
            La plateforme privée connectant les visages les plus prometteurs du Cameroun aux agences et comités d'organisation les plus prestigieux.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link href="/auth" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-gradient-to-r from-[#C69C3B] to-[#b38a32] hover:from-[#b38a32] hover:to-[#9a7527] text-white rounded-none px-10 h-14 font-semibold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(198,156,59,0.4)] transition-all hover:scale-105 border-none flex items-center gap-2">
                Rejoindre l'Élite <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-black rounded-none px-10 h-14 font-medium uppercase tracking-widest text-sm backdrop-blur-sm transition-all bg-white/5 flex items-center gap-2">
                Organiser un Casting
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Stats Glassmorphism */}
        <div className="hidden lg:flex absolute bottom-8 w-full max-w-5xl justify-between px-8 z-10">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
            <div className="bg-[#C69C3B]/20 p-3 rounded-full"><Users className="w-6 h-6 text-[#C69C3B]" /></div>
            <div className="text-left text-white">
              <p className="text-2xl font-bold">5,000+</p>
              <p className="text-xs uppercase tracking-widest text-gray-300">Modèles Actifs</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
            <div className="bg-[#C69C3B]/20 p-3 rounded-full"><Star className="w-6 h-6 text-[#C69C3B]" /></div>
            <div className="text-left text-white">
              <p className="text-2xl font-bold">150+</p>
              <p className="text-xs uppercase tracking-widest text-gray-300">Castings VIP</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
            <div className="bg-[#C69C3B]/20 p-3 rounded-full"><ShieldCheck className="w-6 h-6 text-[#C69C3B]" /></div>
            <div className="text-left text-white">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs uppercase tracking-widest text-gray-300">Agences Vérifiées</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-8 bg-white border-t border-border/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="p-8 border border-border/50 bg-[#FCFBF9]/50">
            <h2 className="text-2xl font-serif text-primary mb-4">Pour les Modèles</h2>
            <p className="text-muted-foreground font-light mb-6">Boostez votre visibilité dans notre annuaire VIP et postulez en un clic aux castings de Douala et Yaoundé.</p>
            <ul className="space-y-4 text-sm text-primary font-medium tracking-wide uppercase">
              <li className="flex items-center gap-3"><span className="text-accent">◆</span> Portfolio Professionnel</li>
              <li className="flex items-center gap-3"><span className="text-accent">◆</span> Accès aux Castings Privés</li>
              <li className="flex items-center gap-3"><span className="text-accent">◆</span> Algorithme de Mise en Avant</li>
            </ul>
          </div>
          <div className="p-8 border border-border/50 bg-[#FCFBF9]/50">
            <h2 className="text-2xl font-serif text-primary mb-4">Pour les Organisateurs</h2>
            <p className="text-muted-foreground font-light mb-6">Trouvez les perles rares de demain grâce à un ciblage ultra-précis par quartier et filtre de mensurations.</p>
            <ul className="space-y-4 text-sm text-primary font-medium tracking-wide uppercase">
              <li className="flex items-center gap-3"><span className="text-accent">◆</span> Ciblage Premium (Bonapriso, Akwa)</li>
              <li className="flex items-center gap-3"><span className="text-accent">◆</span> Gestion Kanban des Candidats</li>
              <li className="flex items-center gap-3"><span className="text-accent">◆</span> Monétisation des Inscriptions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feed VIP */}
      <section className="py-20 px-8 bg-[#FCFBF9] border-t border-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-2">Castings Exclusifs</h2>
              <p className="text-muted-foreground font-light">Opportunités à la une cette semaine.</p>
            </div>
            <Link href="/auth">
              <Button variant="link" className="text-accent hover:text-accent/80 p-0 font-medium uppercase tracking-wide">Découvrir l'annuaire &rarr;</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fashion Week Douala", location: "Douala - Bonapriso", date: "15 Oct 2026", type: "Ciblage Premium" },
              { title: "Élection Miss Littoral", location: "Douala - Akwa", date: "22 Nov 2026", type: "Public" },
              { title: "Égérie Marque Luxe", location: "Yaoundé - Bastos", date: "05 Dec 2026", type: "Ciblage Premium" }
            ].map((casting, i) => (
              <Card key={i} className="rounded-none border-border/60 hover:shadow-xl hover:border-accent/40 transition-all duration-300 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant={casting.type === "Ciblage Premium" ? "gold" : "outline"} className="rounded-none text-[10px] tracking-widest uppercase px-2 py-1">
                      {casting.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-serif text-primary">{casting.title}</CardTitle>
                  <CardDescription className="font-light mt-2">{casting.location}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-none border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors">Postuler</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
