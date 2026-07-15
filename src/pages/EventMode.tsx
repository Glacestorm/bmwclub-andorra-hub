import { useMemo, useState } from "react";
import { ArrowRight, Crown, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { itineraryGuide } from "@/content/itineraryGuide";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Official Event Mode", title: "Sortides oficials del club amb format premium i operativa clara.", intro: "Selector de ruta, timing, briefing i CTA perquè la sortida sigui presentable i fàcil d’executar.", active: "Sortida activa", meeting: "Punt de trobada", briefing: "Briefing de convoy", timeline: "Timeline", request: "Demanar aquesta sortida", back: "Tornar a Drive Experience" },
  es: { eyebrow: "Official Event Mode", title: "Salidas oficiales del club con formato premium y operativa clara.", intro: "Selector de ruta, timing, briefing y CTA para que la salida sea presentable y fácil de ejecutar.", active: "Salida activa", meeting: "Punto de encuentro", briefing: "Briefing de convoy", timeline: "Timeline", request: "Solicitar esta salida", back: "Volver a Drive Experience" },
  fr: { eyebrow: "Official Event Mode", title: "Sorties officielles du club avec format premium et couche opérationnelle claire.", intro: "Sélecteur de route, timing, briefing et CTA pour une sortie simple à exécuter et présentable.", active: "Sortie active", meeting: "Point de rendez-vous", briefing: "Briefing du convoi", timeline: "Timeline", request: "Demander cette sortie", back: "Retour à Drive Experience" },
  en: { eyebrow: "Official Event Mode", title: "Official club outings with a premium format and clear operations layer.", intro: "Route selector, timing, briefing and CTA so the outing feels presentable and easy to execute.", active: "Active outing", meeting: "Meeting point", briefing: "Convoy briefing", timeline: "Timeline", request: "Request this outing", back: "Back to Drive Experience" },
  pt: { eyebrow: "Official Event Mode", title: "Saídas oficiais do clube com formato premium e camada operacional clara.", intro: "Seletor de rota, timing, briefing e CTA para uma saída apresentável e fácil de executar.", active: "Saída ativa", meeting: "Ponto de encontro", briefing: "Briefing do comboio", timeline: "Timeline", request: "Pedir esta saída", back: "Voltar a Drive Experience" },
  de: { eyebrow: "Official Event Mode", title: "Offizielle Club-Ausfahrten mit Premium-Format und klarer Operations-Schicht.", intro: "Routenwahl, Timing, Briefing und CTA für eine präsentable und leicht umsetzbare Ausfahrt.", active: "Aktive Ausfahrt", meeting: "Treffpunkt", briefing: "Convoy-Briefing", timeline: "Timeline", request: "Diese Ausfahrt anfragen", back: "Zurück zu Drive Experience" },
  ru: { eyebrow: "Official Event Mode", title: "Официальные выезды клуба с premium-форматом и понятной операционной логикой.", intro: "Выбор маршрута, тайминг, брифинг и CTA, чтобы выезд был презентабельным и простым в исполнении.", active: "Активный выезд", meeting: "Точка сбора", briefing: "Брифинг колонны", timeline: "Таймлайн", request: "Запросить этот выезд", back: "Назад к Drive Experience" },
};

