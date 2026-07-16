import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Compass, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageCode } from "@/lib/i18n";

interface HeroProps {
  language: LanguageCode;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra La passió per BMW",
    subtitle: "Calendari viu, meteo útil, arxiu real i una experiència digital més potent per al club.",
    description: "El club presenta una experiència digital més neta, més elegant i més útil per a socis i visitants, amb calendari, arxiu i accessos clars a la informació principal.",
    primary: "Obrir calendari 2026",
    secondary: "Veure destacats",
    card1t: "Pròxima temporada",
    card1d: "Compte enrere, agenda i meteo integrats.",
    card2t: "Arxiu recuperat",
    card2d: "Documents, revistes i vídeos amb criteri.",
    card3t: "BMW Oficial",
    card3d: "Enllaç directe a novetats i univers BMW.",
    sponsorLabel: "Partner destacat",
    sponsorText: "Pyrénées Andorra reforça el pol premium del club amb més visibilitat i millor presència digital.",
    sponsorCta: "Veure patrocinadors",
  },
  es: {
    eyebrow: "BMW Club Andorra",
    title: "La pasión por BMW, ahora con presencia premium",
    subtitle: "Calendario vivo, meteo útil, archivo real y una experiencia digital más potente para el club.",
    description: "El club presenta una experiencia digital más limpia, más elegante y más útil para socios y visitantes, con calendario, archivo y accesos claros a la información principal.",
    primary: "Abrir calendario 2026",
    secondary: "Ver destacados",
    card1t: "Próxima temporada",
    card1d: "Cuenta atrás, agenda y meteo integrados.",
    card2t: "Archivo recuperado",
    card2d: "Documentos, revistas y vídeos con criterio.",
    card3t: "BMW Oficial",
    card3d: "Enlace directo a novedades y universo BMW.",
    sponsorLabel: "Partner destacado",
    sponsorText: "Pyrénées Andorra refuerza el polo premium del club con más visibilidad y mejor presencia digital.",
    sponsorCta: "Ver patrocinadores",
  },
  fr: {
    eyebrow: "BMW Club Andorra",
    title: "La passion BMW, désormais avec une présence premium",
    subtitle: "Calendrier vivant, météo utile, véritable archive et une expérience digitale plus forte pour le club.",
    description: "Le club présente une expérience digitale plus propre, plus élégante et plus utile pour les membres et visiteurs, avec calendrier, archive et accès clairs aux informations principales.",
    primary: "Ouvrir le calendrier 2026",
    secondary: "Voir les temps forts",
    card1t: "Prochaine saison",
    card1d: "Compte à rebours, agenda et météo intégrés.",
    card2t: "Archive récupérée",
    card2d: "Documents, magazines et vidéos avec méthode.",
    card3t: "BMW Officiel",
    card3d: "Lien direct vers les nouveautés et l'univers BMW.",
    sponsorLabel: "Partenaire mis en avant",
    sponsorText: "Pyrénées Andorra renforce le pôle premium du club avec plus de visibilité et une meilleure présence digitale.",
    sponsorCta: "Voir les sponsors",
  },
  en: {
    eyebrow: "BMW Club Andorra",
    title: "BMW passion, now with a premium digital presence",
    subtitle: "Live calendar, useful weather, real archive and a stronger digital experience for the club.",
    description: "The club presents a cleaner, more elegant and more useful digital experience for members and visitors, with calendar, archive and clear access to key information.",
    primary: "Open 2026 calendar",
    secondary: "View highlights",
    card1t: "Next season",
    card1d: "Countdown, agenda and weather in one place.",
    card2t: "Recovered archive",
    card2d: "Documents, magazines and videos with intent.",
    card3t: "BMW Official",
    card3d: "Direct link to BMW updates and official universe.",
    sponsorLabel: "Featured partner",
    sponsorText: "Pyrénées Andorra strengthens the club's premium side with more visibility and a stronger digital presence.",
    sponsorCta: "View sponsors",
  },
  pt: {
    eyebrow: "BMW Club Andorra",
    title: "A paixão BMW, agora com presença premium",
    subtitle: "Calendário vivo, meteorologia útil, arquivo real e uma experiência digital mais forte para o clube.",
    description: "O clube apresenta uma experiência digital mais limpa, mais elegante e mais útil para sócios e visitantes, com calendário, arquivo e acessos claros à informação principal.",
    primary: "Abrir calendário 2026",
    secondary: "Ver destaques",
    card1t: "Próxima temporada",
    card1d: "Contagem, agenda e meteorologia integradas.",
    card2t: "Arquivo recuperado",
    card2d: "Documentos, revistas e vídeos com critério.",
    card3t: "BMW Oficial",
    card3d: "Ligação direta a novidades e universo BMW.",
    sponsorLabel: "Parceiro em destaque",
    sponsorText: "Pyrénées Andorra reforça o lado premium do clube com mais visibilidade e melhor presença digital.",
    sponsorCta: "Ver patrocinadores",
  },
  de: {
    eyebrow: "BMW Club Andorra",
    title: "BMW-Leidenschaft, jetzt mit Premium-Präsenz",
    subtitle: "Live-Kalender, nützliches Wetter, echtes Archiv und ein stärkeres digitales Erlebnis für den Club.",
    description: "Der Club bietet ein saubereres, eleganteres und nützlicheres digitales Erlebnis für Mitglieder und Besucher, mit Kalender, Archiv und klarem Zugang zu den wichtigsten Informationen.",
    primary: "Kalender 2026 öffnen",
    secondary: "Highlights ansehen",
    card1t: "Nächste Saison",
    card1d: "Countdown, Agenda und Wetter integriert.",
    card2t: "Wiederhergestelltes Archiv",
    card2d: "Dokumente, Magazine und Videos mit Sinn.",
    card3t: "BMW Offiziell",
    card3d: "Direkter Link zu Neuheiten und BMW-Welt.",
    sponsorLabel: "Hervorgehobener Partner",
    sponsorText: "Pyrénées Andorra stärkt die Premium-Seite des Clubs mit mehr Sichtbarkeit und stärkerer digitaler Präsenz.",
    sponsorCta: "Sponsoren ansehen",
  },
  ru: {
    eyebrow: "BMW Club Andorra",
    title: "Страсть к BMW — теперь с премиальным присутствием",
    subtitle: "Живой календарь, полезная погода, настоящий архив и более сильный цифровой опыт для клуба.",
    description: "Клуб представляет более чистый, элегантный и полезный цифровой формат для участников и гостей: с календарём, архивом и понятным доступом к основной информации.",
    primary: "Открыть календарь 2026",
    secondary: "Смотреть главное",
    card1t: "Следующий сезон",
    card1d: "Обратный отсчёт, повестка и погода вместе.",
    card2t: "Восстановленный архив",
    card2d: "Документы, журналы и видео с идеей.",
    card3t: "BMW Official",
    card3d: "Прямая ссылка на новинки и мир BMW.",
    sponsorLabel: "Выделенный партнёр",
    sponsorText: "Pyrénées Andorra усиливает премиальный полюс клуба за счёт большей заметности и более сильного цифрового присутствия.",
    sponsorCta: "Открыть спонсоров",
  },
};

