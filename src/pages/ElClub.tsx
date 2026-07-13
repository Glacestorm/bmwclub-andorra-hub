import { Link } from "react-router-dom";
import { Users, Target, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    title: "El Club",
    subtitle: "Qui som?",
    intro: "El BMW Club Andorra és una comunitat de propietaris i entusiastes de BMW que comparteixen la passió per la conducció i la marca bavaresa.",
    ourMission: "La nostra missió",
    missionDesc: "Reunir els amants de BMW a Andorra per compartir experiències, descobrir les millors rutes dels Pirineus i crear una comunitat forta i activa.",
    whatWeDo: "Què fem?",
    activity1: "Sortides en grup per carreteres de muntanya",
    activity2: "Esdeveniments i trobades mensuals",
    activity3: "Compartir coneixements tècnics i experiències",
    activity4: "Descobrir les millors rutes d'Andorra i els Pirineus",
    whyJoin: "Per què unir-te?",
    benefit1: "Accés a rutes exclusives",
    benefit1Desc: "Descobreix itineraris dissenyats per experts",
    benefit2: "Comunitat activa",
    benefit2Desc: "Connecta amb altres propietaris de BMW",
    benefit3: "Esdeveniments especials",
    benefit3Desc: "Participa en sortides i trobades úniques",
    benefit4: "Coneixement compartit",
    benefit4Desc: "Aprèn dels millors sobre manteniment i conducció",
    joinNow: "Fes-te soci ara",
  },
  es: {
    title: "El Club",
    subtitle: "¿Quiénes somos?",
    intro: "BMW Club Andorra es una comunidad de propietarios y entusiastas de BMW que comparten la pasión por la conducción y la marca bávara.",
    ourMission: "Nuestra misión",
    missionDesc: "Reunir a los amantes de BMW en Andorra para compartir experiencias, descubrir las mejores rutas de los Pirineos y crear una comunidad fuerte y activa.",
    whatWeDo: "¿Qué hacemos?",
    activity1: "Salidas en grupo por carreteras de montaña",
    activity2: "Eventos y encuentros mensuales",
    activity3: "Compartir conocimientos técnicos y experiencias",
    activity4: "Descubrir las mejores rutas de Andorra y los Pirineos",
    whyJoin: "¿Por qué unirte?",
    benefit1: "Acceso a rutas exclusivas",
    benefit1Desc: "Descubre itinerarios diseñados por expertos",
    benefit2: "Comunidad activa",
    benefit2Desc: "Conecta con otros propietarios de BMW",
    benefit3: "Eventos especiales",
    benefit3Desc: "Participa en salidas y encuentros únicos",
    benefit4: "Conocimiento compartido",
    benefit4Desc: "Aprende de los mejores sobre mantenimiento y conducción",
    joinNow: "Hazte socio ahora",
  },
  fr: {
    title: "Le Club",
    subtitle: "Qui sommes-nous ?",
    intro: "Le BMW Club Andorra est une communauté de propriétaires et passionnés de BMW qui partagent la passion de la conduite et de la marque bavaroise.",
    ourMission: "Notre mission",
    missionDesc: "Réunir les passionnés de BMW en Andorre pour partager des expériences, découvrir les meilleures routes des Pyrénées et créer une communauté forte et active.",
    whatWeDo: "Que faisons-nous ?",
    activity1: "Sorties en groupe sur les routes de montagne",
    activity2: "Événements et rencontres mensuels",
    activity3: "Partager des connaissances techniques et des expériences",
    activity4: "Découvrir les meilleures routes d’Andorre et des Pyrénées",
    whyJoin: "Pourquoi nous rejoindre ?",
    benefit1: "Accès à des itinéraires exclusifs",
    benefit1Desc: "Découvrez des parcours conçus par des experts",
    benefit2: "Communauté active",
    benefit2Desc: "Entrez en contact avec d'autres propriétaires de BMW",
    benefit3: "Événements spéciaux",
    benefit3Desc: "Participez à des sorties et rencontres uniques",
    benefit4: "Connaissances partagées",
    benefit4Desc: "Apprenez des meilleurs en matière d’entretien et de conduite",
    joinNow: "Devenir membre",
  },
  en: {
    title: "The Club",
    subtitle: "Who are we?",
    intro: "BMW Club Andorra is a community of BMW owners and enthusiasts who share a passion for driving and the Bavarian brand.",
    ourMission: "Our mission",
    missionDesc: "Bring BMW lovers together in Andorra to share experiences, discover the best routes in the Pyrenees and build a strong, active community.",
    whatWeDo: "What do we do?",
    activity1: "Group outings on mountain roads",
    activity2: "Monthly events and meetups",
    activity3: "Sharing technical knowledge and experiences",
    activity4: "Discovering the best routes in Andorra and the Pyrenees",
    whyJoin: "Why join?",
    benefit1: "Access to exclusive routes",
    benefit1Desc: "Discover itineraries designed by experts",
    benefit2: "Active community",
    benefit2Desc: "Connect with other BMW owners",
    benefit3: "Special events",
    benefit3Desc: "Take part in unique outings and meetups",
    benefit4: "Shared knowledge",
    benefit4Desc: "Learn from the best about maintenance and driving",
    joinNow: "Join now",
  },
  pt: {
    title: "O Clube",
    subtitle: "Quem somos?",
    intro: "O BMW Club Andorra é uma comunidade de proprietários e entusiastas BMW que partilham a paixão pela condução e pela marca bávara.",
    ourMission: "A nossa missão",
    missionDesc: "Reunir os amantes da BMW em Andorra para partilhar experiências, descobrir as melhores rotas dos Pirenéus e criar uma comunidade forte e ativa.",
    whatWeDo: "O que fazemos?",
    activity1: "Passeios em grupo por estradas de montanha",
    activity2: "Eventos e encontros mensais",
    activity3: "Partilhar conhecimentos técnicos e experiências",
    activity4: "Descobrir as melhores rotas de Andorra e dos Pirenéus",
    whyJoin: "Porque juntar-se?",
    benefit1: "Acesso a rotas exclusivas",
    benefit1Desc: "Descubra itinerários pensados por especialistas",
    benefit2: "Comunidade ativa",
    benefit2Desc: "Ligue-se a outros proprietários BMW",
    benefit3: "Eventos especiais",
    benefit3Desc: "Participe em passeios e encontros únicos",
    benefit4: "Conhecimento partilhado",
    benefit4Desc: "Aprenda com os melhores sobre manutenção e condução",
    joinNow: "Torne-se sócio",
  },
  de: {
    title: "Der Club",
    subtitle: "Wer sind wir?",
    intro: "Der BMW Club Andorra ist eine Community von BMW-Besitzern und Enthusiasten, die die Leidenschaft für das Fahren und die bayerische Marke teilen.",
    ourMission: "Unsere Mission",
    missionDesc: "BMW-Liebhaber in Andorra zusammenzubringen, um Erfahrungen zu teilen, die besten Pyrenäen-Routen zu entdecken und eine starke, aktive Community aufzubauen.",
    whatWeDo: "Was tun wir?",
    activity1: "Gruppenausfahrten auf Bergstraßen",
    activity2: "Monatliche Events und Treffen",
    activity3: "Technisches Wissen und Erfahrungen teilen",
    activity4: "Die besten Routen in Andorra und den Pyrenäen entdecken",
    whyJoin: "Warum mitmachen?",
    benefit1: "Zugang zu exklusiven Routen",
    benefit1Desc: "Entdecken Sie von Experten geplante Strecken",
    benefit2: "Aktive Community",
    benefit2Desc: "Vernetzen Sie sich mit anderen BMW-Besitzern",
    benefit3: "Besondere Events",
    benefit3Desc: "Nehmen Sie an einzigartigen Ausfahrten und Treffen teil",
    benefit4: "Geteiltes Wissen",
    benefit4Desc: "Lernen Sie von den Besten über Wartung und Fahrtechnik",
    joinNow: "Jetzt Mitglied werden",
  },
  ru: {
    title: "Клуб",
    subtitle: "Кто мы?",
    intro: "BMW Club Andorra — это сообщество владельцев и поклонников BMW, объединённых страстью к вождению и баварской марке.",
    ourMission: "Наша миссия",
    missionDesc: "Объединять поклонников BMW в Андорре, делиться опытом, открывать лучшие маршруты Пиренеев и создавать сильное, активное сообщество.",
    whatWeDo: "Чем мы занимаемся?",
    activity1: "Групповые выезды по горным дорогам",
    activity2: "Ежемесячные события и встречи",
    activity3: "Обмен техническими знаниями и опытом",
    activity4: "Поиск лучших маршрутов Андорры и Пиренеев",
    whyJoin: "Почему стоит вступить?",
    benefit1: "Доступ к эксклюзивным маршрутам",
    benefit1Desc: "Откройте маршруты, составленные экспертами",
    benefit2: "Активное сообщество",
    benefit2Desc: "Общайтесь с другими владельцами BMW",
    benefit3: "Особые события",
    benefit3Desc: "Участвуйте в уникальных выездах и встречах",
    benefit4: "Общие знания",
    benefit4Desc: "Учитесь у лучших обслуживанию и вождению",
    joinNow: "Стать участником",
  },
};

