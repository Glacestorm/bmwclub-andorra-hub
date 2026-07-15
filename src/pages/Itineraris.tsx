import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange, CarFront, Compass, Mountain, Route, ShieldCheck, Bike, Crown, Map, ImageIcon, ExternalLink, UtensilsCrossed, Landmark, Trees, Flag, Telescope, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { type ClubItinerary } from "@/content/itineraryGuide";
import { useMergedItineraries } from "@/lib/clubCms";

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
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
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
  "andorra la vella": { lat: 42.5063, lon: 1.5218, dx: -6, dy: 22, anchor: "end" },
  "escaldes engordany": { lat: 42.5096, lon: 1.5341, dx: 10, dy: 34, anchor: "start" },
  engolasters: { lat: 42.5188, lon: 1.5792, dx: 0, dy: -14, anchor: "middle" },
  canillo: { lat: 42.5676, lon: 1.5976, dx: 0, dy: 24, anchor: "middle" },
  meritxell: { lat: 42.5618, lon: 1.5961, dx: 0, dy: -14, anchor: "middle" },
  ordino: { lat: 42.5562, lon: 1.5332, dx: 0, dy: 24, anchor: "middle" },
  "coll d ordino": { lat: 42.5793, lon: 1.5255, dx: 16, dy: -8, anchor: "start" },
  "la massana": { lat: 42.54499, lon: 1.5148, dx: -2, dy: 24, anchor: "middle" },
  pal: { lat: 42.5567, lon: 1.4935, dx: -2, dy: -14, anchor: "middle" },
  "coll de la botella": { lat: 42.5722, lon: 1.4637, dx: 20, dy: -10, anchor: "start" },
  arinsal: { lat: 42.572, lon: 1.4845, dx: 22, dy: 10, anchor: "start" },
  erts: { lat: 42.5551, lon: 1.4922, dx: -14, dy: 22, anchor: "end" },
  encamp: { lat: 42.5347, lon: 1.5801, dx: 0, dy: 24, anchor: "middle" },
  "grau roig": { lat: 42.5311, lon: 1.6971, dx: -14, dy: -10, anchor: "end" },
  "pas de la casa": { lat: 42.5426, lon: 1.7336, dx: -10, dy: 24, anchor: "end" },
  "port d envalira": { lat: 42.5394, lon: 1.7337, dx: 18, dy: -8, anchor: "start" },
  "andorra circuit": { lat: 42.534, lon: 1.7144, dx: -12, dy: 26, anchor: "end" },
  "la cortinada": { lat: 42.5777, lon: 1.5222, dx: -12, dy: -10, anchor: "end" },
  arans: { lat: 42.5827, lon: 1.5237, dx: 12, dy: 22, anchor: "start" },
  "el serrat": { lat: 42.5909, lon: 1.5246, dx: 18, dy: -8, anchor: "start" },
  arcalis: { lat: 42.6222, lon: 1.5028, dx: -8, dy: -10, anchor: "end" },
};

type RouteStopCategory = "restaurant" | "viewpoint" | "heritage" | "nature" | "motorsport";

type RouteStop = {
  name: string;
  place: string;
  category: RouteStopCategory;
};

const routeStopsById: Record<string, RouteStop[]> = {
  "grand-tour-central": [
    { name: "Llac d’Engolasters", place: "Escaldes-Engordany", category: "nature" },
    { name: "Mirador Roc del Quer", place: "Canillo", category: "viewpoint" },
    { name: "Santuari de Meritxell", place: "Meritxell", category: "heritage" },
    { name: "Borda de l’Avi", place: "Canillo", category: "restaurant" },
  ],
  "west-viewpoints-loop": [
    { name: "Sant Climent de Pal", place: "Pal", category: "heritage" },
    { name: "Mirador Coll de la Botella", place: "Pal / Arinsal", category: "viewpoint" },
    { name: "Farga Rossell", place: "La Massana", category: "heritage" },
    { name: "Pla de la Cot", place: "Pal", category: "restaurant" },
  ],
  "envalira-high-mountain": [
    { name: "Andorra Circuit", place: "Pas de la Casa", category: "motorsport" },
    { name: "Port d’Envalira", place: "Pas de la Casa", category: "viewpoint" },
    { name: "Estanys de Pessons", place: "Grau Roig", category: "nature" },
    { name: "La Fromagerie", place: "Grau Roig", category: "restaurant" },
  ],
  "ordino-tristaina-touring": [
    { name: "Casa d’Areny-Plandolit", place: "Ordino", category: "heritage" },
    { name: "Mirador Solar de Tristaina", place: "Arcalís", category: "viewpoint" },
    { name: "Parc natural de Sorteny", place: "El Serrat", category: "nature" },
    { name: "Refugi de Sorteny", place: "Ordino", category: "restaurant" },
  ],
};

