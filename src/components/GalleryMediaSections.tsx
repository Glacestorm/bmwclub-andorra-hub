import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { galleryMediaByPage, type GalleryMediaSection } from "@/content/galleryMedia";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { ArrowLeft, Camera, ChevronDown, ChevronUp, Images, ExternalLink, Star } from "lucide-react";
import { savePhotoFeedback, usePhotoFeedback } from "@/lib/clubCms";
import { useToast } from "@/hooks/use-toast";

interface GalleryMediaSectionsProps {
  pageKey?: string;
  sections?: GalleryMediaSection[];
}

const translations: Record<LanguageCode, { photos: string; outingLabel: string; historicLabel: string; outingSummary: string; historicSummary: string; openArchive: string; closeArchive: string; showing: string; backToGallery: string; openNewTab: string; rateTitle: string; noRatings: string; yourName: string; yourComment: string; sendReview: string; sentReview: string; reviews: string; unavailableReviews: string; }> = {
  ca: { photos: "fotos", outingLabel: "Sortida del club", historicLabel: "Memòria del club", outingSummary: "Selecció fotogràfica de la jornada, amb ruta, ambient i moments destacats compartits pels socis.", historicSummary: "Recull visual de l'arxiu històric del club i de la trajectòria BMW vinculada a Andorra.", openArchive: "Obrir arxiu visual", closeArchive: "Plegar arxiu", showing: "Mostrant", backToGallery: "Tornar a la galeria", openNewTab: "Obrir en pestanya nova", rateTitle: "Valora aquesta fotografia", noRatings: "Encara no hi ha valoracions.", yourName: "Nom", yourComment: "Comentari", sendReview: "Enviar valoració", sentReview: "Valoració enviada", reviews: "Comentaris", unavailableReviews: "Les valoracions i comentaris quedaran actius quan s'apliqui la taula nova a Supabase." },
  es: { photos: "fotos", outingLabel: "Salida del club", historicLabel: "Memoria del club", outingSummary: "Selección fotográfica de la jornada, con ruta, ambiente y momentos destacados compartidos por los socios.", historicSummary: "Recorrido visual por el archivo histórico del club y la trayectoria BMW vinculada a Andorra.", openArchive: "Abrir archivo visual", closeArchive: "Plegar archivo", showing: "Mostrando", backToGallery: "Volver a la galería", openNewTab: "Abrir en pestaña nueva", rateTitle: "Valora esta fotografía", noRatings: "Todavía no hay valoraciones.", yourName: "Nombre", yourComment: "Comentario", sendReview: "Enviar valoración", sentReview: "Valoración enviada", reviews: "Comentarios", unavailableReviews: "Las valoraciones y comentarios quedarán activos cuando se aplique la nueva tabla en Supabase." },
  fr: { photos: "photos", outingLabel: "Sortie du club", historicLabel: "Mémoire du club", outingSummary: "Sélection photographique de la journée, avec itinéraire, ambiance et moments forts partagés par les membres.", historicSummary: "Parcours visuel dans les archives historiques du club et dans l'histoire BMW liée à l'Andorre.", openArchive: "Ouvrir l'archive visuelle", closeArchive: "Réduire l'archive", showing: "Affichage", backToGallery: "Retour à la galerie", openNewTab: "Ouvrir dans un nouvel onglet", rateTitle: "Évaluer cette photo", noRatings: "Aucune évaluation pour le moment.", yourName: "Nom", yourComment: "Commentaire", sendReview: "Envoyer l'avis", sentReview: "Avis envoyé", reviews: "Commentaires", unavailableReviews: "Les évaluations et commentaires seront actifs une fois la nouvelle table appliquée dans Supabase." },
  en: { photos: "photos", outingLabel: "Club outing", historicLabel: "Club memory", outingSummary: "Photo selection from the day, with route, atmosphere and standout moments shared by members.", historicSummary: "Visual journey through the club's historical archive and the BMW story connected to Andorra.", openArchive: "Open visual archive", closeArchive: "Collapse archive", showing: "Showing", backToGallery: "Back to gallery", openNewTab: "Open in new tab", rateTitle: "Rate this photo", noRatings: "No ratings yet.", yourName: "Name", yourComment: "Comment", sendReview: "Send review", sentReview: "Review sent", reviews: "Comments", unavailableReviews: "Ratings and comments will go live once the new table is applied in Supabase." },
  pt: { photos: "fotos", outingLabel: "Saída do clube", historicLabel: "Memória do clube", outingSummary: "Seleção fotográfica da jornada, com rota, ambiente e momentos marcantes partilhados pelos sócios.", historicSummary: "Percurso visual pelo arquivo histórico do clube e pela história BMW ligada a Andorra.", openArchive: "Abrir arquivo visual", closeArchive: "Recolher arquivo", showing: "A mostrar", backToGallery: "Voltar à galeria", openNewTab: "Abrir em novo separador", rateTitle: "Avalia esta fotografia", noRatings: "Ainda não há avaliações.", yourName: "Nome", yourComment: "Comentário", sendReview: "Enviar avaliação", sentReview: "Avaliação enviada", reviews: "Comentários", unavailableReviews: "As avaliações e comentários ficarão ativos quando a nova tabela for aplicada no Supabase." },
  de: { photos: "Fotos", outingLabel: "Clubausfahrt", historicLabel: "Clubgeschichte", outingSummary: "Fotografische Auswahl des Tages mit Route, Atmosphäre und besonderen Momenten der Mitglieder.", historicSummary: "Visueller Rückblick auf das historische Archiv des Clubs und die mit Andorra verbundene BMW-Geschichte.", openArchive: "Visuelles Archiv öffnen", closeArchive: "Archiv einklappen", showing: "Angezeigt", backToGallery: "Zurück zur Galerie", openNewTab: "In neuem Tab öffnen", rateTitle: "Dieses Foto bewerten", noRatings: "Noch keine Bewertungen.", yourName: "Name", yourComment: "Kommentar", sendReview: "Bewertung senden", sentReview: "Bewertung gesendet", reviews: "Kommentare", unavailableReviews: "Bewertungen und Kommentare werden aktiv, sobald die neue Tabelle in Supabase angewendet wurde." },
  ru: { photos: "фото", outingLabel: "Выезд клуба", historicLabel: "Память клуба", outingSummary: "Фотоподборка дня: маршрут, атмосфера и яркие моменты, которыми поделились участники клуба.", historicSummary: "Визуальный обзор исторического архива клуба и истории BMW, связанной с Андоррой.", openArchive: "Открыть визуальный архив", closeArchive: "Свернуть архив", showing: "Показано", backToGallery: "Назад в галерею", openNewTab: "Открыть в новой вкладке", rateTitle: "Оцените эту фотографию", noRatings: "Пока нет оценок.", yourName: "Имя", yourComment: "Комментарий", sendReview: "Отправить отзыв", sentReview: "Отзыв отправлен", reviews: "Комментарии", unavailableReviews: "Оценки и комментарии заработают после применения новой таблицы в Supabase." },
};

