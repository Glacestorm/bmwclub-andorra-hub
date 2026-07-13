import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, CloudSun, Flag, FolderArchive } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { yearLabels } from "@/content/calendarData";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { getEventsByYearFromList } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { fallbackCalendarYears, getCalendarYearsFromEvents, useMergedEvents } from "@/lib/clubCms";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Calendari públic del club", title: "Sortides, esdeveniments i temporada viva", subtitle: "La nova web recupera el calendari públic del club, els anys anteriors que hem pogut reconstruir i la meteo comparada d'origen i destí per a cada sortida.", open2026: "Obrir 2026", weather: "Meteo origen / destí", recovered: "esdeveniments recuperats", pending: "pendents a partir d'avui", viewCalendar: "Veure calendari", coverageTitle: "Cobertura actual", coverageBody: "Hem carregat", coverageBody2: "sortides i activitats públiques a partir del calendari original, els títols recuperats del recull del club i les dates inferides de les fotos quan el calendari antic retornava error.", coverageNote: "Les dates confirmades per la web original conserven enllaç a l'original. Les dates inferides queden marcades per evitar confusions.", seasons: "temporades visibles", spotlight: "Ruta destacada", spotlightBody: "L'experiència de calendari ja no és un simple llistat: combina agenda, detall de ruta, meteo i connexió directa amb galeria i arxiu.", openHighlights: "Obrir destacats", yearsLabel: "Anys recuperats" },
  es: { eyebrow: "Calendario público del club", title: "Salidas, eventos y temporada viva", subtitle: "La nueva web recupera el calendario público del club, los años anteriores que hemos podido reconstruir y la meteo comparada de origen y destino para cada salida.", open2026: "Abrir 2026", weather: "Meteo origen / destino", recovered: "eventos recuperados", pending: "pendientes a partir de hoy", viewCalendar: "Ver calendario", coverageTitle: "Cobertura actual", coverageBody: "Hemos cargado", coverageBody2: "salidas y actividades públicas a partir del calendario original, los títulos recuperados del archivo del club y las fechas inferidas de las fotos cuando el calendario antiguo devolvía error.", coverageNote: "Las fechas confirmadas por la web original conservan enlace a la fuente. Las fechas inferidas quedan marcadas para evitar confusiones.", seasons: "temporadas visibles", spotlight: "Ruta destacada", spotlightBody: "La experiencia de calendario ya no es un simple listado: combina agenda, detalle de ruta, meteo y conexión directa con galería y archivo.", openHighlights: "Abrir destacados", yearsLabel: "Años recuperados" },
  fr: { eyebrow: "Calendrier public du club", title: "Sorties, événements et saison vivante", subtitle: "Le nouveau site récupère le calendrier public du club, les années précédentes que nous avons pu reconstruire et la météo comparée entre origine et destination pour chaque sortie.", open2026: "Ouvrir 2026", weather: "Météo origine / destination", recovered: "événements récupérés", pending: "à venir à partir d'aujourd'hui", viewCalendar: "Voir le calendrier", coverageTitle: "Couverture actuelle", coverageBody: "Nous avons chargé", coverageBody2: "sorties et activités publiques à partir du calendrier original, des titres récupérés des archives du club et des dates déduites des photos lorsque l'ancien calendrier renvoyait une erreur.", coverageNote: "Les dates confirmées par le site original conservent un lien vers la source. Les dates déduites restent signalées pour éviter toute confusion.", seasons: "saisons visibles", spotlight: "Parcours mis en avant", spotlightBody: "L'expérience calendrier n'est plus une simple liste : elle combine agenda, détail de parcours, météo et lien direct avec galerie et archives.", openHighlights: "Ouvrir les temps forts", yearsLabel: "Années reconstruites" },
  en: { eyebrow: "Public club calendar", title: "Outings, events and a live season", subtitle: "The new site restores the club's public calendar, the previous years we were able to rebuild, and origin/destination weather comparisons for each outing.", open2026: "Open 2026", weather: "Origin / destination weather", recovered: "recovered events", pending: "upcoming from today", viewCalendar: "View calendar", coverageTitle: "Current coverage", coverageBody: "We have loaded", coverageBody2: "public outings and activities from the original calendar, titles recovered from the club archive and dates inferred from photos when the old calendar returned an error.", coverageNote: "Dates confirmed by the original website keep a link to the source. Inferred dates remain marked to avoid confusion.", seasons: "visible seasons", spotlight: "Featured route", spotlightBody: "The calendar experience is no longer a simple list: it combines agenda, route detail, weather and direct links to gallery and archive.", openHighlights: "Open highlights", yearsLabel: "Recovered years" },
  pt: { eyebrow: "Calendário público do clube", title: "Passeios, eventos e temporada viva", subtitle: "O novo site recupera o calendário público do clube, os anos anteriores que conseguimos reconstruir e a meteorologia comparada de origem e destino para cada passeio.", open2026: "Abrir 2026", weather: "Meteorologia origem / destino", recovered: "eventos recuperados", pending: "pendentes a partir de hoje", viewCalendar: "Ver calendário", coverageTitle: "Cobertura atual", coverageBody: "Carregámos", coverageBody2: "passeios e atividades públicas a partir do calendário original, dos títulos recuperados do arquivo do clube e das datas inferidas das fotos quando o calendário antigo devolvia erro.", coverageNote: "As datas confirmadas pelo site original mantêm link para a fonte. As datas inferidas permanecem assinaladas para evitar evitar confusões.", seasons: "temporadas visíveis", spotlight: "Rota em destaque", spotlightBody: "A experiência de calendário já não é uma simples lista: combina agenda, detalhe de rota, meteorologia e ligação direta à galeria e arquivo.", openHighlights: "Abrir destaques", yearsLabel: "Anos recuperados" },
  de: { eyebrow: "Öffentlicher Club-Kalender", title: "Ausfahrten, Veranstaltungen und eine lebendige Saison", subtitle: "Die neue Website stellt den öffentlichen Kalender des Clubs, frühere rekonstruierte Jahre und den Wettervergleich von Start und Ziel für jede Ausfahrt wieder her.", open2026: "2026 öffnen", weather: "Wetter Start / Ziel", recovered: "rekonstruierte Termine", pending: "noch ausstehend ab heute", viewCalendar: "Kalender ansehen", coverageTitle: "Aktuelle Abdeckung", coverageBody: "Wir haben", coverageBody2: "öffentliche Ausfahrten und Aktivitäten aus dem Originalkalender, archivierte Clubtitel und aus Fotos abgeleitete Daten geladen, wenn der alte Kalender Fehler lieferte.", coverageNote: "Vom Original bestätigte Daten behalten einen Link zur Quelle. Abgeleitete Daten bleiben markiert, um Verwechslungen zu vermeiden.", seasons: "sichtbare Saisons", spotlight: "Hervorgehobene Route", spotlightBody: "Das Kalender-Erlebnis ist nicht mehr nur eine Liste: Es kombiniert Agenda, Routendetails, Wetter und direkte Verbindungen zu Galerie und Archiv.", openHighlights: "Highlights öffnen", yearsLabel: "Rekonstruierte Jahre" },
  ru: { eyebrow: "Публичный календарь клуба", title: "Выезды, события и живой сезон", subtitle: "Новый сайт восстанавливает публичный календарь клуба, прошлые годы, которые удалось собрать, и сравнение погоды точки старта и финиша для каждого выезда.", open2026: "Открыть 2026", weather: "Погода старта / финиша", recovered: "восстановленных событий", pending: "ещё впереди с сегодняшнего дня", viewCalendar: "Открыть календарь", coverageTitle: "Текущее покрытие", coverageBody: "Мы загрузили", coverageBody2: "публичные выезды и мероприятия из исходного календаря, названия из архива клуба и даты, восстановленные по фотографиям, когда старый календарь отдавал ошибку.", coverageNote: "Даты, подтверждённые оригинальным сайтом, сохраняют ссылку на источник. Восстановленные даты помечены, чтобы избежать путаницы.", seasons: "видимых сезонов", spotlight: "Главный маршрут", spotlightBody: "Календарь больше не выглядит простым списком: он объединяет афишу, детали маршрута, погоду и прямые связи с галереей и архивом.", openHighlights: "Открыть главное", yearsLabel: "Восстановленные годы" },
};

