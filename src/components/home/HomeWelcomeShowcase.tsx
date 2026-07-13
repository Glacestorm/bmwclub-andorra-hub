import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Images, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { archiveItems } from "@/content/siteExperience";

const translations: Record<LanguageCode, Record<string, string | string[]>> = {
  ca: {
    eyebrow: "Benvinguda del club",
    title: "La pàgina clàssica de benvinguda ara té millor lloc: a la home i amb més pes.",
    body: "Hem integrat l'esperit de la benvinguda original dins la portada perquè expliqui el club des del primer scroll: comunitat BMW, sortides, trobades i passió compartida.",
    primary: "Descobrir el club",
    secondary: "Obrir galeria",
    carousel: "Moments del club",
    points: [
      "Comunitat de propietaris i aficionats BMW a Andorra.",
      "Sortides, activitats i trobades amb lectura més editorial.",
      "Espai per clàssics, models actuals i memòria del club.",
    ],
    slide1: "Sortides recents",
    slide2: "Viatges i experiència",
    slide3: "Arxiu històric",
    slide4: "Memòria viva",
  },
  es: {
    eyebrow: "Bienvenida del club",
    title: "La antigua página de bienvenida ahora tiene mejor sitio: en la home y con más peso.",
    body: "He integrado el espíritu de la bienvenida original dentro de la portada para que explique el club desde el primer scroll: comunidad BMW, salidas, encuentros y pasión compartida.",
    primary: "Descubrir el club",
    secondary: "Abrir galería",
    carousel: "Momentos del club",
    points: [
      "Comunidad de propietarios y aficionados BMW en Andorra.",
      "Salidas, actividades y encuentros con lectura más editorial.",
      "Espacio para clásicos, modelos actuales y memoria del club.",
    ],
    slide1: "Salidas recientes",
    slide2: "Viajes y experiencia",
    slide3: "Archivo histórico",
    slide4: "Memoria viva",
  },
  fr: {
    eyebrow: "Bienvenue du club",
    title: "L'ancienne page de bienvenue a désormais une meilleure place : sur l'accueil et avec plus de poids.",
    body: "J'ai intégré l'esprit de la bienvenue originale dans la page d'accueil afin qu'elle explique le club dès le premier scroll : communauté BMW, sorties, rencontres et passion partagée.",
    primary: "Découvrir le club",
    secondary: "Ouvrir la galerie",
    carousel: "Moments du club",
    points: [
      "Communauté de propriétaires et passionnés BMW en Andorre.",
      "Sorties, activités et rencontres avec une lecture plus éditoriale.",
      "Un espace pour les classiques, les modèles actuels et la mémoire du club.",
    ],
    slide1: "Sorties récentes",
    slide2: "Voyages et expérience",
    slide3: "Archive historique",
    slide4: "Mémoire vivante",
  },
  en: {
    eyebrow: "Club welcome",
    title: "The old welcome page now has a better place: on the homepage and with more weight.",
    body: "I folded the spirit of the original welcome page into the homepage so it explains the club from the very first scroll: BMW community, outings, gatherings and shared passion.",
    primary: "Discover the club",
    secondary: "Open gallery",
    carousel: "Club moments",
    points: [
      "BMW owners and enthusiasts community in Andorra.",
      "Outings, activities and gatherings with a more editorial feel.",
      "Space for classics, current models and the club's memory.",
    ],
    slide1: "Recent outings",
    slide2: "Trips and experience",
    slide3: "Historical archive",
    slide4: "Living memory",
  },
  pt: {
    eyebrow: "Bem-vindo ao clube",
    title: "A antiga página de boas-vindas agora está no melhor sítio: na home e com mais peso.",
    body: "Integrei o espírito da página de boas-vindas original na homepage para que explique o clube desde o primeiro scroll: comunidade BMW, passeios, encontros e paixão partilhada.",
    primary: "Descobrir o clube",
    secondary: "Abrir galeria",
    carousel: "Momentos do clube",
    points: [
      "Comunidade de proprietários e entusiastas BMW em Andorra.",
      "Passeios, atividades e encontros com leitura mais editorial.",
      "Espaço para clássicos, modelos atuais e memória do clube.",
    ],
    slide1: "Passeios recentes",
    slide2: "Viagens e experiência",
    slide3: "Arquivo histórico",
    slide4: "Memória viva",
  },
  de: {
    eyebrow: "Club-Willkommen",
    title: "Die alte Willkommensseite hat jetzt den besseren Platz: auf der Startseite und mit mehr Gewicht.",
    body: "Ich habe den Geist der ursprünglichen Willkommensseite in die Startseite integriert, damit sie den Club schon beim ersten Scroll erklärt: BMW-Community, Ausfahrten, Treffen und gemeinsame Leidenschaft.",
    primary: "Club entdecken",
    secondary: "Galerie öffnen",
    carousel: "Club-Momente",
    points: [
      "Community von BMW-Besitzern und Enthusiasten in Andorra.",
      "Ausfahrten, Aktivitäten und Treffen mit stärkerem Editorial-Charakter.",
      "Platz für Klassiker, aktuelle Modelle und die Erinnerung des Clubs.",
    ],
    slide1: "Aktuelle Ausfahrten",
    slide2: "Reisen und Erlebnis",
    slide3: "Historisches Archiv",
    slide4: "Lebendige Erinnerung",
  },
  ru: {
    eyebrow: "Приветствие клуба",
    title: "Старая приветственная страница теперь стоит там, где нужно: на главной и с большим весом.",
    body: "Я встроил дух оригинальной приветственной страницы в главную, чтобы сайт сразу объяснял клуб: сообщество BMW, выезды, встречи и общую страсть.",
    primary: "Узнать о клубе",
    secondary: "Открыть галерею",
    carousel: "Моменты клуба",
    points: [
      "Сообщество владельцев и поклонников BMW в Андорре.",
      "Выезды, активности и встречи с более редакционной подачей.",
      "Пространство для классики, актуальных моделей и памяти клуба.",
    ],
    slide1: "Недавние выезды",
    slide2: "Поездки и опыт",
    slide3: "Исторический архив",
    slide4: "Живая память",
  },
};

