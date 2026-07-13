import { Card } from "@/components/ui/card";
import { galleryMediaByPage } from "@/content/galleryMedia";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";

interface GalleryMediaSectionsProps {
  pageKey: string;
}

const translations: Record<LanguageCode, { sourceFolder: string; photos: string }> = {
  ca: { sourceFolder: "Carpeta origen", photos: "fotos" },
  es: { sourceFolder: "Carpeta origen", photos: "fotos" },
  fr: { sourceFolder: "Dossier source", photos: "photos" },
  en: { sourceFolder: "Source folder", photos: "photos" },
  pt: { sourceFolder: "Pasta de origem", photos: "fotos" },
  de: { sourceFolder: "Quellordner", photos: "Fotos" },
  ru: { sourceFolder: "Исходная папка", photos: "фото" },
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
            <div className="space-y-2">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{t.sourceFolder}: {section.sourceFolder}</p>
                </div>
                <p className="text-sm text-muted-foreground">{section.images.length} {t.photos}</p>
              </div>
              {section.note ? <p className="text-sm text-amber-700">{section.note}</p> : null}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.images.map((image) => (
                <a key={image.src} href={image.src} target="_blank" rel="noreferrer" className="block">
                  <Card className="overflow-hidden p-0 hover:shadow-elegant transition-all">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-44 w-full object-cover bg-muted"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="p-3"><p className="text-xs text-muted-foreground truncate">{image.filename}</p></div>
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
