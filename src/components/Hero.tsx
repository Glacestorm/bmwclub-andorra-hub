import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Image as ImageIcon } from "lucide-react";
import heroImage from "@/assets/hero-bmw.jpg";

interface HeroProps {
  language: string;
}

const translations = {
  ca: {
    title: "BMW Club Andorra",
    subtitle: "Passió per la Conducció als Pirineus",
    description: "Uneix-te al club de propietaris i entusiastes de BMW a Andorra. Descobreix les millors rutes, comparteix experiències i viu la passió per la marca.",
    joinNow: "Fes-te Soci Ara",
    discover: "Descobreix Més",
    latestOutings: "Últimes Sortides",
    viewGallery: "Veure Galeria",
  },
  es: {
    title: "BMW Club Andorra",
    subtitle: "Pasión por la Conducción en los Pirineos",
    description: "Únete al club de propietarios y entusiastas de BMW en Andorra. Descubre las mejores rutas, comparte experiencias y vive la pasión por la marca.",
    joinNow: "Hazte Socio Ahora",
    discover: "Descubrir Más",
    latestOutings: "Últimas Salidas",
    viewGallery: "Ver Galería",
  },
  fr: {
    title: "BMW Club Andorra",
    subtitle: "Passion pour la Conduite dans les Pyrénées",
    description: "Rejoignez le club de propriétaires et passionnés de BMW en Andorre. Découvrez les meilleurs itinéraires, partagez des expériences et vivez la passion pour la marque.",
    joinNow: "Devenir Membre",
    discover: "Découvrir Plus",
    latestOutings: "Dernières Sorties",
    viewGallery: "Voir Galerie",
  },
  en: {
    title: "BMW Club Andorra",
    subtitle: "Driving Passion in the Pyrenees",
    description: "Join the BMW owners and enthusiasts club in Andorra. Discover the best routes, share experiences and live the passion for the brand.",
    joinNow: "Join Now",
    discover: "Discover More",
    latestOutings: "Latest Outings",
    viewGallery: "View Gallery",
  },
};

export const Hero = ({ language }: HeroProps) => {
  const t = translations[language as keyof typeof translations];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="BMW in Andorra mountains"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t.title}
            </h1>
            <p className="text-2xl md:text-3xl font-light text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {t.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {t.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link to="/contacte">
              <Button variant="hero" size="lg" className="w-full sm:w-auto gap-2">
                {t.joinNow}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/el-club">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                {t.discover}
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Link to="/galeria/sortides/2026">
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6 transition-all hover:bg-white/20 hover:scale-105">
                <Calendar className="h-8 w-8 text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold text-lg">{t.latestOutings}</h3>
                <p className="text-white/70 text-sm mt-2">Descobreix les últimes sortides i trobades del club</p>
              </div>
            </Link>
            <Link to="/galeria">
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6 transition-all hover:bg-white/20 hover:scale-105">
                <ImageIcon className="h-8 w-8 text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold text-lg">{t.viewGallery}</h3>
                <p className="text-white/70 text-sm mt-2">Reviu els millors moments del club</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};
