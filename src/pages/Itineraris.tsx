import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange, CarFront, Compass, Mountain, Route, ShieldCheck, Bike, Crown, Map, ImageIcon, ExternalLink, UtensilsCrossed, Landmark, Trees, Flag, Telescope, Sparkles, Maximize2 } from "lucide-react";
import { CircleMarker, MapContainer, Marker, Polygon, Polyline, Popup, TileLayer, Tooltip, ZoomControl, useMapEvents } from "react-leaflet";
import { divIcon, type LatLngExpression, type LatLngTuple } from "leaflet";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { type ClubItinerary } from "@/content/itineraryGuide";
import { useMergedItineraries } from "@/lib/clubCms";
import "leaflet/dist/leaflet.css";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Itineraris BMW a Andorra",
    title: "Les millors rutes per gaudir Andorra en cotxe o en moto, amb lectura premium i molt ADN BMW.",
    intro: "No és un llistat genèric. És una guia pensada per a gent que gaudeix conduint: carreteres amb ritme, miradors útils, bones parades i recorreguts que encaixen de debò amb l’esperit del club.",
    cta: "Parlar amb l’assistent IA",
    kindCar: "Cotxe",
    kindMoto: "Moto",
    kindBoth: "Cotxe + moto",
    duration: "Durada ideal",
    distance: "Distància aproximada",
    season: "Millor finestra",
    rhythm: "Ritme",
    start: "Sortida",
    finish: "Final",
    route: "Traçat recomanat",
    scheme: "Esquema visual",
    schemeNote: "Mapa de referència d’Andorra amb els punts reals del recorregut i el traçat principal de la ruta.",
    highlights: "Per què val la pena",
    bmw: "Per què és molt BMW",
    notes: "Notes pràctiques",
    guide1: "Rutes pensades per gaudir, no per córrer.",
    guide2: "Separació clara entre itineraris de cotxe, moto i mixtos.",
    guide3: "Lectura útil per a salides del club o escapada individual.",
    contactCta: "Vull una sortida del club",
    clubPick: "Ruta ideal per a sortida oficial del club",
    clubPickBody: "La recomanació editorial per a una jornada de club ben resolta.",
    mapStart: "Start",
    mapFinish: "Finish",
    routePhoto: "Foto del recorregut",
    routePhotoNote: "Fotografia real del paisatge vinculat a aquesta ruta.",
    stops: "Parades gourmet i punts clau",
    stopsNote: "Restaurants, miradors i punts d’interès reals per fer la ruta més rodona.",
    stopRestaurant: "Restaurant",
    stopViewpoint: "Mirador",
    stopHeritage: "Patrimoni",
    stopNature: "Natura",
    stopMotorsport: "Motor",
    credits: "Crèdits",
    source: "Font",
    license: "Llicència",
    mapExpand: "Obrir mapa gran",
    mapExpandHint: "Zoom amb la roda o els botons. Clica per obrir el mapa operatiu en gran.",
    mapClose: "Tancar mapa",
    openGoogleMaps: "Obrir a Google Maps",
    openFullRoute: "Obrir ruta completa",
    visionEyebrow: "Drive Experience",
    visionTitle: "El següent pas: convertir el club en una plataforma premium de rutes, esdeveniments i experiències BMW.",
    visionIntro: "Això ja no seria només una pàgina d’itineraris. Seria una capa digital pensada per planificar sortides, fer-les memorables i convertir-les en contingut premium de club.",
    modulesTitle: "Mòduls clau",
    roadmapTitle: "Roadmap recomanat",
    bmwTitle: "Per què això pot interessar fins i tot a BMW Official",
    bmwIntro: "Perquè uneix ruta, hospitality, contingut, dades i experiència de marca en una sola superfície exportable a esdeveniments, concessionaris o llançaments.",
    postDriveEyebrow: "Post-Drive Report real",
    postDriveTitle: "Després de la sortida, el club també hauria de tenir una peça premium per compartir.",
    postDriveIntro: "Recap editorial, mètriques, highlights i material llest per a comunicar l’esdeveniment com una experiència BMW de nivell.",
    postDriveSelect: "Report actiu",
    postDriveSummary: "Resum editorial",
    postDriveStats: "Mètriques de la sortida",
    postDriveHighlights: "Highlights del dia",
    postDriveAssets: "Assets shareables",
  },
  es: {
    eyebrow: "Itinerarios BMW en Andorra",
    title: "Las mejores rutas para disfrutar Andorra en coche o en moto, con lectura premium y mucho ADN BMW.",
    intro: "No es un listado genérico. Es una guía pensada para gente que disfruta conduciendo: carreteras con ritmo, miradores útiles, buenas paradas y recorridos que encajan de verdad con el espíritu del club.",
    cta: "Hablar con el asistente IA",
    kindCar: "Coche",
    kindMoto: "Moto",
    kindBoth: "Coche + moto",
    duration: "Duración ideal",
    distance: "Distancia aproximada",
    season: "Mejor ventana",
    rhythm: "Ritmo",
    start: "Salida",
    finish: "Final",
    route: "Trazado recomendado",
    scheme: "Esquema visual",
    schemeNote: "Mapa de referencia de Andorra con los puntos reales del recorrido y el trazado principal de la ruta.",
    highlights: "Por qué merece la pena",
    bmw: "Por qué es muy BMW",
    notes: "Notas prácticas",
    guide1: "Rutas pensadas para disfrutar, no para correr.",
    guide2: "Separación clara entre itinerarios de coche, moto y mixtos.",
    guide3: "Lectura útil para salidas del club o escapada individual.",
    contactCta: "Quiero una salida del club",
    clubPick: "Ruta ideal para salida oficial del club",
    clubPickBody: "La recomendación editorial para una jornada de club bien planteada.",
    mapStart: "Start",
    mapFinish: "Finish",
    routePhoto: "Foto del itinerario",
    routePhotoNote: "Fotografía real del paisaje vinculado a esta ruta.",
    stops: "Paradas gourmet y puntos clave",
    stopsNote: "Restaurantes, miradores y puntos de interés reales para hacer la ruta más atractiva.",
    stopRestaurant: "Restaurante",
    stopViewpoint: "Mirador",
    stopHeritage: "Patrimonio",
    stopNature: "Naturaleza",
    stopMotorsport: "Motor",
    credits: "Créditos",
    source: "Fuente",
    license: "Licencia",
    mapExpand: "Abrir mapa grande",
    mapExpandHint: "Haz zoom con la rueda o los botones. Haz clic para abrir el mapa operativo en grande.",
    mapClose: "Cerrar mapa",
    openGoogleMaps: "Abrir en Google Maps",
    openFullRoute: "Abrir ruta completa",
    visionEyebrow: "Drive Experience",
    visionTitle: "El siguiente paso: convertir el club en una plataforma premium de rutas, eventos y experiencias BMW.",
    visionIntro: "Esto ya no sería solo una página de itinerarios. Sería una capa digital pensada para planificar salidas, hacerlas memorables y convertirlas en contenido premium de club.",
    modulesTitle: "Módulos clave",
    roadmapTitle: "Roadmap recomendado",
    bmwTitle: "Por qué esto puede interesar incluso a BMW Official",
    bmwIntro: "Porque une ruta, hospitality, contenido, datos y experiencia de marca en una sola superficie exportable a eventos, concesionarios o lanzamientos.",
    postDriveEyebrow: "Post-Drive Report real",
    postDriveTitle: "Después de la salida, el club también debería tener una pieza premium para compartir.",
    postDriveIntro: "Recap editorial, métricas, highlights y material listo para comunicar el evento como una experiencia BMW de nivel.",
    postDriveSelect: "Report activo",
    postDriveSummary: "Resumen editorial",
    postDriveStats: "Métricas de la salida",
    postDriveHighlights: "Highlights del día",
    postDriveAssets: "Assets shareables",
  },
  fr: {
    eyebrow: "Itinéraires BMW en Andorre",
    title: "Les meilleures routes pour profiter de l’Andorre en voiture ou à moto, avec une lecture premium et un vrai ADN BMW.",
    intro: "Ce n’est pas une liste générique. C’est un guide pour les gens qui aiment vraiment conduire : routes au bon rythme, belvédères utiles, bons arrêts et parcours cohérents avec l’esprit du club.",
    cta: "Parler à l’assistant IA",
    kindCar: "Voiture",
    kindMoto: "Moto",
    kindBoth: "Voiture + moto",
    duration: "Durée idéale",
    distance: "Distance approximative",
    season: "Meilleure fenêtre",
    rhythm: "Rythme",
    start: "Départ",
    finish: "Arrivée",
    route: "Tracé recommandé",
    scheme: "Schéma visuel",
    schemeNote: "Carte de référence de l’Andorre avec les points réels du parcours et son tracé principal.",
    highlights: "Pourquoi ça vaut le coup",
    bmw: "Pourquoi c’est très BMW",
    notes: "Notes pratiques",
    guide1: "Des routes faites pour profiter, pas pour courir.",
    guide2: "Séparation claire entre voiture, moto et itinéraires mixtes.",
    guide3: "Lecture utile pour une sortie du club ou une escapade individuelle.",
    contactCta: "Je veux une sortie du club",
    clubPick: "Route idéale pour une sortie officielle du club",
    clubPickBody: "La recommandation éditoriale pour une vraie journée club bien pensée.",
    mapStart: "Start",
    mapFinish: "Finish",
    routePhoto: "Photo de l'itinéraire",
    routePhotoNote: "Photographie réelle du paysage lié à cette route.",
    stops: "Haltes gourmandes et points clés",
    stopsNote: "Restaurants, belvédères et points d’intérêt réels pour enrichir l’itinéraire.",
    stopRestaurant: "Restaurant",
    stopViewpoint: "Belvédère",
    stopHeritage: "Patrimoine",
    stopNature: "Nature",
    stopMotorsport: "Moteur",
    credits: "Crédits",
    source: "Source",
    license: "Licence",
    mapExpand: "Ouvrir la grande carte",
    mapExpandHint: "Zoomez avec la molette ou les boutons. Cliquez pour ouvrir la carte en grand.",
    mapClose: "Fermer la carte",
    openGoogleMaps: "Ouvrir dans Google Maps",
    openFullRoute: "Ouvrir l’itinéraire complet",
    visionEyebrow: "Drive Experience",
    visionTitle: "L’étape suivante : transformer le club en plateforme premium de routes, d’événements et d’expériences BMW.",
    visionIntro: "Ce ne serait plus une simple page d’itinéraires, mais une couche digitale pour planifier des sorties, les rendre mémorables et les convertir en contenu premium du club.",
    modulesTitle: "Modules clés",
    roadmapTitle: "Feuille de route recommandée",
    bmwTitle: "Pourquoi cela peut intéresser même BMW Official",
    bmwIntro: "Parce que cela réunit route, hospitality, contenu, données et expérience de marque dans une seule surface exportable.",
    postDriveEyebrow: "Post-Drive Report réel",
    postDriveTitle: "Après la sortie, le club devrait aussi disposer d’une pièce premium à partager.",
    postDriveIntro: "Récap éditorial, métriques, highlights et matériel prêt à communiquer l’événement comme une expérience BMW premium.",
    postDriveSelect: "Report actif",
    postDriveSummary: "Résumé éditorial",
    postDriveStats: "Métriques de la sortie",
    postDriveHighlights: "Highlights du jour",
    postDriveAssets: "Assets partageables",
  },
  en: {
    eyebrow: "BMW itineraries in Andorra",
    title: "The best routes to enjoy Andorra by car or motorcycle, with premium thinking and strong BMW DNA.",
    intro: "This is not a generic list. It is a guide for people who truly enjoy driving: roads with rhythm, useful viewpoints, proper stops and routes that genuinely fit the spirit of the club.",
    cta: "Talk to the AI concierge",
    kindCar: "Car",
    kindMoto: "Motorcycle",
    kindBoth: "Car + motorcycle",
    duration: "Ideal duration",
    distance: "Approx. distance",
    season: "Best window",
    rhythm: "Rhythm",
    start: "Start",
    finish: "Finish",
    route: "Recommended route",
    scheme: "Visual schematic",
    schemeNote: "Reference map of Andorra with the route placed on real locations and traced across the country.",
    highlights: "Why it is worth it",
    bmw: "Why it feels BMW",
    notes: "Practical notes",
    guide1: "Routes built for enjoyment, not speed.",
    guide2: "Clear split between car, motorcycle and mixed itineraries.",
    guide3: "Useful reading for official club outings or solo escapes.",
    contactCta: "I want a club outing",
    clubPick: "Ideal route for an official club outing",
    clubPickBody: "The editorial recommendation for a properly designed club day.",
    mapStart: "Start",
    mapFinish: "Finish",
    routePhoto: "Route photography",
    routePhotoNote: "Real landscape photography linked to this route.",
    stops: "Gourmet stops and key highlights",
    stopsNote: "Real restaurants, viewpoints and notable stops to make the route more compelling.",
    stopRestaurant: "Restaurant",
    stopViewpoint: "Viewpoint",
    stopHeritage: "Heritage",
    stopNature: "Nature",
    stopMotorsport: "Motorsport",
    credits: "Credits",
    source: "Source",
    license: "License",
    mapExpand: "Open large map",
    mapExpandHint: "Zoom with the wheel or buttons. Click to open the full interactive map.",
    mapClose: "Close map",
    openGoogleMaps: "Open in Google Maps",
    openFullRoute: "Open full route",
    visionEyebrow: "Drive Experience",
    visionTitle: "The next step: turn the club into a premium platform for BMW routes, events and experiences.",
    visionIntro: "This would no longer be just an itinerary page. It would become a digital layer to plan drives, make them memorable and turn them into premium club content.",
    modulesTitle: "Key modules",
    roadmapTitle: "Recommended roadmap",
    bmwTitle: "Why this could interest even BMW Official",
    bmwIntro: "Because it combines route planning, hospitality, content, data and brand experience in one exportable surface for events, dealers or launches.",
    postDriveEyebrow: "Real Post-Drive Report",
    postDriveTitle: "After the drive, the club should also have a premium piece worth sharing.",
    postDriveIntro: "Editorial recap, metrics, highlights and ready-to-use material to communicate the event as a serious BMW experience.",
    postDriveSelect: "Active report",
    postDriveSummary: "Editorial summary",
    postDriveStats: "Drive metrics",
    postDriveHighlights: "Day highlights",
    postDriveAssets: "Shareable assets",
  },
  pt: {
    eyebrow: "Itinerários BMW em Andorra",
    title: "As melhores rotas para desfrutar de Andorra de carro ou moto, com leitura premium e muito ADN BMW.",
    intro: "Não é uma lista genérica. É um guia para quem gosta mesmo de conduzir: estradas com ritmo, miradouros úteis, boas paragens e percursos alinhados com o espírito do clube.",
    cta: "Falar com o assistente IA",
    kindCar: "Carro",
    kindMoto: "Moto",
    kindBoth: "Carro + moto",
    duration: "Duração ideal",
    distance: "Distância aproximada",
    season: "Melhor janela",
    rhythm: "Ritmo",
    start: "Partida",
    finish: "Fim",
    route: "Traçado recomendado",
    scheme: "Esquema visual",
    schemeNote: "Mapa de referência de Andorra com os pontos reais do percurso e o traçado principal da rota.",
    highlights: "Porque vale a pena",
    bmw: "Porque é muito BMW",
    notes: "Notas práticas",
    guide1: "Rotas pensadas para desfrutar, não para correr.",
    guide2: "Separação clara entre carro, moto e itinerários mistos.",
    guide3: "Leitura útil para saídas do clube ou escapada individual.",
    contactCta: "Quero uma saída do clube",
    clubPick: "Rota ideal para saída oficial do clube",
    clubPickBody: "A recomendação editorial para um dia de clube bem montado.",
    mapStart: "Start",
    mapFinish: "Finish",
    routePhoto: "Foto do itinerário",
    routePhotoNote: "Fotografia real da paisagem ligada a esta rota.",
    stops: "Paragens gourmet e pontos-chave",
    stopsNote: "Restaurantes, miradouros e pontos de interesse reais para tornar a rota mais atrativa.",
    stopRestaurant: "Restaurante",
    stopViewpoint: "Miradouro",
    stopHeritage: "Património",
    stopNature: "Natureza",
    stopMotorsport: "Motor",
    credits: "Créditos",
    source: "Fonte",
    license: "Licença",
    mapExpand: "Abrir mapa grande",
    mapExpandHint: "Faça zoom com a roda ou os botões. Clique para abrir o mapa operacional em grande.",
    mapClose: "Fechar mapa",
    openGoogleMaps: "Abrir no Google Maps",
    openFullRoute: "Abrir rota completa",
    visionEyebrow: "Drive Experience",
    visionTitle: "O próximo passo: transformar o clube numa plataforma premium de rotas, eventos e experiências BMW.",
    visionIntro: "Isto deixaria de ser apenas uma página de itinerários. Passaria a ser uma camada digital para planear saídas, torná-las memoráveis e convertê-las em conteúdo premium do clube.",
    modulesTitle: "Módulos-chave",
    roadmapTitle: "Roadmap recomendado",
    bmwTitle: "Porque isto pode interessar até à BMW Official",
    bmwIntro: "Porque junta rota, hospitalidade, conteúdo, dados e experiência de marca numa superfície exportável.",
    postDriveEyebrow: "Post-Drive Report real",
    postDriveTitle: "Depois da saída, o clube também deve ter uma peça premium para partilhar.",
    postDriveIntro: "Recap editorial, métricas, highlights e material pronto para comunicar o evento como uma experiência BMW séria.",
    postDriveSelect: "Report ativo",
    postDriveSummary: "Resumo editorial",
    postDriveStats: "Métricas da saída",
    postDriveHighlights: "Highlights do dia",
    postDriveAssets: "Assets partilháveis",
  },
  de: {
    eyebrow: "BMW-Routen in Andorra",
    title: "Die besten Strecken, um Andorra mit Auto oder Motorrad zu genießen – mit Premium-Blick und viel BMW-DNA.",
    intro: "Keine generische Liste. Sondern ein Guide für Menschen, die wirklich gern fahren: Straßen mit Rhythmus, sinnvolle Aussichtspunkte, gute Stopps und Routen, die zum Geist des Clubs passen.",
    cta: "Mit dem KI-Assistenten sprechen",
    kindCar: "Auto",
    kindMoto: "Motorrad",
    kindBoth: "Auto + Motorrad",
    duration: "Ideale Dauer",
    distance: "Ungefähre Distanz",
    season: "Beste Saison",
    rhythm: "Rhythmus",
    start: "Start",
    finish: "Ziel",
    route: "Empfohlene Linie",
    scheme: "Visuelles Schema",
    schemeNote: "Referenzkarte von Andorra mit realen Wegpunkten und eingezeichneter Hauptroute.",
    highlights: "Warum es sich lohnt",
    bmw: "Warum es sehr BMW ist",
    notes: "Praktische Hinweise",
    guide1: "Routen zum Genießen, nicht zum Rasen.",
    guide2: "Klare Trennung zwischen Auto-, Motorrad- und Mix-Routen.",
    guide3: "Nützlich für Club-Ausfahrten oder Solo-Trips.",
    contactCta: "Ich will eine Club-Ausfahrt",
    clubPick: "Ideale Route für eine offizielle Club-Ausfahrt",
    clubPickBody: "Die redaktionelle Empfehlung für einen sauber gedachten Club-Tag.",
    mapStart: "Start",
    mapFinish: "Finish",
    routePhoto: "Routenfoto",
    routePhotoNote: "Echte Landschaftsfotografie aus dem Umfeld dieser Route.",
    stops: "Gourmet-Stopps und Highlights",
    stopsNote: "Reale Restaurants, Aussichtspunkte und interessante Stopps für eine attraktivere Route.",
    stopRestaurant: "Restaurant",
    stopViewpoint: "Aussichtspunkt",
    stopHeritage: "Kultur",
    stopNature: "Natur",
    stopMotorsport: "Motorsport",
    credits: "Credits",
    source: "Quelle",
    license: "Lizenz",
    mapExpand: "Große Karte öffnen",
    mapExpandHint: "Mit Mausrad oder Buttons zoomen. Klicken Sie, um die große interaktive Karte zu öffnen.",
    mapClose: "Karte schließen",
    openGoogleMaps: "In Google Maps öffnen",
    openFullRoute: "Komplette Route öffnen",
    visionEyebrow: "Drive Experience",
    visionTitle: "Der nächste Schritt: den Club in eine Premium-Plattform für BMW-Routen, Events und Erlebnisse verwandeln.",
    visionIntro: "Das wäre nicht mehr nur eine Routenseite, sondern eine digitale Ebene, um Ausfahrten zu planen, unvergesslich zu machen und in Premium-Club-Content zu verwandeln.",
    modulesTitle: "Kernmodule",
    roadmapTitle: "Empfohlene Roadmap",
    bmwTitle: "Warum das sogar für BMW Official interessant sein kann",
    bmwIntro: "Weil es Route, Hospitality, Content, Daten und Markenerlebnis in einer exportierbaren Fläche vereint.",
    postDriveEyebrow: "Echter Post-Drive Report",
    postDriveTitle: "Nach der Ausfahrt sollte der Club ebenfalls ein Premium-Stück zum Teilen haben.",
    postDriveIntro: "Redaktioneller Recap, Kennzahlen, Highlights und Material, um das Event als echtes BMW-Erlebnis zu kommunizieren.",
    postDriveSelect: "Aktiver Report",
    postDriveSummary: "Redaktionelle Zusammenfassung",
    postDriveStats: "Kennzahlen der Ausfahrt",
    postDriveHighlights: "Highlights des Tages",
    postDriveAssets: "Teilbare Assets",
  },
  ru: {
    eyebrow: "BMW-маршруты по Андорре",
    title: "Лучшие дороги Андорры для автомобиля или мотоцикла — с премиальной логикой и яркой BMW-ДНК.",
    intro: "Это не общий список. Это гид для тех, кто любит вождение: дороги с ритмом, полезные смотровые, хорошие остановки и маршруты, которые действительно подходят духу клуба.",
    cta: "Поговорить с ИИ помощником",
    kindCar: "Авто",
    kindMoto: "Мото",
    kindBoth: "Авто + мото",
    duration: "Идеальная длительность",
    distance: "Примерная дистанция",
    season: "Лучшее время",
    rhythm: "Ритм",
    start: "Старт",
    finish: "Финиш",
    route: "Рекомендуемый маршрут",
    scheme: "Визуальная схема",
    schemeNote: "Опорная карта Андорры с реальными точками маршрута и нанесённой линией движения.",
    highlights: "Почему стоит ехать",
    bmw: "Почему это очень BMW",
    notes: "Практические заметки",
    guide1: "Маршруты для удовольствия, а не для гонки.",
    guide2: "Чёткое разделение на авто, мото и смешанные маршруты.",
    guide3: "Полезно и для клубных выездов, и для личной поездки.",
    contactCta: "Хочу выезд клуба",
    clubPick: "Идеальный маршрут для официального выезда клуба",
    clubPickBody: "Редакционная рекомендация для хорошо собранного клубного дня.",
    mapStart: "Start",
    mapFinish: "Finish",
    routePhoto: "Фото маршрута",
    routePhotoNote: "Реальная фотография пейзажа, связанного с этим маршрутом.",
    stops: "Гастро-остановки и ключевые точки",
    stopsNote: "Реальные рестораны, смотровые и интересные точки, чтобы маршрут выглядел богаче.",
    stopRestaurant: "Ресторан",
    stopViewpoint: "Смотровая",
    stopHeritage: "Наследие",
    stopNature: "Природа",
    stopMotorsport: "Автоспорт",
    credits: "Авторство",
    source: "Источник",
    license: "Лицензия",
    mapExpand: "Открыть большую карту",
    mapExpandHint: "Масштабируйте колесом или кнопками. Нажмите, чтобы открыть большую интерактивную карту.",
    mapClose: "Закрыть карту",
    openGoogleMaps: "Открыть в Google Maps",
    openFullRoute: "Открыть весь маршрут",
    visionEyebrow: "Drive Experience",
    visionTitle: "Следующий шаг: превратить клуб в премиальную платформу маршрутов, событий и BMW-опыта.",
    visionIntro: "Это будет уже не просто страница маршрутов, а цифровой слой для планирования выездов, превращения их в запоминающийся опыт и премиальный контент клуба.",
    modulesTitle: "Ключевые модули",
    roadmapTitle: "Рекомендуемый roadmap",
    bmwTitle: "Почему это может заинтересовать даже BMW Official",
    bmwIntro: "Потому что здесь объединяются маршрут, hospitality, контент, данные и бренд-опыт в одной экспортируемой поверхности.",
    postDriveEyebrow: "Реальный Post-Drive Report",
    postDriveTitle: "После выезда у клуба тоже должен быть премиальный материал, которым хочется делиться.",
    postDriveIntro: "Редакторский recap, метрики, highlights и готовый материал, чтобы показать событие как сильный BMW-опыт.",
    postDriveSelect: "Активный report",
    postDriveSummary: "Редакторское резюме",
    postDriveStats: "Метрики выезда",
    postDriveHighlights: "Highlights дня",
    postDriveAssets: "Shareable assets",
  },
};

