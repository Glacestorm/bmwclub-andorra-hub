import { useEffect, useMemo, useState } from "react";
import { Download, CalendarRange, Images, MapPinned, ShieldCheck, Save, RotateCcw, Copy, FolderOpen, Sparkles, LockKeyhole } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { itineraryGuide } from "@/content/itineraryGuide";
import { clubEvents, calendarYears } from "@/content/calendarData";
import { galleryMediaByPage } from "@/content/galleryMedia";

const STORAGE_PREFIX = "bmwclub-admin";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Gestió del club",
    title: "Backoffice editorial base per gestionar fotos, itineraris i calendari d'una manera més neta.",
    intro: "No és encara un backend amb publicació automàtica segura. Sí que és una base de gestió usable: prepara contingut, guarda esborranys al navegador, exporta JSON i treballa sense perdre estructura.",
    admin: "Accés administrador",
    status: "Base de gestió activa",
    photos: "Fotos",
    itineraries: "Itineraris",
    calendar: "Calendari",
    dashboard: "Panell ràpid",
    currentPhotos: "fotos indexades",
    currentRoutes: "rutes actives",
    currentEvents: "esdeveniments",
    save: "Guardar esborrany",
    reset: "Netejar",
    export: "Descarregar JSON",
    copy: "Copiar JSON",
    saved: "Esborrany guardat al navegador.",
    copied: "JSON copiat al porta-retalls.",
    photoCollection: "Clau de col·lecció",
    photoTitle: "Títol de l'àlbum o bloc",
    sourceFolder: "Carpeta origen",
    note: "Nota editorial",
    imageLines: "Imatges",
    imageHelp: "Una línia per foto: URL | ALT | FILENAME",
    previewCount: "Fotos preparades",
    itineraryId: "ID intern",
    itineraryProfile: "Perfil",
    itineraryTitle: "Títol visible",
    itineraryStrapline: "Subtítol / pitch",
    itineraryDistance: "Distància",
    itineraryDuration: "Durada",
    itinerarySeason: "Millor temporada",
    itineraryStart: "Sortida",
    itineraryFinish: "Final",
    itineraryWaypoints: "Waypoints",
    itineraryWaypointsHelp: "Separats per coma",
    itineraryHighlights: "Highlights",
    itineraryHighlightsHelp: "Una línia per idea",
    itineraryBmwAngle: "Per què és molt BMW",
    itineraryNotes: "Notes pràctiques",
    itineraryNotesHelp: "Una línia per nota",
    category: "Categoria",
    eventId: "ID de l'esdeveniment",
    eventTitle: "Títol",
    year: "Any",
    start: "Inici ISO",
    end: "Final ISO",
    displayDate: "Data visible",
    source: "Origen",
    destination: "Destí",
    galleryHref: "Enllaç galeria",
    summary: "Resum",
    workflow: "Flux recomanat",
    workflowBody: "Omple el formulari, guarda l'esborrany, exporta el JSON i ja tens una peça estructurada per connectar-la a publicació real després.",
    security: "Seguretat",
    securityBody: "Aquesta primera versió no publica sola ni puja fitxers al servidor. Per fer-ho bé cal el següent pas: auth + storage + persistència real.",
    draftReady: "Punt de gestió llest per créixer a backend real.",
    car: "Cotxe",
    motorcycle: "Moto",
    both: "Mixt",
  },
  es: {
    eyebrow: "Gestión del club",
    title: "Backoffice editorial base para gestionar fotos, itinerarios y calendario de una forma mucho más limpia.",
    intro: "Todavía no es un backend con publicación automática segura. Sí es una base de gestión usable: prepara contenido, guarda borradores en el navegador, exporta JSON y trabaja sin perder estructura.",
    admin: "Acceso administrador",
    status: "Base de gestión activa",
    photos: "Fotos",
    itineraries: "Itinerarios",
    calendar: "Calendario",
    dashboard: "Panel rápido",
    currentPhotos: "fotos indexadas",
    currentRoutes: "rutas activas",
    currentEvents: "eventos",
    save: "Guardar borrador",
    reset: "Limpiar",
    export: "Descargar JSON",
    copy: "Copiar JSON",
    saved: "Borrador guardado en el navegador.",
    copied: "JSON copiado al portapapeles.",
    photoCollection: "Clave de colección",
    photoTitle: "Título del álbum o bloque",
    sourceFolder: "Carpeta origen",
    note: "Nota editorial",
    imageLines: "Imágenes",
    imageHelp: "Una línea por foto: URL | ALT | FILENAME",
    previewCount: "Fotos preparadas",
    itineraryId: "ID interno",
    itineraryProfile: "Perfil",
    itineraryTitle: "Título visible",
    itineraryStrapline: "Subtítulo / pitch",
    itineraryDistance: "Distancia",
    itineraryDuration: "Duración",
    itinerarySeason: "Mejor temporada",
    itineraryStart: "Salida",
    itineraryFinish: "Final",
    itineraryWaypoints: "Waypoints",
    itineraryWaypointsHelp: "Separados por coma",
    itineraryHighlights: "Highlights",
    itineraryHighlightsHelp: "Una línea por idea",
    itineraryBmwAngle: "Por qué es muy BMW",
    itineraryNotes: "Notas prácticas",
    itineraryNotesHelp: "Una línea por nota",
    category: "Categoría",
    eventId: "ID del evento",
    eventTitle: "Título",
    year: "Año",
    start: "Inicio ISO",
    end: "Fin ISO",
    displayDate: "Fecha visible",
    source: "Origen",
    destination: "Destino",
    galleryHref: "Enlace galería",
    summary: "Resumen",
    workflow: "Flujo recomendado",
    workflowBody: "Rellena el formulario, guarda el borrador, exporta el JSON y ya tienes una pieza estructurada para conectarla más adelante a una publicación real.",
    security: "Seguridad",
    securityBody: "Esta primera versión no publica sola ni sube ficheros al servidor. Para hacerlo bien, el siguiente paso es auth + storage + persistencia real.",
    draftReady: "Punto de gestión listo para crecer a backend real.",
    car: "Coche",
    motorcycle: "Moto",
    both: "Mixto",
  },
  fr: {
    eyebrow: "Gestion du club",
    title: "Base de backoffice éditorial pour gérer photos, itinéraires et calendrier avec plus de clarté.",
    intro: "Ce n'est pas encore un backend sécurisé avec publication automatique. C'est déjà une base exploitable : préparez le contenu, gardez des brouillons dans le navigateur et exportez du JSON propre.",
    admin: "Accès administrateur",
    status: "Base de gestion active",
    photos: "Photos",
    itineraries: "Itinéraires",
    calendar: "Calendrier",
    dashboard: "Panneau rapide",
    currentPhotos: "photos indexées",
    currentRoutes: "itinéraires actifs",
    currentEvents: "événements",
    save: "Enregistrer le brouillon",
    reset: "Nettoyer",
    export: "Télécharger le JSON",
    copy: "Copier le JSON",
    saved: "Brouillon enregistré dans le navigateur.",
    copied: "JSON copié dans le presse-papiers.",
    photoCollection: "Clé de collection",
    photoTitle: "Titre de l'album ou du bloc",
    sourceFolder: "Dossier source",
    note: "Note éditoriale",
    imageLines: "Images",
    imageHelp: "Une ligne par photo : URL | ALT | FILENAME",
    previewCount: "Photos préparées",
    itineraryId: "ID interne",
    itineraryProfile: "Profil",
    itineraryTitle: "Titre visible",
    itineraryStrapline: "Sous-titre / pitch",
    itineraryDistance: "Distance",
    itineraryDuration: "Durée",
    itinerarySeason: "Meilleure saison",
    itineraryStart: "Départ",
    itineraryFinish: "Arrivée",
    itineraryWaypoints: "Waypoints",
    itineraryWaypointsHelp: "Séparés par des virgules",
    itineraryHighlights: "Highlights",
    itineraryHighlightsHelp: "Une ligne par idée",
    itineraryBmwAngle: "Pourquoi c'est très BMW",
    itineraryNotes: "Notes pratiques",
    itineraryNotesHelp: "Une ligne par note",
    category: "Catégorie",
    eventId: "ID de l'événement",
    eventTitle: "Titre",
    year: "Année",
    start: "Début ISO",
    end: "Fin ISO",
    displayDate: "Date visible",
    source: "Origine",
    destination: "Destination",
    galleryHref: "Lien galerie",
    summary: "Résumé",
    workflow: "Flux recommandé",
    workflowBody: "Remplissez le formulaire, gardez le brouillon, exportez le JSON et vous aurez une pièce déjà structurée pour un vrai backend ensuite.",
    security: "Sécurité",
    securityBody: "Cette première version ne publie pas seule et n'envoie pas de fichiers au serveur. Pour bien faire, l'étape suivante est auth + storage + persistance réelle.",
    draftReady: "Base prête à évoluer vers un vrai backend.",
    car: "Voiture",
    motorcycle: "Moto",
    both: "Mixte",
  },
  en: {
    eyebrow: "Club management",
    title: "A base editorial backoffice to manage photos, itineraries and the calendar in a much cleaner way.",
    intro: "This is not yet a secure auto-publishing backend. It is already a usable management base: prepare content, keep browser drafts, export clean JSON and work without losing structure.",
    admin: "Admin access",
    status: "Management base active",
    photos: "Photos",
    itineraries: "Itineraries",
    calendar: "Calendar",
    dashboard: "Quick dashboard",
    currentPhotos: "indexed photos",
    currentRoutes: "active routes",
    currentEvents: "events",
    save: "Save draft",
    reset: "Reset",
    export: "Download JSON",
    copy: "Copy JSON",
    saved: "Draft saved in the browser.",
    copied: "JSON copied to clipboard.",
    photoCollection: "Collection key",
    photoTitle: "Album or block title",
    sourceFolder: "Source folder",
    note: "Editorial note",
    imageLines: "Images",
    imageHelp: "One line per photo: URL | ALT | FILENAME",
    previewCount: "Prepared photos",
    itineraryId: "Internal ID",
    itineraryProfile: "Profile",
    itineraryTitle: "Visible title",
    itineraryStrapline: "Strapline / pitch",
    itineraryDistance: "Distance",
    itineraryDuration: "Duration",
    itinerarySeason: "Best season",
    itineraryStart: "Start",
    itineraryFinish: "Finish",
    itineraryWaypoints: "Waypoints",
    itineraryWaypointsHelp: "Comma-separated",
    itineraryHighlights: "Highlights",
    itineraryHighlightsHelp: "One line per idea",
    itineraryBmwAngle: "Why it feels BMW",
    itineraryNotes: "Practical notes",
    itineraryNotesHelp: "One line per note",
    category: "Category",
    eventId: "Event ID",
    eventTitle: "Title",
    year: "Year",
    start: "ISO start",
    end: "ISO end",
    displayDate: "Visible date",
    source: "Source",
    destination: "Destination",
    galleryHref: "Gallery link",
    summary: "Summary",
    workflow: "Recommended flow",
    workflowBody: "Fill the form, save the draft, export the JSON and you already have a structured piece ready to connect to real publishing later.",
    security: "Security",
    securityBody: "This first version does not self-publish or upload files to the server. The proper next step is auth + storage + real persistence.",
    draftReady: "Management point ready to grow into a real backend.",
    car: "Car",
    motorcycle: "Motorcycle",
    both: "Mixed",
  },
  pt: {
    eyebrow: "Gestão do clube",
    title: "Backoffice editorial base para gerir fotos, itinerários e calendário de forma muito mais limpa.",
    intro: "Ainda não é um backend seguro com publicação automática. Já é uma base útil: prepara conteúdo, guarda rascunhos no navegador e exporta JSON limpo.",
    admin: "Acesso administrador",
    status: "Base de gestão ativa",
    photos: "Fotos",
    itineraries: "Itinerários",
    calendar: "Calendário",
    dashboard: "Painel rápido",
    currentPhotos: "fotos indexadas",
    currentRoutes: "rotas ativas",
    currentEvents: "eventos",
    save: "Guardar rascunho",
    reset: "Limpar",
    export: "Descarregar JSON",
    copy: "Copiar JSON",
    saved: "Rascunho guardado no navegador.",
    copied: "JSON copiado para a área de transferência.",
    photoCollection: "Chave da coleção",
    photoTitle: "Título do álbum ou bloco",
    sourceFolder: "Pasta de origem",
    note: "Nota editorial",
    imageLines: "Imagens",
    imageHelp: "Uma linha por foto: URL | ALT | FILENAME",
    previewCount: "Fotos preparadas",
    itineraryId: "ID interno",
    itineraryProfile: "Perfil",
    itineraryTitle: "Título visível",
    itineraryStrapline: "Subtítulo / pitch",
    itineraryDistance: "Distância",
    itineraryDuration: "Duração",
    itinerarySeason: "Melhor época",
    itineraryStart: "Partida",
    itineraryFinish: "Fim",
    itineraryWaypoints: "Waypoints",
    itineraryWaypointsHelp: "Separados por vírgulas",
    itineraryHighlights: "Highlights",
    itineraryHighlightsHelp: "Uma linha por ideia",
    itineraryBmwAngle: "Porque é muito BMW",
    itineraryNotes: "Notas práticas",
    itineraryNotesHelp: "Uma linha por nota",
    category: "Categoria",
    eventId: "ID do evento",
    eventTitle: "Título",
    year: "Ano",
    start: "Início ISO",
    end: "Fim ISO",
    displayDate: "Data visível",
    source: "Origem",
    destination: "Destino",
    galleryHref: "Link da galeria",
    summary: "Resumo",
    workflow: "Fluxo recomendado",
    workflowBody: "Preenche o formulário, guarda o rascunho, exporta o JSON e já tens uma peça estruturada para ligar a publicação real depois.",
    security: "Segurança",
    securityBody: "Esta primeira versão não publica sozinha nem envia ficheiros ao servidor. O passo certo a seguir é auth + storage + persistência real.",
    draftReady: "Base pronta para crescer para backend real.",
    car: "Carro",
    motorcycle: "Moto",
    both: "Misto",
  },
  de: {
    eyebrow: "Club-Verwaltung",
    title: "Ein redaktionelles Backoffice-Grundgerüst, um Fotos, Routen und Kalender sauberer zu verwalten.",
    intro: "Noch kein sicheres Auto-Publishing-Backend. Aber bereits eine nutzbare Verwaltungsbasis: Inhalte vorbereiten, Browser-Entwürfe speichern und sauberes JSON exportieren.",
    admin: "Admin-Zugang",
    status: "Verwaltungsbasis aktiv",
    photos: "Fotos",
    itineraries: "Routen",
    calendar: "Kalender",
    dashboard: "Schnellübersicht",
    currentPhotos: "indizierte Fotos",
    currentRoutes: "aktive Routen",
    currentEvents: "Events",
    save: "Entwurf speichern",
    reset: "Zurücksetzen",
    export: "JSON herunterladen",
    copy: "JSON kopieren",
    saved: "Entwurf im Browser gespeichert.",
    copied: "JSON in die Zwischenablage kopiert.",
    photoCollection: "Sammlungsschlüssel",
    photoTitle: "Album- oder Blocktitel",
    sourceFolder: "Quellordner",
    note: "Redaktionelle Notiz",
    imageLines: "Bilder",
    imageHelp: "Eine Zeile pro Foto: URL | ALT | FILENAME",
    previewCount: "Vorbereitete Fotos",
    itineraryId: "Interne ID",
    itineraryProfile: "Profil",
    itineraryTitle: "Sichtbarer Titel",
    itineraryStrapline: "Untertitel / Pitch",
    itineraryDistance: "Distanz",
    itineraryDuration: "Dauer",
    itinerarySeason: "Beste Saison",
    itineraryStart: "Start",
    itineraryFinish: "Ziel",
    itineraryWaypoints: "Waypoints",
    itineraryWaypointsHelp: "Durch Kommas getrennt",
    itineraryHighlights: "Highlights",
    itineraryHighlightsHelp: "Eine Zeile pro Idee",
    itineraryBmwAngle: "Warum es sehr BMW ist",
    itineraryNotes: "Praktische Hinweise",
    itineraryNotesHelp: "Eine Zeile pro Hinweis",
    category: "Kategorie",
    eventId: "Event-ID",
    eventTitle: "Titel",
    year: "Jahr",
    start: "ISO-Start",
    end: "ISO-Ende",
    displayDate: "Sichtbares Datum",
    source: "Startpunkt",
    destination: "Zielpunkt",
    galleryHref: "Galerie-Link",
    summary: "Zusammenfassung",
    workflow: "Empfohlener Ablauf",
    workflowBody: "Formular ausfüllen, Entwurf speichern, JSON exportieren – und schon steht eine strukturierte Grundlage für spätere echte Veröffentlichung.",
    security: "Sicherheit",
    securityBody: "Diese erste Version veröffentlicht nicht selbst und lädt keine Dateien auf den Server. Der saubere nächste Schritt ist Auth + Storage + echte Persistenz.",
    draftReady: "Verwaltungspunkt bereit für echtes Backend-Wachstum.",
    car: "Auto",
    motorcycle: "Motorrad",
    both: "Gemischt",
  },
  ru: {
    eyebrow: "Управление клубом",
    title: "Базовый редакционный backoffice для более удобного управления фото, маршрутами и календарём.",
    intro: "Это ещё не безопасный backend с автопубликацией. Но уже рабочая база: готовьте контент, храните черновики в браузере и выгружайте чистый JSON.",
    admin: "Доступ администратора",
    status: "База управления активна",
    photos: "Фото",
    itineraries: "Маршруты",
    calendar: "Календарь",
    dashboard: "Быстрая панель",
    currentPhotos: "проиндексированных фото",
    currentRoutes: "активных маршрутов",
    currentEvents: "событий",
    save: "Сохранить черновик",
    reset: "Очистить",
    export: "Скачать JSON",
    copy: "Скопировать JSON",
    saved: "Черновик сохранён в браузере.",
    copied: "JSON скопирован в буфер обмена.",
    photoCollection: "Ключ коллекции",
    photoTitle: "Название альбома или блока",
    sourceFolder: "Исходная папка",
    note: "Редакционная заметка",
    imageLines: "Изображения",
    imageHelp: "Одна строка на фото: URL | ALT | FILENAME",
    previewCount: "Подготовлено фото",
    itineraryId: "Внутренний ID",
    itineraryProfile: "Профиль",
    itineraryTitle: "Видимый заголовок",
    itineraryStrapline: "Подзаголовок / pitch",
    itineraryDistance: "Дистанция",
    itineraryDuration: "Длительность",
    itinerarySeason: "Лучший сезон",
    itineraryStart: "Старт",
    itineraryFinish: "Финиш",
    itineraryWaypoints: "Waypoints",
    itineraryWaypointsHelp: "Через запятую",
    itineraryHighlights: "Highlights",
    itineraryHighlightsHelp: "Одна строка на идею",
    itineraryBmwAngle: "Почему это очень BMW",
    itineraryNotes: "Практические заметки",
    itineraryNotesHelp: "Одна строка на заметку",
    category: "Категория",
    eventId: "ID события",
    eventTitle: "Заголовок",
    year: "Год",
    start: "ISO начало",
    end: "ISO конец",
    displayDate: "Видимая дата",
    source: "Источник",
    destination: "Назначение",
    galleryHref: "Ссылка на галерею",
    summary: "Сводка",
    workflow: "Рекомендуемый поток",
    workflowBody: "Заполни форму, сохрани черновик, выгрузи JSON — и у тебя уже есть структурированный блок для подключения к реальной публикации позже.",
    security: "Безопасность",
    securityBody: "Эта первая версия не публикует сама и не загружает файлы на сервер. Правильный следующий шаг: auth + storage + реальная персистентность.",
    draftReady: "Точка управления готова к росту в реальный backend.",
    car: "Авто",
    motorcycle: "Мото",
    both: "Смешанный",
  },
};

