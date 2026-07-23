import { Sparkles } from "lucide-react";
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

  return (
    <section className="bg-white pt-16 sm:pt-[4.25rem] md:pt-[4.75rem] lg:pt-20">
      <div className="container mx-auto px-4 pt-6 pb-10 sm:pt-8 sm:pb-12 md:pt-10 md:pb-14 lg:pt-12 lg:pb-16">
        <div className="mx-auto max-w-6xl">
          <img
            src="/legacy-mirror/images/portades-banner24.jpg"
            alt="BMW Club Andorra portada històrica"
            className="w-full h-auto rounded-[1.5rem] border border-slate-200 shadow-sm"
            loading="eager"
          />

          <div className="mt-6 space-y-4 sm:space-y-5 md:space-y-6 text-slate-950">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="h-4 w-4 text-primary" /> {t.eyebrow}
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h1 className="max-w-5xl text-[2.35rem] font-bold leading-[0.95] text-balance sm:text-5xl md:text-6xl lg:text-7xl">{t.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
