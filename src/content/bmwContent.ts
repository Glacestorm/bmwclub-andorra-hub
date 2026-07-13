export type LinkItem = {
  label: string;
  href: string;
};

export type HeroBlock = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  primaryCta?: LinkItem;
  secondaryCta?: LinkItem;
};

export type IntroSection = {
  type: "intro";
  title?: string;
  body: string[];
};

export type CardsSection = {
  type: "cards";
  title: string;
  items: Array<{
    title: string;
    text: string;
    href?: string;
  }>;
};

export type SponsorsSection = {
  type: "sponsors";
  featured?: {
    name: string;
    benefits: string[];
  };
  partners: Array<{
    name: string;
    note?: string;
  }>;
};

export type PageSection = IntroSection | CardsSection | SponsorsSection;

export type GalleryAlbum = {
  title: string;
  year?: number;
};

export type GalleryGroup = {
  title: string;
  href: string;
  children?: Array<{
    title: string;
    href: string;
  }>;
};

export type PageContent = {
  slug: string;
  seoTitle: string;
  hero: HeroBlock;
  intro?: string;
  sections?: PageSection[];
  groups?: GalleryGroup[];
  albums?: GalleryAlbum[];
  legacyImage?: {
    src: string;
    alt: string;
  };
  disclaimer?: string;
  implementationNote?: string;
};