export const CalendarLanding = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { data: events } = useMergedEvents();
  const years = getCalendarYearsFromEvents(events).length ? getCalendarYearsFromEvents(events) : fallbackCalendarYears;
  const recoveredYears = years.length;
  const nextYearEvents = getEventsByYearFromList(events, 2026);

  return (
    <>
      <section className="section-shell pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-stretch">
            <div className="glass-dark rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-elegant">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(207_100%_55%_/_0.28),_transparent_32%)]" />
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="glass-panel rounded-full px-4 py-1 text-xs font-semibold tracking-[0.24em] text-slate-900 uppercase">{t.eyebrow}</span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">{events.length} {t.recovered}</span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
                  <p className="mt-4 text-lg md:text-xl text-white/78 max-w-3xl">{t.subtitle}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.yearsLabel}</p>
                    <p className="mt-2 text-3xl font-bold">{recoveredYears}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">2026</p>
                    <p className="mt-2 text-3xl font-bold">{nextYearEvents.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/55">{t.seasons}</p>
                    <p className="mt-2 text-3xl font-bold">{years.length}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to="/calendari/2026"><Button variant="hero" size="lg">{t.open2026}</Button></Link>
                  <Link to="/meteo"><Button variant="outline" size="lg" className="bg-white/8 text-white border-white/20 hover:bg-white/15">{t.weather}</Button></Link>
                  <Link to="/destacats"><Button variant="outline" size="lg" className="bg-white/8 text-white border-white/20 hover:bg-white/15">{t.openHighlights}</Button></Link>
                </div>
              </div>
            </div>

            <Card className="premium-card rounded-[2rem] border-0 p-7 md:p-8 shadow-elegant">
              <div className="flex items-center gap-3 text-primary">
                <Flag className="h-5 w-5" />
                <p className="text-xs uppercase tracking-[0.25em] font-semibold">{t.spotlight}</p>
              </div>
              <h2 className="mt-4 text-3xl font-bold text-balance">2026 · {yearLabels[2026] ?? `Calendari 2026`}</h2>
              <p className="mt-4 text-muted-foreground">{t.spotlightBody}</p>
              <div className="mt-6 space-y-3">
                <div className="premium-card rounded-2xl border-0 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4 text-primary" /> {nextYearEvents.length} {t.recovered}</div>
                </div>
                <div className="premium-card rounded-2xl border-0 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><CloudSun className="h-4 w-4 text-primary" /> {t.weather}</div>
                </div>
                <div className="premium-card rounded-2xl border-0 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><FolderArchive className="h-4 w-4 text-primary" /> {t.coverageTitle}</div>
                </div>
              </div>
              <Link to="/calendari/2026" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-base">{t.viewCalendar} <ArrowUpRight className="h-4 w-4" /></Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-12"><div className="container mx-auto px-4"><CountdownToNextEvent /></div></section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {years.map((year) => {
              const eventsForYear = getEventsByYearFromList(events, year);
              const upcoming = eventsForYear.filter((event) => event.start && new Date(event.start) > new Date()).length;
              return (
                <Card key={year} className="premium-card rounded-[1.75rem] border-0 p-6 space-y-5 shadow-sm transition-base hover:-translate-y-1 hover:shadow-elegant">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">{year}</p>
                      <h2 className="mt-2 text-2xl font-bold text-balance">{yearLabels[year] ?? `Calendari ${year}`}</h2>
                    </div>
                    <span className="stat-pill">{eventsForYear.length}</span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{eventsForYear.length} {t.recovered}</p>
                    <p>{upcoming} {t.pending}</p>
                  </div>
                  <Link to={`/calendari/${year}`}><Button variant="outline" className="w-full">{t.viewCalendar}</Button></Link>
                </Card>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto mt-10">
            <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8 shadow-elegant">
              <h2 className="text-2xl font-bold">{t.coverageTitle}</h2>
              <p className="mt-3 text-muted-foreground">{t.coverageBody} {events.length} {t.coverageBody2}</p>
              <div className="my-5 h-px metal-line" />
              <p className="text-sm text-muted-foreground">{t.coverageNote}</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
