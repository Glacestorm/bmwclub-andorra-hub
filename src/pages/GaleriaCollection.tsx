import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, Gauge, Images, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryMediaSections } from "@/components/GalleryMediaSections";
import { bmwContent } from "@/content/bmwContent";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { mergeGallerySections, usePublishedGallerySections } from "@/lib/clubCms";

const pageByPath: Record<string, keyof typeof bmwContent> = {
  "/galeria/historiques": "historiques",
  "/galeria/historiques/2011-2012": "historiques_2011_2012",
  "/galeria/historiques/2013-2015": "historiques_2013_2015",
  "/galeria/historiques/2016-2021": "historiques_2016_2021",
  "/galeria/historiques/2022": "historiques_2022",
  "/galeria/sortides/2024": "sortides_2024",
  "/galeria/sortides/2025": "sortides_2025",
  "/galeria/sortides/2026": "sortides_2026",
};

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    gallery: "Galeria",
    albums: "Àlbums",
    photos: "fotos",
    sections: "seccions visuals",
    back: "Tornar a galeria",
    collections: "Col·leccions",
    collectionsTitle: "Lectura més clara del material recuperat",
    collectionsBody: "Cada any o bloc històric ara s'obre com una peça pròpia, amb àlbums, arxiu fotogràfic i millor jerarquia visual.",
    openMedia: "Obrir arxiu visual",
    performance: "Galeria preparada",
    performanceBody: "La pàgina carrega primer la vista resum i només descarrega les fotos completes quan obres cada àlbum.",
    progressive: "càrrega progressiva",
  },
  es: {
    gallery: "Galería",
    albums: "Álbumes",
    photos: "fotos",
    sections: "secciones visuales",
    back: "Volver a galería",
    collections: "Colecciones",
    collectionsTitle: "Lectura más clara del material recuperado",
    collectionsBody: "Cada año o bloque histórico se abre ahora como una pieza propia, con álbumes, archivo fotográfico y mejor jerarquía visual.",
    openMedia: "Abrir archivo visual",
    performance: "Galería preparada",
    performanceBody: "La página carga primero la vista resumen y solo descarga las fotos completas cuando abres cada álbum.",
    progressive: "carga progresiva",
  },
  fr: {
    gallery: "Galerie",
    albums: "Albums",
    photos: "photos",
    sections: "sections visuelles",
    back: "Retour à la galerie",
    collections: "Collections",
    collectionsTitle: "Lecture plus claire du matériel récupéré",
    collectionsBody: "Chaque année ou bloc historique s'ouvre désormais comme une pièce propre, avec albums, archive photographique et meilleure hiérarchie visuelle.",
    openMedia: "Ouvrir l'archive visuelle",
    performance: "Galerie préparée",
    performanceBody: "La page charge d'abord la vue résumée et ne télécharge les photos complètes que lorsque vous ouvrez chaque album.",
    progressive: "chargement progressif",
  },
  en: {
    gallery: "Gallery",
    albums: "Albums",
    photos: "photos",
    sections: "visual sections",
    back: "Back to gallery",
    collections: "Collections",
    collectionsTitle: "Clearer reading of the recovered material",
    collectionsBody: "Each year or historical block now opens as its own piece, with albums, photographic archive and better visual hierarchy.",
    openMedia: "Open visual archive",
    performance: "Gallery ready",
    performanceBody: "The page loads the summary view first and only downloads full photos when you open each album.",
    progressive: "progressive loading",
  },
  pt: {
    gallery: "Galeria",
    albums: "Álbuns",
    photos: "fotos",
    sections: "secções visuais",
    back: "Voltar à galeria",
    collections: "Coleções",
    collectionsTitle: "Leitura mais clara do material recuperado",
    collectionsBody: "Cada ano ou bloco histórico abre agora como uma peça própria, com álbuns, arquivo fotográfico e melhor hierarquia visual.",
    openMedia: "Abrir arquivo visual",
    performance: "Galeria preparada",
    performanceBody: "A página carrega primeiro a vista resumida e só descarrega as fotos completas quando abre cada álbum.",
    progressive: "carregamento progressivo",
  },
  de: {
    gallery: "Galerie",
    albums: "Alben",
    photos: "Fotos",
    sections: "visuelle Bereiche",
    back: "Zurück zur Galerie",
    collections: "Sammlungen",
    collectionsTitle: "Klarere Lesbarkeit des wiederhergestellten Materials",
    collectionsBody: "Jedes Jahr oder jeder historische Block öffnet sich jetzt als eigener Bereich mit Alben, Bildarchiv und besserer visueller Hierarchie.",
    openMedia: "Visuelles Archiv öffnen",
    performance: "Galerie bereit",
    performanceBody: "Die Seite lädt zuerst die Übersicht und lädt vollständige Fotos erst dann, wenn ein Album geöffnet wird.",
    progressive: "progressives Laden",
  },
  ru: {
    gallery: "Галерея",
    albums: "Альбомы",
    photos: "фото",
    sections: "визуальных разделов",
    back: "Назад в галерею",
    collections: "Коллекции",
    collectionsTitle: "Более ясное чтение восстановленного материала",
    collectionsBody: "Каждый год или исторический блок теперь открывается как отдельный материал с альбомами, фотоархивом и лучшей визуальной иерархией.",
    openMedia: "Открыть визуальный архив",
    performance: "Галерея готова",
    performanceBody: "Страница сначала загружает обзор, а полные фотографии скачиваются только при открытии альбома.",
    progressive: "прогрессивная загрузка",
  },
};

