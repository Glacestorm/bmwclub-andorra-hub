import { FileText, Film, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { archiveItems } from "@/content/siteExperience";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "Arxiu del club", title: "Documents, revistes i memòria recuperada", subtitle: "Aprofitem el fons del lloc antic per construir una hemeroteca útil, neta i reutilitzable: PDFs, vídeos i peces històriques que donen profunditat al club.", pdf: "PDF", video: "Vídeo", image: "Imatge", open: "Obrir recurs" },
  es: { eyebrow: "Archivo del club", title: "Documentos, revistas y memoria recuperada", subtitle: "Aprovechamos el fondo del sitio antiguo para construir una hemeroteca útil, limpia y reutilizable: PDFs, vídeos y piezas históricas que dan profundidad al club.", pdf: "PDF", video: "Vídeo", image: "Imagen", open: "Abrir recurso" },
  fr: { eyebrow: "Archive du club", title: "Documents, magazines et mémoire récupérée", subtitle: "Nous exploitons le fonds de l'ancien site pour construire une archive utile, propre et réutilisable : PDF, vidéos et pièces historiques qui donnent de la profondeur au club.", pdf: "PDF", video: "Vidéo", image: "Image", open: "Ouvrir la ressource" },
  en: { eyebrow: "Club archive", title: "Documents, magazines and recovered memory", subtitle: "We are reusing the old site's assets to build a clean, useful and reusable archive: PDFs, videos and historical pieces that give the club more depth.", pdf: "PDF", video: "Video", image: "Image", open: "Open asset" },
  pt: { eyebrow: "Arquivo do clube", title: "Documentos, revistas e memória recuperada", subtitle: "Aproveitamos o fundo do site antigo para construir uma hemeroteca útil, limpa e reutilizável: PDFs, vídeos e peças históricas que dão profundidade ao clube.", pdf: "PDF", video: "Vídeo", image: "Imagem", open: "Abrir recurso" },
  de: { eyebrow: "Club-Archiv", title: "Dokumente, Magazine und wiederhergestellte Erinnerung", subtitle: "Wir nutzen den Bestand der alten Website, um ein sauberes, nützliches und wiederverwendbares Archiv aufzubauen: PDFs, Videos und historische Stücke, die dem Club mehr Tiefe geben.", pdf: "PDF", video: "Video", image: "Bild", open: "Asset öffnen" },
  ru: { eyebrow: "Архив клуба", title: "Документы, журналы и восстановленная память", subtitle: "Мы используем материалы старого сайта, чтобы создать чистый, полезный и переиспользуемый архив: PDF, видео и исторические элементы, которые добавляют глубину клубу.", pdf: "PDF", video: "Видео", image: "Изображение", open: "Открыть материал" },
};

const iconByType = {
  pdf: FileText,
  video: Film,
  image: ImageIcon,
};

const Arxiu = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageShell>
      <section className="pt-32 pb-14 section-shell">
        <div className="container mx-auto px-4 max-w-6xl text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.eyebrow}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {archiveItems.map((item) => {
            const Icon = iconByType[item.type];
            return (
              <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="block hover-tilt">
                <Card className="premium-card border-0 rounded-[2rem] p-6 h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-primary/10 p-3"><Icon className="h-5 w-5 text-primary" /></div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{item.accent ?? item.type}</p>
                          <p className="text-sm text-muted-foreground">{item.year}{item.sizeHint ? ` · ${item.sizeHint}` : ""}</p>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-balance">{item.title}</h2>
                        <p className="mt-3 text-sm text-muted-foreground">{getLocalizedText(item.summary, language)}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <div className="mt-6 text-sm font-medium text-primary">{t.open}</div>
                </Card>
              </a>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
};

export default Arxiu;
