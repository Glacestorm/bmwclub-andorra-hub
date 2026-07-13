import { Link } from "react-router-dom";
import { Car, Bike, Mountain, Users, Calendar, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Hero } from "@/components/Hero";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import motoImage from "@/assets/moto-bmw.jpg";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    whatWeDo: "Benvingut/da al BMW Club Andorra",
    whatWeDoDesc: "Comunitat, trobades, galeria, calendari viu i experiències per a propietaris i aficionats de la marca.",
    clubValues: "Passió, comunitat i carretera",
    sponsors: "Patrocinadors del Club",
    sponsorsDesc: "Descobreix les empreses i marques que donen suport a l’activitat del BMW Club Andorra",
    outings: "Calendari i sortides",
    outingsDesc: "Consulta el calendari públic, la meteo de ruta i els propers esdeveniments del club",
    community: "Comunitat activa",
    communityDesc: "Comparteix la teva passió amb altres entusiastes de BMW a Andorra",
    gallery: "Galeria de moments",
    galleryDesc: "Reviu els millors moments de les nostres sortides i esdeveniments",
    forCars: "Per cotxes",
    forMotos: "Per motos",
    forSUVs: "Per SUVs",
    viewSponsors: "Veure patrocinadors",
    viewOutings: "Obrir calendari",
    joinCommunity: "Descobrir el club",
    viewGallery: "Veure galeria",
    intro: "Som una comunitat de propietaris i aficionats de BMW que comparteix passió per la marca, la conducció i les experiències a la carretera. Aquí trobaràs trobades, galeria, calendari i vida de club.",
  },
  es: {
    whatWeDo: "Bienvenido/a al BMW Club Andorra",
    whatWeDoDesc: "Comunidad, encuentros, galería, calendario vivo y experiencias para propietarios y aficionados de la marca.",
    clubValues: "Pasión, comunidad y carretera",
    sponsors: "Patrocinadores del Club",
    sponsorsDesc: "Descubre las empresas y marcas que apoyan la actividad del BMW Club Andorra",
    outings: "Calendario y salidas",
    outingsDesc: "Consulta el calendario público, la meteo de ruta y los próximos eventos del club",
    community: "Comunidad activa",
    communityDesc: "Comparte tu pasión con otros entusiastas de BMW en Andorra",
    gallery: "Galería de momentos",
    galleryDesc: "Revive los mejores momentos de nuestras salidas y eventos",
    forCars: "Para coches",
    forMotos: "Para motos",
    forSUVs: "Para SUVs",
    viewSponsors: "Ver patrocinadores",
    viewOutings: "Abrir calendario",
    joinCommunity: "Descubrir el club",
    viewGallery: "Ver galería",
    intro: "Somos una comunidad de propietarios y aficionados de BMW que comparte pasión por la marca, la conducción y las experiencias en carretera. Aquí encontrarás encuentros, galería, calendario y vida de club.",
  },
  fr: {
    whatWeDo: "Bienvenue au BMW Club Andorra",
    whatWeDoDesc: "Communauté, rencontres, galerie, calendrier vivant et expériences pour les propriétaires et passionnés de la marque.",
    clubValues: "Passion, communauté et route",
    sponsors: "Sponsors du club",
    sponsorsDesc: "Découvrez les entreprises et les marques qui soutiennent l’activité du BMW Club Andorra",
    outings: "Calendrier et sorties",
    outingsDesc: "Consultez le calendrier public, la météo des trajets et les prochains événements du club",
    community: "Communauté active",
    communityDesc: "Partagez votre passion avec d’autres passionnés de BMW en Andorre",
    gallery: "Galerie de moments",
    galleryDesc: "Revivez les meilleurs moments de nos sorties et événements",
    forCars: "Pour voitures",
    forMotos: "Pour motos",
    forSUVs: "Pour SUVs",
    viewSponsors: "Voir les sponsors",
    viewOutings: "Ouvrir le calendrier",
    joinCommunity: "Découvrir le club",
    viewGallery: "Voir la galerie",
    intro: "Nous sommes une communauté de propriétaires et passionnés de BMW qui partagent la passion de la marque, de la conduite et des expériences sur la route. Vous trouverez ici des rencontres, une galerie, un calendrier et la vie du club.",
  },
  en: {
    whatWeDo: "Welcome to BMW Club Andorra",
    whatWeDoDesc: "Community, meetups, gallery, live calendar and experiences for BMW owners and enthusiasts.",
    clubValues: "Passion, community and road",
    sponsors: "Club sponsors",
    sponsorsDesc: "Discover the companies and brands that support BMW Club Andorra activities",
    outings: "Calendar and outings",
    outingsDesc: "Check the public calendar, route weather and the club's upcoming events",
    community: "Active community",
    communityDesc: "Share your passion with other BMW enthusiasts in Andorra",
    gallery: "Gallery of moments",
    galleryDesc: "Relive the best moments from our outings and events",
    forCars: "For cars",
    forMotos: "For motorcycles",
    forSUVs: "For SUVs",
    viewSponsors: "View sponsors",
    viewOutings: "Open calendar",
    joinCommunity: "Discover the club",
    viewGallery: "View gallery",
    intro: "We are a community of BMW owners and enthusiasts who share a passion for the brand, driving and road experiences. Here you will find meetups, a gallery, a calendar and club life.",
  },
  pt: {
    whatWeDo: "Bem-vindo ao BMW Club Andorra",
    whatWeDoDesc: "Comunidade, encontros, galeria, calendário vivo e experiências para proprietários e entusiastas da marca.",
    clubValues: "Paixão, comunidade e estrada",
    sponsors: "Patrocinadores do clube",
    sponsorsDesc: "Descubra as empresas e marcas que apoiam a atividade do BMW Club Andorra",
    outings: "Calendário e passeios",
    outingsDesc: "Consulte o calendário público, a meteorologia da rota e os próximos eventos do clube",
    community: "Comunidade ativa",
    communityDesc: "Partilhe a sua paixão com outros entusiastas BMW em Andorra",
    gallery: "Galeria de momentos",
    galleryDesc: "Reviva os melhores momentos dos nossos passeios e eventos",
    forCars: "Para carros",
    forMotos: "Para motos",
    forSUVs: "Para SUVs",
    viewSponsors: "Ver patrocinadores",
    viewOutings: "Abrir calendário",
    joinCommunity: "Descobrir o clube",
    viewGallery: "Ver galeria",
    intro: "Somos uma comunidade de proprietários e entusiastas BMW que partilha a paixão pela marca, pela condução e pelas experiências na estrada. Aqui encontrará encontros, galeria, calendário e vida de clube.",
  },
  de: {
    whatWeDo: "Willkommen beim BMW Club Andorra",
    whatWeDoDesc: "Community, Treffen, Galerie, Live-Kalender und Erlebnisse für BMW-Besitzer und Fans der Marke.",
    clubValues: "Leidenschaft, Community und Straße",
    sponsors: "Sponsoren des Clubs",
    sponsorsDesc: "Entdecken Sie die Unternehmen und Marken, die die Aktivitäten des BMW Club Andorra unterstützen",
    outings: "Kalender und Ausfahrten",
    outingsDesc: "Prüfen Sie den öffentlichen Kalender, das Routenwetter und die nächsten Club-Termine",
    community: "Aktive Community",
    communityDesc: "Teilen Sie Ihre Leidenschaft mit anderen BMW-Enthusiasten in Andorra",
    gallery: "Galerie der Momente",
    galleryDesc: "Erleben Sie die schönsten Momente unserer Ausfahrten und Events erneut",
    forCars: "Für Autos",
    forMotos: "Für Motorräder",
    forSUVs: "Für SUVs",
    viewSponsors: "Sponsoren ansehen",
    viewOutings: "Kalender öffnen",
    joinCommunity: "Den Club entdecken",
    viewGallery: "Galerie ansehen",
    intro: "Wir sind eine Community von BMW-Besitzern und Enthusiasten, die die Leidenschaft für die Marke, das Fahren und Erlebnisse auf der Straße teilen. Hier finden Sie Treffen, Galerie, Kalender und Clubleben.",
  },
  ru: {
    whatWeDo: "Добро пожаловать в BMW Club Andorra",
    whatWeDoDesc: "Сообщество, встречи, галерея, живой календарь и впечатления для владельцев и поклонников марки.",
    clubValues: "Страсть, сообщество и дорога",
    sponsors: "Спонсоры клуба",
    sponsorsDesc: "Узнайте, какие компании и бренды поддерживают деятельность BMW Club Andorra",
    outings: "Календарь и выезды",
    outingsDesc: "Смотрите публичный календарь, погоду маршрута и ближайшие события клуба",
    community: "Активное сообщество",
    communityDesc: "Разделите свою страсть с другими поклонниками BMW в Андорре",
    gallery: "Галерея моментов",
    galleryDesc: "Переживите лучшие моменты наших выездов и мероприятий",
    forCars: "Для автомобилей",
    forMotos: "Для мотоциклов",
    forSUVs: "Для SUV",
    viewSponsors: "Открыть спонсоров",
    viewOutings: "Открыть календарь",
    joinCommunity: "О клубе",
    viewGallery: "Открыть галерею",
    intro: "Мы — сообщество владельцев и поклонников BMW, объединённых страстью к марке, вождению и дорожным впечатлениям. Здесь вы найдёте встречи, галерею, календарь и жизнь клуба.",
  },
};

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageShell>
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
              <p className="text-base md:text-lg text-muted-foreground mt-6 leading-relaxed">{t.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base"><Mountain className="h-8 w-8 text-primary-foreground" /></div>
                <h3 className="text-xl font-semibold mb-3">{t.sponsors}</h3>
                <p className="text-muted-foreground mb-4">{t.sponsorsDesc}</p>
                <Link to="/patrocinadors"><Button variant="link" className="p-0">{t.viewSponsors} →</Button></Link>
              </Card>

              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base"><Calendar className="h-8 w-8 text-primary-foreground" /></div>
                <h3 className="text-xl font-semibold mb-3">{t.outings}</h3>
                <p className="text-muted-foreground mb-4">{t.outingsDesc}</p>
                <Link to="/calendari/2026"><Button variant="link" className="p-0">{t.viewOutings} →</Button></Link>
              </Card>

              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base"><Users className="h-8 w-8 text-primary-foreground" /></div>
                <h3 className="text-xl font-semibold mb-3">{t.community}</h3>
                <p className="text-muted-foreground mb-4">{t.communityDesc}</p>
                <Link to="/el-club"><Button variant="link" className="p-0">{t.joinCommunity} →</Button></Link>
              </Card>

              <Card className="p-6 border-border/70 hover:shadow-elegant hover:-translate-y-1 transition-all group cursor-pointer bg-gradient-to-b from-white to-secondary/40">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-base"><ImageIcon className="h-8 w-8 text-primary-foreground" /></div>
                <h3 className="text-xl font-semibold mb-3">{t.gallery}</h3>
                <p className="text-muted-foreground mb-4">{t.galleryDesc}</p>
                <Link to="/galeria"><Button variant="link" className="p-0">{t.viewGallery} →</Button></Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-primary">BMW Club Andorra</div>
              <h2 className="text-4xl md:text-5xl font-bold">{t.outings}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">{t.outingsDesc}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-sm"><Car className="h-5 w-5 text-primary" /><span className="font-medium">{t.forCars}</span></div>
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-sm"><Bike className="h-5 w-5 text-primary" /><span className="font-medium">{t.forMotos}</span></div>
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-sm"><Mountain className="h-5 w-5 text-primary" /><span className="font-medium">{t.forSUVs}</span></div>
              </div>
              <Link to="/calendari/2026"><Button variant="hero" size="lg">{t.viewOutings}</Button></Link>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-[28px] overflow-hidden shadow-elegant border border-white/60">
              <img src={motoImage} alt="BMW motorcycles in Andorra" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
