import { LocalizedText } from "@/content/siteExperience";

export type SponsorLink = {
  label: string;
  href: string;
};

export type SponsorBrand = {
  logoPath: string;
  logoFit?: "standard" | "wide" | "tall";
  accent: string;
  surface: string;
  border: string;
  text: string;
  badge: string;
};

export type SponsorItem = {
  id: string;
  name: string;
  tier: "featured" | "premium" | "support";
  category: string;
  summary: LocalizedText;
  benefit?: LocalizedText;
  accent?: string;
  link?: SponsorLink;
  brand: SponsorBrand;
};

export const sponsorItems: SponsorItem[] = [
  {
    id: "pyrenees-andorra",
    name: "Pyrénées Andorra",
    tier: "featured",
    category: "Automoció / retail",
    accent: "Sponsor principal",
    brand: {
      logoPath: "/sponsors/pyrenees-andorra-source.png",
      logoFit: "wide",
      accent: "#d4af37",
      surface: "linear-gradient(135deg, rgba(17,24,39,0.98) 0%, rgba(38,38,38,0.96) 100%)",
      border: "rgba(212,175,55,0.34)",
      text: "#ffffff",
      badge: "rgba(212,175,55,0.16)",
    },
    summary: {
      ca: "Peça clau per projectar una relació premium amb la marca i amb el món BMW a Andorra.",
      es: "Pieza clave para proyectar una relación premium con la marca y con el mundo BMW en Andorra.",
      fr: "Pièce clé pour projeter une relation premium avec la marque et l'univers BMW en Andorre.",
      en: "Key partner to project a premium relationship with the brand and the BMW world in Andorra.",
      pt: "Peça-chave para projetar uma relação premium com a marca e com o universo BMW em Andorra.",
      de: "Schlüsselpartner, um eine Premium-Beziehung zur Marke und zur BMW-Welt in Andorra auszustrahlen.",
      ru: "Ключевой партнёр для премиального позиционирования клуба рядом с брендом и миром BMW в Андорре.",
    },
    benefit: {
      ca: "15% de descompte en recanvis i accessoris, condicions especials en vehicle nou i avantatges financers per als socis.",
      es: "15% de descuento en recambios y accesorios, condiciones especiales en vehículo nuevo y ventajas financieras para socios.",
      fr: "15% de réduction sur les pièces et accessoires, conditions spéciales sur véhicule neuf et avantages financiers pour les membres.",
      en: "15% discount on parts and accessories, special new-car conditions and financial perks for members.",
      pt: "15% de desconto em peças e acessórios, condições especiais em viatura nova e vantagens financeiras para sócios.",
      de: "15 % Rabatt auf Teile und Zubehör, Sonderkonditionen für Neuwagen und Finanzierungsvorteile für Mitglieder.",
      ru: "Скидка 15% на запчасти и аксессуары, специальные условия на новые автомобили и финансовые преимущества для участников.",
    },
    link: { label: "Web oficial", href: "https://www.pyrenees.ad/" },
  },
  {
    id: "coma-hotel",
    name: "Coma Hotel Restaurant Ordino",
    tier: "premium",
    category: "Hospitality",
    accent: "Partner premium",
    brand: {
      logoPath: "/sponsors/coma-hotel.svg",
      logoFit: "wide",
      accent: "#a16207",
      surface: "linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.98) 100%)",
      border: "rgba(161,98,7,0.24)",
      text: "#1f2937",
      badge: "rgba(161,98,7,0.10)",
    },
    summary: {
      ca: "Un partner ideal per associar el club amb experiència, territori i trobades amb nivell.",
      es: "Un partner ideal para asociar el club con experiencia, territorio y encuentros con nivel.",
      fr: "Un partenaire idéal pour associer le club à l'expérience, au territoire et à des rencontres con nivel.",
      en: "An ideal partner to associate the club with experience, local territory and refined meetups.",
      pt: "Um parceiro ideal para associar o clube a experiência, território e encontros com nível.",
      de: "Ein idealer Partner, um den Club mit Erlebnis, Region und hochwertigen Treffen zu verbinden.",
      ru: "Идеальный партнёр, чтобы связать клуб с опытом, территорией и встречами высокого уровня.",
    },
    link: { label: "Visitar", href: "https://www.hotelcoma.com/" },
  },
  {
    id: "basar-valira",
    name: "Basar Valira",
    tier: "premium",
    category: "Lifestyle / col·leccionisme",
    accent: "Benefici per a socis",
    brand: {
      logoPath: "/sponsors/basar-valira-source.jpg",
      logoFit: "wide",
      accent: "#2563eb",
      surface: "linear-gradient(135deg, rgba(239,246,255,0.96) 0%, rgba(255,255,255,0.98) 100%)",
      border: "rgba(37,99,235,0.22)",
      text: "#0f172a",
      badge: "rgba(37,99,235,0.10)",
    },
    summary: {
      ca: "Encaixa molt bé per a una presentació de lifestyle BMW: miniatures, afició i compra especialitzada.",
      es: "Encaja muy bien para una presentación de lifestyle BMW: miniaturas, afición y compra especializada.",
      fr: "S'intègre très bien dans une présentation lifestyle BMW : miniatures, passion et achat spécialisé.",
      en: "Fits perfectly into a BMW lifestyle presentation: miniatures, enthusiasm and specialist shopping.",
      pt: "Encaixa muito bem numa apresentação lifestyle BMW: miniaturas, paixão e compra especializada.",
      de: "Passt perfekt in eine BMW-Lifestyle-Präsentation: Miniaturen, Leidenschaft und Fachhandel.",
      ru: "Отлично подходит для BMW lifestyle-подачи: миниатюры, увлечение и специализированные покупки.",
    },
    benefit: {
      ca: "10% de descompte presentant el carnet de soci a la botiga de miniatures.",
      es: "10% de descuento presentando el carnet de socio en la tienda de miniaturas.",
      fr: "10% de réduction sur présentation de la carte de membre à la boutique de miniatures.",
      en: "10% discount when presenting the member card at the miniature store.",
      pt: "10% de desconto apresentando o cartão de sócio na loja de miniaturas.",
      de: "10 % Rabatt gegen Vorlage der Mitgliedskarte im Miniaturen-Shop.",
      ru: "Скидка 10% при предъявлении клубной карты в магазине миниатюр.",
    },
    link: { label: "Visitar", href: "https://basarvalira.com/gb/" },
  },
  {
    id: "santeloi",
    name: "Santeloi Grup",
    tier: "premium",
    category: "Serveis / mobilitat",
    accent: "Partner local",
    brand: {
      logoPath: "/sponsors/santeloi-source.png",
      logoFit: "wide",
      accent: "#16a34a",
      surface: "linear-gradient(135deg, rgba(240,253,244,0.96) 0%, rgba(255,255,255,0.98) 100%)",
      border: "rgba(22,163,74,0.22)",
      text: "#111827",
      badge: "rgba(22,163,74,0.10)",
    },
    summary: {
      ca: "Un nom fort del teixit local andorrà. Dona credibilitat, arrelament i presència comercial.",
      es: "Un nombre fuerte del tejido local andorrano. Aporta credibilidad, arraigo y presencia comercial.",
      fr: "Un nom fort du tissu local andorran. Il apporte crédibilité, enracinement et présence commerciale.",
      en: "A strong name in Andorra's local business network. It adds credibility, roots and commercial presence.",
      pt: "Um nome forte do tecido local andorrano. Traz credibilidade, enraizamento e presença comercial.",
      de: "Ein starker Name im lokalen Wirtschaftsnetz Andorras. Er bringt Glaubwürdigkeit, Verwurzelung und kommerzielle Präsenz.",
      ru: "Сильное имя в локальной деловой среде Андорры. Даёт доверие, локальную опору и коммерческое присутствие.",
    },
    link: { label: "Web oficial", href: "https://santeloi.com/" },
  },
  {
    id: "obrador-toni",
    name: "L’Obrador d’en Toni",
    tier: "premium",
    category: "Gastronomia",
    accent: "Partner gourmet",
    brand: {
      logoPath: "/sponsors/obrador-toni-source.png",
      logoFit: "tall",
      accent: "#d97706",
      surface: "linear-gradient(135deg, rgba(255,247,237,0.96) 0%, rgba(255,255,255,0.98) 100%)",
      border: "rgba(217,119,6,0.22)",
      text: "#3f2d20",
      badge: "rgba(217,119,6,0.10)",
    },
    summary: {
      ca: "Perfecte per reforçar l'ambient de trobades, esmorzars i experiència local de qualitat.",
      es: "Perfecto para reforzar el ambiente de encuentros, desayunos y experiencia local de calidad.",
      fr: "Parfait pour renforcer l'ambiance des rencontres, petits-déjeuners et expérience locale de qualité.",
      en: "Perfect to reinforce the atmosphere of meetups, breakfasts and high-quality local experience.",
      pt: "Perfeito para reforçar o ambiente de encontros, pequenos-almoços e experiência local de qualidade.",
      de: "Perfekt, um das Ambiente von Treffen, Frühstücken und lokaler Qualitätserfahrung zu stärken.",
      ru: "Идеально усиливает атмосферу встреч, завтраков и качественного локального опыта.",
    },
    link: { label: "Visitar", href: "https://pastisseria-xurreria-obradordentoni.com/" },
  },
  {
    id: "totalenergies",
    name: "TotalEnergies",
    tier: "premium",
    category: "Energia / mobilitat",
    accent: "Marca global",
    brand: {
      logoPath: "/sponsors/totalenergies-source.png",
      logoFit: "tall",
      accent: "#ef4444",
      surface: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,245,245,0.96) 100%)",
      border: "rgba(239,68,68,0.20)",
      text: "#111827",
      badge: "rgba(239,68,68,0.10)",
    },
    summary: {
      ca: "Aporta una capa més internacional i automobilística al relat del panell de patrocinadors.",
      es: "Aporta una capa más internacional y automovilística al relato del panel de patrocinadores.",
      fr: "Apporte une couche plus internationale et automobile au récit du panneau de sponsors.",
      en: "Adds a more international and automotive layer to the sponsor panel narrative.",
      pt: "Acrescenta uma camada mais internacional e automóvel ao painel de patrocinadores.",
      de: "Bringt eine internationalere und automobilere Ebene in die Sponsoren-Präsentation.",
      ru: "Добавляет панели спонсоров более международный и автомобильный характер.",
    },
    link: { label: "Web oficial", href: "https://totalenergies.com/spain" },
  },
  {
    id: "ada-sl",
    name: "ADA SL",
    tier: "support",
    category: "Partner de suport",
    brand: {
      logoPath: "/sponsors/ada-sl.svg",
      logoFit: "standard",
      accent: "#38bdf8",
      surface: "linear-gradient(135deg, rgba(248,250,252,0.98) 0%, rgba(239,246,255,0.96) 100%)",
      border: "rgba(56,189,248,0.20)",
      text: "#111827",
      badge: "rgba(56,189,248,0.10)",
    },
    summary: {
      ca: "Col·laborador històric dins l'ecosistema del club.",
      es: "Colaborador histórico dentro del ecosistema del club.",
      fr: "Collaborateur historique au sein de l'écosystème du club.",
      en: "Long-standing collaborator within the club ecosystem.",
      pt: "Colaborador histórico dentro do ecossistema do clube.",
      de: "Langjähriger Partner innerhalb des Club-Ökosystems.",
      ru: "Исторический партнёр внутри экосистемы клуба.",
    },
  },
  {
    id: "financera-assegurances",
    name: "Financera d’Assegurances",
    tier: "support",
    category: "Finances / assegurances",
    brand: {
      logoPath: "/sponsors/financera-assegurances-source.png",
      logoFit: "wide",
      accent: "#14b8a6",
      surface: "linear-gradient(135deg, rgba(240,253,250,0.98) 0%, rgba(255,255,255,0.96) 100%)",
      border: "rgba(20,184,166,0.20)",
      text: "#1f2937",
      badge: "rgba(20,184,166,0.10)",
    },
    summary: {
      ca: "Suport vinculat a condicions i avantatges per als membres.",
      es: "Apoyo vinculado a condiciones y ventajas para los miembros.",
      fr: "Soutien lié à des conditions et avantages pour les membres.",
      en: "Support connected to conditions and benefits for members.",
      pt: "Apoio ligado a condições e vantagens para os sócios.",
      de: "Unterstützung im Zusammenhang mit Konditionen und Vorteilen für Mitglieder.",
      ru: "Поддержка, связанная с условиями и преимуществами для участников.",
    },
    link: { label: "Web oficial", href: "https://e-financera.com/" },
  },
  {
    id: "eric",
    name: "Eric",
    tier: "support",
    category: "Col·laborador",
    brand: {
      logoPath: "/sponsors/eric.svg",
      logoFit: "standard",
      accent: "#8b5cf6",
      surface: "linear-gradient(135deg, rgba(250,245,255,0.98) 0%, rgba(255,255,255,0.96) 100%)",
      border: "rgba(139,92,246,0.20)",
      text: "#111827",
      badge: "rgba(139,92,246,0.10)",
    },
    summary: {
      ca: "Presència de suport dins la xarxa de col·laboradors del club.",
      es: "Presencia de apoyo dentro de la red de colaboradores del club.",
      fr: "Présence de soutien au sein du réseau de collaborateurs du club.",
      en: "Support presence within the club's collaborator network.",
      pt: "Presença de apoio dentro da rede de colaboradores do clube.",
      de: "Unterstützende Präsenz im Netzwerk der Club-Kooperationspartner.",
      ru: "Поддерживающее присутствие в сети партнёров клуба.",
    },
  },
  {
    id: "planxisteria-auto-parc",
    name: "Planxisteria Auto Parc",
    tier: "support",
    category: "Taller / carrosseria",
    brand: {
      logoPath: "/sponsors/planxisteria-auto-parc-source.png",
      logoFit: "wide",
      accent: "#f97316",
      surface: "linear-gradient(135deg, rgba(255,247,237,0.98) 0%, rgba(255,255,255,0.96) 100%)",
      border: "rgba(249,115,22,0.20)",
      text: "#111827",
      badge: "rgba(249,115,22,0.10)",
    },
    summary: {
      ca: "Col·laborador amb encaix natural dins el relat de cura del vehicle i postvenda local.",
      es: "Colaborador con encaje natural dentro del relato de cuidado del vehículo y posventa local.",
      fr: "Collaborateur naturellement aligné avec l'entretien du véhicule et l'après-vente locale.",
      en: "A natural fit within the vehicle care and local aftersales story.",
      pt: "Colaborador com encaixe natural na narrativa de cuidado do veículo e pós-venda local.",
      de: "Passt natürlich in die Geschichte von Fahrzeugpflege und lokalem Aftersales.",
      ru: "Естественно вписывается в тему ухода за автомобилем и локального сервиса.",
    },
  },
];
