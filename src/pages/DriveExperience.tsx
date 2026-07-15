import { ArrowRight, CalendarRange, Crown, Map, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Drive Experience",
    title: "BMW Club Andorra Drive Experience",
    intro: "La capa premium del club per planificar, executar i recordar sortides BMW amb criteri editorial, operatiu i visual.",
    module1: "Route Concierge IA",
    module1Body: "Recomana la millor ruta segons vehicle, ritme, durada i parada gourmet.",
    module2: "Official Event Mode",
    module2Body: "Converteix una sortida oficial en una experiència ordenada, presentable i compartible.",
    module3: "Post-Drive Report",
    module3Body: "Tanca cada sortida amb recap, mètriques, highlights i galeria reutilitzable.",
    openEvent: "Obrir Event Mode",
    openReport: "Obrir Post-Drive Report",
    back: "Tornar a Itineraris",
  },
  es: {
    eyebrow: "Drive Experience",
    title: "BMW Club Andorra Drive Experience",
    intro: "La capa premium del club para planificar, ejecutar y recordar salidas BMW con criterio editorial, operativo y visual.",
    module1: "Route Concierge IA",
    module1Body: "Recomienda la mejor ruta según vehículo, ritmo, duración y parada gourmet.",
    module2: "Official Event Mode",
    module2Body: "Convierte una salida oficial en una experiencia ordenada, presentable y compartible.",
    module3: "Post-Drive Report",
    module3Body: "Cierra cada salida con recap, métricas, highlights y galería reutilizable.",
    openEvent: "Abrir Event Mode",
    openReport: "Abrir Post-Drive Report",
    back: "Volver a Itineraris",
  },
  fr: {
    eyebrow: "Drive Experience",
    title: "BMW Club Andorra Drive Experience",
    intro: "La couche premium du club pour planifier, exécuter et raconter des sorties BMW avec exigence éditoriale, opérationnelle et visuelle.",
    module1: "Route Concierge IA",
    module1Body: "Recommande la meilleure route selon véhicule, rythme, durée et arrêt gourmand.",
    module2: "Official Event Mode",
    module2Body: "Transforme une sortie officielle en expérience ordonnée, présentable et partageable.",
    module3: "Post-Drive Report",
    module3Body: "Clôture chaque sortie avec recap, métriques, highlights et galerie réutilisable.",
    openEvent: "Ouvrir Event Mode",
    openReport: "Ouvrir Post-Drive Report",
    back: "Retour à Itineraris",
  },
  en: {
    eyebrow: "Drive Experience",
    title: "BMW Club Andorra Drive Experience",
    intro: "The premium club layer to plan, execute and remember BMW drives with editorial, operational and visual discipline.",
    module1: "AI Route Concierge",
    module1Body: "Recommends the best route based on vehicle, rhythm, duration and gourmet stop.",
    module2: "Official Event Mode",
    module2Body: "Turns an official outing into an ordered, presentable and shareable experience.",
    module3: "Post-Drive Report",
    module3Body: "Closes every outing with a recap, metrics, highlights and a reusable gallery.",
    openEvent: "Open Event Mode",
    openReport: "Open Post-Drive Report",
    back: "Back to Itineraris",
  },
  pt: {
    eyebrow: "Drive Experience",
    title: "BMW Club Andorra Drive Experience",
    intro: "A camada premium do clube para planear, executar e recordar saídas BMW com critério editorial, operacional e visual.",
    module1: "Route Concierge IA",
    module1Body: "Recomenda a melhor rota segundo veículo, ritmo, duração e paragem gourmet.",
    module2: "Official Event Mode",
    module2Body: "Transforma uma saída oficial numa experiência ordenada, apresentável e partilhável.",
    module3: "Post-Drive Report",
    module3Body: "Fecha cada saída com recap, métricas, highlights e galeria reutilizável.",
    openEvent: "Abrir Event Mode",
    openReport: "Abrir Post-Drive Report",
    back: "Voltar a Itineraris",
  },
  de: {
    eyebrow: "Drive Experience",
    title: "BMW Club Andorra Drive Experience",
    intro: "Die Premium-Ebene des Clubs, um BMW-Ausfahrten mit redaktioneller, operativer und visueller Qualität zu planen, umzusetzen und zu erinnern.",
    module1: "KI-Route-Concierge",
    module1Body: "Empfiehlt die beste Route nach Fahrzeug, Rhythmus, Dauer und Gourmet-Stopp.",
    module2: "Official Event Mode",
    module2Body: "Macht aus einer offiziellen Ausfahrt ein geordnetes, präsentables und teilbares Erlebnis.",
    module3: "Post-Drive Report",
    module3Body: "Schließt jede Ausfahrt mit Recap, Kennzahlen, Highlights und wiederverwendbarer Galerie ab.",
    openEvent: "Event Mode öffnen",
    openReport: "Post-Drive Report öffnen",
    back: "Zurück zu Itineraris",
  },
  ru: {
    eyebrow: "Drive Experience",
    title: "BMW Club Andorra Drive Experience",
    intro: "Премиальный слой клуба для планирования, проведения и запоминания BMW-выездов с редакторским, операционным и визуальным качеством.",
    module1: "ИИ Route Concierge",
    module1Body: "Рекомендует лучший маршрут по машине, ритму, длительности и gourmet-остановке.",
    module2: "Official Event Mode",
    module2Body: "Превращает официальный выезд в упорядоченный, презентабельный и shareable-опыт.",
    module3: "Post-Drive Report",
    module3Body: "Закрывает каждый выезд recap, метриками, highlights и переиспользуемой галереей.",
    openEvent: "Открыть Event Mode",
    openReport: "Открыть Post-Drive Report",
    back: "Назад к Itineraris",
  },
};

const DriveExperience = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const modules = [
    { icon: Sparkles, title: t.module1, body: t.module1Body },
    { icon: Crown, title: t.module2, body: t.module2Body },
    { icon: CalendarRange, title: t.module3, body: t.module3Body },
  ];

  return (
    <PageShell>
      <section className="pt-10 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <Card className="glass-dark overflow-hidden rounded-[2rem] border-0 p-6 text-white shadow-elegant md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
              <Map className="h-4 w-4 text-primary" />
              {t.eyebrow}
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold text-balance md:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-3xl text-lg text-white/72">{t.intro}</p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.title} className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="mt-4 text-lg font-semibold text-white">{module.title}</div>
                    <p className="mt-2 text-sm leading-6 text-white/72">{module.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/event-mode"><Button variant="hero" size="lg" className="rounded-full">{t.openEvent}</Button></Link>
              <Link to="/post-drive-report"><Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">{t.openReport}</Button></Link>
              <Link to="/itineraris"><Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">{t.back}</Button></Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default DriveExperience;
