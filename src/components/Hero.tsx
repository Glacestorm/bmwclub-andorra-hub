import { Sparkles } from "lucide-react";
import { LanguageCode } from "@/lib/i18n";

interface HeroProps {
  language: LanguageCode;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra La passió per BMW",
  },
  es: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra La pasión por BMW",
  },
  fr: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra La passion pour BMW",
  },
  en: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra The passion for BMW",
  },
  pt: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra A paixão pela BMW",
  },
  de: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra Die Leidenschaft für BMW",
  },
  ru: {
    eyebrow: "BMW Club Andorra",
    title: "BMW Club Andorra Страсть к BMW",
  },
};

export const Hero = ({ language }: HeroProps) => {
  const t = translations[language];

  return (
    <section className="relative flex min-h-[68vh] items-start justify-center overflow-hidden pt-16 sm:min-h-[72vh] sm:pt-[4.25rem] md:min-h-[78vh] md:pt-[4.75rem] lg:min-h-[92vh] lg:pt-20">
      <div className="absolute inset-0 z-0">
        <img src="/legacy-mirror/images/portades-banner24.jpg" alt="BMW Club Andorra portada històrica" className="h-full w-full object-cover object-center scale-100 brightness-[1.16] contrast-[1.14] saturate-[1.10] sm:scale-[1.01] md:scale-[1.03]" loading="eager" />
        <div className="absolute inset-0 gradient-overlay opacity-60 sm:opacity-68 md:opacity-78" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(0,102,177,.20),transparent_24%),radial-gradient(circle_at_12%_18%,rgba(255,255,255,.10),transparent_18%),radial-gradient(circle_at_44%_60%,rgba(255,255,255,.18),transparent_26%)] md:bg-[radial-gradient(circle_at_80%_10%,rgba(0,102,177,.28),transparent_22%),radial-gradient(circle_at_10%_25%,rgba(255,255,255,.12),transparent_18%),radial-gradient(circle_at_46%_60%,rgba(255,255,255,.22),transparent_28%)]" />
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
                  className="pointer-events-none absolute -left-[7%] top-[2%] -z-10 hidden h-[106%] w-[98%] rounded-[999px] opacity-72 blur-3xl md:block"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,56,168,0.36) 0%, rgba(0,56,168,0.36) 32%, rgba(252,208,22,0.28) 32%, rgba(252,208,22,0.28) 66%, rgba(210,16,52,0.34) 66%, rgba(210,16,52,0.34) 100%)",
                    transform: "rotate(-6deg)",
                    maskImage: "radial-gradient(ellipse at 22% 52%, black 0%, black 31%, transparent 60%), radial-gradient(ellipse at 52% 48%, black 0%, black 34%, transparent 62%), radial-gradient(ellipse at 82% 46%, black 0%, black 29%, transparent 58%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 22% 52%, black 0%, black 31%, transparent 60%), radial-gradient(ellipse at 52% 48%, black 0%, black 34%, transparent 62%), radial-gradient(ellipse at 82% 46%, black 0%, black 29%, transparent 58%)",
                  }}
                />
                <div className="pointer-events-none absolute left-[8%] top-[16%] -z-10 hidden h-[60%] w-[56%] rounded-full bg-white/8 blur-[78px] md:block" />
                <h1 className="text-[2.35rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-[0.95]">{t.title}</h1>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 sm:pt-4 md:-mt-4 md:pt-0 lg:-mt-6 pr-1 sm:pr-2 md:pr-0 lg:pr-1 xl:pr-0">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/92 p-3 shadow-elegant backdrop-blur-sm translate-x-2 sm:translate-x-4 md:translate-x-6 lg:translate-x-10 xl:translate-x-12">
              <img
                src="/club/logo-small.png"
                alt="BMW Club Andorra"
                className="h-auto w-[clamp(150px,17vw,240px)] object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