const normalizeWaypoint = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();

const projectMapPoint = (lat: number, lon: number, width: number, height: number) => {
  const paddingX = 34;
  const paddingY = 22;
  const x = paddingX + ((lon - ANDORRA_BOUNDS.minLon) / (ANDORRA_BOUNDS.maxLon - ANDORRA_BOUNDS.minLon)) * (width - paddingX * 2);
  const y = paddingY + ((ANDORRA_BOUNDS.maxLat - lat) / (ANDORRA_BOUNDS.maxLat - ANDORRA_BOUNDS.minLat)) * (height - paddingY * 2);
  return { x, y };
};

const buildSmoothPath = (points: Array<{ x: number; y: number }>) => {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const current = points[index];
    const previous = points[index - 1];
    const controlX = (previous.x + current.x) / 2;
    d += ` Q ${controlX} ${previous.y}, ${current.x} ${current.y}`;
  }
  return d;
};

const RouteSchematic = ({ route, t }: { route: ClubItinerary; t: Record<string, string> }) => {
  const width = 360;
  const height = 220;
  const routePoints = route.waypoints
    .map((waypoint, index) => {
      const coordinate = waypointCoordinates[normalizeWaypoint(waypoint)];
      if (!coordinate) return null;
      const projected = projectMapPoint(coordinate.lat, coordinate.lon, width, height);
      return {
        point: waypoint,
        index,
        ...coordinate,
        ...projected,
      };
    })
    .filter(Boolean) as Array<{ point: string; index: number; lat: number; lon: number; x: number; y: number; dx?: number; dy?: number; anchor?: "start" | "middle" | "end" }>;

  const routePath = buildSmoothPath(routePoints);
  const outlinePoints = andorraOutline.map((point) => projectMapPoint(point.lat, point.lon, width, height));
  const outlinePath = `${outlinePoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")} Z`;

  return (
    <div className="rounded-[1.6rem] border border-border/70 bg-white/72 p-5 overflow-hidden">
      <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.18em]">
        <Map className="h-4 w-4" />
        {t.scheme}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{t.schemeNote}</p>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[340px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <defs>
              <linearGradient id={`andorra-relief-${route.id}`} x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
              <linearGradient id={`route-gradient-${route.id}`} x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <filter id={`shadow-${route.id}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0f172a" floodOpacity="0.08" />
              </filter>
            </defs>

            <rect x="8" y="8" width={width - 16} height={height - 16} rx="28" fill="#f8fafc" />
            <path d={outlinePath} fill={`url(#andorra-relief-${route.id})`} stroke="#cbd5e1" strokeWidth="2" filter={`url(#shadow-${route.id})`} />

            <path d="M 112 34 C 148 76, 154 126, 188 184" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
            <path d="M 162 48 C 196 78, 222 114, 248 164" fill="none" stroke="#dbeafe" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <path d="M 74 116 C 132 106, 214 108, 288 122" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

            {routePath ? (
              <>
                <path d={routePath} fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                <path d={routePath} fill="none" stroke={`url(#route-gradient-${route.id})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : null}

            {routePoints.map((point) => {
              const isTerminal = point.index === 0 || point.index === routePoints.length - 1;
              const label = point.point.length > 21 ? `${point.point.slice(0, 19)}…` : point.point;
              return (
                <g key={`${route.id}-${point.point}-${point.index}`}>
                  <circle cx={point.x} cy={point.y} r={isTerminal ? 8.5 : 6.5} fill={point.index === 0 ? "#0284c7" : point.index === routePoints.length - 1 ? "#0f172a" : "#ffffff"} stroke="#0f172a" strokeWidth="2" />
                  <circle cx={point.x} cy={point.y} r={isTerminal ? 15 : 11} fill="none" stroke={point.index === 0 ? "rgba(2,132,199,0.22)" : "rgba(15,23,42,0.12)"} strokeWidth="2" />
                  <text x={point.x + (point.dx ?? 0)} y={point.y + (point.dy ?? 22)} textAnchor={point.anchor ?? "middle"} fontSize="10.5" fontWeight="700" fill="#334155">
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">
        <span>{t.mapStart}: {route.start}</span>
        <span>•</span>
        <span>{t.mapFinish}: {route.finish}</span>
      </div>
    </div>
  );
};

const getStopMeta = (category: RouteStopCategory, t: Record<string, string>) => {
  switch (category) {
    case "restaurant":
      return { label: t.stopRestaurant, icon: UtensilsCrossed };
    case "viewpoint":
      return { label: t.stopViewpoint, icon: Telescope };
    case "heritage":
      return { label: t.stopHeritage, icon: Landmark };
    case "motorsport":
      return { label: t.stopMotorsport, icon: Flag };
    default:
      return { label: t.stopNature, icon: Trees };
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
                    <RouteSchematic route={route} t={t} />
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