const eventData: Record<string, { meeting: Record<LanguageCode, string>; briefing: Record<LanguageCode, string>; timeline: Array<{ time: string; label: Record<LanguageCode, string> }> }> = {
  "grand-tour-central": {
    meeting: { ca: "Andorra la Vella, Prada Casadet", es: "Andorra la Vella, Prada Casadet", fr: "Andorre-la-Vieille, Prada Casadet", en: "Andorra la Vella, Prada Casadet", pt: "Andorra la Vella, Prada Casadet", de: "Andorra la Vella, Prada Casadet", ru: "Andorra la Vella, Prada Casadet" },
    briefing: { ca: "Ruta ideal per a foto de grup, club outing net i tancament premium a Meritxell.", es: "Ruta ideal para foto de grupo, club outing limpio y cierre premium en Meritxell.", fr: "Route idéale pour photo de groupe, sortie propre et final premium à Meritxell.", en: "Ideal for group photos, a clean club outing and a premium finish in Meritxell.", pt: "Rota ideal para foto de grupo, saída limpa e fecho premium em Meritxell.", de: "Ideal für Gruppenfoto, saubere Club-Ausfahrt und Premium-Finale in Meritxell.", ru: "Идеально для группового фото, чистого club outing и premium-финала в Meritxell." },
    timeline: [
      { time: "08:30", label: { ca: "Check-in i cafè", es: "Check-in y café", fr: "Check-in et café", en: "Check-in and coffee", pt: "Check-in e café", de: "Check-in und Kaffee", ru: "Check-in и кофе" } },
      { time: "09:00", label: { ca: "Briefing + QR de ruta", es: "Briefing + QR de ruta", fr: "Briefing + QR de route", en: "Briefing + route QR", pt: "Briefing + QR da rota", de: "Briefing + Routen-QR", ru: "Брифинг + QR маршрута" } },
      { time: "13:20", label: { ca: "Dinar premium", es: "Comida premium", fr: "Déjeuner premium", en: "Premium lunch", pt: "Almoço premium", de: "Premium-Lunch", ru: "Premium lunch" } },
    ],
  },
  "ordino-tristaina-touring": {
    meeting: { ca: "Ordino, centre històric", es: "Ordino, centro histórico", fr: "Ordino, centre historique", en: "Ordino, historic center", pt: "Ordino, centro histórico", de: "Ordino, historisches Zentrum", ru: "Ordino, исторический центр" },
    briefing: { ca: "Hospitality premium, paisatge fort i final molt presentable a cota alta.", es: "Hospitality premium, paisaje potente y final muy presentable en cota alta.", fr: "Hospitality premium, grand paysage et final très présentable en altitude.", en: "Premium hospitality, strong scenery and a very presentable high-altitude ending.", pt: "Hospitality premium, paisagem forte e final muito apresentável em altitude.", de: "Premium-Hospitality, starke Landschaft und sehr präsentables Finale in großer Höhe.", ru: "Premium hospitality, сильный пейзаж и очень презентабельный финал на высоте." },
    timeline: [
      { time: "08:40", label: { ca: "Check-in a Ordino", es: "Check-in en Ordino", fr: "Check-in à Ordino", en: "Check-in in Ordino", pt: "Check-in em Ordino", de: "Check-in in Ordino", ru: "Check-in в Ordino" } },
      { time: "11:10", label: { ca: "Parada panoràmica", es: "Parada panorámica", fr: "Pause panoramique", en: "Panoramic stop", pt: "Paragem panorâmica", de: "Panoramastopp", ru: "Панорамная остановка" } },
      { time: "13:40", label: { ca: "Dinar de tancament", es: "Comida de cierre", fr: "Déjeuner de clôture", en: "Closing lunch", pt: "Almoço final", de: "Abschluss-Lunch", ru: "Финальный lunch" } },
    ],
  },
};

const EventMode = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const routes = useMemo(() => itineraryGuide.filter((route) => eventData[route.id]), []);
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id ?? "grand-tour-central");
  const activeRoute = routes.find((route) => route.id === selectedRouteId) ?? routes[0];
  const activeData = activeRoute ? eventData[activeRoute.id] : null;

  if (!activeRoute || !activeData) return null;

  return (
    <PageShell>
      <section className="pt-10 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <Card className="glass-dark overflow-hidden rounded-[2rem] border-0 p-6 text-white shadow-elegant md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
              <Crown className="h-4 w-4 text-primary" />
              {t.eyebrow}
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold text-balance md:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-3xl text-lg text-white/72">{t.intro}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {routes.map((route) => (
                <button key={route.id} type="button" onClick={() => setSelectedRouteId(route.id)} className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${selectedRouteId === route.id ? "bg-white text-slate-950" : "border border-white/15 bg-white/8 text-white/82 hover:bg-white/12"}`}>
                  {route.title[language]}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.meeting}</div>
                <div className="mt-3 text-sm text-white/84">{activeData.meeting[language]}</div>
                <div className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.briefing}</div>
                <p className="mt-3 text-sm leading-6 text-white/78">{activeData.briefing[language]}</p>
                <div className="mt-6 flex gap-3">
                  <Link to="/contacte"><Button variant="hero" size="lg" className="rounded-full">{t.request}</Button></Link>
                  <Link to="/drive-experience"><Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">{t.back}</Button></Link>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.timeline}</div>
                <div className="mt-4 space-y-3">
                  {activeData.timeline.map((item) => (
                    <div key={`${item.time}-${item.label.en}`} className="flex items-start gap-3 rounded-[1.2rem] border border-white/10 bg-slate-950/25 px-4 py-3">
                      <span className="inline-flex min-w-[62px] justify-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{item.time}</span>
                      <span className="pt-1 text-sm text-white/84">{item.label[language]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/8 backdrop-blur-xl">
              <img src={activeRoute.image.src} alt={activeRoute.image.alt[language]} className="aspect-[16/8] w-full object-cover" loading="lazy" decoding="async" />
              <div className="p-5">
                <div className="text-lg font-semibold text-white">{activeRoute.title[language]}</div>
                <ul className="mt-4 space-y-3 text-sm text-white/82">
                  {activeRoute.notes.slice(0, 2).map((note, index) => (
                    <li key={`${activeRoute.id}-${index}`} className="flex gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{note[language]}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default EventMode;
