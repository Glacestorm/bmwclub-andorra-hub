import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Target, Heart, Award } from "lucide-react";

const ElClub = () => {
  const [language, setLanguage] = useState("ca");

  const translations = {
    ca: {
      title: "El Club",
      subtitle: "Qui Som?",
      intro: "El BMW Club Andorra és una comunitat de propietaris i entusiastes de BMW que comparteixen la passió per la conducció i la marca bavaresa.",
      ourMission: "La Nostra Missió",
      missionDesc: "Reunir els amants de BMW a Andorra per compartir experiències, descobrir les millors rutes dels Pirineus i crear una comunitat forta i activa.",
      whatWeDo: "Què Fem?",
      activities: "Activitats",
      activity1: "Sortides en grup per carreteres de muntanya",
      activity2: "Esdeveniments i trobades mensuals",
      activity3: "Compartir coneixements tècnics i experiències",
      activity4: "Descobrir les millors rutes d'Andorra i els Pirineus",
      whyJoin: "Per què Unir-te?",
      benefit1: "Accés a rutes exclusives",
      benefit1Desc: "Descobreix itineraris dissenyats per experts",
      benefit2: "Comunitat activa",
      benefit2Desc: "Connecta amb altres propietaris de BMW",
      benefit3: "Esdeveniments especials",
      benefit3Desc: "Participa en sortides i trobades úniques",
      benefit4: "Coneixement compartit",
      benefit4Desc: "Aprèn dels millors sobre manteniment i conducció",
      joinNow: "Fes-te Soci Ara",
    },
    es: {
      title: "El Club",
      subtitle: "¿Quiénes Somos?",
      intro: "El BMW Club Andorra es una comunidad de propietarios y entusiastas de BMW que comparten la pasión por la conducción y la marca bávara.",
      ourMission: "Nuestra Misión",
      missionDesc: "Reunir a los amantes de BMW en Andorra para compartir experiencias, descubrir las mejores rutas de los Pirineos y crear una comunidad fuerte y activa.",
      whatWeDo: "¿Qué Hacemos?",
      activities: "Actividades",
      activity1: "Salidas en grupo por carreteras de montaña",
      activity2: "Eventos y encuentros mensuales",
      activity3: "Compartir conocimientos técnicos y experiencias",
      activity4: "Descubrir las mejores rutas de Andorra y los Pirineos",
      whyJoin: "¿Por Qué Unirte?",
      benefit1: "Acceso a rutas exclusivas",
      benefit1Desc: "Descubre itinerarios diseñados por expertos",
      benefit2: "Comunidad activa",
      benefit2Desc: "Conecta con otros propietarios de BMW",
      benefit3: "Eventos especiales",
      benefit3Desc: "Participa en salidas y encuentros únicos",
      benefit4: "Conocimiento compartido",
      benefit4Desc: "Aprende de los mejores sobre mantenimiento y conducción",
      joinNow: "Hazte Socio Ahora",
    },
    fr: {
      title: "Le Club",
      subtitle: "Qui Sommes-Nous?",
      intro: "Le BMW Club Andorra est une communauté de propriétaires et passionnés de BMW qui partagent la passion pour la conduite et la marque bavaroise.",
      ourMission: "Notre Mission",
      missionDesc: "Rassembler les amateurs de BMW en Andorre pour partager des expériences, découvrir les meilleurs itinéraires des Pyrénées et créer une communauté forte et active.",
      whatWeDo: "Ce Que Nous Faisons?",
      activities: "Activités",
      activity1: "Sorties en groupe sur les routes de montagne",
      activity2: "Événements et rencontres mensuelles",
      activity3: "Partage de connaissances techniques et d'expériences",
      activity4: "Découverte des meilleurs itinéraires d'Andorre et des Pyrénées",
      whyJoin: "Pourquoi Nous Rejoindre?",
      benefit1: "Accès à des itinéraires exclusifs",
      benefit1Desc: "Découvrez des parcours conçus par des experts",
      benefit2: "Communauté active",
      benefit2Desc: "Connectez-vous avec d'autres propriétaires de BMW",
      benefit3: "Événements spéciaux",
      benefit3Desc: "Participez à des sorties et rencontres uniques",
      benefit4: "Connaissances partagées",
      benefit4Desc: "Apprenez des meilleurs sur l'entretien et la conduite",
      joinNow: "Devenir Membre",
    },
    en: {
      title: "The Club",
      subtitle: "Who We Are?",
      intro: "BMW Club Andorra is a community of BMW owners and enthusiasts who share a passion for driving and the Bavarian brand.",
      ourMission: "Our Mission",
      missionDesc: "Bring together BMW lovers in Andorra to share experiences, discover the best routes in the Pyrenees and create a strong and active community.",
      whatWeDo: "What We Do?",
      activities: "Activities",
      activity1: "Group outings on mountain roads",
      activity2: "Monthly events and meetings",
      activity3: "Share technical knowledge and experiences",
      activity4: "Discover the best routes in Andorra and the Pyrenees",
      whyJoin: "Why Join?",
      benefit1: "Access to exclusive routes",
      benefit1Desc: "Discover itineraries designed by experts",
      benefit2: "Active community",
      benefit2Desc: "Connect with other BMW owners",
      benefit3: "Special events",
      benefit3Desc: "Participate in unique outings and meetings",
      benefit4: "Shared knowledge",
      benefit4Desc: "Learn from the best about maintenance and driving",
      joinNow: "Join Now",
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-center mb-16">
              {t.intro}
            </p>

            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold">{t.ourMission}</h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t.missionDesc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t.whatWeDo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[t.activity1, t.activity2, t.activity3, t.activity4].map((activity, index) => (
                <Card key={index} className="p-6 hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                    </div>
                    <p className="text-lg pt-2">{activity}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.whyJoin}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-elegant transition-all group">
              <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-base">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.benefit1}</h3>
              <p className="text-muted-foreground">{t.benefit1Desc}</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all group">
              <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-base">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.benefit2}</h3>
              <p className="text-muted-foreground">{t.benefit2Desc}</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all group">
              <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-base">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.benefit3}</h3>
              <p className="text-muted-foreground">{t.benefit3Desc}</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all group">
              <div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-base">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.benefit4}</h3>
              <p className="text-muted-foreground">{t.benefit4Desc}</p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/alta-soci">
              <Button variant="hero" size="xl">
                {t.joinNow}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default ElClub;
