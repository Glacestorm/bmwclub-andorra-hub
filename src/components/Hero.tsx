import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Image as ImageIcon } from "lucide-react";
import heroImage from "@/assets/hero-bmw.jpg";
import { LanguageCode } from "@/lib/i18n";

interface HeroProps {
  language: LanguageCode;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    title: "BMW Club Andorra",
    subtitle: "Passió per la Conducció als Pirineus",
    description: "Uneix-te al club de propietaris i entusiastes de BMW a Andorra. Descobreix les millors rutes, comparteix experiències i viu la passió per la marca.",
    joinNow: "Fes-te Soci Ara",
    discover: "Descobreix Més",
    latestOutings: "Calendari 2026",
    viewGallery: "Veure Galeria",
    latestOutingsDesc: "Descobreix el calendari viu, la meteo i les properes sortides del club",
    galleryDesc: "Reviu els millors moments del club",
  },
  es: {
    title: "BMW Club Andorra",
    subtitle: "Pasión por la Conducción en los Pirineos",
    description: "Únete al club de propietarios y entusiastas de BMW en Andorra. Descubre las mejores rutas, comparte experiencias y vive la pasión por la marca.",
    joinNow: "Hazte Socio Ahora",
    discover: "Descubrir Más",
    latestOutings: "Calendario 2026",
    viewGallery: "Ver Galería",
    latestOutingsDesc: "Descubre el calendario vivo, la meteo y las próximas salidas del club",
    galleryDesc: "Revive los mejores momentos del club",
  },
  fr: {
    title: "BMW Club Andorra",
    subtitle: "Passion pour la conduite dans les Pyrénées",
    description: "Rejoignez le club des propriétaires et passionnés de BMW en Andorre. Découvrez les meilleurs itinéraires, partagez des expériences et vivez la passion pour la marque.",
    joinNow: "Devenir membre",
    discover: "Découvrir plus",
    latestOutings: "Calendrier 2026",
    viewGallery: "Voir la galerie",
    latestOutingsDesc: "Découvrez le calendrier vivant, la météo et les prochaines sorties du club",
    galleryDesc: "Revivez les meilleurs moments du club",
  },
  en: {
    title: "BMW Club Andorra",
    subtitle: "Driving passion in the Pyrenees",
    description: "Join the BMW owners and enthusiasts club in Andorra. Discover the best routes, share experiences and live the passion for the brand.",
    joinNow: "Join now",
    discover: "Discover more",
    latestOutings: "Calendar 2026",
    viewGallery: "View gallery",
    latestOutingsDesc: "Discover the live calendar, weather and upcoming club outings",
    galleryDesc: "Relive the club's best moments",
  },
  pt: {
    title: "BMW Club Andorra",
    subtitle: "Paixão pela condução nos Pirenéus",
    description: "Junte-se ao clube de proprietários e entusiastas BMW em Andorra. Descubra as melhores rotas, partilhe experiências e viva a paixão pela marca.",
    joinNow: "Torne-se sócio",
    discover: "Descobrir mais",
    latestOutings: "Calendário 2026",
    viewGallery: "Ver galeria",
    latestOutingsDesc: "Descubra o calendário ativo, a meteorologia e os próximos passeios do clube",
    galleryDesc: "Reviva os melhores momentos do clube",
  },
  de: {
    title: "BMW Club Andorra",
    subtitle: "Fahrleidenschaft in den Pyrenäen",
    description: "Treten Sie dem Club der BMW-Besitzer und Enthusiasten in Andorra bei. Entdecken Sie die besten Routen, teilen Sie Erlebnisse und leben Sie die Leidenschaft für die Marke.",
    joinNow: "Jetzt Mitglied werden",
    discover: "Mehr entdecken",
    latestOutings: "Kalender 2026",
    viewGallery: "Galerie ansehen",
    latestOutingsDesc: "Entdecken Sie den aktuellen Kalender, das Wetter und die nächsten Club-Ausfahrten",
    galleryDesc: "Erleben Sie die besten Momente des Clubs erneut",
  },
  ru: {
    title: "BMW Club Andorra",
    subtitle: "Страсть к вождению в Пиренеях",
    description: "Присоединяйтесь к клубу владельцев и поклонников BMW в Андорре. Откройте лучшие маршруты, делитесь впечатлениями и живите страстью к бренду.",
    joinNow: "Стать участником",
    discover: "Узнать больше",
    latestOutings: "Календарь 2026",
    viewGallery: "Открыть галерею",
    latestOutingsDesc: "Узнайте о живом календаре, погоде и ближайших выездах клуба",
    galleryDesc: "Переживите лучшие моменты клуба заново",
  },
};

export const Hero = ({ language }: HeroProps) => {
  const t = translations[language];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="BMW in Andorra mountains" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">{t.title}</h1>
            <p className="text-2xl md:text-3xl font-light text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">{t.subtitle}</p>
          </div>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">{t.description}</p>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Link to="/calendari/2026">
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6 transition-all hover:bg-white/20 hover:scale-105">
                <Calendar className="h-8 w-8 text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold text-lg">{t.latestOutings}</h3>
                <p className="text-white/70 text-sm mt-2">{t.latestOutingsDesc}</p>
              </div>
            </Link>
            <Link to="/galeria">
              <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6 transition-all hover:bg-white/20 hover:scale-105">
                <ImageIcon className="h-8 w-8 text-white mb-3 mx-auto" />
                <h3 className="text-white font-semibold text-lg">{t.viewGallery}</h3>
                <p className="text-white/70 text-sm mt-2">{t.galleryDesc}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};
