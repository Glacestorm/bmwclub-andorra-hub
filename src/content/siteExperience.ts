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
      ca: "Origen del relat",
      es: "Origen del relato",
      fr: "Origine du récit",
      en: "Origin story",
      pt: "Origem da história",
      de: "Ursprung der Geschichte",
      ru: "Начало истории",
    },
    summary: {
      ca: "Una de les peces històriques que millor expliquen el caràcter del club: carretera, territori i comunitat BMW a Andorra.",
      es: "Una de las piezas históricas que mejor explican el carácter del club: carretera, territorio y comunidad BMW en Andorra.",
      fr: "L'une des pièces historiques qui expliquent le mieux le caractère du club : route, territoire et communauté BMW en Andorre.",
      en: "One of the historical pieces that best explains the club's character: road, territory and BMW community in Andorra.",
      pt: "Uma das peças históricas que melhor explica o carácter do clube: estrada, território e comunidade BMW em Andorra.",
      de: "Eines der historischen Ereignisse, das den Charakter des Clubs am besten erklärt: Straße, Territorium und BMW-Community in Andorra.",
      ru: "Одно из исторических событий, лучше всего отражающих характер клуба: дорога, территория и сообщество BMW в Андорре.",
    },
    heroImage: "https://bmwclubandorra.com/images/Tour_Cevennes_Roussillon.jpg",
  },
  {
    eventId: "rally-turistic-2024",
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
      ca: "El ral·li turístic és ideal per presentar el club amb una imatge més premium: hotel, ruta, convivència i fotografies potents.",
      es: "El rally turístico es ideal para presentar el club con una imagen más premium: hotel, ruta, convivencia y fotografías potentes.",
      fr: "Le rallye touristique est idéal pour présenter le club avec une image plus premium : hôtel, itinéraire, convivialité et photographies puissantes.",
      en: "The touring rally is ideal to present the club with a more premium image: hotel, route, social atmosphere and strong photography.",
      pt: "O rally turístico é ideal para apresentar o clube com uma imagem mais premium: hotel, rota, convívio e fotografia forte.",
      de: "Die touristische Rallye eignet sich ideal, um den Club mit einem hochwertigeren Bild zu präsentieren: Hotel, Route, Gemeinschaft und starke Fotos.",
      ru: "Туристическое ралли идеально подходит, чтобы показать клуб в более премиальном образе: отель, маршрут, атмосфера и сильная фотосъёмка.",
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
      ca: "El viatge al Museu BMW dona un pont perfecte amb la marca oficial i justifica un apartat 'BMW Oficial' dins la web nova.",
      es: "El viaje al Museo BMW crea un puente perfecto con la marca oficial y justifica un apartado 'BMW Oficial' dentro de la nueva web.",
      fr: "Le voyage au Musée BMW crée un pont parfait avec la marque officielle et justifie une rubrique 'BMW Officiel' dans le nouveau site.",
      en: "The trip to the BMW Museum creates a perfect bridge with the official brand and justifies a dedicated 'BMW Official' section on the new site.",
      pt: "A viagem ao Museu BMW cria uma ponte perfeita com a marca oficial e justifica uma secção 'BMW Oficial' no novo site.",
      de: "Die Reise zum BMW Museum bildet die perfekte Brücke zur offiziellen Marke und rechtfertigt einen eigenen Bereich 'BMW Offiziell' auf der neuen Website.",
      ru: "Поездка в музей BMW создаёт идеальный мост к официальному бренду и оправдывает отдельный раздел 'BMW Official' на новом сайте.",
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
      ca: "L'aniversari és material clar per a una pàgina editorial pròpia: història, socis, fotos i arxiu documental.",
      es: "El aniversario es material claro para una página editorial propia: historia, socios, fotos y archivo documental.",
      fr: "L'anniversaire fournit un contenu évident pour une page éditoriale propre : histoire, membres, photos et archive documentaire.",
      en: "The anniversary is clear material for a dedicated editorial page: history, members, photos and document archive.",
      pt: "O aniversário é material claro para uma página editorial própria: história, sócios, fotos e arquivo documental.",
      de: "Das Jubiläum ist klares Material für eine eigene Editorial-Seite: Geschichte, Mitglieder, Fotos und Dokumentenarchiv.",
      ru: "Юбилей — очевидный материал для отдельной редакционной страницы: история, участники, фотографии и документальный архив.",
    },
    archiveIds: ["slot-2015"],
  },
  {
    eventId: "cars-coffee-2026-10-18",
    tag: {
      ca: "Proper gran moment",
      es: "Próximo gran momento",
      fr: "Prochain grand moment",
      en: "Next headline moment",
      pt: "Próximo grande momento",
      de: "Nächster Höhepunkt",
      ru: "Следующий крупный момент",
    },
    summary: {
      ca: "Ideal per convertir el calendari en una landing d'expectació: compte enrere, meteo, recorregut i presència social.",
      es: "Ideal para convertir el calendario en una landing de expectación: cuenta atrás, meteo, recorrido y presencia social.",
      fr: "Idéal pour transformer le calendrier en landing d'attente : compte à rebours, météo, parcours et présence sociale.",
      en: "Ideal to turn the calendar into a high-expectation landing: countdown, weather, route and social presence.",
      pt: "Ideal para transformar o calendário numa landing de expectativa: contagem decrescente, meteorologia, percurso e presença social.",
      de: "Ideal, um den Kalender in eine aufmerksamkeitsstarke Landingpage zu verwandeln: Countdown, Wetter, Strecke und Social-Präsenz.",
      ru: "Идеально, чтобы превратить календарь в страницу ожидания: обратный отсчёт, погода, маршрут и социальное присутствие.",
    },
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: "slot-2015",
    type: "pdf",
    year: "2015",
    title: "2n Campionat Slot 2015 - Classificació",
    href: "https://bmwclubandorra.com/images/2n_Campionat_Slot_2015_Classif_07.pdf",
    summary: {
      ca: "Document recuperat del lloc antic. Ideal per obrir una hemeroteca real del club amb resultats, cartells i PDFs històrics.",
      es: "Documento recuperado del sitio antiguo. Ideal para abrir una hemeroteca real del club con resultados, carteles y PDFs históricos.",
      fr: "Document récupéré de l'ancien site. Idéal pour ouvrir une véritable hémérothèque du club avec résultats, affiches et PDF historiques.",
      en: "Document recovered from the old site. Ideal to open a real club archive with results, posters and historical PDFs.",
      pt: "Documento recuperado do site antigo. Ideal para abrir uma hemeroteca real do clube com resultados, cartazes e PDFs históricos.",
      de: "Dokument von der alten Website wiederhergestellt. Ideal für ein echtes Club-Archiv mit Ergebnissen, Postern und historischen PDFs.",
      ru: "Документ, восстановленный со старого сайта. Идеально подходит для настоящего архива клуба с результатами, афишами и историческими PDF.",
    },
    accent: "PDF",
    sizeHint: "303 KB",
  },
  {
    id: "classic-live-05",
    type: "pdf",
    year: "Classic",
    title: "BMW Classic Live 05/1",
    href: "https://bmwclubandorra.com/images/revistes/BMW_Classic_live/Mobile_Tradition_live_05_1_D.pdf",
    summary: {
      ca: "Revista recuperada del repositori antic. Aporta profunditat editorial i encaixa molt bé en un 'Arxiu del Club'.",
      es: "Revista recuperada del repositorio antiguo. Aporta profundidad editorial y encaja muy bien en un 'Archivo del Club'.",
      fr: "Magazine récupéré du dépôt ancien. Il apporte de la profondeur éditoriale et s'intègre très bien dans un 'Archive du Club'.",
      en: "Magazine recovered from the old repository. It adds editorial depth and fits perfectly into a 'Club Archive'.",
      pt: "Revista recuperada do repositório antigo. Dá profundidade editorial e encaixa muito bem num 'Arquivo do Clube'.",
      de: "Magazin aus dem alten Bestand wiederhergestellt. Es bringt editoriale Tiefe und passt perfekt in ein 'Club-Archiv'.",
      ru: "Журнал, восстановленный из старого архива. Он добавляет редакционную глубину и отлично подходит для 'Архива клуба'.",
    },
    accent: "PDF",
    sizeHint: "2.4 MB",
  },
  {
    id: "classic-live-03",
    type: "pdf",
    year: "Classic",
    title: "BMW Classic Live 03/3",
    href: "https://bmwclubandorra.com/images/revistes/BMW_Classic_live/Mobile_Tradition_live_03_3_D.pdf",
    summary: {
      ca: "Segona peça editorial recuperada. Reforça la idea de marca, col·leccionisme i passió BMW més enllà de les sortides.",
      es: "Segunda pieza editorial recuperada. Refuerza la idea de marca, coleccionismo y pasión BMW más allá de las salidas.",
      fr: "Deuxième pièce éditoriale récupérée. Elle renforce l'idée de marque, de collection et de passion BMW au-delà des sorties.",
      en: "Second recovered editorial piece. It reinforces the idea of brand, collecting and BMW passion beyond outings.",
      pt: "Segunda peça editorial recuperada. Reforça a ideia de marca, colecionismo e paixão BMW para além dos passeios.",
      de: "Zweites wiederhergestelltes Redaktionsstück. Es verstärkt die Idee von Marke, Sammelleidenschaft und BMW-Passion über Ausfahrten hinaus.",
      ru: "Второй восстановленный редакционный материал. Он усиливает тему бренда, коллекционирования и страсти к BMW за пределами выездов.",
    },
    accent: "PDF",
    sizeHint: "1.7 MB",
  },
  {
    id: "tour-cevennes-image",
    type: "image",
    year: "2022",
    title: "Tour Cevennes Roussillon",
    href: "https://bmwclubandorra.com/images/Tour_Cevennes_Roussillon.jpg",
    summary: {
      ca: "Imatge històrica gran i usable per a seccions editorials, portades de viatges o una cronologia visual del club.",
      es: "Imagen histórica grande y usable para secciones editoriales, portadas de viajes o una cronología visual del club.",
      fr: "Grande image historique exploitable pour des sections éditoriales, couvertures de voyages ou une chronologie visuelle du club.",
      en: "Large historical image usable for editorial sections, trip covers or a visual timeline of the club.",
      pt: "Imagem histórica grande e útil para secções editoriais, capas de viagens ou uma cronologia visual do clube.",
      de: "Großes historisches Bild, nutzbar für redaktionelle Bereiche, Reise-Cover oder eine visuelle Timeline des Clubs.",
      ru: "Крупное историческое изображение, подходящее для редакционных блоков, обложек поездок или визуальной хронологии клуба.",
    },
    accent: "IMG",
    sizeHint: "301 KB",
  },
  {
    id: "gopro-2015-video",
    type: "video",
    year: "2015",
    title: "GOPR0232.MP4",
    href: "https://bmwclubandorra.com/images/GOPR0232.MP4",
    summary: {
      ca: "Vídeo històric molt pesat. Jo no el serviria directament a portada, però sí com a peça d'arxiu o vídeo destacat amb previsualització pròpia.",
      es: "Vídeo histórico muy pesado. Yo no lo serviría directamente en portada, pero sí como pieza de archivo o vídeo destacado con previsualización propia.",
      fr: "Vidéo historique très lourde. Je ne la servirais pas directement en page d'accueil, mais oui comme pièce d'archive ou vidéo mise en avant avec prévisualisation propre.",
      en: "Very large historical video. I would not serve it directly on the homepage, but it fits as an archive piece or featured video with its own preview.",
      pt: "Vídeo histórico muito pesado. Não o colocaria diretamente na homepage, mas sim como peça de arquivo ou vídeo em destaque com pré-visualização própria.",
      de: "Sehr großes historisches Video. Ich würde es nicht direkt auf der Startseite ausspielen, aber als Archivstück oder Featured-Video mit eigener Vorschau nutzen.",
      ru: "Очень тяжёлое историческое видео. Я бы не размещал его напрямую на главной, но использовал бы как архивный материал или отдельный выделенный ролик с собственной превью.",
    },
    accent: "VIDEO",
    sizeHint: "742 MB",
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
