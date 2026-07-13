import { Link } from "react-router-dom";
import { ArrowRight, Camera, Clock3, Images, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { bmwContent } from "@/content/bmwContent";
import { galleryMediaByPage } from "@/content/galleryMedia";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Galeria del club",
    title: "Una galeria amb més caràcter editorial i millor lectura visual",
    subtitle: "No és només un arxiu d'imatges. És la memòria viva del club: sortides, moments històrics, vida social i passió BMW explicades amb més criteri.",
    openingCta: "Obrir fotos històriques",
    secondaryCta: "Veure sortides recents",
    categories: "Blocs de galeria",
    categoriesTitle: "Dos grans relats visuals del club",
    categoryOpen: "Obrir col·lecció",
    libraryEyebrow: "Experiència visual",
    libraryTitle: "Història, comunitat i carretera dins un mateix espai",
    libraryBody: "Hem reorganitzat la galeria perquè el visitant entengui què està veient: arxiu històric, sortides modernes i col·leccions per anys amb una lectura molt més neta.",
    years: "anys",
    sections: "seccions",
    photos: "fotos",
  },
  es: {
    eyebrow: "Galería del club",
    title: "Una galería con más carácter editorial y mejor lectura visual",
    subtitle: "No es solo un archivo de imágenes. Es la memoria viva del club: salidas, momentos históricos, vida social y pasión BMW explicadas con más criterio.",
    openingCta: "Abrir fotos históricas",
    secondaryCta: "Ver salidas recientes",
    categories: "Bloques de galería",
    categoriesTitle: "Dos grandes relatos visuales del club",
    categoryOpen: "Abrir colección",
    libraryEyebrow: "Experiencia visual",
    libraryTitle: "Historia, comunidad y carretera dentro de un mismo espacio",
    libraryBody: "Hemos reorganizado la galería para que el visitante entienda qué está viendo: archivo histórico, salidas modernas y colecciones por años con una lectura mucho más limpia.",
    years: "años",
    sections: "secciones",
    photos: "fotos",
  },
  fr: {
    eyebrow: "Galerie du club",
    title: "Une galerie avec plus de caractère éditorial et une lecture visuelle plus claire",
    subtitle: "Ce n'est pas seulement une archive d'images. C'est la mémoire vivante du club : sorties, moments historiques, vie sociale et passion BMW racontés avec plus de soin.",
    openingCta: "Ouvrir les photos historiques",
    secondaryCta: "Voir les sorties récentes",
    categories: "Blocs de galerie",
    categoriesTitle: "Deux grands récits visuels du club",
    categoryOpen: "Ouvrir la collection",
    libraryEyebrow: "Expérience visuelle",
    libraryTitle: "Histoire, communauté et route dans un même espace",
    libraryBody: "Nous avons réorganisé la galerie pour que le visiteur comprenne ce qu'il regarde : archive historique, sorties modernes et collections par années avec une lecture plus propre.",
    years: "années",
    sections: "sections",
    photos: "photos",
  },
  en: {
    eyebrow: "Club gallery",
    title: "A gallery with more editorial character and clearer visual reading",
    subtitle: "This is not just an image archive. It is the living memory of the club: outings, historical moments, social life and BMW passion told with more intent.",
    openingCta: "Open historical photos",
    secondaryCta: "View recent outings",
    categories: "Gallery blocks",
    categoriesTitle: "Two big visual narratives of the club",
    categoryOpen: "Open collection",
    libraryEyebrow: "Visual experience",
    libraryTitle: "History, community and road inside one space",
    libraryBody: "We reorganised the gallery so visitors understand what they are seeing: historical archive, modern outings and year-based collections with much cleaner reading.",
    years: "years",
    sections: "sections",
    photos: "photos",
  },
  pt: {
    eyebrow: "Galeria do clube",
    title: "Uma galeria com mais carácter editorial e melhor leitura visual",
    subtitle: "Não é apenas um arquivo de imagens. É a memória viva do clube: passeios, momentos históricos, vida social e paixão BMW explicados com mais critério.",
    openingCta: "Abrir fotos históricas",
    secondaryCta: "Ver saídas recentes",
    categories: "Blocos de galeria",
    categoriesTitle: "Dois grandes relatos visuais do clube",
    categoryOpen: "Abrir coleção",
    libraryEyebrow: "Experiência visual",
    libraryTitle: "História, comunidade e estrada no mesmo espaço",
    libraryBody: "Reorganizámos a galeria para que o visitante compreenda o que está a ver: arquivo histórico, saídas modernas e coleções por anos com leitura muito mais limpa.",
    years: "anos",
    sections: "secções",
    photos: "fotos",
  },
  de: {
    eyebrow: "Club-Galerie",
    title: "Eine Galerie mit mehr editoriellem Charakter und klarerer visueller Führung",
    subtitle: "Sie ist nicht nur ein Bildarchiv. Sie ist die lebendige Erinnerung des Clubs: Ausfahrten, historische Momente, Clubleben und BMW-Leidenschaft mit mehr Struktur erzählt.",
    openingCta: "Historische Fotos öffnen",
    secondaryCta: "Aktuelle Ausfahrten ansehen",
    categories: "Galeriebereiche",
    categoriesTitle: "Zwei große visuelle Erzählungen des Clubs",
    categoryOpen: "Sammlung öffnen",
    libraryEyebrow: "Visuelle Erfahrung",
    libraryTitle: "Geschichte, Community und Straße in einem Raum",
    libraryBody: "Wir haben die Galerie neu organisiert, damit Besucher sofort verstehen, was sie sehen: historisches Archiv, moderne Ausfahrten und Jahrgangssammlungen mit deutlich besserer Lesbarkeit.",
    years: "Jahre",
    sections: "Bereiche",
    photos: "Fotos",
  },
  ru: {
    eyebrow: "Галерея клуба",
    title: "Галерея с более редакционной подачей и лучшей визуальной структурой",
    subtitle: "Это не просто архив изображений. Это живая память клуба: выезды, исторические моменты, социальная жизнь и страсть к BMW, показанные более продуманно.",
    openingCta: "Открыть исторические фото",
    secondaryCta: "Смотреть недавние выезды",
    categories: "Блоки галереи",
    categoriesTitle: "Две большие визуальные линии клуба",
    categoryOpen: "Открыть коллекцию",
    libraryEyebrow: "Визуальный опыт",
    libraryTitle: "История, сообщество и дорога в одном пространстве",
    libraryBody: "Мы переработали галерею так, чтобы посетитель понимал, что он видит: исторический архив, современные выезды и коллекции по годам с гораздо более чистой подачей.",
    years: "лет",
    sections: "разделов",
    photos: "фото",
  },
};

const groupToPageKey: Record<string, string> = {
  "/galeria/historiques": "historiques",
  "/galeria/sortides/2024": "sortides_2024",
};

const Galeria = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const page = bmwContent.galeria;

  const groups = (page.groups ?? []).map((group, index) => {
    const pageKey = groupToPageKey[group.href];
    const sections = pageKey ? galleryMediaByPage[pageKey] ?? [] : [];
    const photoCount = sections.reduce((acc, section) => acc + section.images.length, 0);
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
            <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
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

              <Card className="glass-panel border-0 rounded-[2rem] p-6 md:p-7 text-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.libraryEyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold text-balance">{t.libraryTitle}</h2>
                <p className="mt-4 text-muted-foreground">{t.libraryBody}</p>
              </Card>
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

                    <h3 className="mt-6 text-3xl font-bold text-balance">{group.title}</h3>

                    <div className="mt-6 grid gap-3 flex-1">
                      {group.children?.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`rounded-[1.25rem] border p-4 transition-base ${group.pageKey === "historiques" ? "border-white/10 bg-white/6 hover:bg-white/10 text-white/85" : "border-slate-200 bg-white/70 hover:bg-white text-slate-700"}`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-medium">{child.title}</span>
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
