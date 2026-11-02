import { LanguageCode } from "@/lib/i18n";

export type LocalizedText = Record<LanguageCode, string>;

export type FeaturedEventMeta = {
  eventId: string;
  tag: LocalizedText;
  summary: LocalizedText;
  designNote?: LocalizedText;
  heroImage?: string;
  archiveIds?: string[];
};

export type ArchiveItem = {
  id: string;
  type: "pdf" | "video" | "image";
  year: string;
  title: string;
  summary: LocalizedText;
  href: string;
  accent?: string;
  sizeHint?: string;
};

export type OfficialLink = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  href: string;
  cta: LocalizedText;
  tag: LocalizedText;
};

export const featuredEventMeta: FeaturedEventMeta[] = [
  {
    eventId: "rally-andorra-2011",
    tag: {
      ca: "Sortida històrica",
      es: "Salida histórica",
      fr: "Sortie historique",
      en: "Historic outing",
      pt: "Passeio histórico",
      de: "Historische Ausfahrt",
      ru: "Исторический выезд",
    },
    summary: {
      ca: "Sortida del club al Rally Andorra del 2011.",
      es: "Salida del club al Rally Andorra de 2011.",
      fr: "Sortie du club au Rally Andorra 2011.",
      en: "Club outing to the 2011 Rally Andorra.",
      pt: "Passeio do clube ao Rally Andorra de 2011.",
      de: "Ausfahrt des Clubs zur Rally Andorra 2011.",
      ru: "Выезд клуба на ралли Andorra 2011 года.",
    },
    heroImage: "/legacy-mirror/images/Tour_Cevennes_Roussillon.jpg",
  },
  {
    eventId: "rally-lloret-2024",
    tag: {
      ca: "Sortida icònica",
      es: "Salida icónica",
      fr: "Sortie emblématique",
      en: "Signature outing",
      pt: "Passeio icónico",
      de: "Ikonische Ausfahrt",
      ru: "Знаковый выезд",
    },
    summary: {
      ca: "Ral·li turístic del club, amb ruta, hotel i convivència entre socis.",
      es: "Rally turístico del club, con ruta, hotel y convivencia entre socios.",
      fr: "Rallye touristique du club, avec itinéraire, hôtel et moments partagés entre membres.",
      en: "The club's touring rally, with a route, a hotel stay and time together among members.",
      pt: "Rally turístico do clube, com rota, hotel e convívio entre sócios.",
      de: "Touristische Rallye des Clubs mit Route, Hotel und gemeinsamer Zeit unter Mitgliedern.",
      ru: "Туристическое ралли клуба: маршрут, отель и общение участников.",
    },
  },
  {
    eventId: "munich-2025",
    tag: {
      ca: "Viatge especial",
      es: "Viaje especial",
      fr: "Voyage spécial",
      en: "Special trip",
      pt: "Viagem especial",
      de: "Besondere Reise",
      ru: "Особая поездка",
    },
    summary: {
      ca: "Viatge del club al Museu BMW de Munic.",
      es: "Viaje del club al Museo BMW de Múnich.",
      fr: "Voyage du club au Musée BMW de Munich.",
      en: "Club trip to the BMW Museum in Munich.",
      pt: "Viagem do clube ao Museu BMW de Munique.",
      de: "Clubreise zum BMW Museum in München.",
      ru: "Поездка клуба в музей BMW в Мюнхене.",
    },
    archiveIds: ["tour-cevennes-image"],
  },
  {
    eventId: "sopar-20-aniversari-2025",
    tag: {
      ca: "Moment de club",
      es: "Momento de club",
      fr: "Moment du club",
      en: "Club milestone",
      pt: "Momento do clube",
      de: "Club-Meilenstein",
      ru: "Важный момент клуба",
    },
    summary: {
      ca: "Sopar de celebració dels 20 anys del club.",
      es: "Cena de celebración de los 20 años del club.",
      fr: "Dîner de célébration des 20 ans du club.",
      en: "Dinner celebrating the club's 20th anniversary.",
      pt: "Jantar de celebração dos 20 anos do clube.",
      de: "Abendessen zum 20-jährigen Jubiläum des Clubs.",
      ru: "Ужин в честь 20-летия клуба.",
    },
    archiveIds: ["slot-2015"],
  },
  {
    eventId: "cars-coffee-2026-10-18",
    tag: {
      ca: "Trobada del club",
      es: "Encuentro del club",
      fr: "Rencontre du club",
      en: "Club meet-up",
      pt: "Encontro do clube",
      de: "Clubtreffen",
      ru: "Встреча клуба",
    },
    summary: {
      ca: "Trobada Cars & Coffee del club.",
      es: "Encuentro Cars & Coffee del club.",
      fr: "Rencontre Cars & Coffee du club.",
      en: "The club's Cars & Coffee meet-up.",
      pt: "Encontro Cars & Coffee do clube.",
      de: "Cars & Coffee-Treffen des Clubs.",
      ru: "Встреча клуба Cars & Coffee.",
    },
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: "slot-2015",
    type: "pdf",
    year: "2015",
    title: "2n Campionat Slot 2015 - Classificació",
    href: "/legacy-mirror/images/2n_Campionat_Slot_2015_Classif_07.pdf",
    summary: {
      ca: "Classificació del 2n Campionat Slot 2015.",
      es: "Clasificación del 2.º Campeonato Slot 2015.",
      fr: "Classement du 2e Championnat Slot 2015.",
      en: "Standings of the 2nd Slot Championship 2015.",
      pt: "Classificação do 2.º Campeonato Slot 2015.",
      de: "Ergebnisliste der 2. Slot-Meisterschaft 2015.",
      ru: "Таблица результатов 2-го чемпионата Slot 2015.",
    },
    accent: "PDF",
    sizeHint: "303 KB",
  },
  {
    id: "classic-live-05",
    type: "pdf",
    year: "Classic",
    title: "BMW Classic Live 05/1",
    href: "/legacy-mirror/images/revistes/BMW_Classic_live/Mobile_Tradition_live_05_1_D.pdf",
    summary: {
      ca: "Revista BMW Classic Live, número 05/1.",
      es: "Revista BMW Classic Live, número 05/1.",
      fr: "Magazine BMW Classic Live, numéro 05/1.",
      en: "BMW Classic Live magazine, issue 05/1.",
      pt: "Revista BMW Classic Live, número 05/1.",
      de: "Magazin BMW Classic Live, Ausgabe 05/1.",
      ru: "Журнал BMW Classic Live, выпуск 05/1.",
    },
    accent: "PDF",
    sizeHint: "2.4 MB",
  },
  {
    id: "classic-live-03",
    type: "pdf",
    year: "Classic",
    title: "BMW Classic Live 03/3",
    href: "/legacy-mirror/images/revistes/BMW_Classic_live/Mobile_Tradition_live_03_3_D.pdf",
    summary: {
      ca: "Revista BMW Classic Live, número 03/3.",
      es: "Revista BMW Classic Live, número 03/3.",
      fr: "Magazine BMW Classic Live, numéro 03/3.",
      en: "BMW Classic Live magazine, issue 03/3.",
      pt: "Revista BMW Classic Live, número 03/3.",
      de: "Magazin BMW Classic Live, Ausgabe 03/3.",
      ru: "Журнал BMW Classic Live, выпуск 03/3.",
    },
    accent: "PDF",
    sizeHint: "1.7 MB",
  },
  {
    id: "tour-cevennes-image",
    type: "image",
    year: "2022",
    title: "Tour Cevennes Roussillon",
    href: "/legacy-mirror/images/Tour_Cevennes_Roussillon.jpg",
    summary: {
      ca: "Cartell del Tour Cevennes-Roussillon 2022, de Millesim Classic Rally.",
      es: "Cartel del Tour Cevennes-Roussillon 2022, de Millesim Classic Rally.",
      fr: "Affiche du Tour Cévennes-Roussillon 2022, par Millesim Classic Rally.",
      en: "Poster for the 2022 Tour Cevennes-Roussillon by Millesim Classic Rally.",
      pt: "Cartaz do Tour Cevennes-Roussillon 2022, da Millesim Classic Rally.",
      de: "Plakat der Tour Cevennes-Roussillon 2022 von Millesim Classic Rally.",
      ru: "Афиша Tour Cevennes-Roussillon 2022 от Millesim Classic Rally.",
    },
    accent: "IMG",
    sizeHint: "301 KB",
  },
];

