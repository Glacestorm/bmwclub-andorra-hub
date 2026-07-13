import { Card } from "@/components/ui/card";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { Camera, FolderOpen } from "lucide-react";

interface GalleryMediaSectionsProps {
  pageKey: string;
}

const translations: Record<LanguageCode, { sourceFolder: string; photos: string; recovered: string; openImage: string }> = {
  ca: { sourceFolder: "Carpeta origen", photos: "fotos", recovered: "Arxiu recuperat", openImage: "Obrir imatge" },
  es: { sourceFolder: "Carpeta origen", photos: "fotos", recovered: "Archivo recuperado", openImage: "Abrir imagen" },
  fr: { sourceFolder: "Dossier source", photos: "photos", recovered: "Archive récupérée", openImage: "Ouvrir l'image" },
  en: { sourceFolder: "Source folder", photos: "photos", recovered: "Recovered archive", openImage: "Open image" },
  pt: { sourceFolder: "Pasta de origem", photos: "fotos", recovered: "Arquivo recuperado", openImage: "Abrir imagem" },
  de: { sourceFolder: "Quellordner", photos: "Fotos", recovered: "Wiederhergestelltes Archiv", openImage: "Bild öffnen" },
  ru: { sourceFolder: "Исходная папка", photos: "фото", recovered: "Восстановленный архив", openImage: "Открыть изображение" },
};

export const GalleryMediaSections = ({ pageKey }: GalleryMediaSectionsProps) => {
  const sections = galleryMediaByPage[pageKey] ?? [];
  const { language } = useLanguage();
  const t = translations[language];

  if (!sections.length) return null;

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4 space-y-10">
        {sections.map((section) => (
          <div key={`${pageKey}-${section.title}`} className="max-w-6xl mx-auto space-y-5">
            <Card className="glass-panel border-0 rounded-[2rem] p-6 md:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    <Camera className="h-3.5 w-3.5" />
                    {t.recovered}
                  </div>
                  <h2 className="mt-4 text-2xl md:text-3xl font-bold text-balance">{section.title}</h2>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <FolderOpen className="h-4 w-4" />
                    {t.sourceFolder}: {section.sourceFolder}
                  </div>
                </div>
                <div className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">{section.images.length} {t.photos}</div>
              </div>
              {section.note ? <p className="mt-4 text-sm text-amber-700">{section.note}</p> : null}
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {section.images.map((image, index) => (
                <a key={image.src} href={image.src} target="_blank" rel="noreferrer" className={`block ${index === 0 ? "xl:col-span-2" : ""}`}>
                  <Card className="overflow-hidden p-0 premium-card border-0 hover-tilt h-full">
                    <div className={`relative overflow-hidden ${index === 0 ? "xl:h-[26rem] h-72" : "h-60"}`}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
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
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
