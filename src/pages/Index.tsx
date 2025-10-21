import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Car, Bike, Mountain, Users, Calendar, Image as ImageIcon } from "lucide-react";
import motoImage from "@/assets/moto-bmw.jpg";

const Index = () => {
  const [language, setLanguage] = useState("ca");

  const translations = {
    ca: {
      whatWeDo: "Què Fem?",
      whatWeDoDesc: "Descobreix les nostres activitats i experiències",
      routes: "Rutes Espectaculars",
      routesDesc: "Explora els millors ports de muntanya i carreteres dels Pirineus amb el teu BMW",
      events: "Esdeveniments del Club",
      eventsDesc: "Reunions, sortides en grup i trobades amb altres membres del club",
      community: "Comunitat Activa",
      communityDesc: "Comparteix la teva passió amb altres entusiastes de BMW a Andorra",
      gallery: "Galeria de Moments",
      galleryDesc: "Reviu els millors moments de les nostres sortides i esdeveniments",
      forCars: "Per Cotxes",
      forMotos: "Per Motos",
      forSUVs: "Per SUVs",
      exploreRoutes: "Explorar Rutes",
      viewEvents: "Veure Esdeveniments",
      joinCommunity: "Uneix-te a la Comunitat",
      viewGallery: "Veure Galeria",
      whyJoin: "Per què Unir-te?",
      whyJoinDesc: "Avantatges de ser membre del BMW Club Andorra",
    },
    es: {
      whatWeDo: "¿Qué Hacemos?",
      whatWeDoDesc: "Descubre nuestras actividades y experiencias",
      routes: "Rutas Espectaculares",
      routesDesc: "Explora los mejores puertos de montaña y carreteras de los Pirineos con tu BMW",
      events: "Eventos del Club",
      eventsDesc: "Reuniones, salidas en grupo y encuentros con otros miembros del club",
      community: "Comunidad Activa",
      communityDesc: "Comparte tu pasión con otros entusiastas de BMW en Andorra",
      gallery: "Galería de Momentos",
      galleryDesc: "Revive los mejores momentos de nuestras salidas y eventos",
      forCars: "Para Coches",
      forMotos: "Para Motos",
      forSUVs: "Para SUVs",
      exploreRoutes: "Explorar Rutas",
      viewEvents: "Ver Eventos",
      joinCommunity: "Únete a la Comunidad",
      viewGallery: "Ver Galería",
      whyJoin: "¿Por qué Unirte?",
      whyJoinDesc: "Ventajas de ser miembro del BMW Club Andorra",
    },
    fr: {
      whatWeDo: "Ce Que Nous Faisons?",
      whatWeDoDesc: "Découvrez nos activités et expériences",
      routes: "Itinéraires Spectaculaires",
      routesDesc: "Explorez les meilleurs cols de montagne et routes des Pyrénées avec votre BMW",
      events: "Événements du Club",
      eventsDesc: "Réunions, sorties en groupe et rencontres avec d'autres membres du club",
      community: "Communauté Active",
      communityDesc: "Partagez votre passion avec d'autres passionnés de BMW en Andorre",
      gallery: "Galerie de Moments",
      galleryDesc: "Revivez les meilleurs moments de nos sorties et événements",
      forCars: "Pour Voitures",
      forMotos: "Pour Motos",
      forSUVs: "Pour SUVs",
      exploreRoutes: "Explorer les Itinéraires",
      viewEvents: "Voir les Événements",
      joinCommunity: "Rejoindre la Communauté",
      viewGallery: "Voir la Galerie",
      whyJoin: "Pourquoi Nous Rejoindre?",
      whyJoinDesc: "Avantages d'être membre du BMW Club Andorra",
    },
    en: {
      whatWeDo: "What We Do?",
      whatWeDoDesc: "Discover our activities and experiences",
      routes: "Spectacular Routes",
      routesDesc: "Explore the best mountain passes and roads of the Pyrenees with your BMW",
      events: "Club Events",
      eventsDesc: "Meetings, group outings and gatherings with other club members",
      community: "Active Community",
      communityDesc: "Share your passion with other BMW enthusiasts in Andorra",
      gallery: "Gallery of Moments",
      galleryDesc: "Relive the best moments of our outings and events",
      forCars: "For Cars",
      forMotos: "For Motorcycles",
      forSUVs: "For SUVs",
      exploreRoutes: "Explore Routes",
      viewEvents: "View Events",
      joinCommunity: "Join the Community",
      viewGallery: "View Gallery",
      whyJoin: "Why Join?",
      whyJoinDesc: "Benefits of being a member of BMW Club Andorra",
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <Hero language={language} />

      {/* What We Do Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.whatWeDo}</h2>
            <p className="text-xl text-muted-foreground">{t.whatWeDoDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Routes Card */}
            <Card className="p-6 hover:shadow-elegant transition-all group cursor-pointer">
              <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base">
                <Mountain className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.routes}</h3>
              <p className="text-muted-foreground mb-4">{t.routesDesc}</p>
              <Link to="/rutes">
                <Button variant="link" className="p-0">
                  {t.exploreRoutes} →
                </Button>
              </Link>
            </Card>

            {/* Events Card */}
            <Card className="p-6 hover:shadow-elegant transition-all group cursor-pointer">
              <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.events}</h3>
              <p className="text-muted-foreground mb-4">{t.eventsDesc}</p>
              <Link to="/calendari">
                <Button variant="link" className="p-0">
                  {t.viewEvents} →
                </Button>
              </Link>
            </Card>

            {/* Community Card */}
            <Card className="p-6 hover:shadow-elegant transition-all group cursor-pointer">
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

            {/* Gallery Card */}
            <Card className="p-6 hover:shadow-elegant transition-all group cursor-pointer">
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
      </section>

      {/* Featured Image Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">{t.routes}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.routesDesc}
              </p>
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
              <Link to="/rutes">
                <Button variant="hero" size="lg">
                  {t.exploreRoutes}
                </Button>
              </Link>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-sm overflow-hidden shadow-elegant">
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
