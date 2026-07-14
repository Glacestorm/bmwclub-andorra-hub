import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { galleryMediaByPage, type GalleryMediaSection } from "@/content/galleryMedia";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { ArrowLeft, Camera, ChevronDown, ChevronUp, Images, ExternalLink } from "lucide-react";

interface GalleryMediaSectionsProps {
  pageKey?: string;
  sections?: GalleryMediaSection[];
}

const translations: Record<LanguageCode, { photos: string; outingLabel: string; historicLabel: string; outingSummary: string; historicSummary: string; openImage: string; openArchive: string; closeArchive: string; showing: string; backToGallery: string; openNewTab: string; }> = {
  ca: { photos: "fotos", outingLabel: "Sortida del club", historicLabel: "Memòria del club", outingSummary: "Selecció fotogràfica de la jornada, amb ruta, ambient i moments destacats compartits pels socis.", historicSummary: "Recull visual de l'arxiu històric del club i de la trajectòria BMW vinculada a Andorra.", openImage: "Obrir imatge", openArchive: "Obrir arxiu visual", closeArchive: "Plegar arxiu", showing: "Mostrant", backToGallery: "Tornar a la galeria", openNewTab: "Obrir en pestanya nova" },
  es: { photos: "fotos", outingLabel: "Salida del club", historicLabel: "Memoria del club", outingSummary: "Selección fotográfica de la jornada, con ruta, ambiente y momentos destacados compartidos por los socios.", historicSummary: "Recorrido visual por el archivo histórico del club y la trayectoria BMW vinculada a Andorra.", openImage: "Abrir imagen", openArchive: "Abrir archivo visual", closeArchive: "Plegar archivo", showing: "Mostrando", backToGallery: "Volver a la galería", openNewTab: "Abrir en pestaña nueva" },
  fr: { photos: "photos", outingLabel: "Sortie du club", historicLabel: "Mémoire du club", outingSummary: "Sélection photographique de la journée, avec itinéraire, ambiance et moments forts partagés par les membres.", historicSummary: "Parcours visuel dans les archives historiques du club et dans l'histoire BMW liée à l'Andorre.", openImage: "Ouvrir l'image", openArchive: "Ouvrir l'archive visuelle", closeArchive: "Réduire l'archive", showing: "Affichage", backToGallery: "Retour à la galerie", openNewTab: "Ouvrir dans un nouvel onglet" },
  en: { photos: "photos", outingLabel: "Club outing", historicLabel: "Club memory", outingSummary: "Photo selection from the day, with route, atmosphere and standout moments shared by members.", historicSummary: "Visual journey through the club's historical archive and the BMW story connected to Andorra.", openImage: "Open image", openArchive: "Open visual archive", closeArchive: "Collapse archive", showing: "Showing", backToGallery: "Back to gallery", openNewTab: "Open in new tab" },
  pt: { photos: "fotos", outingLabel: "Saída do clube", historicLabel: "Memória do clube", outingSummary: "Seleção fotográfica da jornada, com rota, ambiente e momentos marcantes partilhados pelos sócios.", historicSummary: "Percurso visual pelo arquivo histórico do clube e pela história BMW ligada a Andorra.", openImage: "Abrir imagem", openArchive: "Abrir arquivo visual", closeArchive: "Recolher arquivo", showing: "A mostrar", backToGallery: "Voltar à galeria", openNewTab: "Abrir em novo separador" },
  de: { photos: "Fotos", outingLabel: "Clubausfahrt", historicLabel: "Clubgeschichte", outingSummary: "Fotografische Auswahl des Tages mit Route, Atmosphäre und besonderen Momenten der Mitglieder.", historicSummary: "Visueller Rückblick auf das historische Archiv des Clubs und die mit Andorra verbundene BMW-Geschichte.", openImage: "Bild öffnen", openArchive: "Visuelles Archiv öffnen", closeArchive: "Archiv einklappen", showing: "Angezeigt", backToGallery: "Zurück zur Galerie", openNewTab: "In neuem Tab öffnen" },
  ru: { photos: "фото", outingLabel: "Выезд клуба", historicLabel: "Память клуба", outingSummary: "Фотоподборка дня: маршрут, атмосфера и яркие моменты, которыми поделились участники клуба.", historicSummary: "Визуальный обзор исторического архива клуба и истории BMW, связанной с Андоррой.", openImage: "Открыть изображение", openArchive: "Открыть визуальный архив", closeArchive: "Свернуть архив", showing: "Показано", backToGallery: "Назад в галерею", openNewTab: "Открыть в новой вкладке" },
};