const getProfileMeta = (route: ClubItinerary, t: Record<string, string>) => {
  if (route.profile === "car") return { label: t.kindCar, icon: CarFront };
  if (route.profile === "motorcycle") return { label: t.kindMoto, icon: Bike };
  return { label: t.kindBoth, icon: Route };
};

type MapCoordinate = {
  lat: number;
  lon: number;
};

const ANDORRA_BOUNDS = {
  minLat: 42.43,
  maxLat: 42.66,
  minLon: 1.41,
  maxLon: 1.79,
};

const andorraOutline: Array<{ lat: number; lon: number }> = [
  { lon: 1.707006, lat: 42.502781 },
  { lon: 1.697498, lat: 42.494462 },
  { lon: 1.686336, lat: 42.490612 },
  { lon: 1.674244, lat: 42.490508 },
  { lon: 1.662358, lat: 42.493712 },
  { lon: 1.659774, lat: 42.496813 },
  { lon: 1.656984, lat: 42.49764 },
  { lon: 1.653986, lat: 42.496529 },
  { lon: 1.650369, lat: 42.493402 },
  { lon: 1.639517, lat: 42.466427 },
  { lon: 1.607478, lat: 42.456428 },
  { lon: 1.544432, lat: 42.450356 },
  { lon: 1.538851, lat: 42.445653 },
  { lon: 1.534511, lat: 42.439917 },
  { lon: 1.528206, lat: 42.434233 },
  { lon: 1.51663, lat: 42.429504 },
  { lon: 1.508466, lat: 42.428677 },
  { lon: 1.447901, lat: 42.434646 },
  { lon: 1.436429, lat: 42.440951 },
  { lon: 1.436429, lat: 42.453482 },
  { lon: 1.407593, lat: 42.486762 },
  { lon: 1.424543, lat: 42.492472 },
  { lon: 1.430227, lat: 42.493557 },
  { lon: 1.449968, lat: 42.504073 },
  { lon: 1.446557, lat: 42.519886 },
  { lon: 1.428987, lat: 42.531462 },
  { lon: 1.406456, lat: 42.52924 },
  { lon: 1.409764, lat: 42.540609 },
  { lon: 1.4263, lat: 42.561796 },
  { lon: 1.426403, lat: 42.565646 },
  { lon: 1.418032, lat: 42.569832 },
  { lon: 1.419272, lat: 42.579263 },
  { lon: 1.424853, lat: 42.589365 },
  { lon: 1.429297, lat: 42.595386 },
  { lon: 1.451415, lat: 42.602052 },
  { lon: 1.466814, lat: 42.641455 },
  { lon: 1.49844, lat: 42.640241 },
  { lon: 1.527793, lat: 42.648535 },
  { lon: 1.543089, lat: 42.649362 },
  { lon: 1.597349, lat: 42.621921 },
  { lon: 1.608304, lat: 42.618123 },
  { lon: 1.721993, lat: 42.609855 },
  { lon: 1.713311, lat: 42.589546 },
  { lon: 1.729434, lat: 42.582001 },
  { lon: 1.752688, lat: 42.576679 },
  { lon: 1.761107, lat: 42.567646 },
  { lon: 1.765091, lat: 42.563372 },
  { lon: 1.739976, lat: 42.561641 },
  { lon: 1.721683, lat: 42.548515 },
  { lon: 1.710624, lat: 42.527741 },
  { lon: 1.707006, lat: 42.502781 },
];

const waypointCoordinates: Record<string, MapCoordinate> = {
  "andorra la vella": { lat: 42.5063, lon: 1.5218 },
  "escaldes engordany": { lat: 42.5096, lon: 1.5341 },
  engolasters: { lat: 42.5188, lon: 1.5792 },
  canillo: { lat: 42.5676, lon: 1.5976 },
  meritxell: { lat: 42.5618, lon: 1.5961 },
  ordino: { lat: 42.5562, lon: 1.5332 },
  "coll d ordino": { lat: 42.5793, lon: 1.5255 },
  "la massana": { lat: 42.545, lon: 1.5148 },
  pal: { lat: 42.5567, lon: 1.4935 },
  "coll de la botella": { lat: 42.5722, lon: 1.4637 },
  arinsal: { lat: 42.572, lon: 1.4845 },
  erts: { lat: 42.5551, lon: 1.4922 },
  encamp: { lat: 42.5347, lon: 1.5801 },
  "grau roig": { lat: 42.5311, lon: 1.6971 },
  "pas de la casa": { lat: 42.5426, lon: 1.7336 },
  "port d envalira": { lat: 42.5394, lon: 1.7337 },
  "andorra circuit": { lat: 42.534, lon: 1.7144 },
  "la cortinada": { lat: 42.5777, lon: 1.5222 },
  arans: { lat: 42.5827, lon: 1.5237 },
  "el serrat": { lat: 42.5909, lon: 1.5246 },
  arcalis: { lat: 42.6222, lon: 1.5028 },
};

type RouteStopCategory = "restaurant" | "viewpoint" | "heritage" | "nature" | "motorsport";

type RouteStop = {
  name: string;
  place: string;
  category: RouteStopCategory;
  lat: number;
  lon: number;
  note: string;
};