const GaleriaCollection = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language] ?? translations.ca;
  const key = pageByPath[location.pathname];

  if (!key) {
    return <Navigate to="/galeria" replace />;
  }

  const page = bmwContent[key];
  const { data: dynamicSections } = usePublishedGallerySections(key);
  const sections = mergeGallerySections(galleryMediaByPage[key] ?? [], dynamicSections).filter(
    (section) => Boolean(section) && Array.isArray(section.images),
  );
  const photoCount = sections.reduce((acc, section) => acc + section.images.length, 0);

  return (
    <PageShell>
      <section className="pt-10 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2.5rem] overflow-hidden relative p-8 md:p-10 text-white shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.35),transparent_30%)]" />
            <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  <Images className="h-4 w-4" />
                  {t.gallery}
                </div>
                <h1 className="mt-5 text-4xl md:text-6xl font-bold text-balance">{page.hero.title}</h1>
                {page.hero.subtitle ? <p className="mt-5 max-w-3xl text-lg text-white/76">{page.hero.subtitle}</p> : null}
                <div className="mt-8 flex flex-wrap gap-3">
                  <NavigateButton href="/galeria" label={t.back} />
                  <span className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/75">{t.progressive}</span>
                </div>
              </div>

              <Card className="glass-panel border-0 rounded-[2rem] p-6 md:p-7 text-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.collections}</p>
                <h2 className="mt-3 text-3xl font-bold text-balance">{t.collectionsTitle}</h2>
                <p className="mt-4 text-muted-foreground">{t.collectionsBody}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-[1.25rem] bg-secondary/80 p-4">
                    <div className="text-2xl font-bold">{page.albums?.length ?? 0}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.albums}</div>
                  </div>
                  <div className="rounded-[1.25rem] bg-secondary/80 p-4">
                    <div className="text-2xl font-bold">{sections.length}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.sections}</div>
                  </div>
                  <div className="rounded-[1.25rem] bg-secondary/80 p-4">
                    <div className="text-2xl font-bold">{photoCount}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.photos}</div>
                  </div>
                </div>
                <div className="mt-6 rounded-[1.5rem] border border-border/70 bg-white/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary"><Gauge className="h-4 w-4" /> {t.performance}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{t.performanceBody}</p>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </section>

      {page.albums?.length ? (
        <section className="pb-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {page.albums.map((album) => (
                <Card key={`${album.year ?? "album"}-${album.title}`} className="premium-card border-0 rounded-[1.7rem] p-5 hover-tilt shadow-sm">
                  {album.year ? <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">{album.year}</p> : null}
                  <h2 className="text-lg font-semibold text-balance">{album.title}</h2>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {sections.length ? <GalleryMediaSections pageKey={key} sections={sections} /> : null}

      {!sections.length && page.groups?.length ? (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">
              {page.groups.map((group) => (
                <Card key={group.href} className="premium-card border-0 rounded-[2rem] p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-balance">{group.title}</h2>
                  <div className="mt-5"><NavigateButton href={group.href} label={t.openMedia} /></div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
};

const NavigateButton = ({ href, label }: { href: string; label: string }) => (
  <Link to={href}>
    <Button variant="hero" className="rounded-full gap-2">{label}<ArrowRight className="h-4 w-4" /></Button>
  </Link>
);

export default GaleriaCollection;