type PhotoDraft = {
  collectionKey: string;
  title: string;
  sourceFolder: string;
  note: string;
  imageLines: string;
};

type ItineraryDraft = {
  id: string;
  profile: "car" | "motorcycle" | "both";
  title: string;
  strapline: string;
  distance: string;
  duration: string;
  season: string;
  start: string;
  finish: string;
  waypoints: string;
  highlights: string;
  bmwAngle: string;
  notes: string;
};

type CalendarDraft = {
  id: string;
  year: string;
  title: string;
  category: string;
  start: string;
  end: string;
  displayDate: string;
  source: string;
  destination: string;
  galleryHref: string;
  summary: string;
};

const defaultPhotoDraft: PhotoDraft = {
  collectionKey: "sortides_2026",
  title: "Nova sortida / nou bloc",
  sourceFolder: "sortides/2026",
  note: "",
  imageLines: "https://example.com/foto-01.jpg | BMW Club Andorra - portada de la sortida | foto-01.jpg",
};

const defaultItineraryDraft: ItineraryDraft = {
  id: "nova-ruta-club",
  profile: "both",
  title: "Nova ruta premium del club",
  strapline: "Ruta pensada per conduir, parar bé i fotografiar els cotxes.",
  distance: "65 km",
  duration: "3 h",
  season: "Primavera i tardor",
  start: "Andorra la Vella",
  finish: "Ordino",
  waypoints: "Andorra la Vella, Escaldes, Canillo, Ordino",
  highlights: "Miradors nets\nRitme molt fluid\nParades premium per al club",
  bmwAngle: "Perfecta per a una sortida oficial amb molt bon ADN BMW.",
  notes: "Comprovar meteo\nEvitar neu acumulada\nBon punt per esmorzar",
};