const routeStopsById: Record<string, RouteStop[]> = {
  "grand-tour-central": [
    { name: "Llac d’Engolasters", place: "Escaldes-Engordany", category: "nature", lat: 42.5188, lon: 1.5792, note: "Parada natural clásica para abrir la ruta con lago y bosque." },
    { name: "El Läk", place: "Engolasters", category: "restaurant", lat: 42.5194, lon: 1.5784, note: "Terraza junto al lago para una parada más lifestyle y fotogénica." },
    { name: "Mirador Roc del Quer", place: "Canillo", category: "viewpoint", lat: 42.5759, lon: 1.6491, note: "Mirador icónico sobre el valle, muy potente para foto de club." },
    { name: "Santuari de Meritxell", place: "Meritxell", category: "heritage", lat: 42.5604, lon: 1.5957, note: "Punto patrimonial limpio y reconocible para una parada elegante." },
    { name: "L’Era del Rossell", place: "Meritxell", category: "restaurant", lat: 42.5599, lon: 1.5972, note: "Muy cerca de la basílica, ideal para elevar la parada gourmet." },
    { name: "Borda de l’Avi", place: "Canillo", category: "restaurant", lat: 42.5671, lon: 1.6008, note: "Cocina de montaña, buena opción para cierre de mediodía." },
  ],
  "west-viewpoints-loop": [
    { name: "Sant Climent de Pal", place: "Pal", category: "heritage", lat: 42.5564, lon: 1.4934, note: "Iglesia románica y parada con carácter muy andorrano." },
    { name: "Mirador Coll de la Botella", place: "Pal / Arinsal", category: "viewpoint", lat: 42.5722, lon: 1.4637, note: "Mirador abierto y muy agradecido para fotos de carretera." },
    { name: "Farga Rossell", place: "La Massana", category: "heritage", lat: 42.5472, lon: 1.5146, note: "Punto industrial histórico para añadir cultura a la ruta." },
    { name: "Restaurant Coll de la Botella", place: "Pal", category: "restaurant", lat: 42.5719, lon: 1.4643, note: "Cocina de montaña con terraza y acceso cómodo en plena ruta." },
    { name: "Pla de la Cot", place: "Pal", category: "restaurant", lat: 42.5568, lon: 1.4946, note: "Borda de montaña ideal para una parada gastronómica." },
  ],
  "envalira-high-mountain": [
    { name: "Andorra Circuit", place: "Pas de la Casa", category: "motorsport", lat: 42.534, lon: 1.7144, note: "Punto motor directo, coherente con el tono BMW de la ruta." },
    { name: "Port d’Envalira", place: "Pas de la Casa", category: "viewpoint", lat: 42.5394, lon: 1.7337, note: "El gran balcón de alta montaña del país." },
    { name: "Estanys de Pessons", place: "Grau Roig", category: "nature", lat: 42.5305, lon: 1.7168, note: "Parada paisajística potente si quieres añadir aire alpino." },
    { name: "Restaurant dels Llacs de Pessons", place: "Grau Roig", category: "restaurant", lat: 42.5319, lon: 1.731, note: "Refugio-restaurante junto a los lagos, perfecto para reforzar el carácter alpino de la ruta." },
    { name: "Restaurant Abelletes", place: "Pas de la Casa", category: "restaurant", lat: 42.5433, lon: 1.7338, note: "Parada alta de montaña junto al tramo final, útil para rematar la subida." },
  ],
  "ordino-tristaina-touring": [
    { name: "Casa d’Areny-Plandolit", place: "Ordino", category: "heritage", lat: 42.5566, lon: 1.5332, note: "Parada patrimonial premium en el corazón de Ordino." },
    { name: "Mirador Solar de Tristaina", place: "Arcalís", category: "viewpoint", lat: 42.6482, lon: 1.5337, note: "Uno de los miradores más espectaculares y fotogénicos de Andorra." },
    { name: "Parc natural de Sorteny", place: "El Serrat", category: "nature", lat: 42.5966, lon: 1.5334, note: "Naturaleza de alta montaña para dar profundidad a la ruta." },
    { name: "Refugi de Sorteny", place: "Sorteny", category: "restaurant", lat: 42.5977, lon: 1.5179, note: "Restaurante en pleno parque natural, muy potente para una parada de montaña." },
    { name: "Restaurant de la Coma d’Arcalís", place: "Arcalís", category: "restaurant", lat: 42.6332, lon: 1.4992, note: "Terraza de alta montaña muy alineada con el final más espectacular de la ruta." },
  ],
};

const stopLegendCategories: RouteStopCategory[] = ["restaurant", "viewpoint", "heritage", "nature", "motorsport"];

const driveExperienceModules = [
  {
    icon: Sparkles,
    title: {
      ca: "Route Concierge IA",
      es: "Route Concierge IA",
      fr: "Concierge IA des routes",
      en: "AI Route Concierge",
      pt: "Concierge IA de rotas",
      de: "KI-Route-Concierge",
      ru: "ИИ-консьерж маршрутов",
    },
    body: {
      ca: "Planifica una sortida segons cotxe, temps, ritme, restaurant i finestra òptima de llum.",
      es: "Planifica una salida según coche, tiempo, ritmo, restaurante y ventana óptima de luz.",
      fr: "Planifie une sortie selon la voiture, le temps, le rythme, le restaurant et la meilleure lumière.",
      en: "Plans a drive based on car, time, rhythm, restaurant and best light window.",
      pt: "Planeia uma saída segundo carro, tempo, ritmo, restaurante e melhor luz.",
      de: "Plant eine Ausfahrt nach Auto, Zeit, Rhythmus, Restaurant und bestem Lichtfenster.",
      ru: "Планирует выезд по машине, времени, ритму, ресторану и лучшему свету.",
    },
  },
  {
    icon: Crown,
    title: {
      ca: "Official Event Mode",
      es: "Official Event Mode",
      fr: "Official Event Mode",
      en: "Official Event Mode",
      pt: "Official Event Mode",
      de: "Official Event Mode",
      ru: "Official Event Mode",
    },
    body: {
      ca: "Briefing, punt de trobada, timing de convoy, QR d’event i operativa per a sortides oficials.",
      es: "Briefing, punto de encuentro, timing de convoy, QR de evento y operativa para salidas oficiales.",
      fr: "Briefing, point de rendez-vous, timing du convoi, QR d’événement et opération officielle.",
      en: "Briefing, meeting point, convoy timing, event QR and operations layer for official drives.",
      pt: "Briefing, ponto de encontro, timing do comboio, QR do evento e camada operacional.",
      de: "Briefing, Treffpunkt, Convoy-Timing, Event-QR und operative Ebene für offizielle Ausfahrten.",
      ru: "Брифинг, точка сбора, тайминг колонны, QR события и операционный слой для клубных выездов.",
    },
  },
  {
    icon: Map,
    title: {
      ca: "Route Atlas viu",
      es: "Route Atlas vivo",
      fr: "Atlas vivant des routes",
      en: "Live Route Atlas",
      pt: "Atlas vivo de rotas",
      de: "Lebendiger Routenatlas",
      ru: "Живой атлас маршрутов",
    },
    body: {
      ca: "Mapa premium, POIs, gastronomia, clima, ports i exportació completa a navegació externa.",
      es: "Mapa premium, POIs, gastronomía, clima, puertos y exportación completa a navegación externa.",
      fr: "Carte premium, POI, gastronomie, météo, cols et export complet vers la navigation externe.",
      en: "Premium mapping, POIs, gastronomy, weather, mountain passes and full export to external navigation.",
      pt: "Mapa premium, POIs, gastronomia, clima, portos e exportação completa para navegação externa.",
      de: "Premium-Karte, POIs, Gastronomie, Wetter, Pässe und kompletter Export in externe Navigation.",
      ru: "Премиальная карта, POI, гастрономия, погода, перевалы и полный экспорт во внешнюю навигацию.",
    },
  },
  {
    icon: CalendarRange,
    title: {
      ca: "Post-Drive Report",
      es: "Post-Drive Report",
      fr: "Post-Drive Report",
      en: "Post-Drive Report",
      pt: "Post-Drive Report",
      de: "Post-Drive Report",
      ru: "Post-Drive Report",
    },
    body: {
      ca: "Recap automàtic amb mapa final, highlights, galeria, parades i pàgina compartible de l’esdeveniment.",
      es: "Recap automático con mapa final, highlights, galería, paradas y página compartible del evento.",
      fr: "Récapitulatif automatique avec carte finale, highlights, galerie, arrêts et page partageable.",
      en: "Automatic recap with final map, highlights, gallery, stops and a shareable event page.",
      pt: "Recap automático com mapa final, highlights, galeria, paragens e página partilhável.",
      de: "Automatischer Recap mit finaler Karte, Highlights, Galerie, Stopps und teilbarer Event-Seite.",
      ru: "Автоматический recap с финальной картой, highlights, галереей, остановками и shareable-страницей.",
    },
  },
] as const;

const driveExperienceRoadmap = [
  {
    phase: "01",
    title: {
      ca: "Base premium de rutes",
      es: "Base premium de rutas",
      fr: "Base premium des routes",
      en: "Premium route base",
      pt: "Base premium de rotas",
      de: "Premium-Routenbasis",
      ru: "Премиальная база маршрутов",
    },
    body: {
      ca: "Tancar mapes, POIs, filtres, UX mòbil, exportació i narrativa editorial de cada ruta.",
      es: "Cerrar mapas, POIs, filtros, UX móvil, exportación y narrativa editorial de cada ruta.",
      fr: "Finaliser cartes, POI, filtres, UX mobile, export et narration éditoriale de chaque route.",
      en: "Finish maps, POIs, filters, mobile UX, exports and editorial storytelling for each route.",
      pt: "Fechar mapas, POIs, filtros, UX móvel, exportação e narrativa editorial de cada rota.",
      de: "Karten, POIs, Filter, Mobile-UX, Export und redaktionelles Storytelling pro Route abschließen.",
      ru: "Довести до конца карты, POI, фильтры, mobile UX, экспорт и редакторский слой каждой трассы.",
    },
  },
  {
    phase: "02",
    title: {
      ca: "Concierge + Event Mode",
      es: "Concierge + Event Mode",
      fr: "Concierge + Event Mode",
      en: "Concierge + Event Mode",
      pt: "Concierge + Event Mode",
      de: "Concierge + Event Mode",
      ru: "Concierge + Event Mode",
    },
    body: {
      ca: "Afegir assistent IA, briefings de sortida, pàgines d’event oficial i operativa per a convoys.",
      es: "Añadir asistente IA, briefings de salida, páginas de evento oficial y operativa para convoys.",
      fr: "Ajouter assistant IA, briefings de sortie, pages d’événement officiel et gestion des convois.",
      en: "Add the AI assistant, drive briefings, official event pages and convoy operations.",
      pt: "Adicionar assistente IA, briefings de saída, páginas de evento oficial e operativa de comboios.",
      de: "KI-Assistent, Drive-Briefings, offizielle Event-Seiten und Convoy-Operations ergänzen.",
      ru: "Добавить ИИ-ассистента, брифинги, страницы официальных выездов и механику колонн.",
    },
  },
  {
    phase: "03",
    title: {
      ca: "BMW Alpine Intelligence",
      es: "BMW Alpine Intelligence",
      fr: "BMW Alpine Intelligence",
      en: "BMW Alpine Intelligence",
      pt: "BMW Alpine Intelligence",
      de: "BMW Alpine Intelligence",
      ru: "BMW Alpine Intelligence",
    },
    body: {
      ca: "Recomanació dinàmica segons clima, llum, altitud, vehicle, temporada i objectiu de la sortida.",
      es: "Recomendación dinámica según clima, luz, altitud, vehículo, temporada y objetivo de la salida.",
      fr: "Recommandation dynamique selon météo, lumière, altitude, véhicule, saison et objectif de la sortie.",
      en: "Dynamic recommendation layer based on weather, light, altitude, vehicle, season and drive goal.",
      pt: "Recomendação dinâmica segundo clima, luz, altitude, veículo, estação e objetivo da saída.",
      de: "Dynamische Empfehlung nach Wetter, Licht, Höhe, Fahrzeug, Saison und Fahrziel.",
      ru: "Динамические рекомендации по погоде, свету, высоте, машине, сезону и цели выезда.",
    },
  },
] as const;

const bmwValueProps = [
  {
    icon: ShieldCheck,
    title: {
      ca: "Experiència de marca reutilitzable",
      es: "Experiencia de marca reutilizable",
      fr: "Expérience de marque réutilisable",
      en: "Reusable brand experience",
      pt: "Experiência de marca reutilizável",
      de: "Wiederverwendbares Markenerlebnis",
      ru: "Переиспользуемый бренд-опыт",
    },
  },
  {
    icon: Crown,
    title: {
      ca: "Activable per concessionari o llançament",
      es: "Activable para concesionario o lanzamiento",
      fr: "Activable pour concessionnaire ou lancement",
      en: "Activatable for dealers or launches",
      pt: "Ativável para concessionário ou lançamento",
      de: "Für Händler oder Launches aktivierbar",
      ru: "Подходит для дилеров и запусков",
    },
  },
  {
    icon: Route,
    title: {
      ca: "Exportable a altres territoris BMW",
      es: "Exportable a otros territorios BMW",
      fr: "Exportable à d’autres territoires BMW",
      en: "Exportable to other BMW territories",
      pt: "Exportável para outros territórios BMW",
      de: "Auf andere BMW-Territorien übertragbar",
      ru: "Масштабируемо на другие территории BMW",
    },
  },
] as const;

const driveExperienceShowcase = {
  eyebrow: {
    ca: "Fase 1 en producte",
    es: "Fase 1 en producto",
    fr: "Phase 1 produit",
    en: "Phase 1 in product",
    pt: "Fase 1 em produto",
    de: "Phase 1 im Produkt",
    ru: "Фаза 1 в продукте",
  },
  title: {
    ca: "Així hauria de començar a sentir-se la plataforma del club.",
    es: "Así debería empezar a sentirse la plataforma del club.",
    fr: "Voilà comment la plateforme du club devrait commencer à se sentir.",
    en: "This is how the club platform should start to feel.",
    pt: "É assim que a plataforma do clube deve começar a sentir-se.",
    de: "So sollte sich die Club-Plattform langsam anfühlen.",
    ru: "Именно так должна начать ощущаться платформа клуба.",
  },
  intro: {
    ca: "Tres superfícies reals per passar de pàgina informativa a experiència BMW viva.",
    es: "Tres superficies reales para pasar de página informativa a experiencia BMW viva.",
    fr: "Trois surfaces concrètes pour passer d’une page informative à une expérience BMW vivante.",
    en: "Three real surfaces to move from an informative page to a live BMW experience.",
    pt: "Três superfícies reais para passar de página informativa a experiência BMW viva.",
    de: "Drei reale Flächen, um von einer Informationsseite zu einem lebendigen BMW-Erlebnis zu kommen.",
    ru: "Три реальные поверхности, чтобы перейти от информационной страницы к живому BMW-опыту.",
  },
} as const;

const conciergePrototype = {
  title: {
    ca: "Route Concierge IA",
    es: "Route Concierge IA",
    fr: "Concierge IA des routes",
    en: "AI Route Concierge",
    pt: "Concierge IA de rotas",
    de: "KI-Route-Concierge",
    ru: "ИИ-консьерж маршрутов",
  },
  prompt: {
    ca: "Vull una ruta BMW de 3 hores, amb bon asfalt, parada gourmet i mirador fort per a fotos.",
    es: "Quiero una ruta BMW de 3 horas, con buen asfalto, parada gourmet y mirador potente para fotos.",
    fr: "Je veux une route BMW de 3 heures, bon asphalte, arrêt gourmand et grand point photo.",
    en: "I want a 3-hour BMW route with good tarmac, a gourmet stop and a strong viewpoint for photos.",
    pt: "Quero uma rota BMW de 3 horas, bom asfalto, paragem gourmet e miradouro forte para fotos.",
    de: "Ich will eine 3-Stunden-BMW-Route mit gutem Asphalt, Gourmet-Stopp und starkem Aussichtspunkt für Fotos.",
    ru: "Хочу BMW-маршрут на 3 часа: хороший асфальт, gourmet-остановка и сильная фототочка.",
  },
  answer: {
    ca: "Resposta ideal: Grand Tour Central, sortida 18:10, Engolasters + Roc del Quer + sopar a Meritxell.",
    es: "Respuesta ideal: Grand Tour Central, salida 18:10, Engolasters + Roc del Quer + cena en Meritxell.",
    fr: "Réponse idéale : Grand Tour Central, départ 18h10, Engolasters + Roc del Quer + dîner à Meritxell.",
    en: "Ideal answer: Grand Tour Central, 18:10 departure, Engolasters + Roc del Quer + dinner in Meritxell.",
    pt: "Resposta ideal: Grand Tour Central, saída 18:10, Engolasters + Roc del Quer + jantar em Meritxell.",
    de: "Ideale Antwort: Grand Tour Central, Start 18:10, Engolasters + Roc del Quer + Dinner in Meritxell.",
    ru: "Идеальный ответ: Grand Tour Central, выезд 18:10, Engolasters + Roc del Quer + ужин в Meritxell.",
  },
  chips: {
    ca: ["BMW M", "Gourmet", "Golden hour"],
    es: ["BMW M", "Gourmet", "Golden hour"],
    fr: ["BMW M", "Gourmet", "Golden hour"],
    en: ["BMW M", "Gourmet", "Golden hour"],
    pt: ["BMW M", "Gourmet", "Golden hour"],
    de: ["BMW M", "Gourmet", "Golden hour"],
    ru: ["BMW M", "Gourmet", "Golden hour"],
  },
} as const;