export const bmwContent: Record<string, PageContent> = {
  portada: {
    slug: "/",
    seoTitle: "BMW Club Andorra",
    hero: {
      eyebrow: "BMW Club Andorra",
      title: "La passió per BMW, compartida a Andorra",
      subtitle:
        "Comunitat, trobades, rutes i experiències per a propietaris i aficionats de la marca.",
      primaryCta: { label: "Veure calendari 2026", href: "/calendari/2026" },
      secondaryCta: { label: "Descobrir el club", href: "/el-club" },
    },
    sections: [
      {
        type: "intro",
        title: "Benvingut/da al BMW Club Andorra",
        body: [
          "Som una comunitat de propietaris i aficionats de BMW que comparteix la mateixa passió per la marca, la conducció i les experiències a la carretera.",
          "Aquí trobaràs un espai per connectar amb altres socis, participar en trobades i sortides, descobrir el calendari viu del club i reviure els millors moments de la comunitat.",
          "Tant si t’apassionen els models clàssics com els últims llançaments, al BMW Club Andorra hi trobaràs ambient, afició i bon companyonia.",
        ],
      },
      {
        type: "cards",
        title: "Què hi trobaràs",
        items: [
          {
            title: "Sortides i trobades",
            text: "Esmorzars, rutes, activitats i el calendari públic complet del club.",
            href: "/calendari/2026",
          },
          {
            title: "Comunitat BMW",
            text: "Un punt de trobada per a propietaris i aficionats amb esperit de club i amistat.",
            href: "/el-club",
          },
          {
            title: "Galeria del club",
            text: "Fotografies i moments destacats de les activitats del club al llarg dels anys.",
            href: "/galeria",
          },
        ],
      },
    ],
  },
  patrocinadors: {
    slug: "/patrocinadors",
    seoTitle: "Patrocinadors | BMW Club Andorra",
    hero: {
      title: "Sponsors i col·laboradors",
      subtitle: "Empreses i marques que donen suport a l’activitat del BMW Club Andorra.",
    },
    intro:
      "Agraïm el suport dels nostres sponsors i col·laboradors, que ens ajuden a fer possible les activitats, trobades i experiències del club.",
    sections: [
      {
        type: "sponsors",
        featured: {
          name: "Pyrénées Andorra",
          benefits: [
            "15% de descompte en recanvis i accessoris",
            "Descompte especial en la compra de vehicles nous",
            "Tarifa especial a través de Societat Financera Pyrénées",
          ],
        },
        partners: [
          { name: "ADA SL" },
          { name: "Financera d’Assegurances" },
          { name: "Coma Hotel Restaurant Ordino" },
          { name: "Eric" },
          {
            name: "Basar Valira",
            note: "10% de descompte presentant el carnet de soci a la botiga de miniatures",
          },
          { name: "L’Obrador d’en Toni" },
          { name: "Planxisteria Auto Parc" },
          { name: "Santeloi Grup" },
          { name: "TotalEnergies" },
        ],
      },
    ],
    legacyImage: {
      src: "/club/patrocinadors-legacy.jpg",
      alt: "Sponsors i col·laboradors BMW Club Andorra",
    },
  },
  galeria: {
    slug: "/galeria",
    seoTitle: "Galeria | BMW Club Andorra",
    hero: {
      title: "Galeria",
      subtitle:
        "Reviveix els moments més especials del BMW Club Andorra a través de les nostres sortides, trobades i esdeveniments.",
    },
    groups: [
      {
        title: "Fotos històriques",
        href: "/galeria/historiques",
        children: [
          { title: "Anys 2011 / 2012", href: "/galeria/historiques/2011-2012" },
          { title: "Anys 2013 / 2014 / 2015", href: "/galeria/historiques/2013-2015" },
          { title: "Anys 2016 / 2020 / 2021", href: "/galeria/historiques/2016-2021" },
          { title: "Any 2022", href: "/galeria/historiques/2022" },
        ],
      },
      {
        title: "Sortides recents",
        href: "/galeria/sortides/2024",
        children: [
          { title: "Any 2024", href: "/galeria/sortides/2024" },
          { title: "Any 2025", href: "/galeria/sortides/2025" },
          { title: "Any 2026", href: "/galeria/sortides/2026" },
        ],
      },
    ],
  },
  historiques: {
    slug: "/galeria/historiques",
    seoTitle: "Fotos històriques | BMW Club Andorra",
    hero: {
      title: "Fotos històriques",
      subtitle:
        "Recull d’imatges històriques del club amb sortides, trobades i moments destacats d’anys anteriors.",
    },
    groups: [
      { title: "Anys 2011 / 2012", href: "/galeria/historiques/2011-2012" },
      { title: "Anys 2013 / 2014 / 2015", href: "/galeria/historiques/2013-2015" },
      { title: "Anys 2016 / 2020 / 2021", href: "/galeria/historiques/2016-2021" },
      { title: "Any 2022", href: "/galeria/historiques/2022" },
    ],
  },
  historiques_2011_2012: {
    slug: "/galeria/historiques/2011-2012",
    seoTitle: "Anys 2011 / 2012 | BMW Club Andorra",
    hero: { title: "Anys 2011 / 2012" },
    albums: [{ title: "Rally Andorra 03/09/2011" }],
  },
  historiques_2013_2015: {
    slug: "/galeria/historiques/2013-2015",
    seoTitle: "Anys 2013 / 2014 / 2015 | BMW Club Andorra",
    hero: { title: "Anys 2013 / 2014 / 2015" },
    albums: [
      { year: 2013, title: "Calçotada 14/04/2013" },
      { year: 2013, title: "Sortida França 12/05/2013" },
      { year: 2013, title: "Gimcana 16/06/2013" },
      { year: 2013, title: "Trobada BMW 21/09/2013" },
      { year: 2013, title: "Cloenda 17/11/2013" },
      { year: 2014, title: "Calçotada 30/03/2014" },
      { year: 2014, title: "Viatge a la Prehistoria 11/05/2014" },
      { year: 2014, title: "Crono 15/06/2014" },
      { year: 2014, title: "R3 Andorra 11/09/2014" },
      { year: 2014, title: "Llosa 28/09/2014" },
      { year: 2014, title: "Cloenda 09/11/2014" },
      { year: 2014, title: "Winter 20/12/2014" },
      { year: 2015, title: "Visita Bages 28/02/2015" },
      { year: 2015, title: "Viratges 22/03/2015" },
    ],
  },
  historiques_2016_2021: {
    slug: "/galeria/historiques/2016-2021",
    seoTitle: "Anys 2016 / 2020 / 2021 | BMW Club Andorra",
    hero: { title: "Anys 2016 / 2020 / 2021" },
    albums: [
      { year: 2016, title: "Crono Clàssic 2016" },
      { year: 2016, title: "Sortida Riudoms 2016" },
      { year: 2016, title: "Trobada BMW 2016" },
      { year: 2020, title: "Rally Andorra 2020" },
      { year: 2021, title: "Rally Andorra 2021" },
      { year: 2021, title: "Sortida Cloenda Temporada 11/2021" },
    ],
  },
  historiques_2022: {
    slug: "/galeria/historiques/2022",
    seoTitle: "Any 2022 | BMW Club Andorra",
    hero: { title: "Any 2022" },
    albums: [
      { title: "Sortida Calçotada 27/03/2022" },
      { title: "Tour Auto 24 al 30/04/2022" },
      { title: "Sortida França 15/05/2022" },
      { title: "Sortida Andorra 19/06/2022" },
      { title: "Rally Turístic 01/10/2022" },
      { title: "Cloenda 13/11/2022" },
    ],
  },
  sortides_2024: {
    slug: "/galeria/sortides/2024",
    seoTitle: "Any 2024 | BMW Club Andorra",
    hero: { title: "Any 2024", subtitle: "Recull de les sortides i trobades del club durant el 2024." },
    albums: [
      { title: "Esmorzar 25/02/2024" },
      { title: "Sortida a Espanya 24/03/2024" },
      { title: "Esmorzar 21/04/2024" },
      { title: "Sortida a França 12/05/2024" },
      { title: "Esmorzar 09/06/2024" },
      { title: "Esmorzar 22/09/2024" },
      { title: "V Ral·li Turístic Lloret 07/10/2024" },
      { title: "Cloenda 11/11/2024" },
    ],
  },
  sortides_2025: {
    slug: "/galeria/sortides/2025",
    seoTitle: "Any 2025 | BMW Club Andorra",
    hero: { title: "Any 2025", subtitle: "Recull de les activitats, sortides i trobades del club durant el 2025." },
    albums: [
      { title: "Cars & Coffee 23/02/2025" },
      { title: "Sortida a Espanya 30/03/2025" },
      { title: "Cars & Coffee 13/04/2025" },
      { title: "Sortida a França 18/05/2025" },
      { title: "Cars & Coffee 22/06/2025" },
      { title: "Viatge al Museu BMW - Munich 03/07/2025 - 06/07/2025" },
      { title: "Cars & Coffee 20/07/2025" },
      { title: "Cars & Coffee 14/09/2025" },
      { title: "VI Rally Turistic 04-05/10/2025" },
      { title: "Cars & Coffee 26/10/2025" },
      { title: "Sopar 20 Aniversari Andorra 08/11/2025" },
    ],
  },
  sortides_2026: {
    slug: "/galeria/sortides/2026",
    seoTitle: "Any 2026 | BMW Club Andorra",
    hero: { title: "Any 2026", subtitle: "Recull de les primeres activitats i trobades del club durant el 2026." },
    albums: [
      { title: "1r Cars & Coffee 01/03/2026" },
      { title: "Sortida a Cerdanya 29/03/2026" },
      { title: "2n Cars & Coffee 19/04/2026" },
      { title: "4º Cars & Coffee 12/07/2026" },
      { title: "5º Cars & Coffee 18/10/2026" },
    ],
  },
  meteo: {
    slug: "/meteo",
    seoTitle: "Meteo | BMW Club Andorra",
    hero: {
      title: "Meteo",
      subtitle: "Consulta la previsió meteorològica abans de les sortides i activitats del club.",
    },
    intro:
      "Aquest espai està reservat per a una integració meteorològica real per Andorra, útil per planificar trobades, esmorzars i rutes.",
    disclaimer: "Informació orientativa.",
    implementationNote:
      "La pàgina original no era fiable per migrar tal com estava. Quan hi hagi widget nou, es podrà publicar al menú.",
  },
};

export const galleryPageKeys = [
  "historiques_2011_2012",
  "historiques_2013_2015",
  "historiques_2016_2021",
  "historiques_2022",
  "sortides_2024",
  "sortides_2025",
  "sortides_2026",
] as const;
