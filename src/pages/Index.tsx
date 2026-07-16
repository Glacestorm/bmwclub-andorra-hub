import { Link } from "react-router-dom";
import { ArrowRight, Archive, BadgeCheck, Calendar, Globe2, Mic, Sparkles, Stars, Volume2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { HomeWelcomeShowcase } from "@/components/home/HomeWelcomeShowcase";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { archiveItems, featuredEventMeta, officialBmwLinks } from "@/content/siteExperience";
import { sponsorItems } from "@/content/sponsorData";
import { getEventById } from "@/lib/calendar";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    ethos: "Experiència BMW amb més pes, més context i millor disseny.",
    pillars: "Nou enfocament",
    pillarsTitle: "Web més potent, més moderna i amb narrativa pròpia",
    pillarsSubtitle: "Calendari viu, meteo útil, arxiu real i accés directe a BMW Oficial dins una experiència clara, ordenada i orientada al club.",
    pillar1: "Calendari viu",
    pillar1d: "Sortides futures, historial i compte enrere connectats entre si.",
    pillar2: "Destacats editorials",
    pillar2d: "Els grans moments del club passen a tenir fitxa pròpia i valor de marca.",
    pillar3: "Arxiu recuperat",
    pillar3d: "Documents, vídeos i revistes que abans estaven dispersos ara passen a ser una hemeroteca útil.",
    pillar4: "BMW Oficial",
    pillar4d: "Hub especial per connectar el club amb novetats, configurador i univers oficial BMW.",
    assistantEyebrow: "Conserge IA",
    assistantTitle: "Una entrada guiada perquè qualsevol visitant entengui el club en menys d'un minut",
    assistantBody: "No és només un chatbot decoratiu: orienta sobre properes sortides, socis, patrocinadors, contacte i lectura general del club amb veu opcional des del navegador.",
    assistantCta: "Obrir assistent IA",
    assistantPill1: "Preguntes guiades",
    assistantPill1d: "Respostes ràpides sobre salides, alta de soci, patrocinadors i contacte.",
    assistantPill2: "Veu",
    assistantPill2d: "Pot escoltar la pregunta i llegir la resposta en veu alta si el navegador ho suporta.",
    assistantPill3: "Context real",
    assistantPill3d: "Es basa en el calendari, contingut i estructura actual de la web.",
    routesEyebrow: "Guia de carreteres BMW",
    routesTitle: "Andorra també pot llegir-se com a destinació de conducció: ja té guia pròpia per a cotxe i moto.",
    routesBody: "Selecció d’itineraris amb traçat recomanat, ritme, durada, distància i lectura BMW perquè el club i el territori quedin explicats amb claredat.",
    routesCta: "Obrir itineraris",
    routesCard1t: "Cotxe",
    routesCard1d: "Grand Tour, touring i ports amb trams fluids.",
    routesCard2t: "Moto",
    routesCard2d: "Alta muntanya, ritme i carreteres amb molta lectura.",
    routesCard3t: "Club",
    routesCard3d: "Rutes útils per a sortides oficials o escapades BMW.",
    highlightsEyebrow: "Destacats del club",
    highlightsTitle: "La part emocional també ha de respirar premium",
    highlightsCta: "Veure tots els destacats",
    archiveEyebrow: "Arxiu del club",
    archiveTitle: "Memòria recuperada, sense aparença de CMS vell",
    archiveCta: "Obrir arxiu",
    officialEyebrow: "BMW Oficial",
    officialTitle: "Enllaç directe a la marca i a les novetats oficials",
    officialCta: "Veure hub oficial",
    sponsorsEyebrow: "Patrocinadors",
    sponsorsTitle: "Marques amb visibilitat real, no una llista discreta al peu de pàgina",
    sponsorsCta: "Veure patrocinadors",
    sponsorsOpen: "Obrir web",
    featuredSponsorLabel: "Sponsor principal",
    featuredSponsorText: "Pyrénées Andorra ha de sentir-se visible de debò: més presència, millor composició i context premium dins la home.",
    journalEyebrow: "Lectura del club",
    journalTitle: "Tres entrades clares per entendre el club, reviure'l i connectar-lo amb la marca",
    journalClub: "El Club",
    journalGallery: "Galeria",
    journalBrand: "BMW Oficial",
    journalOpen: "Entrar",
    visitEvent: "Obrir fitxa",
    openOfficial: "Obrir",
  },
  es: {
    ethos: "Experiencia BMW con más peso, más contexto y mejor diseño.",
    pillars: "Nuevo enfoque",
    pillarsTitle: "Una web más potente, más moderna y con narrativa propia",
    pillarsSubtitle: "Calendario vivo, meteo útil, archivo real y acceso directo a BMW Oficial dentro de una experiencia clara, ordenada y orientada al club.",
    pillar1: "Calendario vivo",
    pillar1d: "Salidas futuras, histórico y cuenta atrás conectados entre sí.",
    pillar2: "Destacados editoriales",
    pillar2d: "Los grandes momentos del club pasan a tener ficha propia y valor de marca.",
    pillar3: "Archivo recuperado",
    pillar3d: "Documentos, vídeos y revistas que antes estaban dispersos pasan a ser una hemeroteca útil.",
    pillar4: "BMW Oficial",
    pillar4d: "Hub especial para conectar el club con novedades, configurador y universo oficial BMW.",
    assistantEyebrow: "Conserje IA",
    assistantTitle: "Una entrada guiada para que cualquier visitante entienda el club en menos de un minuto",
    assistantBody: "No es un chatbot decorativo: orienta sobre próximas salidas, alta de socio, patrocinadores, contacto y lectura general del club, con voz opcional desde el navegador.",
    assistantCta: "Abrir asistente IA",
    assistantPill1: "Preguntas guiadas",
    assistantPill1d: "Respuestas rápidas sobre salidas, hacerse socio, patrocinadores y contacto.",
    assistantPill2: "Voz",
    assistantPill2d: "Puede escuchar la pregunta y leer la respuesta en voz alta si el navegador lo soporta.",
    assistantPill3: "Contexto real",
    assistantPill3d: "Se apoya en el calendario, contenidos y estructura actual de la web.",
    routesEyebrow: "Guía de carreteras BMW",
    routesTitle: "Andorra también puede leerse como destino de conducción: ya tiene guía propia para coche y moto.",
    routesBody: "Selección de itinerarios con trazado recomendado, estilo de conducción, duración, distancia y lectura BMW para presentar el club y el territorio con claridad.",
    routesCta: "Abrir itinerarios",
    routesCard1t: "Coche",
    routesCard1d: "Grand Tour, touring y puertos con tramos fluidos.",
    routesCard2t: "Moto",
    routesCard2d: "Alta montaña, ritmo y carreteras con mucha lectura.",
    routesCard3t: "Club",
    routesCard3d: "Rutas útiles para salidas oficiales o escapadas BMW.",
    highlightsEyebrow: "Destacados del club",
    highlightsTitle: "La parte emocional también debe respirar premium",
    highlightsCta: "Ver todos los destacados",
    archiveEyebrow: "Archivo del club",
    archiveTitle: "Memoria recuperada, sin apariencia de CMS viejo",
    archiveCta: "Abrir archivo",
    officialEyebrow: "BMW Oficial",
    officialTitle: "Enlace directo a la marca y a sus novedades oficiales",
    officialCta: "Ver hub oficial",
    sponsorsEyebrow: "Patrocinadores",
    sponsorsTitle: "Marcas con visibilidad real, no una lista discreta en el pie de página",
    sponsorsCta: "Ver patrocinadores",
    sponsorsOpen: "Abrir web",
    featuredSponsorLabel: "Patrocinador principal",
    featuredSponsorText: "Pyrénées Andorra debe sentirse realmente visible: más presencia, mejor composición y contexto premium dentro de la home.",
    journalEyebrow: "Lectura del club",
    journalTitle: "Tres entradas claras para entender el club, revivirlo y conectarlo con la marca",
    journalClub: "El Club",
    journalGallery: "Galería",
    journalBrand: "BMW Oficial",
    journalOpen: "Entrar",
    visitEvent: "Abrir ficha",
    openOfficial: "Abrir",
  },
  fr: {
    ethos: "Une expérience BMW avec plus de poids, de contexte et un meilleur design.",
    pillars: "Nouvelle approche",
    pillarsTitle: "Un site plus fort, plus moderne et avec son propre récit",
    pillarsSubtitle: "Calendrier vivant, météo utile, véritable archive et accès direct à BMW Officiel dans une expérience claire, ordonnée et fidèle au club.",
    pillar1: "Calendrier vivant",
    pillar1d: "Sorties futures, historique et compte à rebours reliés entre eux.",
    pillar2: "Temps forts éditoriaux",
    pillar2d: "Les grands moments du club gagnent leur propre fiche et une vraie valeur de marque.",
    pillar3: "Archive récupérée",
    pillar3d: "Documents, vidéos et magazines auparavant dispersés deviennent une archive utile.",
    pillar4: "BMW Officiel",
    pillar4d: "Hub spécial pour relier le club aux nouveautés, au configurateur et à l'univers officiel BMW.",
    assistantEyebrow: "Concierge IA",
    assistantTitle: "Une entrée guidée pour qu'un visiteur comprenne le club en moins d'une minute",
    assistantBody: "Ce n'est pas un chatbot décoratif : il guide sur les prochaines sorties, l'adhésion, les sponsors, le contact et la lecture générale du club, avec une voix optionnelle depuis le navigateur.",
    assistantCta: "Ouvrir l'assistant IA",
    assistantPill1: "Questions guidées",
    assistantPill1d: "Réponses rapides sur les sorties, l'adhésion, les sponsors et le contact.",
    assistantPill2: "Voix",
    assistantPill2d: "Il peut écouter la question et lire la réponse à voix haute si le navigateur le permet.",
    assistantPill3: "Contexte réel",
    assistantPill3d: "Il s'appuie sur le calendrier, le contenu et la structure actuelle du site.",
    routesEyebrow: "Guide des routes BMW",
    routesTitle: "L’Andorre peut aussi se lire comme destination de conduite : elle a déjà son propre guide auto et moto.",
    routesBody: "Sélection d’itinéraires avec tracé recommandé, style de conduite, durée, distance et lecture BMW pour présenter clairement le club et le territoire.",
    routesCta: "Ouvrir les itinéraires",
    routesCard1t: "Voiture",
    routesCard1d: "Grand Tour, touring et cols fluides.",
    routesCard2t: "Moto",
    routesCard2d: "Haute montagne, rythme et routes très lisibles.",
    routesCard3t: "Club",
    routesCard3d: "Routes utiles pour sorties officielles ou escapades BMW.",
    highlightsEyebrow: "Temps forts du club",
    highlightsTitle: "La partie émotionnelle doit elle aussi respirer le premium",
    highlightsCta: "Voir tous les temps forts",
    archiveEyebrow: "Archive du club",
    archiveTitle: "Mémoire récupérée, sans l'apparence d'un vieux CMS",
    archiveCta: "Ouvrir l'archive",
    officialEyebrow: "BMW Officiel",
    officialTitle: "Lien direct vers la marque et ses nouveautés officielles",
    officialCta: "Voir le hub officiel",
    sponsorsEyebrow: "Sponsors",
    sponsorsTitle: "Des marques avec une vraie visibilité, pas une simple liste discrète en pied de page",
    sponsorsCta: "Voir les sponsors",
    sponsorsOpen: "Ouvrir le site",
    featuredSponsorLabel: "Sponsor principal",
    featuredSponsorText: "Pyrénées Andorra doit réellement se sentir visible : plus de présence, une meilleure composition et un contexte premium sur l'accueil.",
    journalEyebrow: "Lecture du club",
    journalTitle: "Trois entrées claires pour comprendre le club, le revivre et le relier à la marque",
    journalClub: "Le Club",
    journalGallery: "Galerie",
    journalBrand: "BMW Officiel",
    journalOpen: "Entrer",
    visitEvent: "Ouvrir la fiche",
    openOfficial: "Ouvrir",
  },
  en: {
    ethos: "A BMW experience with more weight, more context and better design.",
    pillars: "New direction",
    pillarsTitle: "A stronger, more modern website with its own narrative",
    pillarsSubtitle: "Live calendar, useful weather, real archive and direct access to BMW Official within a clear, well-structured experience focused on the club.",
    pillar1: "Live calendar",
    pillar1d: "Future outings, history and countdown are all connected.",
    pillar2: "Editorial highlights",
    pillar2d: "The club's biggest moments now get their own page and real brand value.",
    pillar3: "Recovered archive",
    pillar3d: "Documents, videos and magazines that were scattered now become a useful archive.",
    pillar4: "BMW Official",
    pillar4d: "Special hub connecting the club with official BMW updates, configurator and brand universe.",
    assistantEyebrow: "AI concierge",
    assistantTitle: "A guided entry point so any visitor understands the club in under a minute",
    assistantBody: "It is not a decorative chatbot: it guides visitors through upcoming outings, membership, sponsors, contact and the club story, with optional browser voice.",
    assistantCta: "Open AI concierge",
    assistantPill1: "Guided questions",
    assistantPill1d: "Quick answers about outings, membership, sponsors and contact.",
    assistantPill2: "Voice",
    assistantPill2d: "It can listen to the question and read the reply aloud if the browser supports it.",
    assistantPill3: "Real context",
    assistantPill3d: "It relies on the website's current calendar, content and structure.",
    routesEyebrow: "BMW road guide",
    routesTitle: "Andorra can also be read as a driving destination: it now has its own car and motorcycle guide.",
    routesBody: "Curated itineraries with recommended route flow, driving character, duration, distance and BMW fit to present both the club and the territory clearly.",
    routesCta: "Open routes",
    routesCard1t: "Car",
    routesCard1d: "Grand touring, passes and smooth rhythm sections.",
    routesCard2t: "Motorcycle",
    routesCard2d: "High mountain, pace and roads with strong reading.",
    routesCard3t: "Club",
    routesCard3d: "Useful runs for official outings or private BMW escapes.",
    highlightsEyebrow: "Club highlights",
    highlightsTitle: "The emotional side should also feel premium",
    highlightsCta: "View all highlights",
    archiveEyebrow: "Club archive",
    archiveTitle: "Recovered memory, without the look of an old CMS",
    archiveCta: "Open archive",
    officialEyebrow: "BMW Official",
    officialTitle: "Direct link to the brand and its official updates",
    officialCta: "View official hub",
    sponsorsEyebrow: "Sponsors",
    sponsorsTitle: "Brands with real visibility, not a discreet list hidden in the footer",
    sponsorsCta: "View sponsors",
    sponsorsOpen: "Open site",
    featuredSponsorLabel: "Main sponsor",
    featuredSponsorText: "Pyrénées Andorra should feel genuinely visible: more presence, better composition and premium context across the homepage.",
    journalEyebrow: "Club reading",
    journalTitle: "Three clear entry points to understand the club, relive it and connect it with the brand",
    journalClub: "The Club",
    journalGallery: "Gallery",
    journalBrand: "BMW Official",
    journalOpen: "Open",
    visitEvent: "Open detail",
    openOfficial: "Open",
  },
  pt: {
    ethos: "Experiência BMW com mais peso, mais contexto e melhor design.",
    pillars: "Nova direção",
    pillarsTitle: "Um site mais forte, mais moderno e com narrativa própria",
    pillarsSubtitle: "Calendário vivo, meteorologia útil, arquivo real e acesso direto à BMW Oficial dentro de uma experiência clara, organizada e orientada ao clube.",
    pillar1: "Calendário vivo",
    pillar1d: "Passeios futuros, histórico e contagem decrescente ligados entre si.",
    pillar2: "Destaques editoriais",
    pillar2d: "Os grandes momentos do clube passam a ter página própria e valor de marca.",
    pillar3: "Arquivo recuperado",
    pillar3d: "Documentos, vídeos e revistas que antes estavam dispersos passam a formar uma hemeroteca útil.",
    pillar4: "BMW Oficial",
    pillar4d: "Hub especial para ligar o clube às novidades, configurador e universo oficial BMW.",
    assistantEyebrow: "Concierge IA",
    assistantTitle: "Uma entrada guiada para que qualquer visitante perceba o clube em menos de um minuto",
    assistantBody: "Não é um chatbot decorativo: orienta sobre próximos passeios, adesão, patrocinadores, contacto e leitura geral do clube, com voz opcional no navegador.",
    assistantCta: "Abrir assistente IA",
    assistantPill1: "Perguntas guiadas",
    assistantPill1d: "Respostas rápidas sobre passeios, sócios, patrocinadores e contacto.",
    assistantPill2: "Voz",
    assistantPill2d: "Pode ouvir a pergunta e ler a resposta em voz alta se o navegador suportar.",
    assistantPill3: "Contexto real",
    assistantPill3d: "Baseia-se no calendário, conteúdos e estrutura atual do site.",
    routesEyebrow: "Guia de estradas BMW",
    routesTitle: "Andorra também pode ser lida como destino de condução: já tem guia própria para carro e moto.",
    routesBody: "Seleção de itinerários com traçado recomendado, estilo de condução, duração, distância e leitura BMW para apresentar com clareza o clube e o território.",
    routesCta: "Abrir itinerários",
    routesCard1t: "Carro",
    routesCard1d: "Grand Tour, touring e portos com troços fluidos.",
    routesCard2t: "Moto",
    routesCard2d: "Alta montanha, ritmo e estradas com muita leitura.",
    routesCard3t: "Clube",
    routesCard3d: "Rotas úteis para saídas oficiais ou escapadas BMW.",
    highlightsEyebrow: "Destaques do clube",
    highlightsTitle: "A parte emocional também deve respirar premium",
    highlightsCta: "Ver todos os destaques",
    archiveEyebrow: "Arquivo do clube",
    archiveTitle: "Memória recuperada, sem aspeto de CMS antigo",
    archiveCta: "Abrir arquivo",
    officialEyebrow: "BMW Oficial",
    officialTitle: "Ligação direta à marca e às novidades oficiais",
    officialCta: "Ver hub oficial",
    sponsorsEyebrow: "Patrocinadores",
    sponsorsTitle: "Marcas com visibilidade real, não uma lista discreta no rodapé",
    sponsorsCta: "Ver patrocinadores",
    sponsorsOpen: "Abrir site",
    featuredSponsorLabel: "Patrocinador principal",
    featuredSponsorText: "Pyrénées Andorra deve sentir-se realmente visível: mais presença, melhor composição e contexto premium na home.",
    journalEyebrow: "Leitura do clube",
    journalTitle: "Três entradas claras para entender o clube, revivê-lo e ligá-lo à marca",
    journalClub: "O Clube",
    journalGallery: "Galeria",
    journalBrand: "BMW Oficial",
    journalOpen: "Entrar",
    visitEvent: "Abrir ficha",
    openOfficial: "Abrir",
  },
  de: {
    ethos: "BMW-Erlebnis mit mehr Gewicht, mehr Kontext und besserem Design.",
    pillars: "Neue Richtung",
    pillarsTitle: "Eine stärkere, modernere Website mit eigener Erzählung",
    pillarsSubtitle: "Live-Kalender, nützliches Wetter, echtes Archiv und direkter Zugang zu BMW Offiziell in einem klaren, geordneten Erlebnis mit Fokus auf den Club.",
    pillar1: "Live-Kalender",
    pillar1d: "Zukünftige Ausfahrten, Historie und Countdown sind miteinander verbunden.",
    pillar2: "Redaktionelle Highlights",
    pillar2d: "Die wichtigsten Momente des Clubs erhalten eine eigene Seite und echten Markenwert.",
    pillar3: "Wiederhergestelltes Archiv",
    pillar3d: "Dokumente, Videos und Magazine werden aus verstreuten Dateien zu einem nützlichen Archiv.",
    pillar4: "BMW Offiziell",
    pillar4d: "Spezieller Hub, der den Club mit offiziellen BMW-Neuheiten, Konfigurator und Markenwelt verbindet.",
    assistantEyebrow: "KI-Concierge",
    assistantTitle: "Ein geführter Einstieg, damit jeder Besucher den Club in unter einer Minute versteht",
    assistantBody: "Kein dekorativer Chatbot: Er hilft bei Ausfahrten, Mitgliedschaft, Sponsoren, Kontakt und Club-Verständnis, inklusive optionaler Browser-Stimme.",
    assistantCta: "KI-Assistent öffnen",
    assistantPill1: "Geführte Fragen",
    assistantPill1d: "Schnelle Antworten zu Ausfahrten, Mitgliedschaft, Sponsoren und Kontakt.",
    assistantPill2: "Stimme",
    assistantPill2d: "Kann die Frage hören und die Antwort vorlesen, wenn der Browser es unterstützt.",
    assistantPill3: "Echter Kontext",
    assistantPill3d: "Greift auf den aktuellen Kalender, Inhalte und die Struktur der Website zurück.",
    routesEyebrow: "BMW-Routenguide",
    routesTitle: "Andorra lässt sich auch als Fahrziel lesen: dafür gibt es jetzt einen eigenen Auto- und Motorrad-Guide.",
    routesBody: "Kuratiere Strecken mit empfohlener Linie, Fahrcharakter, Dauer, Distanz und BMW-Bezug, um Club und Gebiet klar zu präsentieren.",
    routesCta: "Routen öffnen",
    routesCard1t: "Auto",
    routesCard1d: "Grand Touring, Pässe und flüssige Etappen.",
    routesCard2t: "Motorrad",
    routesCard2d: "Hochgebirge, Rhythmus und sehr lesbare Straßen.",
    routesCard3t: "Club",
    routesCard3d: "Nützliche Routen für offizielle Ausfahrten oder BMW-Auszeiten.",
    highlightsEyebrow: "Club-Highlights",
    highlightsTitle: "Auch die emotionale Seite sollte hochwertig wirken",
    highlightsCta: "Alle Highlights ansehen",
    archiveEyebrow: "Club-Archiv",
    archiveTitle: "Wiederhergestellte Erinnerung ohne alten CMS-Look",
    archiveCta: "Archiv öffnen",
    officialEyebrow: "BMW Offiziell",
    officialTitle: "Direkter Link zur Marke und ihren offiziellen Neuheiten",
    officialCta: "Offiziellen Hub ansehen",
    sponsorsEyebrow: "Sponsoren",
    sponsorsTitle: "Marken mit echter Sichtbarkeit, nicht nur eine unauffällige Liste im Footer",
    sponsorsCta: "Sponsoren ansehen",
    sponsorsOpen: "Website öffnen",
    featuredSponsorLabel: "Hauptsponsor",
    featuredSponsorText: "Pyrénées Andorra soll wirklich sichtbar sein: mehr Präsenz, bessere Komposition und Premium-Kontext auf der Startseite.",
    journalEyebrow: "Club-Lektüre",
    journalTitle: "Drei klare Einstiege, um den Club zu verstehen, neu zu erleben und mit der Marke zu verbinden",
    journalClub: "Der Club",
    journalGallery: "Galerie",
    journalBrand: "BMW Offiziell",
    journalOpen: "Öffnen",
    visitEvent: "Detail öffnen",
    openOfficial: "Öffnen",
  },
  ru: {
    ethos: "Опыт BMW с большим весом, контекстом и лучшим дизайном.",
    pillars: "Новый вектор",
    pillarsTitle: "Более сильный, современный сайт со своей собственной историей",
    pillarsSubtitle: "Живой календарь, полезная погода, настоящий архив и прямой доступ к BMW Official в ясной и структурированной клубной подаче.",
    pillar1: "Живой календарь",
    pillar1d: "Будущие выезды, история и обратный отсчёт связаны между собой.",
    pillar2: "Редакционные акценты",
    pillar2d: "Главные моменты клуба получают собственные страницы и настоящий бренд-контекст.",
    pillar3: "Восстановленный архив",
    pillar3d: "Документы, видео и журналы, которые раньше были разбросаны, становятся полезным архивом.",
    pillar4: "BMW Official",
    pillar4d: "Специальный хаб, связывающий клуб с официальными новинками BMW, конфигуратором и миром бренда.",
    assistantEyebrow: "ИИ-консьерж",
    assistantTitle: "Понятная guided-входная точка, чтобы посетитель понял клуб меньше чем за минуту",
    assistantBody: "Это не декоративный чатбот: он помогает с ближайшими выездами, вступлением, спонсорами, контактами и общим пониманием клуба, включая голос в браузере.",
    assistantCta: "Открыть ИИ помощника",
    assistantPill1: "Готовые вопросы",
    assistantPill1d: "Быстрые ответы о выездах, вступлении, спонсорах и контактах.",
    assistantPill2: "Голос",
    assistantPill2d: "Может слушать вопрос и озвучивать ответ, если браузер поддерживает функцию.",
    assistantPill3: "Реальный контекст",
    assistantPill3d: "Опирается на текущий календарь, контент и структуру сайта.",
    routesEyebrow: "BMW road guide",
    routesTitle: "Андорру можно читать и как направление для вождения: теперь у сайта есть гид по маршрутам для авто и мото.",
    routesBody: "Подборка маршрутов с рекомендованной линией, характером езды, длительностью, дистанцией и BMW-подачей для ясного представления клуба и территории.",
    routesCta: "Открыть маршруты",
    routesCard1t: "Авто",
    routesCard1d: "Grand touring, перевалы и плавные участки.",
    routesCard2t: "Мото",
    routesCard2d: "Высокогорье, ритм и дороги с хорошей читаемостью.",
    routesCard3t: "Клуб",
    routesCard3d: "Полезно для официальных выездов или личных BMW-эскейпов.",
    highlightsEyebrow: "Главные моменты клуба",
    highlightsTitle: "Эмоциональная часть тоже должна ощущаться премиально",
    highlightsCta: "Все главные моменты",
    archiveEyebrow: "Архив клуба",
    archiveTitle: "Восстановленная память без ощущения старого CMS",
    archiveCta: "Открыть архив",
    officialEyebrow: "BMW Official",
    officialTitle: "Прямая связь с брендом и его официальными новинками",
    officialCta: "Открыть официальный хаб",
    sponsorsEyebrow: "Спонсоры",
    sponsorsTitle: "Бренды с реальной заметностью, а не скромный список в футере",
    sponsorsCta: "Открыть спонсоров",
    sponsorsOpen: "Открыть сайт",
    featuredSponsorLabel: "Главный спонсор",
    featuredSponsorText: "Pyrénées Andorra должен быть действительно заметным: больше присутствия, лучше композиция и премиальный контекст на главной.",
    journalEyebrow: "Навигация по клубу",
    journalTitle: "Три ясные точки входа, чтобы понять клуб, пережить его заново и связать с брендом",
    journalClub: "Клуб",
    journalGallery: "Галерея",
    journalBrand: "BMW Official",
    journalOpen: "Открыть",
    visitEvent: "Открыть карточку",
    openOfficial: "Открыть",
  },
};

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const highlightCards = featuredEventMeta.slice(0, 3).map((item) => ({ meta: item, event: getEventById(item.eventId) })).filter((item) => item.event);
  const featuredSponsor = sponsorItems.find((item) => item.tier === "featured");
  const featuredSponsorHasLightLogoPlate = featuredSponsor?.id === "pyrenees-andorra";
  const homeSponsors = sponsorItems.filter((item) => item.link && item.tier !== "featured").slice(0, 3);
  const homeSponsorsWithLightLogoPlate = new Set(["coma-hotel", "basar-valira", "santeloi"]);

  return (
    <PageShell>
      <Hero language={language} />
      <HomeWelcomeShowcase />

      <section className="relative z-20 pt-6 pb-10 md:-mt-10 md:pt-0 md:pb-12 lg:-mt-12">
        <div className="container mx-auto px-4">
          <Card className="glass-panel rounded-[2rem] border-0 max-w-6xl mx-auto p-6 md:p-8 shadow-[0_28px_90px_-42px_rgba(15,23,42,.4)]">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"><Sparkles className="h-4 w-4" /> {t.pillars}</div>
                <h2 className="text-3xl md:text-5xl font-bold text-balance">{t.pillarsTitle}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{t.pillarsSubtitle}</p>
              </div>
              <div className="rounded-[1.5rem] bg-accent text-white p-6 shadow-elegant">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"><Stars className="h-4 w-4" /> BMW Club Andorra</div>
                <p className="mt-4 text-xl font-semibold text-balance">{t.ethos}</p>
                <div className="mt-6 flex gap-3 flex-wrap">
                  <Link to="/destacats"><Button variant="hero">{t.highlightsCta}</Button></Link>
                  <Link to="/bmw-oficial"><Button variant="outline" className="bg-white/5 text-white border-white/15 hover:bg-white/10">{t.officialCta}</Button></Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[
            { title: t.pillar1, desc: t.pillar1d, icon: Calendar },
            { title: t.pillar2, desc: t.pillar2d, icon: Sparkles },
            { title: t.pillar3, desc: t.pillar3d, icon: Archive },
            { title: t.pillar4, desc: t.pillar4d, icon: Globe2 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="premium-card border-0 rounded-[1.75rem] p-6 hover-tilt">
                <div className="rounded-2xl bg-primary/10 p-3 w-fit"><Icon className="h-5 w-5 text-primary" /></div>
                <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <CountdownToNextEvent />
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2rem] md:rounded-[2.25rem] p-6 md:p-10 text-white overflow-hidden relative shadow-[0_35px_100px_-45px_rgba(15,23,42,.7)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.36),transparent_34%)]" />
            <div className="relative z-10 grid lg:grid-cols-[1fr_0.95fr] gap-8 items-start">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/76">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  {t.assistantEyebrow}
                </p>
                <h2 className="mt-5 text-3xl md:text-5xl font-bold text-balance">{t.assistantTitle}</h2>
                <p className="mt-4 text-lg text-white/72 max-w-3xl">{t.assistantBody}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/assistent-ia"><Button variant="hero">{t.assistantCta}</Button></Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  { title: t.assistantPill1, desc: t.assistantPill1d, icon: BadgeCheck },
                  { title: t.assistantPill2, desc: t.assistantPill2d, icon: Volume2 },
                  { title: t.assistantPill3, desc: t.assistantPill3d, icon: Mic },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                      <div className="rounded-2xl bg-white/10 p-3 w-fit"><Icon className="h-5 w-5 text-primary" /></div>
                      <div className="mt-4 text-lg font-semibold">{item.title}</div>
                      <p className="mt-2 text-sm text-white/66">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="premium-card border-0 rounded-[2rem] p-6 md:p-8 shadow-elegant">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.routesEyebrow}</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">{t.routesTitle}</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl">{t.routesBody}</p>
                <Link to="/itineraris" className="inline-block mt-6"><Button variant="hero">{t.routesCta}</Button></Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { title: t.routesCard1t, text: t.routesCard1d },
                  { title: t.routesCard2t, text: t.routesCard2d },
                  { title: t.routesCard3t, text: t.routesCard3d },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] bg-white/70 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{item.title}</div>
                    <div className="mt-3 text-sm text-foreground/82">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.highlightsEyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-bold text-balance">{t.highlightsTitle}</h2>
            </div>
            <Link to="/destacats" className="hidden md:block"><Button variant="outline">{t.highlightsCta}</Button></Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {highlightCards.map(({ meta, event }) => (
              <Card key={meta.eventId} className="premium-card border-0 rounded-[2rem] overflow-hidden hover-tilt">
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,15,24,.05), rgba(10,15,24,.42)), url(${meta.heroImage ?? '/legacy-mirror/images/Tour_Cevennes_Roussillon.jpg'})` }} />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{getLocalizedText(meta.tag, language)}</div>
                  <h3 className="mt-3 text-2xl font-bold text-balance">{event?.title}</h3>
                  <p className="mt-3 text-muted-foreground">{getLocalizedText(meta.summary, language)}</p>
                  <Link to={`/esdeveniments/${event?.id}`} className="inline-flex items-center gap-2 mt-5 text-primary font-medium">{t.visitEvent} <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2rem] p-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.25),transparent_35%)]" />
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/70">{t.sponsorsEyebrow}</p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">{t.sponsorsTitle}</h2>
                </div>
                <Link to="/patrocinadors" className="inline-block"><Button variant="hero">{t.sponsorsCta}</Button></Link>
              </div>

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
                {featuredSponsor && (
                  <a href={featuredSponsor.link?.href} target="_blank" rel="noreferrer" className="rounded-[1.75rem] md:rounded-[2rem] border border-white/12 bg-white/8 p-5 md:p-8 block hover:bg-white/10 transition-base shadow-[0_25px_70px_-38px_rgba(15,23,42,.5)]">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">{t.featuredSponsorLabel}</div>
                    <div
                      className="mt-5 rounded-[1.6rem] p-5"
                      style={{
                        background: featuredSponsorHasLightLogoPlate
                          ? "linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.98) 100%)"
                          : featuredSponsor.brand.surface,
                        border: `1px solid ${featuredSponsorHasLightLogoPlate ? "rgba(255,255,255,0.82)" : featuredSponsor.brand.border}`,
                        boxShadow: featuredSponsorHasLightLogoPlate ? "inset 0 1px 0 rgba(255,255,255,0.78), 0 16px 32px -24px rgba(255,255,255,0.22)" : undefined,
                      }}
                    >
                      <img src={featuredSponsor.brand.logoPath} alt={`${featuredSponsor.name} logo`} className="mx-auto h-20 w-auto max-w-full object-contain" loading="lazy" />
                    </div>
                    <div className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-balance">{featuredSponsor.name}</div>
                    <div className="mt-3 text-sm uppercase tracking-[0.2em] text-white/55">{featuredSponsor.category}</div>
                    <p className="mt-5 max-w-2xl text-white/76">{t.featuredSponsorText}</p>
                    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                      <p className="text-sm text-white/72">{getLocalizedText(featuredSponsor.summary, language)}</p>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm text-white font-semibold">{t.sponsorsOpen} <ArrowRight className="h-4 w-4" /></div>
                  </a>
                )}

                <div className="grid gap-4">
                  {homeSponsors.map((sponsor) => {
                    const hasLightLogoPlate = homeSponsorsWithLightLogoPlate.has(sponsor.id);
                    const isWideLogo = (sponsor.brand.logoFit ?? "standard") === "wide";

                    return (
                      <a key={sponsor.id} href={sponsor.link?.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10 transition-base">
                        <div
                          className="flex min-h-[136px] items-center justify-center rounded-[1.25rem] px-5 py-5"
                          style={{
                            background: hasLightLogoPlate
                              ? "linear-gradient(180deg, rgba(255,255,255,0.99) 0%, rgba(248,250,252,0.98) 100%)"
                              : sponsor.brand.surface,
                            border: `1px solid ${hasLightLogoPlate ? "rgba(255,255,255,0.82)" : sponsor.brand.border}`,
                            boxShadow: hasLightLogoPlate ? "inset 0 1px 0 rgba(255,255,255,0.78), 0 14px 28px -24px rgba(255,255,255,0.22)" : undefined,
                          }}
                        >
                          <img
                            src={sponsor.brand.logoPath}
                            alt={`${sponsor.name} logo`}
                            className={isWideLogo ? "max-h-[84px] w-full object-contain" : "max-h-[88px] w-auto max-w-full object-contain"}
                            loading="lazy"
                          />
                        </div>
                        <div className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">{sponsor.category}</div>
                        <div className="mt-2 font-semibold text-balance">{sponsor.name}</div>
                        <div className="mt-2 text-sm text-white/68">{getLocalizedText(sponsor.summary, language)}</div>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm text-white">{t.sponsorsOpen} <ArrowRight className="h-4 w-4" /></div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.journalEyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-balance">{t.journalTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: t.journalClub, href: "/el-club", text: t.pillar2d },
              { title: t.journalGallery, href: "/galeria", text: t.pillar3d },
              { title: t.journalBrand, href: "/bmw-oficial", text: t.pillar4d },
            ].map((item) => (
              <Link key={item.href} to={item.href}>
                <Card className="premium-card border-0 rounded-[2rem] p-6 hover-tilt h-full">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">BMW Club Andorra</div>
                  <h3 className="mt-4 text-2xl font-bold text-balance">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.text}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-primary font-semibold">{t.journalOpen} <ArrowRight className="h-4 w-4" /></div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-[0.95fr_1.05fr] gap-6 items-stretch">
          <Card className="premium-card border-0 rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.archiveEyebrow}</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">{t.archiveTitle}</h2>
            <div className="mt-6 grid gap-4">
              {archiveItems.slice(0, 3).map((item) => (
                <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="rounded-2xl bg-secondary/65 p-4 block hover:bg-secondary transition-base">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{item.accent}</div>
                  <div className="mt-2 font-semibold text-balance">{item.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{getLocalizedText(item.summary, language)}</div>
                </a>
              ))}
            </div>
            <Link to="/arxiu" className="inline-block mt-6"><Button variant="outline">{t.archiveCta}</Button></Link>
          </Card>

          <Card className="glass-dark border-0 rounded-[2rem] p-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.28),transparent_30%)]" />
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">{t.officialEyebrow}</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">{t.officialTitle}</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {officialBmwLinks.slice(0, 4).map((item) => (
                  <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10 transition-base">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">{getLocalizedText(item.tag, language)}</div>
                    <div className="mt-2 font-semibold text-balance">{getLocalizedText(item.title, language)}</div>
                    <div className="mt-2 text-sm text-white/68">{getLocalizedText(item.summary, language)}</div>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm text-white">{t.openOfficial} <ArrowRight className="h-4 w-4" /></div>
                  </a>
                ))}
              </div>
              <Link to="/bmw-oficial" className="inline-block mt-6"><Button variant="hero">{t.officialCta}</Button></Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