const getSectionContext = (section: GalleryMediaSection, t: (typeof translations)[LanguageCode]) => {
  const isHistoric = section.sourceFolder.includes("historiques");
  return {
    label: isHistoric ? t.historicLabel : t.outingLabel,
    summary: isHistoric ? t.historicSummary : t.outingSummary,
  };
};

const GallerySectionCard = ({ section, isInitiallyOpen, language }: { section: GalleryMediaSection; isInitiallyOpen: boolean; language: LanguageCode }) => {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const context = getSectionContext(section, t);

  const heroImage = section.images[0];
  const selectedImage = selectedIndex !== null ? section.images[selectedIndex] : null;

  const toggleSection = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <Card className="glass-panel border-0 rounded-[2rem] p-6 md:p-7 shadow-elegant">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Camera className="h-3.5 w-3.5" />
              {context.label}
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-balance">{section.title}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{context.summary}</p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Images className="h-3.5 w-3.5" />
              {section.images.length} {t.photos}
            </div>
            <Button variant={isOpen ? "outline" : "hero"} className="rounded-full" onClick={toggleSection}>
              {isOpen ? t.closeArchive : t.openArchive}
              {isOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>

      {isOpen ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>{t.showing} {section.images.length} / {section.images.length} {t.photos}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 content-auto-block">
            {section.images.map((image, index) => (
              <button key={image.src} type="button" onClick={() => setSelectedIndex(index)} className={`block text-left ${index === 0 ? "xl:col-span-2" : ""}`}>
                <Card className="overflow-hidden p-0 premium-card border-0 hover-tilt h-full shadow-sm">
                  <div className={`relative overflow-hidden ${index === 0 ? "xl:h-[26rem] h-72" : "h-60"}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={index < 8 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      sizes={index === 0 ? "(min-width: 1280px) 66vw, 100vw" : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover bg-muted transition-transform duration-500 hover:scale-[1.03]"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="text-xs uppercase tracking-[0.2em] text-white/70">{t.openImage}</div>
                      <p className="mt-2 text-sm font-medium text-balance break-all">{image.filename}</p>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>
      ) : heroImage ? (
        <button type="button" onClick={() => setSelectedIndex(0)} className="block w-full text-left">
          <Card className="premium-card border-0 rounded-[2rem] overflow-hidden shadow-sm transition-base hover:-translate-y-1 hover:shadow-elegant">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] items-stretch">
              <div className="relative min-h-[240px] overflow-hidden">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">{t.openArchive}</p>
                <h3 className="mt-3 text-2xl font-bold text-balance">{section.title}</h3>
                <p className="mt-3 text-muted-foreground">{t.showing} {section.images.length} / {section.images.length} {t.photos}</p>
              </div>
            </div>
          </Card>
        </button>
      ) : null}

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => { if (!open) setSelectedIndex(null); }}>
        <DialogContent className="max-w-[min(96vw,1200px)] border-0 bg-slate-950 p-0 text-white shadow-2xl">
          {selectedImage ? (
            <>
              <DialogTitle className="sr-only">{selectedImage.filename}</DialogTitle>
              <DialogDescription className="sr-only">{selectedImage.alt}</DialogDescription>
              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative bg-black">
                  <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[80vh] w-full object-contain" loading="eager" decoding="async" />
                </div>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      <Camera className="h-3.5 w-3.5" />
                      {t.openImage}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-balance">{selectedImage.filename}</h3>
                    <p className="mt-3 text-sm text-white/66">{selectedImage.alt}</p>
                    <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/42">{t.showing} {(selectedIndex ?? 0) + 1} / {section.images.length} {t.photos}</p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-full border-white/15 bg-white/8 text-white hover:bg-white/14" onClick={() => setSelectedIndex(null)}>
                      <ArrowLeft className="h-4 w-4" />
                      {t.backToGallery}
                    </Button>
                    <a href={selectedImage.src} target="_blank" rel="noreferrer">
                      <Button variant="hero" className="rounded-full">
                        <ExternalLink className="h-4 w-4" />
                        {t.openNewTab}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const GalleryMediaSections = ({ pageKey = "gallery", sections: sectionsProp }: GalleryMediaSectionsProps) => {
  const sections = sectionsProp ?? galleryMediaByPage[pageKey] ?? [];
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") return;

    sections.forEach((section) => {
      section.images.forEach((image) => {
        const preloadImage = new window.Image();
        preloadImage.decoding = "async";
        preloadImage.src = image.src;
      });
    });
  }, [sections]);

  if (!sections.length) return null;

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 space-y-10">
        {sections.map((section, index) => (
          <GallerySectionCard
            key={`${pageKey}-${section.title}-${index}`}
            section={section}
            isInitiallyOpen={true}
            language={language}
          />
        ))}
      </div>
    </section>
  );
};
