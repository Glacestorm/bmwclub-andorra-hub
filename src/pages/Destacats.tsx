import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Image as ImageIcon } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { featuredEventMeta } from "@/content/siteExperience";
import { getEventById, formatEventDateRange } from "@/lib/calendar";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Destacats del club", title: "Moments que mereixen pàgina pròpia", subtitle: "Aquí prioritzem els esdeveniments que donen relat, imatge i valor de marca al club: història, viatges especials, aniversaris i trobades que expliquen qui sou.", button: "Obrir fitxa", calendar: "Veure calendari", archive: "Arxiu relacionat" },
  es: { eyebrow: "Destacados del club", title: "Momentos que merecen página propia", subtitle: "Aquí priorizamos los eventos que dan relato, imagen y valor de marca al club: historia, viajes especiales, aniversarios y encuentros que explican quién sois.", button: "Abrir ficha", calendar: "Ver calendario", archive: "Archivo relacionado" },
  fr: { eyebrow: "Temps forts du club", title: "Des moments qui méritent leur propre page", subtitle: "Ici nous mettons en avant les événements qui donnent du récit, de l'image et de la valeur de marque au club : histoire, voyages spéciaux, anniversaires et rencontres qui disent qui vous êtes.", button: "Ouvrir la fiche", calendar: "Voir le calendrier", archive: "Archive liée" },
  en: { eyebrow: "Club highlights", title: "Moments that deserve their own page", subtitle: "Here we prioritise the events that give the club story, image and brand value: history, special trips, anniversaries and meetups that explain who you are.", button: "Open detail", calendar: "View calendar", archive: "Related archive" },
  pt: { eyebrow: "Destaques do clube", title: "Momentos que merecem página própria", subtitle: "Aqui priorizamos os eventos que dão narrativa, imagem e valor de marca ao clube: história, viagens especiais, aniversários e encontros que explicam quem são.", button: "Abrir ficha", calendar: "Ver calendário", archive: "Arquivo relacionado" },
  de: { eyebrow: "Highlights des Clubs", title: "Momente, die eine eigene Seite verdienen", subtitle: "Hier priorisieren wir die Ereignisse, die dem Club Geschichte, Bildsprache und Markenwert geben: Historie, besondere Reisen, Jubiläen und Treffen, die zeigen, wer ihr seid.", button: "Detail öffnen", calendar: "Kalender ansehen", archive: "Zugehöriges Archiv" },
  ru: { eyebrow: "Главные моменты клуба", title: "События, достойные собственной страницы", subtitle: "Здесь мы выделяем события, которые создают историю, образ и бренд-контекст клуба: исторические моменты, особые поездки, юбилеи и встречи, объясняющие, кто вы такие.", button: "Открыть карточку", calendar: "Открыть календарь", archive: "Связанный архив" },
};

const Destacats = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageShell>
      <section className="pt-32 pb-14 section-shell">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.eyebrow}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
          <Link to="/calendari/2026"><Button variant="hero" size="lg">{t.calendar}</Button></Link>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-6">
          {featuredEventMeta.map((meta, index) => {
            const event = getEventById(meta.eventId);
            if (!event) return null;
            return (
              <Card key={meta.eventId} className={`premium-card border-0 rounded-[2rem] overflow-hidden ${index % 3 === 0 ? 'lg:col-span-2' : ''}`}>
                <div className={`grid ${index % 3 === 0 ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
                  <div className="p-8 md:p-10 space-y-5">
                    <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{getLocalizedText(meta.tag, language)}</span>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-balance">{event.title}</h2>
                      <p className="mt-3 text-muted-foreground">{getLocalizedText(meta.summary, language)}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="rounded-2xl bg-secondary/60 p-4"><div className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="h-4 w-4" />{event.year}</div><p className="mt-2 font-medium">{formatEventDateRange(event, language)}</p></div>
                      <div className="rounded-2xl bg-secondary/60 p-4"><div className="flex items-center gap-2 text-muted-foreground"><ImageIcon className="h-4 w-4" />{t.archive}</div><p className="mt-2 font-medium">{meta.archiveIds?.length ? meta.archiveIds.length : 0}</p></div>
                    </div>
                    <Link to={`/esdeveniments/${event.id}`}><Button variant="hero">{t.button} <ArrowRight className="h-4 w-4" /></Button></Link>
                  </div>
                  <div className="min-h-[280px] lg:min-h-full relative" style={{ backgroundImage: `linear-gradient(145deg, rgba(10,15,24,.25), rgba(0,102,177,.28)), url(${meta.heroImage ?? '/legacy-mirror/images/Tour_Cevennes_Roussillon.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
};

export default Destacats;
