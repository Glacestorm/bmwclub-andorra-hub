import { useState } from "react";
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
  const { data: routes } = useMergedItineraries();

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
    </PageShell>
  );
};

export default Itineraris;
