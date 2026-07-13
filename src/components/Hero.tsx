import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Compass, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bmw.jpg";
import { LanguageCode } from "@/lib/i18n";

interface HeroProps {
  language: LanguageCode;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "BMW Club Andorra",
    title: "La passió per BMW, ara amb presència premium",
    subtitle: "Calendari viu, meteo útil, arxiu real i una experiència digital més potent per al club.",
    description: "Hem redissenyat la web perquè soni a BMW sense caure en una còpia estrident: més neta, més elegant, més moderna i molt més útil per a socis i visitants.",
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
    description: "Hemos rediseñado la web para que suene a BMW sin caer en una copia estridente: más limpia, más elegante, más moderna y mucho más útil para socios y visitantes.",
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
    description: "Nous avons repensé le site pour qu'il évoque BMW sans tomber dans une copie tapageuse : plus propre, plus élégant, plus moderne et beaucoup plus utile pour les membres et visiteurs.",
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
    description: "We redesigned the website so it feels BMW-inspired without becoming a loud imitation: cleaner, more elegant, more modern and far more useful for members and visitors.",
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
    description: "Redesenhámos o site para soar a BMW sem cair numa cópia exagerada: mais limpo, mais elegante, mais moderno e muito mais útil para sócios e visitantes.",
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
    description: "Wir haben die Website so überarbeitet, dass sie BMW atmet, ohne wie eine laute Kopie zu wirken: sauberer, eleganter, moderner und deutlich nützlicher für Mitglieder und Besucher.",
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
    description: "Мы переработали сайт так, чтобы он ощущался в духе BMW, но без громкой имитации: чище, элегантнее, современнее и гораздо полезнее для участников и гостей.",
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
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="BMW in Andorra mountains" className="w-full h-full object-cover scale-[1.03]" loading="eager" />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,102,177,.32),transparent_22%),radial-gradient(circle_at_10%_25%,rgba(255,255,255,.12),transparent_18%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
          <div className="space-y-7 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> {t.eyebrow}
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-balance leading-[0.95]">{t.title}</h1>
              <p className="text-xl md:text-2xl font-light text-white/85 max-w-3xl">{t.subtitle}</p>
            </div>
            <p className="text-base md:text-lg text-white/74 max-w-2xl leading-relaxed">{t.description}</p>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Link to="/calendari/2026"><Button variant="hero" size="xl" className="gap-2">{t.primary}<ArrowRight className="h-5 w-5" /></Button></Link>
              <Link to="/destacats"><Button variant="outline" size="xl" className="bg-white/8 text-white border-white/20 hover:bg-white/14">{t.secondary}</Button></Link>
            </div>

            <div className="glass-dark rounded-[1.65rem] border border-white/10 p-5 max-w-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    <Star className="h-3.5 w-3.5 text-primary" />
                    {t.sponsorLabel}
                  </div>
                  <div className="mt-3 text-xl font-semibold">Pyrénées Andorra</div>
                  <p className="mt-2 text-sm text-white/68">{t.sponsorText}</p>
                </div>
                <Link to="/patrocinadors" className="shrink-0">
                  <Button variant="outline" className="rounded-full border-white/15 bg-white/6 text-white hover:bg-white/10">{t.sponsorCta}</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:max-w-xl lg:ml-auto">
            {[
              { icon: Calendar, title: t.card1t, desc: t.card1d },
              { icon: Compass, title: t.card2t, desc: t.card2d },
              { icon: Sparkles, title: t.card3t, desc: t.card3d },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-panel rounded-[1.75rem] p-5 hover-tilt">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-primary/10 p-3"><Icon className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