const ElClub = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageShell>
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-5xl md:text-6xl font-bold mb-6">{t.title}</h1><p className="text-xl text-muted-foreground">{t.subtitle}</p></div></div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-center mb-16">{t.intro}</p>
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-4 mb-6"><div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center"><Target className="h-8 w-8 text-primary-foreground" /></div><h2 className="text-3xl font-bold">{t.ourMission}</h2></div>
              <p className="text-lg leading-relaxed text-muted-foreground">{t.missionDesc}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t.whatWeDo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[t.activity1, t.activity2, t.activity3, t.activity4].map((activity, index) => (
                <Card key={index} className="p-6 hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4"><div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"><span className="text-primary-foreground font-bold text-lg">{index + 1}</span></div><p className="text-lg pt-2">{activity}</p></div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-4xl md:text-5xl font-bold mb-4">{t.whyJoin}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[{ icon: Award, title: t.benefit1, desc: t.benefit1Desc }, { icon: Users, title: t.benefit2, desc: t.benefit2Desc }, { icon: Heart, title: t.benefit3, desc: t.benefit3Desc }, { icon: Target, title: t.benefit4, desc: t.benefit4Desc }].map((item) => {
              const Icon = item.icon;
              return <Card key={item.title} className="p-6 text-center hover:shadow-elegant transition-all group"><div className="gradient-hero w-16 h-16 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-base"><Icon className="h-8 w-8 text-primary-foreground" /></div><h3 className="text-xl font-semibold mb-3">{item.title}</h3><p className="text-muted-foreground">{item.desc}</p></Card>;
            })}
          </div>
          <div className="text-center mt-12"><Link to="/alta-soci"><Button variant="hero" size="xl">{t.joinNow}</Button></Link></div>
        </div>
      </section>
    </PageShell>
  );
};

export default ElClub;
