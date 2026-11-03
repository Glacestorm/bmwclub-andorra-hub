import { Link } from "react-router-dom";
import { ArrowRight, Camera, Clock3, Images, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { bmwContent } from "@/content/bmwContent";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { mergeGallerySections, usePublishedGallerySections } from "@/lib/clubCms";
import { translateText } from "@/lib/siteTranslations";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Galeria del club",
    title: "Els moments del club, en imatges",
    subtitle: "Sortides, trobades, moments històrics i vida social del BMW Club Andorra al llarg dels anys.",
    openingCta: "Obrir fotos històriques",
    secondaryCta: "Veure sortides recents",
    categories: "Col·leccions",
    categoriesTitle: "Tria per on començar",
    categoryOpen: "Obrir col·lecció",
    years: "anys",
    sections: "seccions",
    photos: "fotos",
  },
  es: {
    eyebrow: "Galería del club",
    title: "Los momentos del club, en imágenes",
    subtitle: "Salidas, encuentros, momentos históricos y vida social del BMW Club Andorra a lo largo de los años.",
    openingCta: "Abrir fotos históricas",
    secondaryCta: "Ver salidas recientes",
    categories: "Colecciones",
    categoriesTitle: "Elige por dónde empezar",
    categoryOpen: "Abrir colección",
    years: "años",
    sections: "secciones",
    photos: "fotos",
  },
  fr: {
    eyebrow: "Galerie du club",
    title: "Les moments du club en images",
    subtitle: "Sorties, rencontres, moments historiques et vie sociale du BMW Club Andorra au fil des années.",
    openingCta: "Ouvrir les photos historiques",
    secondaryCta: "Voir les sorties récentes",
    categories: "Collections",
    categoriesTitle: "Choisissez par où commencer",
    categoryOpen: "Ouvrir la collection",
    years: "années",
    sections: "sections",
    photos: "photos",
  },
  en: {
    eyebrow: "Club gallery",
    title: "The club's moments in pictures",
    subtitle: "Outings, meetups, historic moments and social life of BMW Club Andorra over the years.",
    openingCta: "Open historical photos",
    secondaryCta: "View recent outings",
    categories: "Collections",
    categoriesTitle: "Choose where to start",
    categoryOpen: "Open collection",
    years: "years",
    sections: "sections",
    photos: "photos",
  },
  pt: {
    eyebrow: "Galeria do clube",
    title: "Os momentos do clube em imagens",
    subtitle: "Passeios, encontros, momentos históricos e vida social do BMW Club Andorra ao longo dos anos.",
    openingCta: "Abrir fotos históricas",
    secondaryCta: "Ver saídas recentes",
    categories: "Coleções",
    categoriesTitle: "Escolha por onde começar",
    categoryOpen: "Abrir coleção",
    years: "anos",
    sections: "secções",
    photos: "fotos",
  },
  de: {
    eyebrow: "Club-Galerie",
    title: "Die Momente des Clubs in Bildern",
    subtitle: "Ausfahrten, Treffen, historische Momente und Clubleben des BMW Club Andorra im Lauf der Jahre.",
    openingCta: "Historische Fotos öffnen",
    secondaryCta: "Aktuelle Ausfahrten ansehen",
    categories: "Sammlungen",
    categoriesTitle: "Wählen Sie, wo Sie beginnen möchten",
    categoryOpen: "Sammlung öffnen",
    years: "Jahre",
    sections: "Bereiche",
    photos: "Fotos",
  },
  ru: {
    eyebrow: "Галерея клуба",
    title: "Моменты клуба в фотографиях",
    subtitle: "Выезды, встречи, исторические моменты и жизнь BMW Club Andorra на протяжении многих лет.",
    openingCta: "Открыть исторические фото",
    secondaryCta: "Смотреть недавние выезды",
    categories: "Коллекции",
    categoriesTitle: "Выберите, с чего начать",
    categoryOpen: "Открыть коллекцию",
    years: "лет",
    sections: "разделов",
    photos: "фото",
  },
};

const groupToPageKey: Record<string, string> = {
  "/galeria/historiques": "historiques",
  "/galeria/sortides/2024": "sortides_2024",
};