const getSectionContext = (section: GalleryMediaSection, t: (typeof translations)[LanguageCode]) => {
  const sourceFolder = section.sourceFolder || "";
  const isHistoric = sourceFolder.includes("historiques");
  return {
    label: isHistoric ? t.historicLabel : t.outingLabel,
    summary: isHistoric ? t.historicSummary : t.outingSummary,
  };
};

const LEGACY_MEDIA_ORIGIN = "https://bca.jcarranca.com";

const resolveLegacyImageSrc = (src: string) => {
  if (!src.startsWith("/legacy-mirror/images/")) return src;
  return `${LEGACY_MEDIA_ORIGIN}/images/${src.replace("/legacy-mirror/images/", "")}`;
};

const getThumbnailSrc = (src: string) => {
  if (src.includes("/legacy-mirror/images/phocagallery/")) {
    const lastSlashIndex = src.lastIndexOf("/");
    const dir = src.slice(0, lastSlashIndex);
    const filename = src.slice(lastSlashIndex + 1);
    return resolveLegacyImageSrc(`${dir}/thumbs/phoca_thumb_m_${filename}`);
  }

  const relativePath = src.replace("/legacy-mirror/images/", "");
  return `/legacy-thumbs/${relativePath}.webp`;
};

const GallerySectionCard = ({ section, isInitiallyOpen, language }: { section: GalleryMediaSection; isInitiallyOpen: boolean; language: LanguageCode }) => {
  const t = translations[language];
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const context = getSectionContext(section, t);

  const heroImage = section.images[0];
  const selectedImage = selectedIndex !== null ? section.images[selectedIndex] : null;
  const { data: feedbackItems, averageRating, totalRatings, refetch, error: feedbackError, isLoading: feedbackLoading } = usePhotoFeedback(selectedImage?.src ?? "", Boolean(selectedImage));

  const toggleSection = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  };

  const submitFeedback = async () => {
    if (!selectedImage) return;
    setIsSubmitting(true);
    try {
      await savePhotoFeedback({
        photoSrc: selectedImage.src,
        authorName,
        rating,
        comment,
      });
      setAuthorName("");
      setComment("");
      setRating(5);
      await refetch();
      toast({ title: t.sentReview });
    } catch (error) {
      toast({
        title: t.unavailableReviews,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                      src={getThumbnailSrc(image.src)}
                      alt={image.alt}
                      loading={index < 2 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      sizes={index === 0 ? "(min-width: 1280px) 66vw, 100vw" : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover bg-muted transition-transform duration-500 hover:scale-[1.03]"
                      onError={(event) => {
                        if (event.currentTarget.dataset.fallbackApplied === "true") {
                          event.currentTarget.style.display = "none";
                          return;
                        }
                        event.currentTarget.dataset.fallbackApplied = "true";
                        event.currentTarget.src = resolveLegacyImageSrc(image.src);
                      }}
                    />
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
                  src={getThumbnailSrc(heroImage.src)}
                  alt={heroImage.alt}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    if (event.currentTarget.dataset.fallbackApplied === "true") {
                      event.currentTarget.style.display = "none";
                      return;
                    }
                    event.currentTarget.dataset.fallbackApplied = "true";
                    event.currentTarget.src = resolveLegacyImageSrc(heroImage.src);
                  }}
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
                  <img src={resolveLegacyImageSrc(selectedImage.src)} alt={selectedImage.alt} className="max-h-[80vh] w-full object-contain" loading="eager" decoding="async" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      <Camera className="h-3.5 w-3.5" />
                      {context.label}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-balance">{selectedImage.filename}</h3>
                    <p className="mt-3 text-sm text-white/66">{selectedImage.alt}</p>
                    <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/42">{t.showing} {(selectedIndex ?? 0) + 1} / {section.images.length} {t.photos}</p>

                    <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/78">{t.rateTitle}</h4>
                        <div className="flex items-center gap-2 text-sm text-white/68">
                          <Star className="h-4 w-4 fill-current text-primary" />
                          {totalRatings ? `${averageRating.toFixed(1)} / 5 · ${totalRatings}` : t.noRatings}
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button key={value} type="button" onClick={() => setRating(value)} className="rounded-full p-1 transition-base hover:scale-105">
                            <Star className={`h-6 w-6 ${value <= rating ? "fill-primary text-primary" : "text-white/30"}`} />
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-3">
                        <Input value={authorName} onChange={(event) => setAuthorName(event.target.value)} placeholder={t.yourName} className="border-white/10 bg-white/6 text-white placeholder:text-white/35" />
                        <Textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder={t.yourComment} className="min-h-24 border-white/10 bg-white/6 text-white placeholder:text-white/35" />
                        <Button variant="hero" className="rounded-full" onClick={submitFeedback} disabled={isSubmitting}>
                          {t.sendReview}
                        </Button>
                      </div>

                      <div className="mt-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{t.reviews}</div>
                        {feedbackError ? (
                          <p className="mt-2 text-sm text-white/58">{t.unavailableReviews}</p>
                        ) : feedbackLoading ? (
                          <p className="mt-2 text-sm text-white/58">…</p>
                        ) : feedbackItems.length ? (
                          <div className="mt-3 space-y-3">
                            {feedbackItems.slice(0, 8).map((item) => (
                              <div key={item.id} className="rounded-2xl border border-white/8 bg-black/15 p-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="font-medium text-white">{item.author_name}</div>
                                  <div className="flex items-center gap-1 text-primary">
                                    {Array.from({ length: 5 }).map((_, starIndex) => (
                                      <Star key={`${item.id}-${starIndex}`} className={`h-3.5 w-3.5 ${starIndex < item.rating ? "fill-current" : "text-white/20"}`} />
                                    ))}
                                  </div>
                                </div>
                                {item.comment ? <p className="mt-2 text-sm text-white/70">{item.comment}</p> : null}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-white/58">{t.noRatings}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-full border-white/15 bg-white/8 text-white hover:bg-white/14" onClick={() => setSelectedIndex(null)}>
                      <ArrowLeft className="h-4 w-4" />
                      {t.backToGallery}
                    </Button>
                    <a href={resolveLegacyImageSrc(selectedImage.src)} target="_blank" rel="noreferrer">
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
  const rawSections = sectionsProp ?? galleryMediaByPage[pageKey] ?? [];
  const sections = rawSections.filter((section): section is GalleryMediaSection => Boolean(section) && Array.isArray(section.images) && section.images.length > 0);
  const { language } = useLanguage();

  if (!sections.length) return null;

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 space-y-10">
        {sections.map((section, index) => (
          <GallerySectionCard
            key={`${pageKey}-${section.title}-${index}`}
            section={section}
            isInitiallyOpen={false}
            language={language}
          />
        ))}
      </div>
    </section>
  );
};
