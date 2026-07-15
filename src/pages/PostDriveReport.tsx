import { useMemo, useState } from "react";
import { ArrowRight, CalendarRange } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { itineraryGuide } from "@/content/itineraryGuide";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Post-Drive Report", title: "El recap premium que converteix una sortida en contingut de club.", intro: "Resum editorial, mètriques, highlights i assets llestos per a compartir o presentar.", active: "Report actiu", summary: "Resum editorial", stats: "Mètriques", highlights: "Highlights", assets: "Assets", request: "Demanar aquesta peça", back: "Tornar a Drive Experience" },
  es: { eyebrow: "Post-Drive Report", title: "El recap premium que convierte una salida en contenido de club.", intro: "Resumen editorial, métricas, highlights y assets listos para compartir o presentar.", active: "Report activo", summary: "Resumen editorial", stats: "Métricas", highlights: "Highlights", assets: "Assets", request: "Solicitar esta pieza", back: "Volver a Drive Experience" },
  fr: { eyebrow: "Post-Drive Report", title: "Le recap premium qui transforme une sortie en contenu de club.", intro: "Résumé éditorial, métriques, highlights et assets prêts à partager ou à présenter.", active: "Report actif", summary: "Résumé éditorial", stats: "Métriques", highlights: "Highlights", assets: "Assets", request: "Demander cette pièce", back: "Retour à Drive Experience" },
  en: { eyebrow: "Post-Drive Report", title: "The premium recap that turns an outing into proper club content.", intro: "Editorial summary, metrics, highlights and assets ready to share or present.", active: "Active report", summary: "Editorial summary", stats: "Metrics", highlights: "Highlights", assets: "Assets", request: "Request this piece", back: "Back to Drive Experience" },
  pt: { eyebrow: "Post-Drive Report", title: "O recap premium que transforma uma saída em conteúdo de clube.", intro: "Resumo editorial, métricas, highlights e assets prontos para partilhar ou apresentar.", active: "Report ativo", summary: "Resumo editorial", stats: "Métricas", highlights: "Highlights", assets: "Assets", request: "Pedir esta peça", back: "Voltar a Drive Experience" },
  de: { eyebrow: "Post-Drive Report", title: "Der Premium-Recap, der aus einer Ausfahrt echten Club-Content macht.", intro: "Redaktionelle Zusammenfassung, Kennzahlen, Highlights und Assets zum Teilen oder Präsentieren.", active: "Aktiver Report", summary: "Redaktionelle Zusammenfassung", stats: "Kennzahlen", highlights: "Highlights", assets: "Assets", request: "Dieses Stück anfragen", back: "Zurück zu Drive Experience" },
  ru: { eyebrow: "Post-Drive Report", title: "Premium-recap, который превращает выезд в настоящий клубный контент.", intro: "Редакторское резюме, метрики, highlights и assets, готовые к показу и публикации.", active: "Активный report", summary: "Редакторское резюме", stats: "Метрики", highlights: "Highlights", assets: "Assets", request: "Запросить эту pieza", back: "Назад к Drive Experience" },
};