const eventModePrototype = {
  title: {
    ca: "Official Event Mode",
    es: "Official Event Mode",
    fr: "Official Event Mode",
    en: "Official Event Mode",
    pt: "Official Event Mode",
    de: "Official Event Mode",
    ru: "Official Event Mode",
  },
  items: {
    ca: ["08:30 Check-in i cafè", "09:00 Briefing + QR de ruta", "09:20 Sortida del convoy", "11:00 Mirador / foto oficial"],
    es: ["08:30 Check-in y café", "09:00 Briefing + QR de ruta", "09:20 Salida del convoy", "11:00 Mirador / foto oficial"],
    fr: ["08:30 Check-in et café", "09:00 Briefing + QR de route", "09:20 Départ du convoi", "11:00 Belvédère / photo officielle"],
    en: ["08:30 Check-in and coffee", "09:00 Briefing + route QR", "09:20 Convoy departure", "11:00 Viewpoint / official photo"],
    pt: ["08:30 Check-in e café", "09:00 Briefing + QR da rota", "09:20 Saída do comboio", "11:00 Miradouro / foto oficial"],
    de: ["08:30 Check-in und Kaffee", "09:00 Briefing + Routen-QR", "09:20 Start des Konvois", "11:00 Aussichtspunkt / offizielles Foto"],
    ru: ["08:30 Check-in и кофе", "09:00 Брифинг + QR маршрута", "09:20 Старт колонны", "11:00 Мирадор / официальное фото"],
  },
} as const;

const recapPrototype = {
  title: {
    ca: "Post-Drive Report",
    es: "Post-Drive Report",
    fr: "Post-Drive Report",
    en: "Post-Drive Report",
    pt: "Post-Drive Report",
    de: "Post-Drive Report",
    ru: "Post-Drive Report",
  },
  stats: {
    ca: ["26 cotxes", "4 parades", "183 fotos", "1 pàgina shareable"],
    es: ["26 coches", "4 paradas", "183 fotos", "1 página shareable"],
    fr: ["26 voitures", "4 arrêts", "183 photos", "1 page partageable"],
    en: ["26 cars", "4 stops", "183 photos", "1 shareable page"],
    pt: ["26 carros", "4 paragens", "183 fotos", "1 página partilhável"],
    de: ["26 Autos", "4 Stopps", "183 Fotos", "1 teilbare Seite"],
    ru: ["26 машин", "4 остановки", "183 фото", "1 shareable-страница"],
  },
} as const;

type ConciergeDuration = "short" | "halfday" | "alpine";
type ConciergeVehicle = "touring" | "mperformance" | "motorcycle" | "electric";
type ConciergeMood = "scenic" | "dynamic" | "official";
type ConciergeFood = "signature" | "mountain" | "light";

type EventModeData = {
  meetingPoint: Record<LanguageCode, string>;
  coffee: Record<LanguageCode, string>;
  convoyNote: Record<LanguageCode, string>;
  participants: number;
  guestCars: number;
  timeline: Array<{ time: string; label: Record<LanguageCode, string> }>;
  checklist: Record<LanguageCode, string[]>;
};

type PostDriveReportData = {
  summary: Record<LanguageCode, string>;
  stats: Array<{ value: string; label: Record<LanguageCode, string> }>;
  highlights: Record<LanguageCode, string[]>;
  assets: Record<LanguageCode, string[]>;
};

const conciergeUi = {
  title: {
    ca: "Concierge interactiu",
    es: "Concierge interactivo",
    fr: "Concierge interactif",
    en: "Interactive concierge",
    pt: "Concierge interativo",
    de: "Interaktiver Concierge",
    ru: "Интерактивный concierge",
  },
  intro: {
    ca: "Tria el tipus de sortida i et recomana una ruta real del club.",
    es: "Elige el tipo de salida y te recomienda una ruta real del club.",
    fr: "Choisissez le type de sortie et le système recommande une vraie route du club.",
    en: "Choose the kind of drive and the system recommends a real club route.",
    pt: "Escolhe o tipo de saída e o sistema recomenda uma rota real do clube.",
    de: "Wähle den Ausfahrtstyp und das System empfiehlt eine echte Club-Route.",
    ru: "Выберите тип выезда, и система порекомендует реальный маршрут клуба.",
  },
  duration: {
    ca: "Durada",
    es: "Duración",
    fr: "Durée",
    en: "Duration",
    pt: "Duração",
    de: "Dauer",
    ru: "Длительность",
  },
  vehicle: {
    ca: "Vehicle",
    es: "Vehículo",
    fr: "Véhicule",
    en: "Vehicle",
    pt: "Veículo",
    de: "Fahrzeug",
    ru: "Автомобиль",
  },
  mood: {
    ca: "Mood",
    es: "Mood",
    fr: "Mood",
    en: "Mood",
    pt: "Mood",
    de: "Mood",
    ru: "Mood",
  },
  food: {
    ca: "Parada",
    es: "Parada",
    fr: "Arrêt",
    en: "Stop style",
    pt: "Paragem",
    de: "Stopp",
    ru: "Остановка",
  },
  recommendation: {
    ca: "Recomanació actual",
    es: "Recomendación actual",
    fr: "Recommandation actuelle",
    en: "Current recommendation",
    pt: "Recomendação atual",
    de: "Aktuelle Empfehlung",
    ru: "Текущая рекомендация",
  },
  why: {
    ca: "Per què encaixa",
    es: "Por qué encaja",
    fr: "Pourquoi ça colle",
    en: "Why it fits",
    pt: "Porque encaixa",
    de: "Warum es passt",
    ru: "Почему подходит",
  },
} as const;

const conciergeOptions = {
  duration: [
    { id: "short", label: { ca: "2-3 h", es: "2-3 h", fr: "2-3 h", en: "2-3 h", pt: "2-3 h", de: "2-3 h", ru: "2-3 ч" } },
    { id: "halfday", label: { ca: "3-4 h", es: "3-4 h", fr: "3-4 h", en: "3-4 h", pt: "3-4 h", de: "3-4 h", ru: "3-4 ч" } },
    { id: "alpine", label: { ca: "Alta muntanya", es: "Alta montaña", fr: "Haute montagne", en: "High alpine", pt: "Alta montanha", de: "Hochalpin", ru: "Высокогорье" } },
  ],
  vehicle: [
    { id: "touring", label: { ca: "Touring", es: "Touring", fr: "Touring", en: "Touring", pt: "Touring", de: "Touring", ru: "Touring" } },
    { id: "mperformance", label: { ca: "M / dinàmic", es: "M / dinámico", fr: "M / dynamique", en: "M / dynamic", pt: "M / dinâmico", de: "M / dynamisch", ru: "M / динамика" } },
    { id: "motorcycle", label: { ca: "Moto", es: "Moto", fr: "Moto", en: "Motorcycle", pt: "Moto", de: "Motorrad", ru: "Мото" } },
    { id: "electric", label: { ca: "BMW elèctric", es: "BMW eléctrico", fr: "BMW électrique", en: "Electric BMW", pt: "BMW elétrico", de: "Elektrischer BMW", ru: "Электрический BMW" } },
  ],
  mood: [
    { id: "scenic", label: { ca: "Panoràmic", es: "Panorámico", fr: "Panoramique", en: "Scenic", pt: "Panorâmico", de: "Panoramisch", ru: "Панорамный" } },
    { id: "dynamic", label: { ca: "Carretera amb ritme", es: "Carretera con ritmo", fr: "Route rythmée", en: "Dynamic road", pt: "Estrada com ritmo", de: "Straße mit Rhythmus", ru: "Дорога с ритмом" } },
    { id: "official", label: { ca: "Sortida oficial", es: "Salida oficial", fr: "Sortie officielle", en: "Official outing", pt: "Saída oficial", de: "Offizielle Ausfahrt", ru: "Официальный выезд" } },
  ],
  food: [
    { id: "signature", label: { ca: "Gourmet", es: "Gourmet", fr: "Gourmet", en: "Gourmet", pt: "Gourmet", de: "Gourmet", ru: "Gourmet" } },
    { id: "mountain", label: { ca: "Borda de muntanya", es: "Borda de montaña", fr: "Table de montagne", en: "Mountain table", pt: "Borda de montanha", de: "Bergrestaurant", ru: "Горная кухня" } },
    { id: "light", label: { ca: "Parada ràpida", es: "Parada rápida", fr: "Arrêt rapide", en: "Quick stop", pt: "Paragem rápida", de: "Schneller Stopp", ru: "Быстрая остановка" } },
  ],
} as const;

const conciergeRouteFit: Record<string, { duration: ConciergeDuration[]; vehicle: ConciergeVehicle[]; mood: ConciergeMood[]; food: ConciergeFood[]; why: Record<LanguageCode, string> }> = {
  "grand-tour-central": {
    duration: ["halfday"],
    vehicle: ["touring", "electric"],
    mood: ["scenic", "official"],
    food: ["signature", "light"],
    why: {
      ca: "És la ruta més elegant i equilibrada del catàleg: vista, vall oberta, punts fotogènics i molt bon encaix per a club o touring premium.",
      es: "Es la ruta más elegante y equilibrada del catálogo: vista, valle abierto, puntos fotogénicos y muy buen encaje para club o touring premium.",
      fr: "C’est la route la plus élégante et équilibrée du catalogue : panorama, vallée ouverte, arrêts photogéniques et fort potentiel club.",
      en: "It is the most elegant and balanced route in the catalogue: panoramic, photogenic and especially strong for premium touring or club use.",
      pt: "É a rota mais elegante e equilibrada do catálogo: panorâmica, fotogénica e muito forte para touring premium ou clube.",
      de: "Die eleganteste und ausgewogenste Route im Katalog: Panorama, fotogene Stopps und sehr stark für Touring oder Clubformat.",
      ru: "Самый элегантный и сбалансированный маршрут: панорамы, фототочки и отличный вариант для клуба или touring.",
    },
  },
  "west-viewpoints-loop": {
    duration: ["short"],
    vehicle: ["mperformance", "motorcycle"],
    mood: ["dynamic"],
    food: ["mountain", "light"],
    why: {
      ca: "Ruta curta i intensa, ideal quan vols xassís, revolts nets i una parada de muntanya sense convertir-ho en jornada llarga.",
      es: "Ruta corta e intensa, ideal cuando quieres chasis, curvas limpias y una parada de montaña sin convertirlo en jornada larga.",
      fr: "Route courte et intense, parfaite si vous voulez du châssis, des virages nets et un arrêt montagne sans journée complète.",
      en: "Short and intense, ideal when you want chassis feel, clean bends and a mountain stop without committing to a full day.",
      pt: "Rota curta e intensa, ideal quando queres chassis, curvas limpas e uma paragem de montanha sem um dia inteiro.",
      de: "Kurz und intensiv, ideal für Fahrwerk, saubere Kurven und einen Bergstopp ohne Ganztageseinsatz.",
      ru: "Короткий и интенсивный маршрут: шасси, чистые повороты и горная остановка без полного дня.",
    },
  },
  "envalira-high-mountain": {
    duration: ["alpine", "halfday"],
    vehicle: ["motorcycle", "mperformance"],
    mood: ["dynamic", "scenic"],
    food: ["mountain", "light"],
    why: {
      ca: "La proposta més alpina i més extrema: port, cota alta, caràcter motor i sensació clara d’experiència de muntanya BMW.",
      es: "La propuesta más alpina y más extrema: puerto, cota alta, carácter motor y sensación clara de experiencia de montaña BMW.",
      fr: "La proposition la plus alpine et la plus extrême : col, haute altitude, caractère moteur et vraie sensation BMW en montagne.",
      en: "The most alpine and most extreme proposal: high pass, altitude, motorsport flavour and a clear BMW mountain experience feel.",
      pt: "A proposta mais alpina e mais extrema: porto, altitude, carácter motor e clara experiência BMW de montanha.",
      de: "Die alpinste und extremste Variante: Pass, Höhe, Motor-Charakter und klares BMW-Berggefühl.",
      ru: "Самая альпийская и экстремальная идея: перевал, высота, моторный характер и яркий BMW-опыт в горах.",
    },
  },
  "ordino-tristaina-touring": {
    duration: ["alpine", "halfday"],
    vehicle: ["touring", "electric"],
    mood: ["scenic", "official"],
    food: ["signature", "mountain"],
    why: {
      ca: "És la ruta més premium en paisatge i atmosfera: Ordino, Sorteny i Tristaina donen un final molt fort i molt presentable.",
      es: "Es la ruta más premium en paisaje y atmósfera: Ordino, Sorteny y Tristaina dan un final muy fuerte y muy presentable.",
      fr: "C’est la route la plus premium en paysage et en atmosphère : Ordino, Sorteny et Tristaina offrent une finale très présentable.",
      en: "It is the most premium in atmosphere and scenery: Ordino, Sorteny and Tristaina deliver a very strong, very presentable finish.",
      pt: "É a rota mais premium em paisagem e atmosfera: Ordino, Sorteny e Tristaina dão um final muito forte e apresentável.",
      de: "Die premiumhafteste Route in Landschaft und Atmosphäre: Ordino, Sorteny und Tristaina liefern ein starkes Finale.",
      ru: "Самый премиальный маршрут по атмосфере и пейзажу: Ordino, Sorteny и Tristaina дают очень сильный финал.",
    },
  },
};

