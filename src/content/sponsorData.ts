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
      ca: "Patrocinador principal del club. Ofereix als socis avantatges en recanvis, accessoris i vehicle nou.",
      es: "Patrocinador principal del club. Ofrece a los socios ventajas en recambios, accesorios y vehículo nuevo.",
      fr: "Sponsor principal du club. Il propose aux membres des avantages sur les pièces, les accessoires et les véhicules neufs.",
      en: "The club's main sponsor. It offers members benefits on parts, accessories and new vehicles.",
      pt: "Patrocinador principal do clube. Oferece aos sócios vantagens em peças, acessórios e viaturas novas.",
      de: "Hauptsponsor des Clubs. Bietet Mitgliedern Vorteile bei Teilen, Zubehör und Neuwagen.",
      ru: "Главный спонсор клуба. Предлагает участникам преимущества при покупке запчастей, аксессуаров и новых автомобилей.",
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
      ca: "Hotel i restaurant a Ordino.",
      es: "Hotel y restaurante en Ordino.",
      fr: "Hôtel et restaurant à Ordino.",
      en: "Hotel and restaurant in Ordino.",
      pt: "Hotel e restaurante em Ordino.",
      de: "Hotel und Restaurant in Ordino.",
      ru: "Отель и ресторан в Ордино.",
    },
    link: { label: "Visitar", href: "https://www.hotelcoma.com/" },
  },
  {
    id: "basar-valira",
    name: "Basar Valira",
    tier: "premium",
    category: "Lifestyle / col·leccionisme",
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
      ca: "Botiga de miniatures i articles de col·leccionisme.",
      es: "Tienda de miniaturas y artículos de coleccionismo.",
      fr: "Boutique de miniatures et d'articles de collection.",
      en: "Miniatures and collectibles shop.",
      pt: "Loja de miniaturas e artigos de colecionismo.",
      de: "Geschäft für Miniaturen und Sammlerartikel.",
      ru: "Магазин миниатюр и коллекционных товаров.",
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
      ca: "Grup andorrà de serveis i mobilitat.",
      es: "Grupo andorrano de servicios y movilidad.",
      fr: "Groupe andorran de services et de mobilité.",
      en: "Andorran services and mobility group.",
      pt: "Grupo andorrano de serviços e mobilidade.",
      de: "Andorranische Unternehmensgruppe für Dienstleistungen und Mobilität.",
      ru: "Андоррская группа компаний в сфере услуг и мобильности.",
    },
    link: { label: "Web oficial", href: "https://santeloi.com/" },
  },
  {
    id: "obrador-toni",
    name: "L’Obrador d’en Toni",
    tier: "premium",
    category: "Gastronomia",
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
      ca: "Pastisseria i xurreria.",
      es: "Pastelería y churrería.",
      fr: "Pâtisserie et churros.",
      en: "Pastry and churro shop.",
      pt: "Pastelaria e churros.",
      de: "Konditorei und Churros.",
      ru: "Кондитерская и чуррерия.",
    },
    link: { label: "Visitar", href: "https://pastisseria-xurreria-obradordentoni.com/" },
  },
  {
    id: "totalenergies",
    name: "TotalEnergies",
    tier: "premium",
    category: "Energia / mobilitat",
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
      ca: "Companyia internacional d'energia i mobilitat.",
      es: "Compañía internacional de energía y movilidad.",
      fr: "Entreprise internationale d'énergie et de mobilité.",
      en: "International energy and mobility company.",
      pt: "Empresa internacional de energia e mobilidade.",
      de: "Internationales Energie- und Mobilitätsunternehmen.",
      ru: "Международная компания в сфере энергетики и мобильности.",
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
      ca: "Col·laborador històric del club.",
      es: "Colaborador histórico del club.",
      fr: "Collaborateur historique du club.",
      en: "Long-standing collaborator of the club.",
      pt: "Colaborador histórico do clube.",
      de: "Langjähriger Partner des Clubs.",
      ru: "Давний партнёр клуба.",
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
      ca: "Serveis financers i d'assegurances.",
      es: "Servicios financieros y de seguros.",
      fr: "Services financiers et d'assurance.",
      en: "Financial and insurance services.",
      pt: "Serviços financeiros e de seguros.",
      de: "Finanz- und Versicherungsdienstleistungen.",
      ru: "Финансовые и страховые услуги.",
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
      ca: "Col·laborador del club.",
      es: "Colaborador del club.",
      fr: "Collaborateur du club.",
      en: "Collaborator of the club.",
      pt: "Colaborador do clube.",
      de: "Partner des Clubs.",
      ru: "Партнёр клуба.",
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
      ca: "Taller de planxisteria i carrosseria.",
      es: "Taller de chapa y carrocería.",
      fr: "Atelier de tôlerie et de carrosserie.",
      en: "Bodywork and panel repair workshop.",
      pt: "Oficina de chapa e carroçaria.",
      de: "Karosseriewerkstatt.",
      ru: "Кузовная мастерская.",
    },
  },
];
