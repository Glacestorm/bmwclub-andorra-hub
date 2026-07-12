export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalPageKey = "privacitat" | "cookies" | "condicions";

export type LegalPageContent = {
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

export const legalContent: Record<LegalPageKey, LegalPageContent> = {
  privacitat: {
    title: "Privacitat",
    intro:
      "BMW Club Andorra utilitza les dades de contacte que la persona usuària facilita únicament per respondre consultes, gestionar comunicacions relacionades amb el club i mantenir una relació adequada amb socis, interessats i col·laboradors.",
    updatedAt: "12 de juliol de 2026",
    sections: [
      {
        title: "Dades que es poden tractar",
        paragraphs: [
          "Nom, correu electrònic, telèfon i qualsevol informació inclosa voluntàriament en els missatges enviats al club.",
          "No es demanen dades especialment sensibles a través d’aquesta web.",
        ],
      },
      {
        title: "Finalitat del tractament",
        paragraphs: [
          "Atendre consultes, gestionar sol·licituds d’informació i mantenir comunicacions sobre activitats, trobades o serveis vinculats al BMW Club Andorra.",
          "Les dades no es venen a tercers ni s’utilitzen per a finalitats alienes a l’activitat del club.",
        ],
      },
      {
        title: "Conservació i drets",
        paragraphs: [
          "Les dades es conserven només durant el temps necessari per atendre la consulta o mantenir la relació amb la persona interessada.",
          "Per exercir drets d’accés, rectificació, supressió o oposició, es pot contactar a bmwclubandorra@gmail.com.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookies",
    intro:
      "Aquesta web pot utilitzar cookies tècniques mínimes necessàries per al funcionament i, si en el futur s’incorporen eines de mesura o contingut extern, s’haurà d’actualitzar aquest avís.",
    updatedAt: "12 de juliol de 2026",
    sections: [
      {
        title: "Què són les cookies",
        paragraphs: [
          "Les cookies són petits fitxers que el navegador desa per recordar preferències o facilitar el funcionament d’una pàgina web.",
        ],
      },
      {
        title: "Tipus d’ús actual",
        paragraphs: [
          "En l’estat actual del lloc, l’ús previst és principalment tècnic: navegació, rendiment bàsic i visualització correcta del contingut.",
          "Si més endavant s’afegeixen analítica, vídeos incrustats o mapes de tercers, aquest text s’haurà d’ampliar abans de publicar aquests serveis.",
        ],
      },
      {
        title: "Com gestionar-les",
        paragraphs: [
          "La persona usuària pot eliminar o bloquejar cookies des de la configuració del seu navegador.",
          "Bloquejar determinades cookies pot afectar el funcionament normal de la web.",
        ],
      },
    ],
  },
  condicions: {
    title: "Condicions d’ús",
    intro:
      "L’accés a aquesta web implica acceptar un ús correcte dels continguts publicats pel BMW Club Andorra i el respecte a la informació, marques i materials visibles al lloc.",
    updatedAt: "12 de juliol de 2026",
    sections: [
      {
        title: "Ús del lloc web",
        paragraphs: [
          "La web té una finalitat informativa sobre el club, les seves activitats, patrocinadors, galeries i canals de contacte.",
          "No es permet utilitzar el lloc per a activitats il·lícites, intents d’accés no autoritzat o accions que perjudiquin el servei.",
        ],
      },
      {
        title: "Propietat intel·lectual",
        paragraphs: [
          "Els textos, imatges, logotips i materials del club o de tercers mantenen els seus drets corresponents i no es poden reproduir sense autorització quan aquesta sigui necessària.",
          "BMW i el logotip BMW són marques de BMW AG.",
        ],
      },
      {
        title: "Responsabilitat",
        paragraphs: [
          "BMW Club Andorra procurarà mantenir la informació actualitzada, però pot modificar continguts, activitats o dades de contacte sense avís previ.",
          "El club no es fa responsable de l’ús que tercers facin de la informació publicada ni dels continguts accessibles mitjançant enllaços externs.",
        ],
      },
    ],
  },
};
