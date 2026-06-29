import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Car, Bike, Mountain, Users, Calendar, Image as ImageIcon, ShieldCheck } from "lucide-react";
import motoImage from "@/assets/moto-bmw.jpg";

const Index = () => {
  const [language, setLanguage] = useState("ca");

  const translations = {
    ca: {
      whatWeDo: "Benvingut/da al BMW Club Andorra",
      whatWeDoDesc: "Comunitat, trobades, galeria i experiències per a propietaris i aficionats de la marca.",
      clubValues: "Passió, comunitat i carretera",
      sponsors: "Patrocinadors del Club",
      sponsorsDesc: "Descobreix les empreses i marques que donen suport a l’activitat del BMW Club Andorra",
      outings: "Últimes Sortides",
      outingsDesc: "Reviu les trobades, esmorzars i activitats més recents de la comunitat",
      community: "Comunitat Activa",
      communityDesc: "Comparteix la teva passió amb altres entusiastes de BMW a Andorra",
      gallery: "Galeria de Moments",
      galleryDesc: "Reviu els millors moments de les nostres sortides i esdeveniments",
      forCars: "Per Cotxes",
      forMotos: "Per Motos",
      forSUVs: "Per SUVs",
      viewSponsors: "Veure Patrocinadors",
      viewOutings: "Veure Sortides",
      joinCommunity: "Descobrir el Club",
      viewGallery: "Veure Galeria",
    },
    es: {
      whatWeDo: "Bienvenido/a al BMW Club Andorra",
      whatWeDoDesc: "Comunidad, encuentros, galería y experiencias para propietarios y aficionados de la marca.",
      clubValues: "Pasión, comunidad y carretera",
      sponsors: "Patrocinadores del Club",
      sponsorsDesc: "Descubre las empresas y marcas que apoyan la actividad del BMW Club Andorra",
      outings: "Últimas Salidas",
      outingsDesc: "Revive los encuentros, desayunos y actividades más recientes de la comunidad",
      community: "Comunidad Activa",
      communityDesc: "Comparte tu pasión con otros entusiastas de BMW en Andorra",
      gallery: "Galería de Momentos",
      galleryDesc: "Revive los mejores momentos de nuestras salidas y eventos",
      forCars: "Para Coches",
      forMotos: "Para Motos",
      forSUVs: "Para SUVs",
      viewSponsors: "Ver Patrocinadores",
      viewOutings: "Ver Salidas",
      joinCommunity: "Descubrir el Club",
      viewGallery: "Ver Galería",
    },
    fr: {
      whatWeDo: "Bienvenue au BMW Club Andorra",
      whatWeDoDesc: "Communauté, rencontres, galerie et expériences pour les propriétaires et passionnés de la marque.",
      clubValues: "Passion, communauté et route",
      sponsors: "Sponsors du Club",
      sponsorsDesc: "Découvrez les entreprises et marques qui soutiennent l’activité du BMW Club Andorra",
      outings: "Dernières Sorties",
      outingsDesc: "Revivez les rencontres, petits-déjeuners et activités récentes de la communauté",
      community: "Communauté Active",
      communityDesc: "Partagez votre passion avec d'autres passionnés de BMW en Andorre",
      gallery: "Galerie de Moments",
      galleryDesc: "Revivez les meilleurs moments de nos sorties et événements",
      forCars: "Pour Voitures",
      forMotos: "Pour Motos",
      forSUVs: "Pour SUVs",
      viewSponsors: "Voir les Sponsors",
      viewOutings: "Voir les Sorties",
      joinCommunity: "Découvrir le Club",
      viewGallery: "Voir la Galerie",
    },
    en: {
      whatWeDo: "Welcome to BMW Club Andorra",
      whatWeDoDesc: "Community, meetups, gallery and experiences for BMW owners and enthusiasts.",
      clubValues: "Passion, community and road",
      sponsors: "Club Sponsors",
      sponsorsDesc: "Discover the companies and brands that support BMW Club Andorra activities",
      outings: "Latest Outings",
      outingsDesc: "Relive the most recent meetups, breakfasts and club activities",
      community: "Active Community",
      communityDesc: "Share your passion with other BMW enthusiasts in Andorra",
      gallery: "Gallery of Moments",
      galleryDesc: "Relive the best moments of our outings and events",
      forCars: "For Cars",
      forMotos: "For Motorcycles",
      forSUVs: "For SUVs",
      viewSponsors: "View Sponsors",
      viewOutings: "View Outings",
      joinCommunity: "Discover the Club",
      viewGallery: "View Gallery",
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar language={language} setLanguage={setLanguage} />

      <Hero language={language} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-[28px] border border-border bg-white p-8 md:p-12 shadow-elegant">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary mb-5">
                <ShieldCheck className="h-4 w-4" />
                {t.clubValues}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.whatWeDo}</h2>
              <p className="text-xl text-muted-foreground">{t.whatWeDoDesc}</p>
              <p className="text-base md:text-lg text-muted-foreground mt-6 leading-relaxed">
                Som una comunitat de propietaris i aficionats de BMW que comparteix passió per la marca, la conducció i les experiències a la carretera. Aquí trobaràs trobades, galeria i vida de club.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base">
                  <Mountain className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.sponsors}</h3>
                <p className="text-muted-foreground mb-4">{t.sponsorsDesc}</p>
                <Link to="/patrocinadors">
                  <Button variant="link" className="p-0">
                    {t.viewSponsors} →
                  </Button>
                </Link>
              </Card>

              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base">
                  <Calendar className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.outings}</h3>
                <p className="text-muted-foreground mb-4">{t.outingsDesc}</p>
                <Link to="/galeria/sortides/2026">
                  <Button variant="link" className="p-0">
                    {t.viewOutings} →
                  </Button>
                </Link>
              </Card>

              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.community}</h3>
                <p className="text-muted-foreground mb-4">{t.communityDesc}</p>
                <Link to="/el-club">
                  <Button variant="link" className="p-0">
                    {t.joinCommunity} →
                  </Button>
                </Link>
              </Card>

              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base">
                  <ImageIcon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t.gallery}</h3>
                <p className="text-muted-foreground mb-4">{t.galleryDesc}</p>
                <Link to="/galeria">
                  <Button variant="link" className="p-0">
                    {t.viewGallery} →
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-primary">
                BMW Club Andorra
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">{t.outings}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">{t.outingsDesc}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-sm">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t.forCars}</span>
                </div>
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-sm">
                  <Bike className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t.forMotos}</span>
                </div>
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-sm">
                  <Mountain className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t.forSUVs}</span>
                </div>
              </div>
              <Link to="/galeria/sortides/2026">
                <Button variant="hero" size="lg">
                  {t.viewOutings}
                </Button>
              </Link>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-[28px] overflow-hidden shadow-elegant border border-white/60">
              <img
                src={motoImage}
                alt="BMW motorcycles in Andorra"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Index;