export const officialBmwLinks: OfficialLink[] = [
  {
    id: "bmw-home",
    title: {
      ca: "Portal oficial BMW Espanya",
      es: "Portal oficial BMW España",
      fr: "Portail officiel BMW Espagne",
      en: "Official BMW Spain portal",
      pt: "Portal oficial BMW Espanha",
      de: "Offizielles BMW Spanien Portal",
      ru: "Официальный портал BMW Испания",
    },
    summary: {
      ca: "Porta principal per entrar a models, ofertes, configurador i univers BMW des del mercat espanyol.",
      es: "Puerta principal para entrar a modelos, ofertas, configurador y universo BMW desde el mercado español.",
      fr: "Porte d'entrée principale vers les modèles, offres, configurateur et l'univers BMW pour le marché espagnol.",
      en: "Main gateway to models, offers, configurator and the BMW universe for the Spanish market.",
      pt: "Porta principal para modelos, ofertas, configurador e universo BMW no mercado espanhol.",
      de: "Hauptzugang zu Modellen, Angeboten, Konfigurator und BMW-Welt für den spanischen Markt.",
      ru: "Главная точка входа к моделям, предложениям, конфигуратору и миру BMW для испанского рынка.",
    },
    href: "https://www.bmw.es/es/home.html",
    cta: {
      ca: "Obrir BMW.es",
      es: "Abrir BMW.es",
      fr: "Ouvrir BMW.es",
      en: "Open BMW.es",
      pt: "Abrir BMW.es",
      de: "BMW.es öffnen",
      ru: "Открыть BMW.es",
    },
    tag: { ca: "Oficial", es: "Oficial", fr: "Officiel", en: "Official", pt: "Oficial", de: "Offiziell", ru: "Официально" },
  },
  {
    id: "bmw-news",
    title: {
      ca: "Notícies BMW",
      es: "Noticias BMW",
      fr: "Actualités BMW",
      en: "BMW news",
      pt: "Notícias BMW",
      de: "BMW News",
      ru: "Новости BMW",
    },
    summary: {
      ca: "Apartat ideal per connectar la web del club amb novetats, llançaments i contingut viu de la marca.",
      es: "Apartado ideal para conectar la web del club con novedades, lanzamientos y contenido vivo de la marca.",
      fr: "Rubrique idéale pour relier le site du club aux nouveautés, lancements et contenus vivants de la marque.",
      en: "Ideal section to connect the club site with brand news, launches and live BMW content.",
      pt: "Secção ideal para ligar o site do clube às novidades, lançamentos e conteúdo vivo da marca.",
      de: "Idealer Bereich, um die Club-Website mit News, Markteinführungen und lebendigem BMW-Content zu verbinden.",
      ru: "Идеальный раздел, чтобы связать сайт клуба с новостями, премьерами и живым контентом BMW.",
    },
    href: "https://www.bmw.es/es/topics/mundo-bmw/cultura/noticias.html",
    cta: {
      ca: "Veure novetats",
      es: "Ver novedades",
      fr: "Voir les nouveautés",
      en: "View updates",
      pt: "Ver novidades",
      de: "Neuheiten ansehen",
      ru: "Открыть новинки",
    },
    tag: { ca: "Novedats", es: "Novedades", fr: "Nouveautés", en: "Updates", pt: "Novidades", de: "Neuheiten", ru: "Новинки" },
  },
  {
    id: "bmw-electric",
    title: {
      ca: "BMW elèctric",
      es: "BMW eléctrico",
      fr: "BMW électrique",
      en: "BMW electric",
      pt: "BMW elétrico",
      de: "BMW elektrisch",
      ru: "Электрический BMW",
    },
    summary: {
      ca: "Accés directe a la gamma elèctrica i híbrida. Bona peça per donar una visió actual de marca al costat del relat clàssic del club.",
      es: "Acceso directo a la gama eléctrica e híbrida. Buena pieza para dar una visión actual de marca junto al relato clásico del club.",
      fr: "Accès direct à la gamme électrique et hybride. Une bonne pièce pour donner une vision actuelle de la marque à côté du récit classique du club.",
      en: "Direct access to the electric and hybrid range. A good way to add a current brand perspective next to the club's classic story.",
      pt: "Acesso direto à gama elétrica e híbrida. Boa peça para dar uma visão atual da marca ao lado da narrativa clássica do clube.",
      de: "Direkter Zugang zur elektrischen und hybriden Modellpalette. Gut, um neben der klassischen Club-Geschichte eine aktuelle Markensicht zu bieten.",
      ru: "Прямой доступ к электрической и гибридной линейке. Хороший способ показать актуальную сторону бренда рядом с классической историей клуба.",
    },
    href: "https://www.bmw.es/es/electric-cars.html",
    cta: {
      ca: "Veure gamma elèctrica",
      es: "Ver gama eléctrica",
      fr: "Voir la gamme électrique",
      en: "View electric range",
      pt: "Ver gama elétrica",
      de: "Elektrische Modelle ansehen",
      ru: "Открыть электролинейку",
    },
    tag: { ca: "Futur", es: "Futuro", fr: "Futur", en: "Future", pt: "Futuro", de: "Zukunft", ru: "Будущее" },
  },
  {
    id: "bmw-configurator",
    title: {
      ca: "Configurador BMW",
      es: "Configurador BMW",
      fr: "Configurateur BMW",
      en: "BMW configurator",
      pt: "Configurador BMW",
      de: "BMW Konfigurator",
      ru: "Конфигуратор BMW",
    },
    summary: {
      ca: "Un enllaç útil i premium per a visitants que arriben des del club però volen saltar al producte oficial.",
      es: "Un enlace útil y premium para visitantes que llegan desde el club pero quieren saltar al producto oficial.",
      fr: "Un lien utile et premium pour les visiteurs qui arrivent depuis le club mais veulent passer au produit officiel.",
      en: "A useful premium link for visitors who arrive via the club but want to jump to the official product experience.",
      pt: "Um link útil e premium para visitantes que chegam pelo clube mas querem saltar para o produto oficial.",
      de: "Ein nützlicher Premium-Link für Besucher, die über den Club kommen und direkt zum offiziellen Produkt springen möchten.",
      ru: "Полезная премиальная ссылка для посетителей, пришедших через клуб, но желающих перейти к официальному продукту.",
    },
    href: "https://www.bmw.es/es/configurador.html",
    cta: {
      ca: "Configurar un BMW",
      es: "Configurar un BMW",
      fr: "Configurer une BMW",
      en: "Configure a BMW",
      pt: "Configurar um BMW",
      de: "BMW konfigurieren",
      ru: "Сконфигурировать BMW",
    },
    tag: { ca: "Producte", es: "Producto", fr: "Produit", en: "Product", pt: "Produto", de: "Produkt", ru: "Продукт" },
  },
  {
    id: "bmw-connecteddrive",
    title: {
      ca: "BMW ConnectedDrive",
      es: "BMW ConnectedDrive",
      fr: "BMW ConnectedDrive",
      en: "BMW ConnectedDrive",
      pt: "BMW ConnectedDrive",
      de: "BMW ConnectedDrive",
      ru: "BMW ConnectedDrive",
    },
    summary: {
      ca: "Serveix per donar una capa més contemporània i tecnològica al discurs del club.",
      es: "Sirve para dar una capa más contemporánea y tecnológica al discurso del club.",
      fr: "Permet d'ajouter une couche plus contemporaine et technologique au discours du club.",
      en: "Useful to add a more contemporary and technological layer to the club narrative.",
      pt: "Serve para dar uma camada mais contemporânea e tecnológica ao discurso do clube.",
      de: "Hilft, der Club-Erzählung eine zeitgemäßere und technologischere Ebene zu geben.",
      ru: "Помогает добавить к образу клуба более современный и технологичный слой.",
    },
    href: "https://www.bmw.es/es/digital-services/bmw-connecteddrive.html",
    cta: {
      ca: "Explorar serveis digitals",
      es: "Explorar servicios digitales",
      fr: "Explorer les services digitaux",
      en: "Explore digital services",
      pt: "Explorar serviços digitais",
      de: "Digitale Dienste entdecken",
      ru: "Изучить цифровые сервисы",
    },
    tag: { ca: "Digital", es: "Digital", fr: "Digital", en: "Digital", pt: "Digital", de: "Digital", ru: "Digital" },
  },
  {
    id: "bmw-service",
    title: {
      ca: "Servei oficial BMW",
      es: "Servicio oficial BMW",
      fr: "Service officiel BMW",
      en: "Official BMW service",
      pt: "Serviço oficial BMW",
      de: "Offizieller BMW Service",
      ru: "Официальный сервис BMW",
    },
    summary: {
      ca: "Té sentit com a recurs útil per a socis: manteniment, postvenda i ecosistema oficial.",
      es: "Tiene sentido como recurso útil para socios: mantenimiento, posventa y ecosistema oficial.",
      fr: "A du sens comme ressource utile pour les membres : entretien, après-vente et écosystème officiel.",
      en: "Makes sense as a useful member resource: maintenance, aftersales and the official ecosystem.",
      pt: "Faz sentido como recurso útil para sócios: manutenção, pós-venda e ecossistema oficial.",
      de: "Sinnvoll als nützliche Ressource für Mitglieder: Wartung, Aftersales und offizielles Ökosystem.",
      ru: "Имеет смысл как полезный ресурс для членов клуба: обслуживание, послепродажный сервис и официальный экосистемный доступ.",
    },
    href: "https://www.bmw.es/es/service-portal.html",
    cta: {
      ca: "Obrir servei oficial",
      es: "Abrir servicio oficial",
      fr: "Ouvrir le service officiel",
      en: "Open official service",
      pt: "Abrir serviço oficial",
      de: "Offiziellen Service öffnen",
      ru: "Открыть официальный сервис",
    },
    tag: { ca: "Utilitat", es: "Utilidad", fr: "Utilité", en: "Utility", pt: "Utilidade", de: "Nutzen", ru: "Полезно" },
  },
];