export const Hero = ({ language }: HeroProps) => {
  const t = translations[language];
  const heroCards = [
    { icon: Calendar, title: t.card1t, desc: t.card1d, href: "/calendari/2026" },
    { icon: Compass, title: t.card2t, desc: t.card2d, href: "/arxiu" },
    { icon: Sparkles, title: t.card3t, desc: t.card3d, href: "/bmw-oficial" },
  ];

  return (
    <section className="relative flex min-h-[68vh] items-start justify-center overflow-hidden pt-16 sm:min-h-[72vh] sm:pt-[4.25rem] md:min-h-[78vh] md:pt-[4.75rem] lg:min-h-[92vh] lg:pt-20">
      <div className="absolute inset-0 z-0">
        <img src="/legacy-mirror/images/portades-banner24.jpg" alt="BMW Club Andorra portada històrica" className="h-full w-full object-cover object-[56%_center] scale-100 sm:object-center sm:scale-[1.01] md:scale-[1.03]" loading="eager" />
        <div className="absolute inset-0 gradient-overlay opacity-70 sm:opacity-80 md:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(0,102,177,.22),transparent_24%),radial-gradient(circle_at_12%_18%,rgba(255,255,255,.10),transparent_18%)] md:bg-[radial-gradient(circle_at_80%_10%,rgba(0,102,177,.32),transparent_22%),radial-gradient(circle_at_10%_25%,rgba(255,255,255,.12),transparent_18%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 lg:pt-16 lg:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 items-start">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-medium backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="h-4 w-4" /> {t.eyebrow}
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="relative isolate inline-block max-w-5xl">
                <div
                  className="pointer-events-none absolute -left-[3%] top-[6%] -z-10 hidden h-[92%] w-[86%] rounded-[3rem] opacity-75 blur-xl md:block"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,56,168,0.50) 0%, rgba(0,56,168,0.50) 33%, rgba(252,208,22,0.38) 33%, rgba(252,208,22,0.38) 66%, rgba(210,16,52,0.46) 66%, rgba(210,16,52,0.46) 100%)",
                    transform: "rotate(-7deg)",
                    maskImage: "radial-gradient(circle at center, black 52%, transparent 84%)",
                    WebkitMaskImage: "radial-gradient(circle at center, black 52%, transparent 84%)",
                  }}
                />
                <h1 className="text-[2.35rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-[0.95]">{t.title}</h1>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-2.5 pt-1 sm:flex-row sm:items-start sm:gap-4 sm:pt-2">
              <Link to="/calendari/2026" className="w-full sm:w-auto"><Button variant="hero" className="h-12 w-full gap-2 px-6 text-base sm:h-14 sm:w-auto sm:px-10 sm:text-lg">{t.primary}<ArrowRight className="h-5 w-5" /></Button></Link>
              <Link to="/destacats" className="w-full sm:w-auto"><Button variant="outline" className="h-12 w-full border-white/20 bg-white/8 px-6 text-base text-white hover:bg-white/14 sm:h-14 sm:w-auto sm:px-10 sm:text-lg">{t.secondary}</Button></Link>
            </div>

            <div className="glass-dark max-w-2xl rounded-[1.35rem] border border-white/10 p-3.5 sm:rounded-[1.65rem] sm:p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    {t.sponsorLabel}
                  </div>
                  <div className="mt-3 text-lg font-semibold sm:text-xl">Pyrénées Andorra</div>
                  <p className="mt-2 text-sm text-white/68 sm:text-sm">{t.sponsorText}</p>
                </div>
                <Link to="/patrocinadors" className="shrink-0 w-full sm:w-auto">
                  <Button variant="outline" className="h-11 w-full rounded-full border-white/15 bg-white/6 px-5 text-sm text-white hover:bg-white/10 sm:h-auto sm:w-auto">{t.sponsorCta}</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden self-start gap-3 md:grid md:grid-cols-2 md:gap-4 lg:ml-auto lg:max-w-xl lg:grid-cols-1 lg:gap-4">
            {heroCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`glass-panel block rounded-[1.6rem] p-5 transition-base hover:-translate-y-1 hover:shadow-elegant md:min-h-[168px] lg:min-h-0 ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-primary/10 p-3"><Icon className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
