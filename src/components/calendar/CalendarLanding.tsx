import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calendarYears, clubEvents, yearLabels } from "@/content/calendarData";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { getEventsByYear } from "@/lib/calendar";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Calendari públic del club", title: "Sortides, esdeveniments i temporada viva", subtitle: "La nova web recupera el calendari públic del club, els anys anteriors que hem pogut reconstruir i la meteo comparada d'origen i destí per a cada sortida.", open2026: "Obrir 2026", weather: "Meteo origen / destí", recovered: "esdeveniments recuperats", pending: "pendents a partir d'avui", viewCalendar: "Veure calendari", coverageTitle: "Cobertura actual", coverageBody: "Hem carregat", coverageBody2: "sortides i activitats públiques a partir del calendari original, els títols recuperats del recull del club i les dates inferides de les fotos quan el calendari antic retornava error.", coverageNote: "Les dates confirmades per la web original conserven enllaç a l'original. Les dates inferides queden marcades per evitar confusions." },
  es: { eyebrow: "Calendario público del club", title: "Salidas, eventos y temporada viva", subtitle: "La nueva web recupera el calendario público del club, los años anteriores que hemos podido reconstruir y la meteo comparada de origen y destino para cada salida.", open2026: "Abrir 2026", weather: "Meteo origen / destino", recovered: "eventos recuperados", pending: "pendientes a partir de hoy", viewCalendar: "Ver calendario", coverageTitle: "Cobertura actual", coverageBody: "Hemos cargado", coverageBody2: "salidas y actividades públicas a partir del calendario original, los títulos recuperados del archivo del club y las fechas inferidas de las fotos cuando el calendario antiguo devolvía error.", coverageNote: "Las fechas confirmadas por la web original conservan enlace al original. Las fechas inferidas quedan marcadas para evitar confusiones." },
  fr: { eyebrow: "Calendrier public du club", title: "Sorties, événements et saison vivante", subtitle: "Le nouveau site récupère le calendrier public du club, les années précédentes que nous avons pu reconstruire et la météo comparée entre origine et destination pour chaque sortie.", open2026: "Ouvrir 2026", weather: "Météo origine / destination", recovered: "événements récupérés", pending: "à venir à partir d'aujourd'hui", viewCalendar: "Voir le calendrier", coverageTitle: "Couverture actuelle", coverageBody: "Nous avons chargé", coverageBody2: "sorties et activités publiques à partir du calendrier original, des titres récupérés des archives du club et des dates déduites des photos lorsque l'ancien calendrier renvoyait une erreur.", coverageNote: "Les dates confirmées par le site original conservent un lien vers la source. Les dates déduites restent signalées pour éviter toute confusion." },
  en: { eyebrow: "Public club calendar", title: "Outings, events and a live season", subtitle: "The new site restores the club's public calendar, the previous years we were able to rebuild, and origin/destination weather comparisons for each outing.", open2026: "Open 2026", weather: "Origin / destination weather", recovered: "recovered events", pending: "upcoming from today", viewCalendar: "View calendar", coverageTitle: "Current coverage", coverageBody: "We have loaded", coverageBody2: "public outings and activities from the original calendar, titles recovered from the club archive and dates inferred from photos when the old calendar returned an error.", coverageNote: "Dates confirmed by the original website keep a link to the source. Inferred dates remain marked to avoid confusion." },
  pt: { eyebrow: "Calendário público do clube", title: "Passeios, eventos e temporada viva", subtitle: "O novo site recupera o calendário público do clube, os anos anteriores que conseguimos reconstruir e a meteorologia comparada de origem e destino para cada passeio.", open2026: "Abrir 2026", weather: "Meteorologia origem / destino", recovered: "eventos recuperados", pending: "pendentes a partir de hoje", viewCalendar: "Ver calendário", coverageTitle: "Cobertura atual", coverageBody: "Carregámos", coverageBody2: "passeios e atividades públicas a partir do calendário original, dos títulos recuperados do arquivo do clube e das datas inferidas das fotos quando o calendário antigo devolvia erro.", coverageNote: "As datas confirmadas pelo site original mantêm link para a fonte. As datas inferidas permanecem assinaladas para evitar confusões." },
  de: { eyebrow: "Öffentlicher Club-Kalender", title: "Ausfahrten, Veranstaltungen und eine lebendige Saison", subtitle: "Die neue Website stellt den öffentlichen Kalender des Clubs, frühere rekonstruierte Jahre und den Wettervergleich von Start und Ziel für jede Ausfahrt wieder her.", open2026: "2026 öffnen", weather: "Wetter Start / Ziel", recovered: "rekonstruierte Termine", pending: "noch ausstehend ab heute", viewCalendar: "Kalender ansehen", coverageTitle: "Aktuelle Abdeckung", coverageBody: "Wir haben", coverageBody2: "öffentliche Ausfahrten und Aktivitäten aus dem Originalkalender, archivierte Clubtitel und aus Fotos abgeleitete Daten geladen, wenn der alte Kalender Fehler lieferte.", coverageNote: "Vom Original bestätigte Daten behalten einen Link zur Quelle. Abgeleitete Daten bleiben markiert, um Verwechslungen zu vermeiden." },
  ru: { eyebrow: "Публичный календарь клуба", title: "Выезды, события и живой сезон", subtitle: "Новый сайт восстанавливает публичный календарь клуба, прошлые годы, которые удалось собрать, и сравнение погоды точки старта и финиша для каждого выезда.", open2026: "Открыть 2026", weather: "Погода старта / финиша", recovered: "восстановленных событий", pending: "ещё впереди с сегодняшнего дня", viewCalendar: "Открыть календарь", coverageTitle: "Текущее покрытие", coverageBody: "Мы загрузили", coverageBody2: "публичные выезды и мероприятия из исходного календаря, названия из архива клуба и даты, восстановленные по фотографиям, когда старый календарь отдавал ошибку.", coverageNote: "Даты, подтверждённые оригинальным сайтом, сохраняют ссылку на источник. Восстановленные даты помечены, чтобы избежать путаницы." },
};

export const CalendarLanding = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-5 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/calendari/2026"><Button variant="hero" size="lg">{t.open2026}</Button></Link>
              <Link to="/meteo"><Button variant="outline" size="lg">{t.weather}</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12"><div className="container mx-auto px-4"><CountdownToNextEvent /></div></section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {calendarYears.map((year) => {
              const events = getEventsByYear(year);
              const upcoming = events.filter((event) => event.start && new Date(event.start) > new Date()).length;
              return (
                <Card key={year} className="p-6 space-y-4 hover:shadow-elegant transition-all">
                  <div><p className="text-xs uppercase tracking-[0.25em] text-primary">{year}</p><h2 className="text-2xl font-bold">{yearLabels[year]}</h2></div>
                  <div className="space-y-2 text-sm text-muted-foreground"><p>{events.length} {t.recovered}</p><p>{upcoming} {t.pending}</p></div>
                  <Link to={`/calendari/${year}`}><Button variant="outline" className="w-full">{t.viewCalendar}</Button></Link>
                </Card>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto mt-10"><Card className="p-6 space-y-3"><h2 className="text-2xl font-bold">{t.coverageTitle}</h2><p className="text-muted-foreground">{t.coverageBody} {clubEvents.length} {t.coverageBody2}</p><p className="text-sm text-muted-foreground">{t.coverageNote}</p></Card></div>
        </div>
      </section>
    </>
  );
};
