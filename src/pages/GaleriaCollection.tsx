import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, Images, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryMediaSections } from "@/components/GalleryMediaSections";
import { bmwContent } from "@/content/bmwContent";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { mergeGallerySections, usePublishedGallerySections } from "@/lib/clubCms";
import { translateText } from "@/lib/siteTranslations";

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
    back: "Tornar a galeria",
    collections: "Col·lecció",
    collectionsTitle: "Àlbums i fotos",
    collectionsBody: "Obre un àlbum per veure'n totes les fotos i selecciona qualsevol imatge per ampliar-la.",
    openMedia: "Veure fotos",
  },
  es: {
    gallery: "Galería",
    albums: "Álbumes",
    photos: "fotos",
    back: "Volver a galería",
    collections: "Colección",
    collectionsTitle: "Álbumes y fotos",
    collectionsBody: "Abre un álbum para ver todas sus fotos y selecciona cualquier imagen para ampliarla.",
    openMedia: "Ver fotos",
  },
  fr: {
    gallery: "Galerie",
    albums: "Albums",
    photos: "photos",
    back: "Retour à la galerie",
    collections: "Collection",
    collectionsTitle: "Albums et photos",
    collectionsBody: "Ouvrez un album pour voir toutes ses photos et sélectionnez une image pour l'agrandir.",
    openMedia: "Voir les photos",
  },
  en: {
    gallery: "Gallery",
    albums: "Albums",
    photos: "photos",
    back: "Back to gallery",
    collections: "Collection",
    collectionsTitle: "Albums and photos",
    collectionsBody: "Open an album to see all its photos and select any image to enlarge it.",
    openMedia: "View photos",
  },
  pt: {
    gallery: "Galeria",
    albums: "Álbuns",
    photos: "fotos",
    back: "Voltar à galeria",
    collections: "Coleção",
    collectionsTitle: "Álbuns e fotos",
    collectionsBody: "Abra um álbum para ver todas as fotos e selecione qualquer imagem para a ampliar.",
    openMedia: "Ver fotos",
  },
  de: {
    gallery: "Galerie",
    albums: "Alben",
    photos: "Fotos",
    back: "Zurück zur Galerie",
    collections: "Sammlung",
    collectionsTitle: "Alben und Fotos",
    collectionsBody: "Öffnen Sie ein Album, um alle Fotos zu sehen, und wählen Sie ein Bild aus, um es zu vergrößern.",
    openMedia: "Fotos ansehen",
  },
  ru: {
    gallery: "Галерея",
    albums: "Альбомы",
    photos: "фото",
    back: "Назад в галерею",
    collections: "Коллекция",
    collectionsTitle: "Альбомы и фото",
    collectionsBody: "Откройте альбом, чтобы увидеть все фотографии, и выберите любое изображение, чтобы увеличить его.",
    openMedia: "Смотреть фото",
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
  const albumId = new URLSearchParams(location.search).get("album");
  const { data: dynamicSections } = usePublishedGallerySections(key);
  const sections = mergeGallerySections(galleryMediaByPage[key] ?? [], dynamicSections).filter(
    (section) => Boolean(section) && Array.isArray(section.images) && (!albumId || section.id === albumId),
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
                <h1 className="mt-5 text-4xl md:text-6xl font-bold text-balance">{translateText(language, albumId && sections[0] ? sections[0].title : page.hero.title)}</h1>
                {page.hero.subtitle ? <p className="mt-5 max-w-3xl text-lg text-white/76">{translateText(language, page.hero.subtitle)}</p> : null}
                <div className="mt-8 flex flex-wrap gap-3">
                  <NavigateButton href="/galeria" label={t.back} />
                </div>
              </div>

              <Card className="glass-panel border-0 rounded-[2rem] p-6 md:p-7 text-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.collections}</p>
                <h2 className="mt-3 text-3xl font-bold text-balance">{t.collectionsTitle}</h2>
                <p className="mt-4 text-muted-foreground">{t.collectionsBody}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-[1.25rem] bg-secondary/80 p-4">
                    <div className="text-2xl font-bold">{sections.length}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.albums}</div>
                  </div>
                  <div className="rounded-[1.25rem] bg-secondary/80 p-4">
                    <div className="text-2xl font-bold">{photoCount}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.photos}</div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </section>

      {!albumId && page.albums?.length ? (
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

      {sections.length ? <GalleryMediaSections pageKey={key} sections={sections} initiallyOpen={Boolean(albumId)} /> : null}

      {!sections.length && page.groups?.length ? (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">
              {page.groups.map((group) => (
                <Card key={group.href} className="premium-card border-0 rounded-[2rem] p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-balance">{translateText(language, group.title)}</h2>
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