const eventModeUi = {
  eyebrow: {
    ca: "Official Event Mode real",
    es: "Official Event Mode real",
    fr: "Official Event Mode réel",
    en: "Real Official Event Mode",
    pt: "Official Event Mode real",
    de: "Echter Official Event Mode",
    ru: "Реальный Official Event Mode",
  },
  title: {
    ca: "Una sortida oficial del club ja hauria de veure’s així.",
    es: "Una salida oficial del club ya debería verse así.",
    fr: "Une sortie officielle du club devrait déjà se voir comme ça.",
    en: "This is how an official club outing should already look.",
    pt: "Uma saída oficial do clube já deveria ver-se assim.",
    de: "So sollte eine offizielle Club-Ausfahrt bereits aussehen.",
    ru: "Именно так уже должен выглядеть официальный выезд клуба.",
  },
  intro: {
    ca: "Selector de ruta, punt de trobada, timing, briefing i operativa mínima per portar una sortida de nivell.",
    es: "Selector de ruta, punto de encuentro, timing, briefing y operativa mínima para llevar una salida con nivel.",
    fr: "Sélecteur de route, point de rendez-vous, timing, briefing et base opérationnelle pour une vraie sortie premium.",
    en: "Route selector, meeting point, timing, briefing and the minimum operations layer for a serious premium outing.",
    pt: "Seletor de rota, ponto de encontro, timing, briefing e camada mínima de operação para uma saída premium.",
    de: "Routenwahl, Treffpunkt, Timing, Briefing und minimale Operations-Schicht für eine hochwertige Ausfahrt.",
    ru: "Выбор маршрута, точка сбора, тайминг, брифинг и минимальный операционный слой для премиального выезда.",
  },
  selectRoute: {
    ca: "Sortida activa",
    es: "Salida activa",
    fr: "Sortie active",
    en: "Active outing",
    pt: "Saída ativa",
    de: "Aktive Ausfahrt",
    ru: "Активный выезд",
  },
  meetingPoint: {
    ca: "Punt de trobada",
    es: "Punto de encuentro",
    fr: "Point de rendez-vous",
    en: "Meeting point",
    pt: "Ponto de encontro",
    de: "Treffpunkt",
    ru: "Точка сбора",
  },
  coffee: {
    ca: "Coffee point",
    es: "Coffee point",
    fr: "Coffee point",
    en: "Coffee point",
    pt: "Coffee point",
    de: "Coffee point",
    ru: "Coffee point",
  },
  participants: {
    ca: "Cotxes previstos",
    es: "Coches previstos",
    fr: "Voitures prévues",
    en: "Expected cars",
    pt: "Carros previstos",
    de: "Erwartete Autos",
    ru: "Ожидаемые машины",
  },
  guestCars: {
    ca: "Guest cars",
    es: "Guest cars",
    fr: "Guest cars",
    en: "Guest cars",
    pt: "Guest cars",
    de: "Guest cars",
    ru: "Guest cars",
  },
  timeline: {
    ca: "Timeline de la sortida",
    es: "Timeline de la salida",
    fr: "Timeline de la sortie",
    en: "Outing timeline",
    pt: "Timeline da saída",
    de: "Zeitplan der Ausfahrt",
    ru: "Таймлайн выезда",
  },
  briefing: {
    ca: "Briefing de convoy",
    es: "Briefing de convoy",
    fr: "Briefing du convoi",
    en: "Convoy briefing",
    pt: "Briefing do comboio",
    de: "Convoy-Briefing",
    ru: "Брифинг колонны",
  },
  requestEvent: {
    ca: "Demanar aquesta sortida",
    es: "Solicitar esta salida",
    fr: "Demander cette sortie",
    en: "Request this outing",
    pt: "Pedir esta saída",
    de: "Diese Ausfahrt anfragen",
    ru: "Запросить этот выезд",
  },
} as const;

const eventModeByRouteId: Record<string, EventModeData> = {
  "grand-tour-central": {
    meetingPoint: {
      ca: "Andorra la Vella, aparcament Prada Casadet",
      es: "Andorra la Vella, aparcamiento Prada Casadet",
      fr: "Andorre-la-Vieille, parking Prada Casadet",
      en: "Andorra la Vella, Prada Casadet parking",
      pt: "Andorra-a-Velha, parque Prada Casadet",
      de: "Andorra la Vella, Parkplatz Prada Casadet",
      ru: "Andorra la Vella, парковка Prada Casadet",
    },
    coffee: {
      ca: "Coffee point: centre d’Andorra la Vella abans de pujar a Engolasters.",
      es: "Coffee point: centro de Andorra la Vella antes de subir a Engolasters.",
      fr: "Coffee point : centre d’Andorre-la-Vieille avant la montée vers Engolasters.",
      en: "Coffee point: central Andorra la Vella before climbing to Engolasters.",
      pt: "Coffee point: centro de Andorra la Vella antes de subir a Engolasters.",
      de: "Coffee point: Zentrum von Andorra la Vella vor dem Anstieg nach Engolasters.",
      ru: "Coffee point: центр Andorra la Vella перед подъемом на Engolasters.",
    },
    convoyNote: {
      ca: "Ruta elegant per a 20-30 cotxes, molt adequada per a una sortida oficial neta, amb foto i sopar premium.",
      es: "Ruta elegante para 20-30 coches, muy adecuada para una salida oficial limpia, con foto y cena premium.",
      fr: "Route élégante pour 20-30 voitures, parfaite pour une sortie officielle propre avec photo et dîner premium.",
      en: "Elegant route for 20-30 cars, ideal for a clean official outing with photo stop and premium dinner.",
      pt: "Rota elegante para 20-30 carros, muito adequada para uma saída oficial com foto e jantar premium.",
      de: "Elegante Route für 20-30 Autos, ideal für eine saubere offizielle Ausfahrt mit Fotostopp und Premium-Dinner.",
      ru: "Элегантный маршрут для 20-30 машин, идеален для официального выезда с фотостопом и premium-ужином.",
    },
    participants: 24,
    guestCars: 5,
    timeline: [
      { time: "08:30", label: { ca: "Check-in i cafè", es: "Check-in y café", fr: "Check-in et café", en: "Check-in and coffee", pt: "Check-in e café", de: "Check-in und Kaffee", ru: "Check-in и кофе" } },
      { time: "09:00", label: { ca: "Briefing i QR de ruta", es: "Briefing y QR de ruta", fr: "Briefing et QR de route", en: "Briefing and route QR", pt: "Briefing e QR da rota", de: "Briefing und Routen-QR", ru: "Брифинг и QR маршрута" } },
      { time: "10:10", label: { ca: "Mirador a Engolasters", es: "Mirador en Engolasters", fr: "Belvédère à Engolasters", en: "Viewpoint at Engolasters", pt: "Miradouro em Engolasters", de: "Aussichtspunkt in Engolasters", ru: "Мирадор в Engolasters" } },
      { time: "13:20", label: { ca: "Dinar premium a Meritxell", es: "Comida premium en Meritxell", fr: "Déjeuner premium à Meritxell", en: "Premium lunch in Meritxell", pt: "Almoço premium em Meritxell", de: "Premium-Lunch in Meritxell", ru: "Premium-обед в Meritxell" } },
    ],
    checklist: {
      ca: ["Briefing curt de radio i gaps", "Cotxe guia + cotxe tancament", "QR de ruta compartit abans de sortir"],
      es: ["Briefing corto de radio y gaps", "Coche guía + coche cierre", "QR de ruta compartido antes de salir"],
      fr: ["Briefing court radio et gaps", "Voiture guide + voiture balai", "QR de route partagé avant le départ"],
      en: ["Short radio and gap briefing", "Lead car + sweep car", "Route QR shared before departure"],
      pt: ["Briefing curto de rádio e gaps", "Carro guia + carro fecho", "QR da rota partilhado antes da saída"],
      de: ["Kurzes Funk- und Gap-Briefing", "Lead Car + Sweep Car", "Routen-QR vor Abfahrt teilen"],
      ru: ["Короткий брифинг по радио и дистанциям", "Ведущий + замыкающий автомобиль", "QR маршрута отправлен до старта"],
    },
  },
  "west-viewpoints-loop": {
    meetingPoint: {
      ca: "La Massana, telecabina i plaça central",
      es: "La Massana, telecabina y plaza central",
      fr: "La Massana, télécabine et place centrale",
      en: "La Massana, gondola station and central square",
      pt: "La Massana, telecabine e praça central",
      de: "La Massana, Gondelstation und zentraler Platz",
      ru: "La Massana, телекабина и центральная площадь",
    },
    coffee: {
      ca: "Coffee point: arrencada ràpida per a una sortida curta i intensa.",
      es: "Coffee point: arranque rápido para una salida corta e intensa.",
      fr: "Coffee point : départ rapide pour une sortie courte et intense.",
      en: "Coffee point: quick launch for a short, intense outing.",
      pt: "Coffee point: arranque rápido para uma saída curta e intensa.",
      de: "Coffee point: schneller Start für eine kurze intensive Ausfahrt.",
      ru: "Coffee point: быстрый старт для короткого и интенсивного выезда.",
    },
    convoyNote: {
      ca: "Ideal per a una activació curta, amb menys logística i molta recompensa visual i dinàmica.",
      es: "Ideal para una activación corta, con menos logística y mucha recompensa visual y dinámica.",
      fr: "Idéal pour une activation courte, avec moins de logistique et beaucoup de retour visuel et dynamique.",
      en: "Ideal for a short activation with lighter logistics and strong visual and dynamic payoff.",
      pt: "Ideal para uma ativação curta, com menos logística e grande retorno visual e dinâmico.",
      de: "Ideal für eine kurze Aktivierung mit weniger Logistik und starkem visuellen sowie fahrdynamischen Effekt.",
      ru: "Идеально для короткой активации: меньше логистики, больше визуальной и динамической отдачи.",
    },
    participants: 16,
    guestCars: 3,
    timeline: [
      { time: "09:00", label: { ca: "Meet & coffee", es: "Meet & coffee", fr: "Meet & coffee", en: "Meet & coffee", pt: "Meet & coffee", de: "Meet & coffee", ru: "Meet & coffee" } },
      { time: "09:30", label: { ca: "Briefing curt", es: "Briefing corto", fr: "Briefing court", en: "Short briefing", pt: "Briefing curto", de: "Kurzes Briefing", ru: "Короткий брифинг" } },
      { time: "10:10", label: { ca: "Parada foto a Coll de la Botella", es: "Parada foto en Coll de la Botella", fr: "Stop photo au Coll de la Botella", en: "Photo stop at Coll de la Botella", pt: "Paragem foto no Coll de la Botella", de: "Fotostopp am Coll de la Botella", ru: "Фотостоп на Coll de la Botella" } },
      { time: "11:45", label: { ca: "Brunch de muntanya", es: "Brunch de montaña", fr: "Brunch montagne", en: "Mountain brunch", pt: "Brunch de montanha", de: "Mountain-Brunch", ru: "Горный brunch" } },
    ],
    checklist: {
      ca: ["Grups més petits i àgils", "Control de gaps en tram de baixada", "Parada foto ràpida coordinada"],
      es: ["Grupos más pequeños y ágiles", "Control de gaps en tramo de bajada", "Parada foto rápida coordinada"],
      fr: ["Groupes plus petits et agiles", "Contrôle des gaps en descente", "Stop photo rapide coordonné"],
      en: ["Smaller agile groups", "Gap control on the descent", "Coordinated quick photo stop"],
      pt: ["Grupos menores e ágeis", "Controlo de gaps na descida", "Paragem foto rápida coordenada"],
      de: ["Kleinere agile Gruppen", "Gap-Kontrolle bergab", "Koordinierter schneller Fotostopp"],
      ru: ["Небольшие быстрые группы", "Контроль дистанции на спуске", "Координированный быстрый фотостоп"],
    },
  },
  "envalira-high-mountain": {
    meetingPoint: {
      ca: "Encamp, punt de trobada abans de pujar cap a Grau Roig",
      es: "Encamp, punto de encuentro antes de subir hacia Grau Roig",
      fr: "Encamp, point de rendez-vous avant la montée vers Grau Roig",
      en: "Encamp, meeting point before climbing toward Grau Roig",
      pt: "Encamp, ponto de encontro antes da subida para Grau Roig",
      de: "Encamp, Treffpunkt vor dem Anstieg nach Grau Roig",
      ru: "Encamp, точка сбора перед подъемом к Grau Roig",
    },
    coffee: {
      ca: "Coffee point: base baixa abans del tram alpí.",
      es: "Coffee point: base baja antes del tramo alpino.",
      fr: "Coffee point : base basse avant la section alpine.",
      en: "Coffee point: lower base before the alpine section.",
      pt: "Coffee point: base baixa antes do tramo alpino.",
      de: "Coffee point: tieferer Ausgangspunkt vor dem alpinen Abschnitt.",
      ru: "Coffee point: нижняя база перед альпийским участком.",
    },
    convoyNote: {
      ca: "Només per a dies clars i grups molt ordenats: és la versió més espectacular però també la més sensible a clima i trànsit.",
      es: "Solo para días claros y grupos muy ordenados: es la versión más espectacular pero también la más sensible a clima y tráfico.",
      fr: "Seulement pour jours clairs et groupes ordonnés : c’est la version la plus spectaculaire mais aussi la plus sensible à la météo.",
      en: "For clear days and orderly groups only: the most spectacular version, but also the most weather-sensitive.",
      pt: "Só para dias claros e grupos muito ordenados: é a versão mais espetacular, mas também a mais sensível ao clima.",
      de: "Nur für klare Tage und geordnete Gruppen: spektakulärste Variante, aber auch am empfindlichsten für Wetter und Verkehr.",
      ru: "Только для ясных дней и дисциплинированных групп: самая эффектная, но и самая чувствительная к погоде версия.",
    },
    participants: 12,
    guestCars: 2,
    timeline: [
      { time: "08:45", label: { ca: "Check d’equipament", es: "Check de equipamiento", fr: "Check équipement", en: "Equipment check", pt: "Check de equipamento", de: "Equipment-Check", ru: "Проверка экипировки" } },
      { time: "09:15", label: { ca: "Sortida cap a Grau Roig", es: "Salida hacia Grau Roig", fr: "Départ vers Grau Roig", en: "Departure to Grau Roig", pt: "Saída para Grau Roig", de: "Abfahrt nach Grau Roig", ru: "Выезд в Grau Roig" } },
      { time: "10:30", label: { ca: "Foto alta a Envalira", es: "Foto alta en Envalira", fr: "Photo haute à Envalira", en: "High-altitude photo at Envalira", pt: "Foto alta em Envalira", de: "Hochgebirgsfoto in Envalira", ru: "Высотное фото на Envalira" } },
      { time: "12:30", label: { ca: "Parada mountain lunch", es: "Parada mountain lunch", fr: "Pause mountain lunch", en: "Mountain lunch stop", pt: "Paragem mountain lunch", de: "Mountain-Lunch-Stopp", ru: "Горный lunch-стоп" } },
    ],
    checklist: {
      ca: ["Meteorologia validada el mateix matí", "Ordre de sortida definit", "Punts de reagrupament clars"],
      es: ["Meteorología validada la misma mañana", "Orden de salida definido", "Puntos de reagrupación claros"],
      fr: ["Météo validée le matin même", "Ordre de départ défini", "Points de regroupement clairs"],
      en: ["Weather validated that same morning", "Defined departure order", "Clear regroup points"],
      pt: ["Meteorologia validada na mesma manhã", "Ordem de saída definida", "Pontos claros de reagrupamento"],
      de: ["Wetter am selben Morgen validiert", "Abfahrtsreihenfolge definiert", "Klare Sammelpunkte"],
      ru: ["Погода проверена утром", "Определен порядок старта", "Понятные точки сбора"],
    },
  },
  "ordino-tristaina-touring": {
    meetingPoint: {
      ca: "Ordino, centre històric i aparcament principal",
      es: "Ordino, centro histórico y aparcamiento principal",
      fr: "Ordino, centre historique et parking principal",
      en: "Ordino, historic center and main parking",
      pt: "Ordino, centro histórico e estacionamento principal",
      de: "Ordino, historisches Zentrum und Hauptparkplatz",
      ru: "Ordino, исторический центр и главная парковка",
    },
    coffee: {
      ca: "Coffee point: arrencada elegant al nucli d’Ordino.",
      es: "Coffee point: arranque elegante en el núcleo de Ordino.",
      fr: "Coffee point : départ élégant dans le cœur d’Ordino.",
      en: "Coffee point: elegant launch in the heart of Ordino.",
      pt: "Coffee point: arranque elegante no núcleo de Ordino.",
      de: "Coffee point: eleganter Start im Herzen von Ordino.",
      ru: "Coffee point: элегантный старт в центре Ordino.",
    },
    convoyNote: {
      ca: "La versió més presentable per a hospitality premium: paisatge, patrimoni, alta muntanya i bon final gastronòmic.",
      es: "La versión más presentable para hospitality premium: paisaje, patrimonio, alta montaña y buen final gastronómico.",
      fr: "La version la plus présentable pour une hospitality premium : paysage, patrimoine, haute montagne et finale gastronomique.",
      en: "The most presentable version for premium hospitality: scenery, heritage, alpine character and a strong gastronomic finish.",
      pt: "A versão mais apresentável para hospitality premium: paisagem, património, alta montanha e final gastronómico forte.",
      de: "Die präsentabelste Version für Premium-Hospitality: Landschaft, Heritage, Hochgebirge und starkes gastronomisches Finale.",
      ru: "Самая презентабельная версия для premium hospitality: пейзаж, heritage, высокогорье и сильный гастрономический финал.",
    },
    participants: 18,
    guestCars: 4,
    timeline: [
      { time: "08:40", label: { ca: "Check-in a Ordino", es: "Check-in en Ordino", fr: "Check-in à Ordino", en: "Check-in in Ordino", pt: "Check-in em Ordino", de: "Check-in in Ordino", ru: "Check-in в Ordino" } },
      { time: "09:10", label: { ca: "Briefing de ruta i safety", es: "Briefing de ruta y safety", fr: "Briefing route et safety", en: "Route and safety briefing", pt: "Briefing de rota e safety", de: "Routen- und Safety-Briefing", ru: "Брифинг по маршруту и safety" } },
      { time: "11:10", label: { ca: "Parada panoràmica a Tristaina", es: "Parada panorámica en Tristaina", fr: "Pause panoramique à Tristaina", en: "Panoramic stop at Tristaina", pt: "Paragem panorâmica em Tristaina", de: "Panoramastopp in Tristaina", ru: "Панорамная остановка в Tristaina" } },
      { time: "13:40", label: { ca: "Dinar de tancament a Arcalís", es: "Comida de cierre en Arcalís", fr: "Déjeuner de clôture à Arcalís", en: "Closing lunch in Arcalís", pt: "Almoço final em Arcalís", de: "Abschluss-Lunch in Arcalís", ru: "Финальный lunch в Arcalís" } },
    ],
    checklist: {
      ca: ["Foto de grup a Ordino abans de sortir", "Reagrupament a El Serrat", "Tancament premium a la cota alta"],
      es: ["Foto de grupo en Ordino antes de salir", "Reagrupación en El Serrat", "Cierre premium en cota alta"],
      fr: ["Photo de groupe à Ordino avant départ", "Regroupement à El Serrat", "Clôture premium en altitude"],
      en: ["Group photo in Ordino before departure", "Regroup in El Serrat", "Premium high-altitude finish"],
      pt: ["Foto de grupo em Ordino antes da saída", "Reagrupamento em El Serrat", "Fecho premium em altitude"],
      de: ["Gruppenfoto in Ordino vor Abfahrt", "Regruppierung in El Serrat", "Premium-Finale in großer Höhe"],
      ru: ["Групповое фото в Ordino до старта", "Сбор в El Serrat", "Premium-финиш на высоте"],
    },
  },
};