const reportData: Record<string, { summary: Record<LanguageCode, string>; stats: Array<{ value: string; label: Record<LanguageCode, string> }>; highlights: Record<LanguageCode, string[]>; assets: Record<LanguageCode, string[]> }> = {
  "grand-tour-central": {
    summary: { ca: "Sortida molt neta i fàcil de convertir en peça institucional del club.", es: "Salida muy limpia y fácil de convertir en pieza institucional del club.", fr: "Sortie très propre, facile à convertir en pièce institutionnelle du club.", en: "A very clean outing, easy to turn into an institutional club piece.", pt: "Saída muito limpa e fácil de transformar em peça institucional do clube.", de: "Sehr saubere Ausfahrt, leicht in ein institutionelles Club-Stück zu verwandeln.", ru: "Очень чистый выезд, который легко превратить в клубную институциональную страницу." },
    stats: [
      { value: "27", label: { ca: "cotxes", es: "coches", fr: "voitures", en: "cars", pt: "carros", de: "Autos", ru: "машин" } },
      { value: "61 km", label: { ca: "ruta", es: "ruta", fr: "route", en: "route", pt: "rota", de: "Route", ru: "маршрут" } },
      { value: "186", label: { ca: "fotos", es: "fotos", fr: "photos", en: "photos", pt: "fotos", de: "Fotos", ru: "фото" } },
      { value: "4", label: { ca: "stops", es: "stops", fr: "stops", en: "stops", pt: "stops", de: "Stops", ru: "stops" } },
    ],
    highlights: { ca: ["Foto de grup a Engolasters", "Ritme fluid de club", "Final premium a Meritxell"], es: ["Foto de grupo en Engolasters", "Ritmo fluido de club", "Final premium en Meritxell"], fr: ["Photo de groupe à Engolasters", "Rythme fluide", "Final premium à Meritxell"], en: ["Group photo in Engolasters", "Flowing club rhythm", "Premium finish in Meritxell"], pt: ["Foto de grupo em Engolasters", "Ritmo fluido de clube", "Final premium em Meritxell"], de: ["Gruppenfoto in Engolasters", "Flüssiger Club-Rhythmus", "Premium-Finale in Meritxell"], ru: ["Групповое фото в Engolasters", "Плавный клубный ритм", "Premium-финал в Meritxell"] },
    assets: { ca: ["Landing recap", "Galeria social", "Cover newsletter"], es: ["Landing recap", "Galería social", "Cover newsletter"], fr: ["Landing recap", "Galerie sociale", "Cover newsletter"], en: ["Landing recap", "Social gallery", "Newsletter cover"], pt: ["Landing recap", "Galeria social", "Cover newsletter"], de: ["Landingpage", "Social-Galerie", "Newsletter-Cover"], ru: ["Landing recap", "Соцгалерея", "Обложка newsletter"] },
  },
  "ordino-tristaina-touring": {
    summary: { ca: "La peça més premium per hospitality i marca: paisatge fort i to molt editorial.", es: "La pieza más premium para hospitality y marca: paisaje potente y tono muy editorial.", fr: "La pièce la plus premium pour l’hospitality et la marque : grand paysage et ton éditorial.", en: "The most premium piece for hospitality and brand positioning: strong scenery and a very editorial tone.", pt: "A peça mais premium para hospitality e marca: paisagem forte e tom muito editorial.", de: "Das stärkste Stück für Hospitality und Marke: starke Landschaft und sehr editorieller Ton.", ru: "Самая premium-пьеса для hospitality и бренда: сильный пейзаж и очень редакционный тон." },
    stats: [
      { value: "21", label: { ca: "cotxes", es: "coches", fr: "voitures", en: "cars", pt: "carros", de: "Autos", ru: "машин" } },
      { value: "72 km", label: { ca: "ruta", es: "ruta", fr: "route", en: "route", pt: "rota", de: "Route", ru: "маршрут" } },
      { value: "214", label: { ca: "fotos", es: "fotos", fr: "photos", en: "photos", pt: "fotos", de: "Fotos", ru: "фото" } },
      { value: "5", label: { ca: "punts premium", es: "puntos premium", fr: "points premium", en: "premium points", pt: "pontos premium", de: "Premium-Punkte", ru: "premium-точки" } },
    ],
    highlights: { ca: ["Ordino com a imatge de club", "Tristaina eleva el nivell visual", "Final perfecte per invitació premium"], es: ["Ordino como imagen de club", "Tristaina eleva el nivel visual", "Final perfecto para invitación premium"], fr: ["Ordino comme image du club", "Tristaina élève le niveau visuel", "Final parfait pour invitation premium"], en: ["Ordino as a club image anchor", "Tristaina elevates the visual level", "Perfect ending for premium invitations"], pt: ["Ordino como imagem do clube", "Tristaina eleva o nível visual", "Final perfeito para convite premium"], de: ["Ordino als Clubbild", "Tristaina hebt das visuelle Niveau", "Perfektes Finale für Premium-Einladungen"], ru: ["Ordino как образ клуба", "Tristaina поднимает визуальный уровень", "Идеальный финал для premium-инвайта"] },
    assets: { ca: ["Report llarg", "Galeria premium", "Peça resum BMW/dealer"], es: ["Report largo", "Galería premium", "Pieza resumen BMW/dealer"], fr: ["Report long", "Galerie premium", "Pièce résumé BMW/dealer"], en: ["Long-form report", "Premium gallery", "BMW/dealer summary piece"], pt: ["Report longo", "Galeria premium", "Peça resumo BMW/dealer"], de: ["Langer Report", "Premium-Galerie", "BMW/Händler-Zusammenfassung"], ru: ["Длинный report", "Premium-галерея", "BMW/dealer summary"] },
  },
};

const PostDriveReport = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const routes = useMemo(() => itineraryGuide.filter((route) => reportData[route.id]), []);
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id ?? "grand-tour-central");
  const activeRoute = routes.find((route) => route.id === selectedRouteId) ?? routes[0];
  const activeReport = activeRoute ? reportData[activeRoute.id] : null;

  if (!activeRoute || !activeReport) return null;

  return (
    <PageShell>
      <section className="pt-10 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <Card className="premium-card overflow-hidden rounded-[2rem] border-0 p-6 shadow-elegant md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <CalendarRange className="h-4 w-4" />
              {t.eyebrow}
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold text-balance md:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{t.intro}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {routes.map((route) => (
                <button key={route.id} type="button" onClick={() => setSelectedRouteId(route.id)} className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${selectedRouteId === route.id ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"}`}>
                  {route.title[language]}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div>
                <div className="rounded-[1.6rem] border border-border/70 bg-white/75 p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.summary}</div>
                  <p className="mt-3 text-sm leading-7 text-foreground/86">{activeReport.summary[language]}</p>
                </div>
                <div className="mt-5 rounded-[1.6rem] border border-border/70 bg-white/75 p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.highlights}</div>
                  <ul className="mt-4 space-y-3 text-sm text-foreground/86">
                    {activeReport.highlights[language].map((item) => (
                      <li key={item} className="flex gap-3"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-white/80">
                  <img src={activeRoute.image.src} alt={activeRoute.image.alt[language]} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                  <div className="p-5">
                    <div className="text-lg font-semibold text-foreground">{activeRoute.title[language]}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{activeRoute.strapline[language]}</p>
                  </div>
                </div>
                <div className="rounded-[1.6rem] border border-border/70 bg-white/75 p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.stats}</div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {activeReport.stats.map((stat) => (
                      <div key={`${stat.value}-${stat.label.en}`} className="rounded-[1.2rem] border border-border/70 bg-background/85 p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{stat.label[language]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.6rem] border border-border/70 bg-white/75 p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.assets}</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {activeReport.assets[language].map((asset) => (
                      <div key={asset} className="rounded-[1.2rem] border border-border/70 bg-background/85 p-3 text-sm font-medium text-foreground/86">{asset}</div>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <Link to="/contacte"><Button variant="hero" size="lg" className="rounded-full">{t.request}</Button></Link>
                    <Link to="/drive-experience"><Button variant="outline" size="lg" className="rounded-full">{t.back}</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default PostDriveReport;
