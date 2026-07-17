import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-[#FCFBF9]">
        <Badge variant="gold" className="mb-6 py-1 px-4 text-sm font-light tracking-wide rounded-none uppercase">Édition 2026 - Inscriptions Ouvertes</Badge>
        <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6 tracking-tight leading-tight">
          Le hub exclusif des <br/>talents et concours de beauté.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-10 font-light">
          La première marketplace à double face connectant l'élite du mannequinat local aux 
          comités d'organisation les plus prestigieux du Cameroun.
        </p>
        <div className="flex gap-4">
          <Link href="/auth">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 font-light uppercase tracking-wide">Rejoindre l'Élite</Button>
          </Link>
          <Link href="/auth">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-none px-8 font-light uppercase tracking-wide">Créer un Casting</Button>
          </Link>
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