const defaultCalendarDraft: CalendarDraft = {
  id: "nova-sortida-2026",
  year: "2026",
  title: "Nova sortida BMW Club Andorra",
  category: "sortida",
  start: "2026-09-20T09:00:00+02:00",
  end: "2026-09-20T15:00:00+02:00",
  displayDate: "20/09/2026",
  source: "Andorra la Vella",
  destination: "Ordino",
  galleryHref: "/galeria/sortides/2026",
  summary: "Sortida oficial del club amb parada per esmorzar i fotografia.",
};

const splitLines = (text: string) => text.split("\n").map((item) => item.trim()).filter(Boolean);
const storageKey = (name: string) => `${STORAGE_PREFIX}:${name}`;

const saveDownload = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const parseImages = (raw: string) => splitLines(raw).map((line, index) => {
  const [src = "", alt = "", filename = ""] = line.split("|").map((item) => item.trim());
  return {
    src,
    alt: alt || `Imatge ${index + 1}`,
    filename: filename || src.split("/").pop() || `image-${index + 1}.jpg`,
  };
}).filter((item) => item.src);

const useLocalDraft = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(storageKey(key));
    if (saved) {
      try {
        setValue(JSON.parse(saved) as T);
      } catch {
        window.localStorage.removeItem(storageKey(key));
      }
    }
  }, [key]);

  const persist = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey(key), JSON.stringify(value));
  };

  const reset = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey(key));
    }
    setValue(initialValue);
  };

  return { value, setValue, persist, reset };
};