const postDriveReportByRouteId: Record<string, PostDriveReportData> = {
  "grand-tour-central": {
    summary: {
      ca: "Sortida molt neta i presentable, amb gran resposta en foto de grup, miradors i tancament gastronòmic. És el format més fàcil de convertir en peça institucional del club.",
      es: "Salida muy limpia y presentable, con gran respuesta en foto de grupo, miradores y cierre gastronómico. Es el formato más fácil de convertir en pieza institucional del club.",
      fr: "Sortie très propre et présentable, avec forte réponse en photo de groupe, belvédères et final gastronomique. C’est le format le plus simple à convertir en pièce institutionnelle du club.",
      en: "A very clean and presentable outing, with strong group-photo moments, viewpoints and a refined gastronomic finish. The easiest format to turn into an institutional club piece.",
      pt: "Saída muito limpa e apresentável, com boa resposta em foto de grupo, miradouros e fecho gastronómico. É o formato mais fácil de transformar em peça institucional do clube.",
      de: "Sehr saubere und präsentable Ausfahrt mit starkem Gruppenfoto-Moment, Aussichtspunkten und gastronomischem Finale. Das einfachste Format für ein institutionelles Club-Stück.",
      ru: "Очень чистый и презентабельный выезд: сильные групповые фото, мирадоры и гастрономичный финал. Самый удобный формат для клубной институциональной страницы.",
    },
    stats: [
      { value: "27", label: { ca: "cotxes", es: "coches", fr: "voitures", en: "cars", pt: "carros", de: "Autos", ru: "машин" } },
      { value: "61 km", label: { ca: "recorregut", es: "recorrido", fr: "parcours", en: "route", pt: "percurso", de: "Strecke", ru: "маршрут" } },
      { value: "4", label: { ca: "parades clau", es: "paradas clave", fr: "arrêts clés", en: "key stops", pt: "paragens-chave", de: "Schlüsselstopps", ru: "ключевые остановки" } },
      { value: "186", label: { ca: "fotos útils", es: "fotos útiles", fr: "photos utiles", en: "usable photos", pt: "fotos úteis", de: "nutzbare Fotos", ru: "полезных фото" } },
    ],
    highlights: {
      ca: ["Foto de grup molt forta a Engolasters", "Ritme fluid sense trencar el grup", "Meritxell com a tancament premium"],
      es: ["Foto de grupo muy potente en Engolasters", "Ritmo fluido sin romper el grupo", "Meritxell como cierre premium"],
      fr: ["Photo de groupe très forte à Engolasters", "Rythme fluide sans casser le groupe", "Meritxell comme final premium"],
      en: ["Strong group photo moment in Engolasters", "Flowing pace without breaking the convoy", "Meritxell as a premium finale"],
      pt: ["Foto de grupo muito forte em Engolasters", "Ritmo fluido sem quebrar o grupo", "Meritxell como fecho premium"],
      de: ["Starker Gruppenfoto-Moment in Engolasters", "Flüssiges Tempo ohne Bruch der Gruppe", "Meritxell als Premium-Finale"],
      ru: ["Сильный групповой кадр в Engolasters", "Плавный темп без разрыва колонны", "Meritxell как premium-финал"],
    },
    assets: {
      ca: ["Landing recap del dia", "Galeria resum per xarxes", "Coberta per newsletter del club"],
      es: ["Landing recap del día", "Galería resumen para redes", "Portada para newsletter del club"],
      fr: ["Landing recap du jour", "Galerie résumé pour réseaux", "Couverture pour newsletter du club"],
      en: ["Day recap landing", "Social recap gallery", "Club newsletter cover"],
      pt: ["Landing recap do dia", "Galeria resumo para redes", "Capa para newsletter do clube"],
      de: ["Tages-Recap-Landingpage", "Social-Recap-Galerie", "Titelbild für Club-Newsletter"],
      ru: ["Лендинг recap дня", "Галерея для соцсетей", "Обложка для newsletter клуба"],
    },
  },
  "west-viewpoints-loop": {
    summary: {
      ca: "Peça curta, dinàmica i molt fotogènica. Funciona especialment bé per a contingut ràpid, activacions de matí i formats àgils de club.",
      es: "Pieza corta, dinámica y muy fotogénica. Funciona especialmente bien para contenido rápido, activaciones de mañana y formatos ágiles de club.",
      fr: "Pièce courte, dynamique et très photogénique. Fonctionne très bien pour du contenu rapide et des activations légères.",
      en: "Short, dynamic and highly photogenic. Especially effective for quick content, morning activations and agile club formats.",
      pt: "Peça curta, dinâmica e muito fotogénica. Funciona muito bem para conteúdo rápido e ativações leves.",
      de: "Kurze, dynamische und sehr fotogene Ausfahrt. Stark für schnellen Content und agile Club-Formate.",
      ru: "Короткий, динамичный и очень фотогеничный формат. Особенно хорош для быстрого контента и легких активаций клуба.",
    },
    stats: [
      { value: "18", label: { ca: "cotxes", es: "coches", fr: "voitures", en: "cars", pt: "carros", de: "Autos", ru: "машин" } },
      { value: "52 km", label: { ca: "recorregut", es: "recorrido", fr: "parcours", en: "route", pt: "percurso", de: "Strecke", ru: "маршрут" } },
      { value: "3", label: { ca: "parades clau", es: "paradas clave", fr: "arrêts clés", en: "key stops", pt: "paragens-chave", de: "Schlüsselstopps", ru: "ключевые остановки" } },
      { value: "94", label: { ca: "fotos útils", es: "fotos útiles", fr: "photos utiles", en: "usable photos", pt: "fotos úteis", de: "nutzbare Fotos", ru: "полезных фото" } },
    ],
    highlights: {
      ca: ["Foto curta però molt forta a Coll de la Botella", "Format ideal per matí d’activació", "Brunch fàcil de comunicar"],
      es: ["Foto corta pero muy potente en Coll de la Botella", "Formato ideal para mañana de activación", "Brunch fácil de comunicar"],
      fr: ["Photo courte mais très forte au Coll de la Botella", "Format idéal pour une matinée d’activation", "Brunch facile à communiquer"],
      en: ["Short but strong photo stop at Coll de la Botella", "Ideal format for a morning activation", "Easy brunch-led storytelling"],
      pt: ["Foto curta mas muito forte no Coll de la Botella", "Formato ideal para ativação de manhã", "Brunch fácil de comunicar"],
      de: ["Kurzer, aber starker Fotostopp am Coll de la Botella", "Ideal für eine Morgen-Aktivierung", "Einfacher Brunch-Storytelling-Moment"],
      ru: ["Короткий, но сильный фотостоп на Coll de la Botella", "Идеально для утренней активации", "Легкий brunch-сюжет"],
    },
    assets: {
      ca: ["Story set per Instagram", "Recap curt per Telegram/Discord", "Teaser per a pròxima sortida"],
      es: ["Story set para Instagram", "Recap corto para Telegram/Discord", "Teaser para próxima salida"],
      fr: ["Set de stories Instagram", "Recap court pour Telegram/Discord", "Teaser pour la prochaine sortie"],
      en: ["Instagram story set", "Short Telegram/Discord recap", "Teaser for the next outing"],
      pt: ["Story set para Instagram", "Recap curto para Telegram/Discord", "Teaser para próxima saída"],
      de: ["Instagram-Story-Set", "Kurzer Telegram/Discord-Recap", "Teaser für die nächste Ausfahrt"],
      ru: ["Набор stories для Instagram", "Короткий recap для Telegram/Discord", "Тизер следующего выезда"],
    },
  },
  "envalira-high-mountain": {
    summary: {
      ca: "La peça més espectacular i aspiracional. Si surt bé, és la que té més valor visual, però també la que exigeix més control de clima i timing.",
      es: "La pieza más espectacular y aspiracional. Si sale bien, es la que más valor visual tiene, pero también la que más exige control de clima y timing.",
      fr: "La pièce la plus spectaculaire et aspirationnelle. Si elle sort bien, c’est celle qui a le plus de valeur visuelle.",
      en: "The most spectacular and aspirational piece. If executed well, it delivers the strongest visual value, but it also demands weather and timing control.",
      pt: "A peça mais espetacular e aspiracional. Se correr bem, é a que mais valor visual oferece, mas também exige mais controlo de clima e timing.",
      de: "Das spektakulärste und aspirativste Format. Wenn es klappt, liefert es den größten visuellen Wert, verlangt aber Wetter- und Timingkontrolle.",
      ru: "Самый эффектный и aspirational-формат. При хорошем исполнении дает максимальную визуальную ценность, но требует контроля погоды и тайминга.",
    },
    stats: [
      { value: "12", label: { ca: "vehicles", es: "vehículos", fr: "véhicules", en: "vehicles", pt: "veículos", de: "Fahrzeuge", ru: "машин" } },
      { value: "68 km", label: { ca: "tram alpí", es: "tramo alpino", fr: "segment alpin", en: "alpine section", pt: "troço alpino", de: "alpiner Abschnitt", ru: "альпийский участок" } },
      { value: "2.408 m", label: { ca: "cota alta", es: "cota alta", fr: "altitude haute", en: "high point", pt: "cota alta", de: "höchster Punkt", ru: "высшая точка" } },
      { value: "121", label: { ca: "fotos útils", es: "fotos útiles", fr: "photos utiles", en: "usable photos", pt: "fotos úteis", de: "nutzbare Fotos", ru: "полезных фото" } },
    ],
    highlights: {
      ca: ["Port d’Envalira com a imatge hero", "Andorra Circuit aporta ADN motor", "Tancament molt potent per a contingut BMW"],
      es: ["Port d’Envalira como imagen hero", "Andorra Circuit aporta ADN motor", "Cierre muy potente para contenido BMW"],
      fr: ["Port d’Envalira comme image hero", "Andorra Circuit apporte l’ADN moteur", "Final très puissant pour du contenu BMW"],
      en: ["Port d’Envalira as the hero image", "Andorra Circuit adds motorsport DNA", "A very strong ending for BMW content"],
      pt: ["Port d’Envalira como imagem hero", "Andorra Circuit acrescenta ADN motor", "Fecho muito forte para conteúdo BMW"],
      de: ["Port d’Envalira als Hero-Bild", "Andorra Circuit bringt Motorsport-DNA", "Sehr starkes Finale für BMW-Content"],
      ru: ["Port d’Envalira как hero-кадр", "Andorra Circuit добавляет моторный ADN", "Очень сильный финал для BMW-контента"],
    },
    assets: {
      ca: ["Hero recap de pujada alpina", "Carrusel BMW M / moto", "Coberta premium per nota de premsa"],
      es: ["Hero recap de subida alpina", "Carrusel BMW M / moto", "Portada premium para nota de prensa"],
      fr: ["Hero recap de montée alpine", "Carrousel BMW M / moto", "Couverture premium pour communiqué"],
      en: ["Hero alpine ascent recap", "BMW M / motorcycle carousel", "Premium cover for a press note"],
      pt: ["Hero recap de subida alpina", "Carrossel BMW M / moto", "Capa premium para nota de imprensa"],
      de: ["Hero-Recap des alpinen Anstiegs", "BMW M / Motorrad-Karussell", "Premium-Cover für Pressenotiz"],
      ru: ["Hero-recap альпийского подъема", "Карусель BMW M / мото", "Premium-обложка для пресс-ноты"],
    },
  },
  "ordino-tristaina-touring": {
    summary: {
      ca: "La més premium per a hospitality i marca: atmosfera neta, paisatge de cota alta i un to molt més editorial que esportiu pur.",
      es: "La más premium para hospitality y marca: atmósfera limpia, paisaje de cota alta y un tono mucho más editorial que deportivo puro.",
      fr: "La plus premium pour l’hospitality et la marque : atmosphère propre, haute montagne et ton bien plus éditorial que purement sportif.",
      en: "The most premium for hospitality and brand positioning: clean atmosphere, high-altitude scenery and a more editorial than purely sporty tone.",
      pt: "A mais premium para hospitality e marca: atmosfera limpa, paisagem de altitude e tom mais editorial do que desportivo puro.",
      de: "Am stärksten für Hospitality und Marke: klare Atmosphäre, Hochgebirgslandschaft und eher editoriales als rein sportliches Narrativ.",
      ru: "Самая premium для hospitality и бренда: чистая атмосфера, высокогорный пейзаж и более редакционный, чем чисто спортивный тон.",
    },
    stats: [
      { value: "21", label: { ca: "cotxes", es: "coches", fr: "voitures", en: "cars", pt: "carros", de: "Autos", ru: "машин" } },
      { value: "72 km", label: { ca: "recorregut", es: "recorrido", fr: "parcours", en: "route", pt: "percurso", de: "Strecke", ru: "маршрут" } },
      { value: "5", label: { ca: "punts premium", es: "puntos premium", fr: "points premium", en: "premium points", pt: "pontos premium", de: "Premium-Punkte", ru: "premium-точек" } },
      { value: "214", label: { ca: "fotos útils", es: "fotos útiles", fr: "photos utiles", en: "usable photos", pt: "fotos úteis", de: "nutzbare Fotos", ru: "полезных фото" } },
    ],
    highlights: {
      ca: ["Ordino funciona molt bé com a imatge de club", "Tristaina eleva molt el nivell visual", "Final perfecte per hospitality o invitació premium"],
      es: ["Ordino funciona muy bien como imagen de club", "Tristaina eleva mucho el nivel visual", "Final perfecto para hospitality o invitación premium"],
      fr: ["Ordino fonctionne très bien comme image de club", "Tristaina élève beaucoup le niveau visuel", "Final parfait pour hospitality premium"],
      en: ["Ordino works extremely well as a club image anchor", "Tristaina elevates the visual level sharply", "Perfect ending for hospitality or premium invites"],
      pt: ["Ordino funciona muito bem como imagem do clube", "Tristaina eleva muito o nível visual", "Final perfeito para hospitality premium"],
      de: ["Ordino funktioniert hervorragend als Clubbild", "Tristaina hebt das visuelle Niveau stark an", "Perfektes Finale für Hospitality oder Premium-Einladung"],
      ru: ["Ordino отлично работает как образ клуба", "Tristaina сильно поднимает визуальный уровень", "Идеальный финал для hospitality или premium-инвайта"],
    },
    assets: {
      ca: ["Report llarg editorial", "Galeria premium per web", "Peça resum per a BMW/dealer"],
      es: ["Report largo editorial", "Galería premium para web", "Pieza resumen para BMW/dealer"],
      fr: ["Report long éditorial", "Galerie premium pour le web", "Pièce résumé pour BMW/dealer"],
      en: ["Long-form editorial report", "Premium web gallery", "Summary piece for BMW/dealer"],
      pt: ["Report longo editorial", "Galeria premium para web", "Peça resumo para BMW/dealer"],
      de: ["Langer Editorial-Report", "Premium-Webgalerie", "Zusammenfassungsstück für BMW/Händler"],
      ru: ["Длинный редакционный report", "Premium-галерея для сайта", "Краткая pieza для BMW/dealer"],
    },
  },
};