const slideSources = [
  { key: "sortides_2025", labelKey: "slide1" },
  { key: "sortides_2024", labelKey: "slide2" },
  { key: "historiques_2022", labelKey: "slide3" },
  { key: "historiques_2011_2012", labelKey: "slide4" },
] as const;

export const HomeWelcomeShowcase = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = useMemo(() => {
    const fallback = archiveItems.find((item) => item.id === "tour-cevennes-image")?.href ?? "https://bmwclubandorra.com/images/Tour_Cevennes_Roussillon.jpg";

    return slideSources.map((source, index) => ({
      title: String(t[source.labelKey]),
      src: galleryMediaByPage[source.key]?.[0]?.images?.[0]?.src ?? fallback,
      alt: `${String(t[source.labelKey])} ${index + 1}`,
    }));
  }, [t]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="-mt-16 relative z-20 pb-10">
      <div className="container mx-auto px-4">
        <Card className="glass-panel rounded-[2rem] border-0 max-w-6xl mx-auto p-6 md:p-8 overflow-hidden shadow-elegant">
          <div className="grid xl:grid-cols-[1fr_1.05fr] gap-8 items-stretch">
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
                  <Sparkles className="h-4 w-4" /> {t.eyebrow}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-balance">{t.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t.body}</p>
              </div>

              <div className="grid gap-3">
                {(t.points as string[]).map((point) => (
                  <div key={point} className="rounded-[1.35rem] border border-border/70 bg-white/70 px-4 py-4 text-sm text-foreground/88 shadow-sm">
                    {point}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/el-club"><Button variant="hero">{t.primary}</Button></Link>
                <Link to="/galeria"><Button variant="outline">{t.secondary}</Button></Link>
              </div>
            </div>

            <div className="glass-dark rounded-[1.8rem] p-4 md:p-5 text-white overflow-hidden">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                  <Images className="h-3.5 w-3.5" />
                  {t.carousel}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full border-white/15 bg-white/8 text-white hover:bg-white/12" onClick={scrollPrev}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-white/15 bg-white/8 text-white hover:bg-white/12" onClick={scrollNext}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {slides.map((slide, index) => (
                    <div key={`${slide.title}-${index}`} className="min-w-0 flex-[0_0_100%] pl-0">
                      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/10">
                        <div className="relative h-[24rem] md:h-[28rem] overflow-hidden">
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            sizes="(min-width: 1280px) 42vw, 100vw"
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                            <p className="text-xs uppercase tracking-[0.24em] text-white/70">BMW Club Andorra</p>
                            <h3 className="mt-2 text-2xl md:text-3xl font-bold text-balance">{slide.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.title}-dot-${index}`}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-2.5 rounded-full transition-base ${selectedIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/55"}`}
                    aria-label={slide.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