const StatCard = ({ value, label }: { value: number; label: string }) => (
  <Card className="rounded-[1.5rem] border-0 bg-white/70 p-5 shadow-sm">
    <div className="text-3xl font-bold text-slate-950">{value}</div>
    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
  </Card>
);

const SectionHeader = ({ icon: Icon, title, body }: { icon: typeof Images; title: string; body: string }) => (
  <div className="mb-5">
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
      <Icon className="h-3.5 w-3.5" />
      {title}
    </div>
    <p className="mt-3 text-sm text-muted-foreground">{body}</p>
  </div>
);

const GestioClub = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const photoDraft = useLocalDraft<PhotoDraft>("photos", defaultPhotoDraft);
  const itineraryDraft = useLocalDraft<ItineraryDraft>("itinerary", defaultItineraryDraft);
  const calendarDraft = useLocalDraft<CalendarDraft>("calendar", defaultCalendarDraft);
  const [status, setStatus] = useState("");

  const photoCount = useMemo(() => Object.values(galleryMediaByPage).flat().reduce((acc, section) => acc + section.images.length, 0), []);
  const preparedImages = useMemo(() => parseImages(photoDraft.value.imageLines), [photoDraft.value.imageLines]);

  const photoPayload = useMemo(() => JSON.stringify({
    title: photoDraft.value.title,
    sourceFolder: photoDraft.value.sourceFolder,
    note: photoDraft.value.note || undefined,
    images: preparedImages,
  }, null, 2), [photoDraft.value, preparedImages]);

  const itineraryPayload = useMemo(() => JSON.stringify({
    id: itineraryDraft.value.id,
    profile: itineraryDraft.value.profile,
    title: itineraryDraft.value.title,
    strapline: itineraryDraft.value.strapline,
    distance: itineraryDraft.value.distance,
    duration: itineraryDraft.value.duration,
    bestSeason: itineraryDraft.value.season,
    start: itineraryDraft.value.start,
    finish: itineraryDraft.value.finish,
    waypoints: itineraryDraft.value.waypoints.split(",").map((item) => item.trim()).filter(Boolean),
    highlights: splitLines(itineraryDraft.value.highlights),
    bmwAngle: itineraryDraft.value.bmwAngle,
    notes: splitLines(itineraryDraft.value.notes),
  }, null, 2), [itineraryDraft.value]);

  const calendarPayload = useMemo(() => JSON.stringify({
    id: calendarDraft.value.id,
    year: Number(calendarDraft.value.year),
    title: calendarDraft.value.title,
    category: calendarDraft.value.category,
    start: calendarDraft.value.start,
    end: calendarDraft.value.end,
    displayDate: calendarDraft.value.displayDate,
    source: calendarDraft.value.source,
    destination: calendarDraft.value.destination || undefined,
    galleryHref: calendarDraft.value.galleryHref || undefined,
    summary: calendarDraft.value.summary || undefined,
  }, null, 2), [calendarDraft.value]);

  const copyPayload = async (payload: string) => {
    try {
      await navigator.clipboard.writeText(payload);
      setStatus(t.copied);
    } catch {
      setStatus("Clipboard blocked");
    }
  };

  return (
    <PageShell>
      <section className="pt-10 pb-8">
        <div className="container mx-auto max-w-6xl px-4">
          <Card className="glass-dark relative overflow-hidden rounded-[2.5rem] border-0 p-8 text-white shadow-elegant md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.32),transparent_34%)]" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78">
                  <LockKeyhole className="h-4 w-4" />
                  {t.admin}
                </div>
                <h1 className="mt-5 max-w-4xl text-3xl font-bold text-balance sm:text-4xl md:text-6xl">{t.title}</h1>
                <p className="mt-5 max-w-3xl text-lg text-white/72">{t.intro}</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
                  <ShieldCheck className="h-4 w-4" />
                  {t.draftReady}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <StatCard value={photoCount} label={t.currentPhotos} />
                <StatCard value={itineraryGuide.length} label={t.currentRoutes} />
                <StatCard value={clubEvents.length} label={t.currentEvents} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <Tabs defaultValue="photos" className="space-y-5">
              <TabsList className="h-auto flex-wrap rounded-[1.25rem] bg-white/70 p-2">
                <TabsTrigger value="photos" className="rounded-xl px-4 py-2">{t.photos}</TabsTrigger>
                <TabsTrigger value="itineraries" className="rounded-xl px-4 py-2">{t.itineraries}</TabsTrigger>
                <TabsTrigger value="calendar" className="rounded-xl px-4 py-2">{t.calendar}</TabsTrigger>
              </TabsList>

              <TabsContent value="photos">
                <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8">
                  <SectionHeader icon={Images} title={t.photos} body={t.workflowBody} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">{t.photoCollection}</label>
                      <Input value={photoDraft.value.collectionKey} onChange={(e) => photoDraft.setValue({ ...photoDraft.value, collectionKey: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">{t.photoTitle}</label>
                      <Input value={photoDraft.value.title} onChange={(e) => photoDraft.setValue({ ...photoDraft.value, title: e.target.value })} />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">{t.sourceFolder}</label>
                      <Input value={photoDraft.value.sourceFolder} onChange={(e) => photoDraft.setValue({ ...photoDraft.value, sourceFolder: e.target.value })} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">{t.note}</label>
                      <Input value={photoDraft.value.note} onChange={(e) => photoDraft.setValue({ ...photoDraft.value, note: e.target.value })} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium">{t.imageLines}</label>
                    <Textarea className="min-h-[220px]" value={photoDraft.value.imageLines} onChange={(e) => photoDraft.setValue({ ...photoDraft.value, imageLines: e.target.value })} />
                    <p className="mt-2 text-xs text-muted-foreground">{t.imageHelp}</p>
                  </div>
                  <div className="mt-4 rounded-[1.25rem] border border-border/70 bg-white/70 p-4 text-sm">
                    <span className="font-semibold">{t.previewCount}:</span> {preparedImages.length}
                  </div>
                  <ActionsRow
                    t={t}
                    onSave={() => { photoDraft.persist(); setStatus(t.saved); }}
                    onReset={() => { photoDraft.reset(); setStatus(""); }}
                    onExport={() => saveDownload(`${photoDraft.value.collectionKey || "gallery"}.json`, photoPayload)}
                    onCopy={() => copyPayload(photoPayload)}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="itineraries">
                <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8">
                  <SectionHeader icon={MapPinned} title={t.itineraries} body={t.workflowBody} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t.itineraryId}><Input value={itineraryDraft.value.id} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, id: e.target.value })} /></Field>
                    <Field label={t.itineraryProfile}>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={itineraryDraft.value.profile} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, profile: e.target.value as ItineraryDraft['profile'] })}>
                        <option value="car">{t.car}</option>
                        <option value="motorcycle">{t.motorcycle}</option>
                        <option value="both">{t.both}</option>
                      </select>
                    </Field>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label={t.itineraryTitle}><Input value={itineraryDraft.value.title} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, title: e.target.value })} /></Field>
                    <Field label={t.itineraryStrapline}><Input value={itineraryDraft.value.strapline} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, strapline: e.target.value })} /></Field>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-4">
                    <Field label={t.itineraryDistance}><Input value={itineraryDraft.value.distance} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, distance: e.target.value })} /></Field>
                    <Field label={t.itineraryDuration}><Input value={itineraryDraft.value.duration} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, duration: e.target.value })} /></Field>
                    <Field label={t.itinerarySeason}><Input value={itineraryDraft.value.season} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, season: e.target.value })} /></Field>
                    <Field label={t.itineraryStart}><Input value={itineraryDraft.value.start} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, start: e.target.value })} /></Field>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label={t.itineraryFinish}><Input value={itineraryDraft.value.finish} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, finish: e.target.value })} /></Field>
                    <Field label={t.itineraryWaypoints}><Input value={itineraryDraft.value.waypoints} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, waypoints: e.target.value })} /></Field>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{t.itineraryWaypointsHelp}</p>
                  <div className="mt-4 grid gap-4">
                    <Field label={t.itineraryHighlights}><Textarea value={itineraryDraft.value.highlights} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, highlights: e.target.value })} /></Field>
                    <p className="-mt-2 text-xs text-muted-foreground">{t.itineraryHighlightsHelp}</p>
                    <Field label={t.itineraryBmwAngle}><Textarea value={itineraryDraft.value.bmwAngle} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, bmwAngle: e.target.value })} /></Field>
                    <Field label={t.itineraryNotes}><Textarea value={itineraryDraft.value.notes} onChange={(e) => itineraryDraft.setValue({ ...itineraryDraft.value, notes: e.target.value })} /></Field>
                    <p className="-mt-2 text-xs text-muted-foreground">{t.itineraryNotesHelp}</p>
                  </div>
                  <ActionsRow
                    t={t}
                    onSave={() => { itineraryDraft.persist(); setStatus(t.saved); }}
                    onReset={() => { itineraryDraft.reset(); setStatus(""); }}
                    onExport={() => saveDownload(`${itineraryDraft.value.id || "itinerary"}.json`, itineraryPayload)}
                    onCopy={() => copyPayload(itineraryPayload)}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="calendar">
                <Card className="premium-card rounded-[2rem] border-0 p-6 md:p-8">
                  <SectionHeader icon={CalendarRange} title={t.calendar} body={t.workflowBody} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t.eventId}><Input value={calendarDraft.value.id} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, id: e.target.value })} /></Field>
                    <Field label={t.eventTitle}><Input value={calendarDraft.value.title} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, title: e.target.value })} /></Field>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-4">
                    <Field label={t.year}><Input value={calendarDraft.value.year} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, year: e.target.value })} list="calendar-years" /></Field>
                    <Field label={t.category}><Input value={calendarDraft.value.category} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, category: e.target.value })} /></Field>
                    <Field label={t.displayDate}><Input value={calendarDraft.value.displayDate} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, displayDate: e.target.value })} /></Field>
                    <Field label={t.galleryHref}><Input value={calendarDraft.value.galleryHref} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, galleryHref: e.target.value })} /></Field>
                  </div>
                  <datalist id="calendar-years">
                    {calendarYears.map((year) => <option key={year} value={year} />)}
                  </datalist>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label={t.start}><Input value={calendarDraft.value.start} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, start: e.target.value })} /></Field>
                    <Field label={t.end}><Input value={calendarDraft.value.end} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, end: e.target.value })} /></Field>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label={t.source}><Input value={calendarDraft.value.source} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, source: e.target.value })} /></Field>
                    <Field label={t.destination}><Input value={calendarDraft.value.destination} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, destination: e.target.value })} /></Field>
                  </div>
                  <div className="mt-4">
                    <Field label={t.summary}><Textarea value={calendarDraft.value.summary} onChange={(e) => calendarDraft.setValue({ ...calendarDraft.value, summary: e.target.value })} /></Field>
                  </div>
                  <ActionsRow
                    t={t}
                    onSave={() => { calendarDraft.persist(); setStatus(t.saved); }}
                    onReset={() => { calendarDraft.reset(); setStatus(""); }}
                    onExport={() => saveDownload(`${calendarDraft.value.id || "event"}.json`, calendarPayload)}
                    onCopy={() => copyPayload(calendarPayload)}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid gap-6">
            <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t.dashboard}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{t.workflowBody}</p>
              <div className="mt-5 grid gap-3">
                <StatusLine icon={FolderOpen} text={`${Object.keys(galleryMediaByPage).length} col·leccions de galeria`} />
                <StatusLine icon={MapPinned} text={`${itineraryGuide.length} rutes actives`} />
                <StatusLine icon={CalendarRange} text={`${clubEvents.length} entrades de calendari`} />
              </div>
              {status ? <div className="mt-5 rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</div> : null}
            </Card>

            <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
              <h2 className="text-xl font-bold">{t.workflow}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t.workflowBody}</p>
            </Card>

            <Card className="rounded-[2rem] border-0 bg-white/72 p-6 shadow-sm">
              <h2 className="text-xl font-bold">{t.security}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t.securityBody}</p>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>
    {children}
  </div>
);

const ActionsRow = ({
  t,
  onSave,
  onReset,
  onExport,
  onCopy,
}: {
  t: Record<string, string>;
  onSave: () => void;
  onReset: () => void;
  onExport: () => void;
  onCopy: () => void;
}) => (
  <div className="mt-6 flex flex-wrap gap-3">
    <Button variant="hero" className="rounded-full" onClick={onSave}><Save className="h-4 w-4" />{t.save}</Button>
    <Button variant="outline" className="rounded-full" onClick={onExport}><Download className="h-4 w-4" />{t.export}</Button>
    <Button variant="outline" className="rounded-full" onClick={onCopy}><Copy className="h-4 w-4" />{t.copy}</Button>
    <Button variant="ghost" className="rounded-full" onClick={onReset}><RotateCcw className="h-4 w-4" />{t.reset}</Button>
  </div>
);

const StatusLine = ({ icon: Icon, text }: { icon: typeof Images; text: string }) => (
  <div className="flex items-center gap-3 rounded-[1.1rem] border border-border/70 bg-white/80 px-4 py-3 text-sm text-foreground/84">
    <Icon className="h-4 w-4 text-primary" />
    <span>{text}</span>
  </div>
);

export default GestioClub;