const galleryKeyByHref: Record<string, string> = {
  "/galeria/historiques": "historiques",
  "/galeria/historiques/2011-2012": "historiques_2011_2012",
  "/galeria/historiques/2013-2015": "historiques_2013_2015",
  "/galeria/historiques/2016-2021": "historiques_2016_2021",
  "/galeria/historiques/2022": "historiques_2022",
  "/galeria/sortides/2024": "sortides_2024",
  "/galeria/sortides/2025": "sortides_2025",
  "/galeria/sortides/2026": "sortides_2026",
};

const Galeria = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const page = bmwContent.galeria;
  const { data: historicDynamic } = usePublishedGallerySections("historiques");
  const { data: outingsDynamic } = usePublishedGallerySections("sortides_2024");

  const groups = (page.groups ?? []).map((group, index) => {
    const pageKey = groupToPageKey[group.href];
    const dynamicSections = pageKey === "historiques" ? historicDynamic : pageKey === "sortides_2024" ? outingsDynamic : [];
    // Count every year in the group, not just the page the card links to; a photo shown on two pages counts once.
    const galleryKeys = [...new Set([group.href, ...(group.children ?? []).map((child) => child.href)].map((href) => galleryKeyByHref[href]).filter(Boolean))];
    const sections = mergeGallerySections(galleryKeys.flatMap((key) => galleryMediaByPage[key] ?? []), dynamicSections);
    const photoCount = new Set(sections.flatMap((section) => section.images.map((image) => image.src))).size;
    return {
      ...group,
      pageKey,
      sectionCount: group.children?.length ?? 0,
      photoCount,
      accent: index === 0 ? "from-slate-950 via-slate-900 to-[hsl(207,100%,35%)] text-white" : "from-white to-slate-50 text-slate-950",
      icon: index === 0 ? Camera : Images,
    };
  });

  return (
    <PageShell>
      <section className="pt-10 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2.5rem] overflow-hidden relative p-8 md:p-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.35),transparent_30%)]" />
            <div className="relative z-10 max-w-4xl">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  <Sparkles className="h-4 w-4" />
                  {t.eyebrow}
                </div>
                <h1 className="mt-5 text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
                <p className="mt-5 max-w-3xl text-lg text-white/76">{t.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/galeria/historiques"><Button variant="hero" size="lg" className="rounded-full">{t.openingCta}</Button></Link>
                  <Link to="/galeria/sortides/2024"><Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">{t.secondaryCta}</Button></Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.categories}</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-balance">{t.categoriesTitle}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {groups.map((group) => {
              const Icon = group.icon;
              return (
                <Card key={group.href} className={`border-0 rounded-[2.2rem] overflow-hidden bg-gradient-to-br ${group.accent}`}>
                  <div className="p-8 md:p-9 h-full flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <div className={`rounded-[1rem] p-3 ${group.pageKey === "historiques" ? "bg-white/10" : "bg-primary/10"}`}>
                        <Icon className={`h-6 w-6 ${group.pageKey === "historiques" ? "text-white" : "text-primary"}`} />
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${group.pageKey === "historiques" ? "bg-white/10 text-white/75" : "bg-primary/10 text-primary"}`}>{group.sectionCount} {t.sections}</span>
                        {group.photoCount ? <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${group.pageKey === "historiques" ? "bg-white/10 text-white/75" : "bg-primary/10 text-primary"}`}>{group.photoCount} {t.photos}</span> : null}
                      </div>
                    </div>

                    <h3 className="mt-6 text-3xl font-bold text-balance">{translateText(language, group.title)}</h3>

                    <div className="mt-6 grid gap-3 flex-1">
                      {group.children?.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`rounded-[1.25rem] border p-4 transition-base ${group.pageKey === "historiques" ? "border-white/10 bg-white/6 hover:bg-white/10 text-white/85" : "border-slate-200 bg-white/70 hover:bg-white text-slate-700"}`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium">{translateText(language, child.title)}</span>
                            <ArrowRight className="h-4 w-4 shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Link to={group.href}>
                        <Button variant={group.pageKey === "historiques" ? "outline" : "hero"} className={group.pageKey === "historiques" ? "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10" : "rounded-full"}>
                          {t.categoryOpen}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Galeria;
