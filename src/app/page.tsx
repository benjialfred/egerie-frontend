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
        {/* Background Image with Overlay and Animation */}
        <div 
          className="absolute inset-0 z-0 opacity-70 bg-cover bg-[center_top_20%] bg-no-repeat animate-slow-pan"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/30 to-black/80" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Floating Strong Messages */}
          <div className="absolute -left-20 top-0 hidden xl:block">
            <p className="text-[#E2C779] font-serif text-2xl rotate-[-15deg] opacity-70 animate-float-text" style={{ animationDelay: '0s' }}>L'Excellence Africaine</p>
          </div>
          <div className="absolute -right-20 top-20 hidden xl:block">
            <p className="text-white font-serif text-2xl rotate-[10deg] opacity-70 animate-float-text" style={{ animationDelay: '2s' }}>Beauté Sans Frontières</p>
          </div>

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
      <section className="py-24 px-8 bg-black border-t border-white/10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C69C3B]/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Decorative Runway Background Image with Animation */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat animate-slow-pan"
          style={{ backgroundImage: "url('/images/runway.png')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/70 to-black" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Floating Strong Message for Runway */}
          <div className="absolute left-1/2 -translate-x-1/2 top-32 hidden md:block w-full text-center pointer-events-none">
             <p className="text-[#C69C3B] font-serif text-3xl opacity-30 animate-float-text tracking-[0.5em] uppercase">Brillez sur le Podium</p>
          </div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Pourquoi rejoindre l'Élite ?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C69C3B] to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Models Card */}
            <div className="p-10 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors rounded-2xl group">
              <h2 className="text-3xl font-serif text-[#C69C3B] mb-4 group-hover:scale-105 transition-transform origin-left">Pour les Modèles</h2>
              <p className="text-gray-300 font-light mb-8 leading-relaxed">Boostez votre visibilité dans notre annuaire VIP et postulez en un clic aux castings les plus fermés de Douala et Yaoundé.</p>
              <ul className="space-y-5 text-sm text-white font-medium tracking-wide uppercase">
                <li className="flex items-center gap-4"><span className="text-[#C69C3B] bg-[#C69C3B]/20 p-2 rounded-full"><Sparkles className="w-4 h-4" /></span> Portfolio Professionnel</li>
                <li className="flex items-center gap-4"><span className="text-[#C69C3B] bg-[#C69C3B]/20 p-2 rounded-full"><Star className="w-4 h-4" /></span> Accès aux Castings Privés</li>
                <li className="flex items-center gap-4"><span className="text-[#C69C3B] bg-[#C69C3B]/20 p-2 rounded-full"><Users className="w-4 h-4" /></span> Algorithme de Mise en Avant</li>
              </ul>
            </div>
            
            {/* Organizers Card */}
            <div className="p-10 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors rounded-2xl group">
              <h2 className="text-3xl font-serif text-[#C69C3B] mb-4 group-hover:scale-105 transition-transform origin-left">Pour les Organisateurs</h2>
              <p className="text-gray-300 font-light mb-8 leading-relaxed">Trouvez les perles rares de demain grâce à un ciblage ultra-précis par quartier et filtre de mensurations.</p>
              <ul className="space-y-5 text-sm text-white font-medium tracking-wide uppercase">
                <li className="flex items-center gap-4"><span className="text-[#C69C3B] bg-[#C69C3B]/20 p-2 rounded-full"><ShieldCheck className="w-4 h-4" /></span> Ciblage Premium (Bonapriso, Bastos...)</li>
                <li className="flex items-center gap-4"><span className="text-[#C69C3B] bg-[#C69C3B]/20 p-2 rounded-full"><Users className="w-4 h-4" /></span> Gestion Kanban Avancée</li>
                <li className="flex items-center gap-4"><span className="text-[#C69C3B] bg-[#C69C3B]/20 p-2 rounded-full"><Star className="w-4 h-4" /></span> Monétisation des Votes en Ligne</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feed VIP */}
      <section className="py-24 px-8 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-serif text-white mb-2">Castings Exclusifs</h2>
              <p className="text-[#C69C3B] font-light tracking-widest uppercase text-sm">Opportunités à la une cette semaine.</p>
            </div>
            <Link href="/auth">
              <Button variant="link" className="text-white hover:text-[#C69C3B] p-0 font-medium uppercase tracking-widest flex items-center gap-2">Découvrir l'annuaire <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fashion Week Douala", location: "Douala - Bonapriso", date: "15 Oct 2026", type: "Ciblage Premium" },
              { title: "Élection Miss Littoral", location: "Douala - Akwa", date: "22 Nov 2026", type: "Public" },
              { title: "Égérie Marque Luxe", location: "Yaoundé - Bastos", date: "05 Dec 2026", type: "Ciblage Premium" }
            ].map((casting, i) => (
              <Card key={i} className="rounded-2xl border-white/10 hover:shadow-[0_0_30px_rgba(198,156,59,0.15)] hover:border-[#C69C3B]/50 transition-all duration-500 bg-black overflow-hidden group">
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <Badge variant="outline" className={`rounded-full text-[10px] tracking-widest uppercase px-3 py-1 ${casting.type === "Ciblage Premium" ? "border-[#C69C3B] text-[#C69C3B]" : "border-white/30 text-gray-300"}`}>
                      {casting.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-serif text-white group-hover:text-[#C69C3B] transition-colors">{casting.title}</CardTitle>
                  <CardDescription className="font-light mt-2 text-gray-400 flex items-center gap-2">
                    <Star className="w-3 h-3 text-[#C69C3B]" /> {casting.location}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-[#C69C3B] hover:border-[#C69C3B] hover:text-black transition-all tracking-widest uppercase text-xs h-12">Postuler Maintenant</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
