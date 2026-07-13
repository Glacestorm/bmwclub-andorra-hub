import { Link } from "react-router-dom";
import { ArrowRight, Archive, Calendar, Globe2, ShieldCheck, Sparkles, Stars } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { archiveItems, featuredEventMeta, officialBmwLinks } from "@/content/siteExperience";
import { getEventById } from "@/lib/calendar";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    ethos: "Experiència BMW amb més pes, més context i millor disseny.",
    pillars: "Nou enfocament",
    pillarsTitle: "Web més potent, més moderna i amb narrativa pròpia",
    pillarsSubtitle: "Hem portat la web cap a un llenguatge més premium: calendari viu, meteo útil, arxiu real i pont directe amb BMW oficial. Sense soroll, sense efectes gratuïts.",
    pillar1: "Calendari viu",
    pillar1d: "Sortides futures, historial i compte enrere connectats entre si.",
    pillar2: "Destacats editorials",
    pillar2d: "Els grans moments del club passen a tenir fitxa pròpia i valor de marca.",
    pillar3: "Arxiu recuperat",
    pillar3d: "Documents, vídeos i revistes que abans estaven dispersos ara passen a ser una hemeroteca útil.",
    pillar4: "BMW Oficial",
    pillar4d: "Hub especial per connectar el club amb novetats, configurador i univers oficial BMW.",
    highlightsEyebrow: "Destacats del club",
    highlightsTitle: "La part emocional també ha de respirar premium",
    highlightsCta: "Veure tots els destacats",
    archiveEyebrow: "Arxiu del club",
    archiveTitle: "Memòria recuperada, sense aparença de CMS vell",
    archiveCta: "Obrir arxiu",
    officialEyebrow: "BMW Oficial",
    officialTitle: "Enllaç directe a la marca i a les novetats oficials",
    officialCta: "Veure hub oficial",
    visitEvent: "Obrir fitxa",
    openOfficial: "Obrir",
  },
  es: {
    ethos: "Experiencia BMW con más peso, más contexto y mejor diseño.",
    pillars: "Nuevo enfoque",
    pillarsTitle: "Una web más potente, más moderna y con narrativa propia",
    pillarsSubtitle: "Hemos llevado la web hacia un lenguaje más premium: calendario vivo, meteo útil, archivo real y puente directo con BMW oficial. Sin ruido, sin efectos gratuitos.",
    pillar1: "Calendario vivo",
    pillar1d: "Salidas futuras, histórico y cuenta atrás conectados entre sí.",
    pillar2: "Destacados editoriales",
    pillar2d: "Los grandes momentos del club pasan a tener ficha propia y valor de marca.",
    pillar3: "Archivo recuperado",
    pillar3d: "Documentos, vídeos y revistas que antes estaban dispersos pasan a ser una hemeroteca útil.",
    pillar4: "BMW Oficial",
    pillar4d: "Hub especial para conectar el club con novedades, configurador y universo oficial BMW.",
    highlightsEyebrow: "Destacados del club",
    highlightsTitle: "La parte emocional también debe respirar premium",
    highlightsCta: "Ver todos los destacados",
    archiveEyebrow: "Archivo del club",
    archiveTitle: "Memoria recuperada, sin apariencia de CMS viejo",
    archiveCta: "Abrir archivo",
    officialEyebrow: "BMW Oficial",
    officialTitle: "Enlace directo a la marca y a sus novedades oficiales",
    officialCta: "Ver hub oficial",
    visitEvent: "Abrir ficha",
    openOfficial: "Abrir",
  },
  fr: {
    ethos: "Une expérience BMW avec plus de poids, de contexte et un meilleur design.",
    pillars: "Nouvelle approche",
    pillarsTitle: "Un site plus fort, plus moderne et avec son propre récit",
    pillarsSubtitle: "Nous avons amené le site vers un langage plus premium : calendrier vivant, météo utile, véritable archive et pont direct avec BMW officiel. Sans bruit, sans effets gratuits.",
    pillar1: "Calendrier vivant",
    pillar1d: "Sorties futures, historique et compte à rebours reliés entre eux.",
    pillar2: "Temps forts éditoriaux",
    pillar2d: "Les grands moments du club gagnent leur propre fiche et une vraie valeur de marque.",
    pillar3: "Archive récupérée",
    pillar3d: "Documents, vidéos et magazines auparavant dispersés deviennent une archive utile.",
    pillar4: "BMW Officiel",
    pillar4d: "Hub spécial pour relier le club aux nouveautés, au configurateur et à l'univers officiel BMW.",
    highlightsEyebrow: "Temps forts du club",
    highlightsTitle: "La partie émotionnelle doit elle aussi respirer le premium",
    highlightsCta: "Voir tous les temps forts",
    archiveEyebrow: "Archive du club",
    archiveTitle: "Mémoire récupérée, sans l'apparence d'un vieux CMS",
    archiveCta: "Ouvrir l'archive",
    officialEyebrow: "BMW Officiel",
    officialTitle: "Lien direct vers la marque et ses nouveautés officielles",
    officialCta: "Voir le hub officiel",
    visitEvent: "Ouvrir la fiche",
    openOfficial: "Ouvrir",
  },
  en: {
    ethos: "A BMW experience with more weight, more context and better design.",
    pillars: "New direction",
    pillarsTitle: "A stronger, more modern website with its own narrative",
    pillarsSubtitle: "We pushed the website towards a more premium language: live calendar, useful weather, real archive and a direct bridge to BMW official. No noise, no gratuitous effects.",
    pillar1: "Live calendar",
    pillar1d: "Future outings, history and countdown are all connected.",
    pillar2: "Editorial highlights",
    pillar2d: "The club's biggest moments now get their own page and real brand value.",
    pillar3: "Recovered archive",
    pillar3d: "Documents, videos and magazines that were scattered now become a useful archive.",
    pillar4: "BMW Official",
    pillar4d: "Special hub connecting the club with official BMW updates, configurator and brand universe.",
    highlightsEyebrow: "Club highlights",
    highlightsTitle: "The emotional side should also feel premium",
    highlightsCta: "View all highlights",
    archiveEyebrow: "Club archive",
    archiveTitle: "Recovered memory, without the look of an old CMS",
    archiveCta: "Open archive",
    officialEyebrow: "BMW Official",
    officialTitle: "Direct link to the brand and its official updates",
    officialCta: "View official hub",
    visitEvent: "Open detail",
    openOfficial: "Open",
  },
  pt: {
    ethos: "Experiência BMW com mais peso, mais contexto e melhor design.",
    pillars: "Nova direção",
    pillarsTitle: "Um site mais forte, mais moderno e com narrativa própria",
    pillarsSubtitle: "Levámos o site para uma linguagem mais premium: calendário vivo, meteorologia útil, arquivo real e ponte direta com a BMW oficial. Sem ruído, sem efeitos gratuitos.",
    pillar1: "Calendário vivo",
    pillar1d: "Passeios futuros, histórico e contagem decrescente ligados entre si.",
    pillar2: "Destaques editoriais",
    pillar2d: "Os grandes momentos do clube passam a ter página própria e valor de marca.",
    pillar3: "Arquivo recuperado",
    pillar3d: "Documentos, vídeos e revistas que antes estavam dispersos passam a formar uma hemeroteca útil.",
    pillar4: "BMW Oficial",
    pillar4d: "Hub especial para ligar o clube às novidades, configurador e universo oficial BMW.",
    highlightsEyebrow: "Destaques do clube",
    highlightsTitle: "A parte emocional também deve respirar premium",
    highlightsCta: "Ver todos os destaques",
    archiveEyebrow: "Arquivo do clube",
    archiveTitle: "Memória recuperada, sem aspeto de CMS antigo",
    archiveCta: "Abrir arquivo",
    officialEyebrow: "BMW Oficial",
    officialTitle: "Ligação direta à marca e às novidades oficiais",
    officialCta: "Ver hub oficial",
    visitEvent: "Abrir ficha",
    openOfficial: "Abrir",
  },
  de: {
    ethos: "BMW-Erlebnis mit mehr Gewicht, mehr Kontext und besserem Design.",
    pillars: "Neue Richtung",
    pillarsTitle: "Eine stärkere, modernere Website mit eigener Erzählung",
    pillarsSubtitle: "Wir haben die Website in eine hochwertigere Richtung geführt: Live-Kalender, nützliches Wetter, echtes Archiv und direkte Brücke zu BMW offiziell. Ohne Lärm, ohne unnötige Effekte.",
    pillar1: "Live-Kalender",
    pillar1d: "Zukünftige Ausfahrten, Historie und Countdown sind miteinander verbunden.",
    pillar2: "Redaktionelle Highlights",
    pillar2d: "Die wichtigsten Momente des Clubs erhalten eine eigene Seite und echten Markenwert.",
    pillar3: "Wiederhergestelltes Archiv",
    pillar3d: "Dokumente, Videos und Magazine werden aus verstreuten Dateien zu einem nützlichen Archiv.",
    pillar4: "BMW Offiziell",
    pillar4d: "Spezieller Hub, der den Club mit offiziellen BMW-Neuheiten, Konfigurator und Markenwelt verbindet.",
    highlightsEyebrow: "Club-Highlights",
    highlightsTitle: "Auch die emotionale Seite sollte hochwertig wirken",
    highlightsCta: "Alle Highlights ansehen",
    archiveEyebrow: "Club-Archiv",
    archiveTitle: "Wiederhergestellte Erinnerung ohne alten CMS-Look",
    archiveCta: "Archiv öffnen",
    officialEyebrow: "BMW Offiziell",
    officialTitle: "Direkter Link zur Marke und ihren offiziellen Neuheiten",
    officialCta: "Offiziellen Hub ansehen",
    visitEvent: "Detail öffnen",
    openOfficial: "Öffnen",
  },
  ru: {
    ethos: "Опыт BMW с большим весом, контекстом и лучшим дизайном.",
    pillars: "Новый вектор",
    pillarsTitle: "Более сильный, современный сайт со своей собственной историей",
    pillarsSubtitle: "Мы перевели сайт на более премиальный язык: живой календарь, полезная погода, настоящий архив и прямой мост к официальному BMW. Без шума, без лишних эффектов.",
    pillar1: "Живой календарь",
    pillar1d: "Будущие выезды, история и обратный отсчёт связаны между собой.",
    pillar2: "Редакционные акценты",
    pillar2d: "Главные моменты клуба получают собственные страницы и настоящий бренд-контекст.",
    pillar3: "Восстановленный архив",
    pillar3d: "Документы, видео и журналы, которые раньше были разбросаны, становятся полезным архивом.",
    pillar4: "BMW Official",
    pillar4d: "Специальный хаб, связывающий клуб с официальными новинками BMW, конфигуратором и миром бренда.",
    highlightsEyebrow: "Главные моменты клуба",
    highlightsTitle: "Эмоциональная часть тоже должна ощущаться премиально",
    highlightsCta: "Все главные моменты",
    archiveEyebrow: "Архив клуба",
    archiveTitle: "Восстановленная память без ощущения старого CMS",
    archiveCta: "Открыть архив",
    officialEyebrow: "BMW Official",
    officialTitle: "Прямая связь с брендом и его официальными новинками",
    officialCta: "Открыть официальный хаб",
    visitEvent: "Открыть карточку",
    openOfficial: "Открыть",
  },
};

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const highlightCards = featuredEventMeta.slice(0, 3).map((item) => ({ meta: item, event: getEventById(item.eventId) })).filter((item) => item.event);

  return (
    <PageShell>
      <Hero language={language} />

      <section className="-mt-16 relative z-20 pb-10">
        <div className="container mx-auto px-4">
          <Card className="glass-panel rounded-[2rem] border-0 max-w-6xl mx-auto p-6 md:p-8">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"><Sparkles className="h-4 w-4" /> {t.pillars}</div>
                <h2 className="text-3xl md:text-5xl font-bold text-balance">{t.pillarsTitle}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{t.pillarsSubtitle}</p>
              </div>
              <div className="rounded-[1.5rem] bg-accent text-white p-6 shadow-elegant">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"><Stars className="h-4 w-4" /> BMW Club Andorra</div>
                <p className="mt-4 text-xl font-semibold text-balance">{t.ethos}</p>
                <div className="mt-6 flex gap-3 flex-wrap">
                  <Link to="/destacats"><Button variant="hero">{t.highlightsCta}</Button></Link>
                  <Link to="/bmw-oficial"><Button variant="outline" className="bg-white/5 text-white border-white/15 hover:bg-white/10">{t.officialCta}</Button></Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            { title: t.pillar1, desc: t.pillar1d, icon: Calendar },
            { title: t.pillar2, desc: t.pillar2d, icon: Sparkles },
            { title: t.pillar3, desc: t.pillar3d, icon: Archive },
            { title: t.pillar4, desc: t.pillar4d, icon: Globe2 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="premium-card border-0 rounded-[1.75rem] p-6 hover-tilt">
                <div className="rounded-2xl bg-primary/10 p-3 w-fit"><Icon className="h-5 w-5 text-primary" /></div>
                <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <CountdownToNextEvent />
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.highlightsEyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-bold text-balance">{t.highlightsTitle}</h2>
            </div>
            <Link to="/destacats" className="hidden md:block"><Button variant="outline">{t.highlightsCta}</Button></Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {highlightCards.map(({ meta, event }) => (
              <Card key={meta.eventId} className="premium-card border-0 rounded-[2rem] overflow-hidden hover-tilt">
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,15,24,.05), rgba(10,15,24,.42)), url(${meta.heroImage ?? 'https://bmwclubandorra.com/images/Tour_Cevennes_Roussillon.jpg'})` }} />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{getLocalizedText(meta.tag, language)}</div>
                  <h3 className="mt-3 text-2xl font-bold text-balance">{event?.title}</h3>
                  <p className="mt-3 text-muted-foreground">{getLocalizedText(meta.summary, language)}</p>
                  <Link to={`/esdeveniments/${event?.id}`} className="inline-flex items-center gap-2 mt-5 text-primary font-medium">{t.visitEvent} <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-[0.95fr_1.05fr] gap-6 items-stretch">
          <Card className="premium-card border-0 rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.archiveEyebrow}</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">{t.archiveTitle}</h2>
            <div className="mt-6 grid gap-4">
              {archiveItems.slice(0, 3).map((item) => (
                <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="rounded-2xl bg-secondary/65 p-4 block hover:bg-secondary transition-base">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{item.accent}</div>
                  <div className="mt-2 font-semibold text-balance">{item.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{getLocalizedText(item.summary, language)}</div>
                </a>
              ))}
            </div>
            <Link to="/arxiu" className="inline-block mt-6"><Button variant="outline">{t.archiveCta}</Button></Link>
          </Card>

          <Card className="glass-dark border-0 rounded-[2rem] p-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.28),transparent_30%)]" />
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">{t.officialEyebrow}</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">{t.officialTitle}</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {officialBmwLinks.slice(0, 4).map((item) => (
                  <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10 transition-base">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">{getLocalizedText(item.tag, language)}</div>
                    <div className="mt-2 font-semibold text-balance">{getLocalizedText(item.title, language)}</div>
                    <div className="mt-2 text-sm text-white/68">{getLocalizedText(item.summary, language)}</div>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-white">{t.openOfficial} <ArrowRight className="h-4 w-4" /></div>
                  </a>
                ))}
              </div>
              <Link to="/bmw-oficial" className="inline-block mt-6"><Button variant="hero">{t.officialCta}</Button></Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