const buildGoogleMapsUrl = (stop: RouteStop) => {
  const query = encodeURIComponent(`${stop.name}, ${stop.place}, ${stop.lat}, ${stop.lon}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

const normalizeWaypoint = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();

const MapOpenOnClick = ({ onOpen }: { onOpen: () => void }) => {
  useMapEvents({
    click: () => onOpen(),
  });

  return null;
};

type RouteMapCanvasProps = {
  route: ClubItinerary;
  t: Record<string, string>;
  language: LanguageCode;
  heightClassName: string;
  openOnClick?: boolean;
  onOpen?: () => void;
};

const buildGoogleMapsRouteUrl = (route: ClubItinerary) => {
  const points = route.waypoints
    .map((waypoint) => waypointCoordinates[normalizeWaypoint(waypoint)])
    .filter(Boolean) as MapCoordinate[];

  if (points.length < 2) return null;

  const origin = `${points[0].lat},${points[0].lon}`;
  const destination = `${points[points.length - 1].lat},${points[points.length - 1].lon}`;
  const waypoints = points.slice(1, -1).map((point) => `${point.lat},${point.lon}`).join("|");
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });

  if (waypoints) params.set("waypoints", waypoints);

  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

const RouteMapCanvas = ({ route, t, language, heightClassName, openOnClick = false, onOpen }: RouteMapCanvasProps) => {
  const routePoints = route.waypoints
    .map((waypoint) => {
      const coordinate = waypointCoordinates[normalizeWaypoint(waypoint)];
      if (!coordinate) return null;
      return {
        point: waypoint,
        position: [coordinate.lat, coordinate.lon] as LatLngTuple,
      };
    })
    .filter(Boolean) as Array<{ point: string; position: LatLngTuple }>;

  const stopPoints = routeStopsById[route.id] ?? [];
  const andorraShape = andorraOutline.map((point) => [point.lat, point.lon] as LatLngTuple);
  const countryBounds: [LatLngTuple, LatLngTuple] = [
    [ANDORRA_BOUNDS.minLat, ANDORRA_BOUNDS.minLon],
    [ANDORRA_BOUNDS.maxLat, ANDORRA_BOUNDS.maxLon],
  ];

  const createStopMarkerIcon = (color: string) =>
    divIcon({
      className: "",
      iconSize: [24, 32],
      iconAnchor: [12, 30],
      popupAnchor: [0, -26],
      html: `
        <div style="position:relative;width:24px;height:32px;display:flex;align-items:flex-start;justify-content:center;">
          <span style="position:absolute;top:1px;width:18px;height:18px;border-radius:9999px;background:${color};border:3px solid #ffffff;box-shadow:0 10px 20px rgba(15,23,42,.22);"></span>
          <span style="position:absolute;top:8px;width:6px;height:6px;border-radius:9999px;background:#ffffff;opacity:.95;"></span>
          <span style="position:absolute;top:18px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:11px solid ${color};filter:drop-shadow(0 5px 6px rgba(15,23,42,.18));"></span>
        </div>
      `,
    });

  return (
    <div className={`relative overflow-hidden rounded-[1.4rem] border border-border/70 ${openOnClick ? "cursor-zoom-in" : ""}`}>
      <MapContainer
        bounds={countryBounds}
        boundsOptions={{ padding: [18, 18] }}
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={false}
        className={`w-full ${heightClassName}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="topright" />
        {openOnClick && onOpen ? <MapOpenOnClick onOpen={onOpen} /> : null}
        <Polygon positions={andorraShape as LatLngExpression[]} pathOptions={{ color: "#94a3b8", weight: 2, fillColor: "#dbeafe", fillOpacity: 0.08 }} />
        <Polyline positions={routePoints.map((point) => point.position)} pathOptions={{ color: "#0f172a", weight: 8, opacity: 0.24 }} />
        <Polyline positions={routePoints.map((point) => point.position)} pathOptions={{ color: "#0284c7", weight: 5, opacity: 0.92 }} />

        {routePoints.map((point, index) => {
          const terminal = index === 0 || index === routePoints.length - 1;
          return (
            <CircleMarker
              key={`${route.id}-${point.point}`}
              center={point.position}
              radius={terminal ? 8 : 6}
              pathOptions={{ color: "#0f172a", weight: 2, fillColor: index === 0 ? "#0284c7" : terminal ? "#0f172a" : "#ffffff", fillOpacity: 1 }}
            >
              <Tooltip direction="top" offset={[0, -8]}>{point.point}</Tooltip>
            </CircleMarker>
          );
        })}

        {stopPoints.map((stop) => {
          const meta = getStopMeta(stop.category, t);
          const StopIcon = meta.icon;
          return (
            <Marker
              key={`${route.id}-${stop.name}`}
              position={[stop.lat, stop.lon] as LatLngTuple}
              icon={createStopMarkerIcon(meta.color)}
            >
              <Tooltip direction="top" offset={[0, -6]}>{stop.name}</Tooltip>
              <Popup>
                <div className="w-[258px] overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img src={route.image.src} alt={route.image.alt[language]} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="space-y-3 p-3">
                  <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ backgroundColor: `${meta.color}14`, color: meta.color }}>
                    <StopIcon className="h-3.5 w-3.5" />
                    {meta.label}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900">{stop.name}</div>
                    <div className="mt-1 text-sm font-medium text-slate-600">{stop.place}</div>
                  </div>
                  <div className="text-sm leading-6 text-slate-700">{stop.note}</div>
                  <a
                    href={buildGoogleMapsUrl(stop)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-primary"
                  >
                    {t.openGoogleMaps}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {openOnClick ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen?.();
          }}
          className="absolute left-3 top-3 z-[500] inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-800 shadow-sm backdrop-blur"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          {t.mapExpand}
        </button>
      ) : null}
    </div>
  );
};

const RouteSchematic = ({ route, t, language }: { route: ClubItinerary; t: Record<string, string>; language: LanguageCode }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const fullRouteUrl = buildGoogleMapsRouteUrl(route);

  return (
    <>
      <div className="rounded-[1.6rem] border border-border/70 bg-white/72 p-5 overflow-hidden">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.18em]">
          <Map className="h-4 w-4" />
          {t.scheme}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t.schemeNote}</p>
        <p className="mt-2 text-xs font-medium text-slate-500">{t.mapExpandHint}</p>

        <div className="mt-5">
          <RouteMapCanvas route={route} t={t} language={language} heightClassName="h-[360px]" openOnClick onOpen={() => setIsMapOpen(true)} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {stopLegendCategories.map((category) => {
            const meta = getStopMeta(category, t);
            const Icon = meta.icon;
            return (
              <div
                key={`${route.id}-${category}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: `${meta.color}18`, color: meta.color }}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {meta.label}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">
          <span>{t.mapStart}: {route.start}</span>
          <span>•</span>
          <span>{t.mapFinish}: {route.finish}</span>
        </div>

        {fullRouteUrl ? (
          <div className="mt-4">
            <a
              href={fullRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800 transition hover:border-primary hover:text-primary"
            >
              {t.openFullRoute}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : null}
      </div>

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="left-3 right-3 top-3 bottom-3 z-50 max-w-none translate-x-0 translate-y-0 gap-0 rounded-[1.5rem] border-0 bg-white p-0 shadow-2xl sm:left-6 sm:right-6 sm:top-6 sm:bottom-6 sm:rounded-[1.75rem]">
          <DialogTitle className="sr-only">{t.mapExpand}</DialogTitle>
          <DialogDescription className="sr-only">{t.mapExpandHint}</DialogDescription>
          {isMapOpen ? (
            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[1.5rem] bg-white sm:rounded-[1.75rem]">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.scheme}</div>
                  <div className="mt-1 text-sm text-slate-500">{route.title[language]}</div>
                </div>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800 shadow-sm transition hover:border-primary hover:text-primary"
                  >
                    {t.mapClose}
                  </button>
                </DialogClose>
              </div>
              <div className="min-h-0 flex-1 p-3 sm:p-4">
                <RouteMapCanvas route={route} t={t} language={language} heightClassName="h-full min-h-[420px]" />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

const getStopMeta = (category: RouteStopCategory, t: Record<string, string>) => {
  switch (category) {
    case "restaurant":
      return { label: t.stopRestaurant, icon: UtensilsCrossed, color: "#b45309" };
    case "viewpoint":
      return { label: t.stopViewpoint, icon: Telescope, color: "#7c3aed" };
    case "heritage":
      return { label: t.stopHeritage, icon: Landmark, color: "#be123c" };
    case "motorsport":
      return { label: t.stopMotorsport, icon: Flag, color: "#0f172a" };
    default:
      return { label: t.stopNature, icon: Trees, color: "#15803d" };
  }
};

const RouteStopsPanel = ({ route, t }: { route: ClubItinerary; t: Record<string, string> }) => {
  const stops = routeStopsById[route.id] ?? [];
  if (!stops.length) return null;

  return (
    <div className="rounded-[1.6rem] border border-border/70 bg-white/72 p-5">
      <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.18em]">
        <Sparkles className="h-4 w-4" />
        {t.stops}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{t.stopsNote}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {stops.map((stop) => {
          const meta = getStopMeta(stop.category, t);
          const Icon = meta.icon;
          return (
            <div key={`${route.id}-${stop.name}`} className="rounded-[1.25rem] border border-border/70 bg-background/85 p-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
              </div>
              <div className="mt-3 text-base font-semibold text-foreground">{stop.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stop.place}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{stop.note}</p>
              <a
                href={buildGoogleMapsUrl(stop)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-800 transition hover:border-primary hover:text-primary"
              >
                {t.openGoogleMaps}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RoutePhoto = ({ route, t, language }: { route: ClubItinerary; t: Record<string, string>; language: LanguageCode }) => {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-white/72">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={route.image.src}
          alt={route.image.alt[language]}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/86 backdrop-blur-md">
            <ImageIcon className="h-3.5 w-3.5" />
            {t.routePhoto}
          </div>
          <p className="mt-3 max-w-xl text-sm text-white/82">{t.routePhotoNote}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border/60 bg-white/88 px-4 py-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground/84">{t.credits}:</span>
        <a href={route.image.creditHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-foreground/86 transition-base hover:text-primary">
          {route.image.creditName}
          <ExternalLink className="h-3 w-3" />
        </a>
        <span>·</span>
        <span>{t.source}: Wikimedia Commons</span>
        <span>·</span>
        <a href={route.image.licenseHref} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground/86 transition-base hover:text-primary">
          {t.license}: {route.image.licenseLabel}
        </a>
      </div>
    </div>
  );
};

const Itineraris = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { data: routes = [] } = useMergedItineraries();
  const showcaseRoutes = routes.slice(0, 3);
  const [selectedEventRouteId, setSelectedEventRouteId] = useState<string>("grand-tour-central");
  const [conciergeDuration, setConciergeDuration] = useState<ConciergeDuration>("halfday");
  const [conciergeVehicle, setConciergeVehicle] = useState<ConciergeVehicle>("touring");
  const [conciergeMood, setConciergeMood] = useState<ConciergeMood>("scenic");
  const [conciergeFood, setConciergeFood] = useState<ConciergeFood>("signature");

  const conciergeRecommendation = useMemo(() => {
    if (!routes.length) return null;

    const ranked = routes
      .map((route) => {
        const fit = conciergeRouteFit[route.id];
        if (!fit) return null;

        let score = 0;
        if (fit.duration.includes(conciergeDuration)) score += 3;
        if (fit.vehicle.includes(conciergeVehicle)) score += 3;
        if (fit.mood.includes(conciergeMood)) score += 2;
        if (fit.food.includes(conciergeFood)) score += 2;
        if (route.clubRecommended && conciergeMood === "official") score += 2;
        if (route.profile === "both") score += 1;
        if (conciergeVehicle === "electric" && route.notes.some((item) => /electric|eléctric|electrique|elektrisch|электр/i.test(item[language]))) score += 1;

        return { route, fit, score };
      })
      .filter(Boolean) as Array<{ route: ClubItinerary; fit: (typeof conciergeRouteFit)[string]; score: number }>;

    ranked.sort((a, b) => b.score - a.score);
    return ranked[0] ?? null;
  }, [routes, conciergeDuration, conciergeVehicle, conciergeMood, conciergeFood, language]);

  const eventRoutes = routes.filter((route) => eventModeByRouteId[route.id]);
  const activeEventRoute = eventRoutes.find((route) => route.id === selectedEventRouteId) ?? eventRoutes[0] ?? null;
  const activeEventData = activeEventRoute ? eventModeByRouteId[activeEventRoute.id] : null;
  const [selectedReportRouteId, setSelectedReportRouteId] = useState<string>("grand-tour-central");
  const reportRoutes = routes.filter((route) => postDriveReportByRouteId[route.id]);
  const activeReportRoute = reportRoutes.find((route) => route.id === selectedReportRouteId) ?? reportRoutes[0] ?? null;
  const activeReportData = activeReportRoute ? postDriveReportByRouteId[activeReportRoute.id] : null;

  return (
    <PageShell>
      <section className="pt-10 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative p-6 md:p-10 text-white shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.35),transparent_32%)]" />
            <div className="relative z-10 grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  <Mountain className="h-4 w-4" />
                  {t.eyebrow}
                </div>
                <h1 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-balance max-w-4xl">{t.title}</h1>
                <p className="mt-5 max-w-3xl text-lg text-white/72">{t.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/assistent-ia"><Button variant="hero" size="lg" className="rounded-full">{t.cta}</Button></Link>
                  <Link to="/contacte"><Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">{t.contactCta}</Button></Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  { icon: Compass, text: t.guide1 },
                  { icon: Route, text: t.guide2 },
                  { icon: ShieldCheck, text: t.guide3 },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                      <Icon className="h-5 w-5 text-primary" />
                      <div className="mt-3 text-sm text-white/72">{item.text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl grid gap-6">
          {routes.map((route) => {
            const profile = getProfileMeta(route, t);
            const ProfileIcon = profile.icon;
            return (
              <Card key={route.id} className="premium-card border-0 rounded-[2rem] p-6 md:p-8 shadow-elegant overflow-hidden">
                <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        <ProfileIcon className="h-4 w-4" />
                        {profile.label}
                      </div>
                      {route.clubRecommended ? (
                        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
                          <Crown className="h-4 w-4 text-primary" />
                          {t.clubPick}
                        </div>
                      ) : null}
                    </div>

                    <h2 className="mt-5 text-3xl md:text-4xl font-bold text-balance">{route.title[language]}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{route.strapline[language]}</p>

                    {route.clubRecommended && route.clubRecommendation ? (
                      <div className="mt-5 rounded-[1.5rem] border border-accent/10 bg-accent text-white p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,.65)]">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/84">
                          <Crown className="h-3.5 w-3.5 text-primary" />
                          {t.clubPickBody}
                        </div>
                        <p className="mt-3 text-sm text-white/78">{route.clubRecommendation[language]}</p>
                      </div>
                    ) : null}

                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <div className="rounded-[1.5rem] bg-white/70 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{t.duration}</div>
                        <div className="mt-2 font-semibold">{route.duration}</div>
                      </div>
                      <div className="rounded-[1.5rem] bg-white/70 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{t.distance}</div>
                        <div className="mt-2 font-semibold">{route.distance}</div>
                      </div>
                      <div className="rounded-[1.5rem] bg-white/70 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{t.season}</div>
                        <div className="mt-2 font-semibold">{route.bestSeason[language]}</div>
                      </div>
                      <div className="rounded-[1.5rem] bg-white/70 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{t.rhythm}</div>
                        <div className="mt-2 font-semibold">{route.rhythm[language]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <RoutePhoto route={route} t={t} language={language} />
                    <RouteSchematic route={route} t={t} language={language} />
                    <RouteStopsPanel route={route} t={t} />

                    <div className="rounded-[1.6rem] border border-border/70 bg-white/70 p-5">
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.18em]"><CalendarRange className="h-4 w-4" /> {t.route}</div>
                      <div className="mt-4 text-sm text-muted-foreground"><span className="font-semibold text-foreground">{t.start}:</span> {route.start} · <span className="font-semibold text-foreground">{t.finish}:</span> {route.finish}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {route.waypoints.map((point) => (
                          <span key={point} className="rounded-full border border-border/80 bg-background/85 px-3 py-1 text-xs font-medium text-foreground/82">{point}</span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.6rem] border border-border/70 bg-white/70 p-5">
                      <div className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">{t.highlights}</div>
                      <ul className="mt-4 space-y-3 text-sm text-foreground/86">
                        {route.highlights.map((item, index) => (
                          <li key={`${route.id}-highlight-${index}`} className="flex gap-3"><ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>{item[language]}</span></li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[1.6rem] border border-border/70 bg-white/70 p-5">
                      <div className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">{t.bmw}</div>
                      <p className="mt-4 text-sm text-foreground/86">{route.bmwAngle[language]}</p>
                    </div>

                    <div className="rounded-[1.6rem] border border-border/70 bg-white/70 p-5">
                      <div className="text-sm uppercase tracking-[0.18em] text-primary font-semibold">{t.notes}</div>
                      <ul className="mt-4 space-y-3 text-sm text-foreground/82">
                        {route.notes.map((item, index) => (
                          <li key={`${route.id}-note-${index}`} className="flex gap-3"><ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>{item[language]}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2rem] overflow-hidden p-6 md:p-10 text-white shadow-elegant">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  <Sparkles className="h-4 w-4" />
                  {t.visionEyebrow}
                </div>
                <h2 className="mt-5 max-w-4xl text-3xl md:text-5xl font-bold text-balance">{t.visionTitle}</h2>
                <p className="mt-5 max-w-3xl text-lg text-white/72">{t.visionIntro}</p>

                <div className="mt-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.modulesTitle}</div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {driveExperienceModules.map((module) => {
                      const Icon = module.icon;
                      return (
                        <div key={module.title.en} className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                          <Icon className="h-5 w-5 text-primary" />
                          <div className="mt-4 text-lg font-semibold text-white">{module.title[language]}</div>
                          <p className="mt-2 text-sm leading-6 text-white/72">{module.body[language]}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.roadmapTitle}</div>
                  <div className="mt-4 space-y-4">
                    {driveExperienceRoadmap.map((phase) => (
                      <div key={phase.phase} className="rounded-[1.35rem] border border-white/10 bg-slate-950/25 p-4">
                        <div className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Phase {phase.phase}</div>
                        <div className="mt-3 text-lg font-semibold text-white">{phase.title[language]}</div>
                        <p className="mt-2 text-sm leading-6 text-white/72">{phase.body[language]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.bmwTitle}</div>
                  <p className="mt-3 text-sm leading-6 text-white/72">{t.bmwIntro}</p>
                  <div className="mt-4 grid gap-3">
                    {bmwValueProps.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title.en} className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-slate-950/20 px-4 py-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-medium text-white/88">{item.title[language]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="premium-card border-0 rounded-[2rem] p-6 md:p-8 shadow-elegant overflow-hidden">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-4 w-4" />
              {driveExperienceShowcase.eyebrow[language]}
            </div>
            <h2 className="mt-5 max-w-4xl text-3xl md:text-5xl font-bold text-balance">{driveExperienceShowcase.title[language]}</h2>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{driveExperienceShowcase.intro[language]}</p>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr_0.9fr]">
              <div className="rounded-[1.75rem] border border-border/70 bg-white/75 p-5">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.18em]">
                  <Sparkles className="h-4 w-4" />
                  {conciergeUi.title[language]}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{conciergeUi.intro[language]}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: conciergeUi.duration[language], value: conciergeDuration, setValue: setConciergeDuration, options: conciergeOptions.duration },
                    { label: conciergeUi.vehicle[language], value: conciergeVehicle, setValue: setConciergeVehicle, options: conciergeOptions.vehicle },
                    { label: conciergeUi.mood[language], value: conciergeMood, setValue: setConciergeMood, options: conciergeOptions.mood },
                    { label: conciergeUi.food[language], value: conciergeFood, setValue: setConciergeFood, options: conciergeOptions.food },
                  ].map((group) => (
                    <div key={group.label}>
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{group.label}</div>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => group.setValue(option.id as never)}
                            className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${group.value === option.id ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"}`}
                          >
                            {option.label[language]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {conciergeRecommendation ? (
                  <div className="mt-5 rounded-[1.4rem] border border-primary/15 bg-primary/5 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{conciergeUi.recommendation[language]}</div>
                    <div className="mt-3 flex items-start gap-4">
                      <img
                        src={conciergeRecommendation.route.image.src}
                        alt={conciergeRecommendation.route.image.alt[language]}
                        className="h-20 w-20 rounded-[1rem] object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-lg font-semibold text-foreground">{conciergeRecommendation.route.title[language]}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{conciergeRecommendation.route.strapline[language]}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                          <span className="rounded-full bg-white px-3 py-1">{conciergeRecommendation.route.duration}</span>
                          <span className="rounded-full bg-white px-3 py-1">{conciergeRecommendation.route.distance}</span>
                          <span className="rounded-full bg-white px-3 py-1">{conciergeRecommendation.route.rhythm[language]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{conciergeUi.why[language]}</div>
                    <p className="mt-2 text-sm leading-6 text-foreground/86">{conciergeRecommendation.fit.why[language]}</p>
                    {buildGoogleMapsRouteUrl(conciergeRecommendation.route) ? (
                      <a
                        href={buildGoogleMapsRouteUrl(conciergeRecommendation.route) ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-primary"
                      >
                        {t.openFullRoute}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-4 rounded-[1.4rem] border border-primary/15 bg-primary/5 p-4 text-sm text-foreground/86">
                    {conciergePrototype.answer[language]}
                  </div>
                )}
              </div>

              <div className="rounded-[1.75rem] border border-border/70 bg-white/75 p-5">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.18em]">
                  <Crown className="h-4 w-4" />
                  {eventModePrototype.title[language]}
                </div>
                <div className="mt-4 space-y-3">
                  {eventModePrototype.items[language].map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-start gap-3 rounded-[1.25rem] border border-border/70 bg-background/85 px-4 py-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{index + 1}</span>
                      <span className="pt-1 text-sm font-medium text-foreground/86">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border/70 bg-white/75 p-5">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.18em]">
                  <CalendarRange className="h-4 w-4" />
                  {recapPrototype.title[language]}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {recapPrototype.stats[language].map((stat) => (
                    <div key={stat} className="rounded-[1.2rem] border border-border/70 bg-background/85 p-3 text-center text-sm font-semibold text-foreground/86">
                      {stat}
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {showcaseRoutes.map((route) => (
                    <div key={`showcase-${route.id}`} className="overflow-hidden rounded-[1rem] border border-border/70 bg-slate-100">
                      <img src={route.image.src} alt={route.image.alt[language]} className="aspect-[4/5] h-full w-full object-cover" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {activeEventRoute && activeEventData ? (
        <section className="pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="glass-dark border-0 rounded-[2rem] overflow-hidden p-6 md:p-8 text-white shadow-elegant">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
                    <Crown className="h-4 w-4 text-primary" />
                    {eventModeUi.eyebrow[language]}
                  </div>
                  <h2 className="mt-5 max-w-4xl text-3xl md:text-5xl font-bold text-balance">{eventModeUi.title[language]}</h2>
                  <p className="mt-4 max-w-3xl text-lg text-white/72">{eventModeUi.intro[language]}</p>

                  <div className="mt-6">
                    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{eventModeUi.selectRoute[language]}</div>
                    <div className="flex flex-wrap gap-2">
                      {eventRoutes.map((route) => (
                        <button
                          key={`event-${route.id}`}
                          type="button"
                          onClick={() => setSelectedEventRouteId(route.id)}
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${selectedEventRouteId === route.id ? "bg-white text-slate-950" : "border border-white/15 bg-white/8 text-white/82 hover:bg-white/12"}`}
                        >
                          {route.title[language]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{eventModeUi.meetingPoint[language]}</div>
                      <div className="mt-2 text-sm font-medium text-white/88">{activeEventData.meetingPoint[language]}</div>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{eventModeUi.coffee[language]}</div>
                      <div className="mt-2 text-sm font-medium text-white/88">{activeEventData.coffee[language]}</div>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{eventModeUi.participants[language]}</div>
                      <div className="mt-2 text-2xl font-bold text-white">{activeEventData.participants}</div>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{eventModeUi.guestCars[language]}</div>
                      <div className="mt-2 text-2xl font-bold text-white">{activeEventData.guestCars}</div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eventModeUi.briefing[language]}</div>
                    <p className="mt-3 text-sm leading-6 text-white/80">{activeEventData.convoyNote[language]}</p>
                    <ul className="mt-4 space-y-3 text-sm text-white/82">
                      {activeEventData.checklist[language].map((item) => (
                        <li key={item} className="flex gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/8 backdrop-blur-xl">
                    <img src={activeEventRoute.image.src} alt={activeEventRoute.image.alt[language]} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                    <div className="p-5">
                      <div className="text-xl font-semibold text-white">{activeEventRoute.title[language]}</div>
                      <p className="mt-2 text-sm text-white/72">{activeEventRoute.strapline[language]}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eventModeUi.timeline[language]}</div>
                    <div className="mt-4 space-y-3">
                      {activeEventData.timeline.map((item) => (
                        <div key={`${item.time}-${item.label.en}`} className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-slate-950/24 px-4 py-3">
                          <span className="inline-flex min-w-[62px] justify-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{item.time}</span>
                          <span className="pt-1 text-sm text-white/84">{item.label[language]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {buildGoogleMapsRouteUrl(activeEventRoute) ? (
                      <a
                        href={buildGoogleMapsRouteUrl(activeEventRoute) ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-primary hover:text-white"
                      >
                        {t.openFullRoute}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                    <Link to="/contacte" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/12">
                      {eventModeUi.requestEvent[language]}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      ) : null}

      {activeReportRoute && activeReportData ? (
        <section className="pb-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="premium-card border-0 rounded-[2rem] overflow-hidden p-6 md:p-8 shadow-elegant">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    <CalendarRange className="h-4 w-4" />
                    {t.postDriveEyebrow}
                  </div>
                  <h2 className="mt-5 max-w-4xl text-3xl md:text-5xl font-bold text-balance">{t.postDriveTitle}</h2>
                  <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{t.postDriveIntro}</p>

                  <div className="mt-6">
                    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{t.postDriveSelect}</div>
                    <div className="flex flex-wrap gap-2">
                      {reportRoutes.map((route) => (
                        <button
                          key={`report-${route.id}`}
                          type="button"
                          onClick={() => setSelectedReportRouteId(route.id)}
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${selectedReportRouteId === route.id ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"}`}
                        >
                          {route.title[language]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.75rem] border border-border/70 bg-white/75 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.postDriveSummary}</div>
                    <p className="mt-3 text-sm leading-7 text-foreground/86">{activeReportData.summary[language]}</p>
                  </div>

                  <div className="mt-5 rounded-[1.75rem] border border-border/70 bg-white/75 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.postDriveHighlights}</div>
                    <ul className="mt-4 space-y-3 text-sm text-foreground/86">
                      {activeReportData.highlights[language].map((item) => (
                        <li key={item} className="flex gap-3"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-white/80">
                    <img src={activeReportRoute.image.src} alt={activeReportRoute.image.alt[language]} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                    <div className="p-5">
                      <div className="text-xl font-semibold text-foreground">{activeReportRoute.title[language]}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{activeReportRoute.strapline[language]}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-border/70 bg-white/75 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.postDriveStats}</div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {activeReportData.stats.map((stat) => (
                        <div key={`${stat.value}-${stat.label.en}`} className="rounded-[1.2rem] border border-border/70 bg-background/85 p-4 text-center">
                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{stat.label[language]}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-border/70 bg-white/75 p-5">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.postDriveAssets}</div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {activeReportData.assets[language].map((asset, index) => (
                        <div key={`${asset}-${index}`} className="overflow-hidden rounded-[1.2rem] border border-border/70 bg-background/85">
                          <img src={activeReportRoute.image.src} alt={activeReportRoute.image.alt[language]} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                          <div className="p-3 text-sm font-medium text-foreground/86">{asset}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {buildGoogleMapsRouteUrl(activeReportRoute) ? (
                        <a
                          href={buildGoogleMapsRouteUrl(activeReportRoute) ?? undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-primary"
                        >
                          {t.openFullRoute}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                      <Link to="/contacte" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800 transition hover:border-primary hover:text-primary">
                        {eventModeUi.requestEvent[language]}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
};

export default Itineraris;
