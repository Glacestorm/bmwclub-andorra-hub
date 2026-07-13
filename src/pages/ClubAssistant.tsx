import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mic, MicOff, Sparkles, Volume2, CalendarDays, Users, BadgeCheck, Mail, ArrowRight, MessageSquareText } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { sponsorItems } from "@/content/sponsorData";
import { clubEvents } from "@/content/calendarData";
import { formatEventDateRange, getNextEvent } from "@/lib/calendar";

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

type AssistantResponse = {
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

type HistoryItem = {
  question: string;
  answer: AssistantResponse;
};

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Conserge IA del club",
    title: "Preguntes guiades sobre el club, les properes sortides i com fer-te soci.",
    intro: "Aquest assistent treballa amb la informació actual carregada al web: calendari, patrocinadors, contacte i contingut del club.",
    placeholder: "Escriu la teva pregunta...",
    ask: "Preguntar",
    listen: "Parlar",
    stop: "Aturar",
    speak: "Resposta en veu",
    noVoice: "Veu no disponible en aquest navegador",
    prompt1: "Properes sortides",
    prompt2: "Com fer-me soci",
    prompt3: "Quins patrocinadors hi ha",
    prompt4: "Què és el club",
    prompt5: "Com contactar",
    prompt6: "Millors itineraris per Andorra",
    ready: "Preparat per ajudar-te",
    nextTrips: "Properes sortides",
    join: "Fer-se soci",
    sponsors: "Patrocinadors",
    club: "El club",
    contact: "Contacte",
    nextTripsCta: "Obrir calendari",
    joinCta: "Anar a contacte",
    sponsorsCta: "Veure patrocinadors",
    routesCta: "Veure itineraris",
    clubCta: "Descobrir el club",
    contactCta: "Contactar",
    fallbackTitle: "Puc orientar-te millor",
    fallbackBody: "Prova amb una d'aquestes preguntes: properes sortides, com fer-me soci, patrocinadors, contacte o què és el club.",
    guideTitle: "Què resol ara mateix",
    guide1: "Sortides i calendari",
    guide1d: "Llegeix el calendari carregat i et guia cap a la següent activitat.",
    guide2: "Socis i contacte",
    guide2d: "Explica com contactar amb el club i per on començar l'alta.",
    guide3: "Patrocinadors i club",
    guide3d: "Resumeix patrocinadors visibles i explica ràpidament què és el club.",
    history: "Converses recents",
    sourceNote: "Resposta basada en la informació actual carregada al web.",
  },
  es: {
    eyebrow: "Conserje IA del club",
    title: "Preguntas guiadas sobre el club, las próximas salidas y cómo hacerse socio.",
    intro: "Este asistente trabaja con la información actual cargada en la web: calendario, patrocinadores, contacto y contenido del club.",
    placeholder: "Escribe tu pregunta...",
    ask: "Preguntar",
    listen: "Hablar",
    stop: "Detener",
    speak: "Respuesta por voz",
    noVoice: "Voz no disponible en este navegador",
    prompt1: "Próximas salidas",
    prompt2: "Cómo hacerme socio",
    prompt3: "Qué patrocinadores hay",
    prompt4: "Qué es el club",
    prompt5: "Cómo contactar",
    prompt6: "Mejores itinerarios por Andorra",
    ready: "Listo para ayudarte",
    nextTrips: "Próximas salidas",
    join: "Hacerse socio",
    sponsors: "Patrocinadores",
    club: "El club",
    contact: "Contacto",
    nextTripsCta: "Abrir calendario",
    joinCta: "Ir a contacto",
    sponsorsCta: "Ver patrocinadores",
    routesCta: "Ver itinerarios",
    clubCta: "Descubrir el club",
    contactCta: "Contactar",
    fallbackTitle: "Puedo orientarte mejor",
    fallbackBody: "Prueba con una de estas preguntas: próximas salidas, cómo hacerme socio, patrocinadores, contacto o qué es el club.",
    guideTitle: "Qué resuelve ahora mismo",
    guide1: "Salidas y calendario",
    guide1d: "Lee el calendario cargado y te lleva a la siguiente actividad del club.",
    guide2: "Socios y contacto",
    guide2d: "Explica cómo contactar con el club y por dónde empezar el alta.",
    guide3: "Patrocinadores y club",
    guide3d: "Resume los patrocinadores visibles y explica rápido qué es el club.",
    history: "Conversaciones recientes",
    sourceNote: "Respuesta basada en la información actual cargada en la web.",
  },
  fr: {
    eyebrow: "Concierge IA du club",
    title: "Questions guidées sur le club, les prochaines sorties et l'adhésion.",
    intro: "Cet assistant s'appuie sur les informations actuellement chargées sur le site : calendrier, sponsors, contact et contenu du club.",
    placeholder: "Écrivez votre question...",
    ask: "Demander",
    listen: "Parler",
    stop: "Arrêter",
    speak: "Réponse vocale",
    noVoice: "Voix indisponible sur ce navigateur",
    prompt1: "Prochaines sorties",
    prompt2: "Comment adhérer",
    prompt3: "Quels sponsors",
    prompt4: "Qu'est-ce que le club",
    prompt5: "Comment contacter",
    prompt6: "Meilleurs itinéraires en Andorre",
    ready: "Prêt à vous aider",
    nextTrips: "Prochaines sorties",
    join: "Adhésion",
    sponsors: "Sponsors",
    club: "Le club",
    contact: "Contact",
    nextTripsCta: "Ouvrir le calendrier",
    joinCta: "Aller au contact",
    sponsorsCta: "Voir les sponsors",
    routesCta: "Voir les itinéraires",
    clubCta: "Découvrir le club",
    contactCta: "Contacter",
    fallbackTitle: "Je peux mieux vous orienter",
    fallbackBody: "Essayez l'une de ces questions : prochaines sorties, comment adhérer, sponsors, contact ou qu'est-ce que le club.",
    guideTitle: "Ce qu'il résout maintenant",
    guide1: "Sorties et calendrier",
    guide1d: "Lit le calendrier chargé et vous emmène vers la prochaine activité.",
    guide2: "Adhésion et contact",
    guide2d: "Explique comment contacter le club et par où commencer l'adhésion.",
    guide3: "Sponsors et club",
    guide3d: "Résume les sponsors visibles et explique rapidement le club.",
    history: "Conversations récentes",
    sourceNote: "Réponse fondée sur les informations actuellement chargées sur le site.",
  },
  en: {
    eyebrow: "Club AI concierge",
    title: "Guided questions about the club, upcoming outings and how to become a member.",
    intro: "This assistant works from the current information loaded on the website: calendar, sponsors, contact and club content.",
    placeholder: "Type your question...",
    ask: "Ask",
    listen: "Speak",
    stop: "Stop",
    speak: "Voice reply",
    noVoice: "Voice not available in this browser",
    prompt1: "Upcoming outings",
    prompt2: "How to become a member",
    prompt3: "Which sponsors are there",
    prompt4: "What is the club",
    prompt5: "How to contact",
    prompt6: "Best Andorra driving routes",
    ready: "Ready to help",
    nextTrips: "Upcoming outings",
    join: "Become a member",
    sponsors: "Sponsors",
    club: "The club",
    contact: "Contact",
    nextTripsCta: "Open calendar",
    joinCta: "Go to contact",
    sponsorsCta: "View sponsors",
    routesCta: "View routes",
    clubCta: "Discover the club",
    contactCta: "Contact",
    fallbackTitle: "I can guide you better",
    fallbackBody: "Try one of these questions: upcoming outings, how to become a member, sponsors, contact or what the club is.",
    guideTitle: "What it solves right now",
    guide1: "Outings and calendar",
    guide1d: "Reads the loaded calendar and guides visitors to the next activity.",
    guide2: "Membership and contact",
    guide2d: "Explains how to contact the club and where to start membership.",
    guide3: "Sponsors and club",
    guide3d: "Summarises visible sponsors and quickly explains the club.",
    history: "Recent conversations",
    sourceNote: "Reply based on the current information loaded on the website.",
  },
  pt: {
    eyebrow: "Concierge IA do clube",
    title: "Perguntas guiadas sobre o clube, os próximos passeios e como se tornar sócio.",
    intro: "Este assistente trabalha com a informação atual carregada no site: calendário, patrocinadores, contacto e conteúdo do clube.",
    placeholder: "Escreva a sua pergunta...",
    ask: "Perguntar",
    listen: "Falar",
    stop: "Parar",
    speak: "Resposta por voz",
    noVoice: "Voz indisponível neste navegador",
    prompt1: "Próximos passeios",
    prompt2: "Como ser sócio",
    prompt3: "Quais patrocinadores existem",
    prompt4: "O que é o clube",
    prompt5: "Como contactar",
    prompt6: "Melhores itinerários por Andorra",
    ready: "Pronto para ajudar",
    nextTrips: "Próximos passeios",
    join: "Tornar-se sócio",
    sponsors: "Patrocinadores",
    club: "O clube",
    contact: "Contacto",
    nextTripsCta: "Abrir calendário",
    joinCta: "Ir a contacto",
    sponsorsCta: "Ver patrocinadores",
    routesCta: "Ver itinerários",
    clubCta: "Descobrir o clube",
    contactCta: "Contactar",
    fallbackTitle: "Posso orientar melhor",
    fallbackBody: "Experimente uma destas perguntas: próximos passeios, como ser sócio, patrocinadores, contacto ou o que é o clube.",
    guideTitle: "O que resolve agora",
    guide1: "Passeios e calendário",
    guide1d: "Lê o calendário carregado e leva o visitante à próxima atividade.",
    guide2: "Sócios e contacto",
    guide2d: "Explica como contactar o clube e por onde começar a adesão.",
    guide3: "Patrocinadores e clube",
    guide3d: "Resume os patrocinadores visíveis e explica rapidamente o clube.",
    history: "Conversas recentes",
    sourceNote: "Resposta baseada na informação atual carregada no site.",
  },
  de: {
    eyebrow: "Club KI-Concierge",
    title: "Geführte Fragen zum Club, zu den nächsten Ausfahrten und zur Mitgliedschaft.",
    intro: "Dieser Assistent arbeitet mit den aktuell auf der Website geladenen Informationen: Kalender, Sponsoren, Kontakt und Club-Inhalte.",
    placeholder: "Schreiben Sie Ihre Frage...",
    ask: "Fragen",
    listen: "Sprechen",
    stop: "Stopp",
    speak: "Sprachantwort",
    noVoice: "Sprache in diesem Browser nicht verfügbar",
    prompt1: "Nächste Ausfahrten",
    prompt2: "Mitglied werden",
    prompt3: "Welche Sponsoren gibt es",
    prompt4: "Was ist der Club",
    prompt5: "Wie kontaktieren",
    prompt6: "Beste Routen in Andorra",
    ready: "Bereit zu helfen",
    nextTrips: "Nächste Ausfahrten",
    join: "Mitglied werden",
    sponsors: "Sponsoren",
    club: "Der Club",
    contact: "Kontakt",
    nextTripsCta: "Kalender öffnen",
    joinCta: "Zum Kontakt",
    sponsorsCta: "Sponsoren ansehen",
    routesCta: "Routen ansehen",
    clubCta: "Club entdecken",
    contactCta: "Kontakt",
    fallbackTitle: "Ich kann besser helfen",
    fallbackBody: "Probieren Sie eine dieser Fragen: nächste Ausfahrten, Mitglied werden, Sponsoren, Kontakt oder was der Club ist.",
    guideTitle: "Was es jetzt löst",
    guide1: "Ausfahrten und Kalender",
    guide1d: "Liest den geladenen Kalender und führt zum nächsten Event.",
    guide2: "Mitgliedschaft und Kontakt",
    guide2d: "Erklärt, wie man den Club kontaktiert und mit der Mitgliedschaft beginnt.",
    guide3: "Sponsoren und Club",
    guide3d: "Fasst sichtbare Sponsoren zusammen und erklärt den Club kurz.",
    history: "Letzte Gespräche",
    sourceNote: "Antwort auf Basis der aktuell geladenen Website-Informationen.",
  },
  ru: {
    eyebrow: "ИИ-консьерж клуба",
    title: "Вопросы о клубе, ближайших выездах и вступлении — в удобном формате.",
    intro: "Этот помощник работает на основе актуальной информации, загруженной на сайт: календарь, спонсоры, контакты и материалы клуба.",
    placeholder: "Напишите ваш вопрос...",
    ask: "Спросить",
    listen: "Говорить",
    stop: "Стоп",
    speak: "Ответ голосом",
    noVoice: "Голос недоступен в этом браузере",
    prompt1: "Ближайшие выезды",
    prompt2: "Как вступить",
    prompt3: "Какие есть спонсоры",
    prompt4: "Что такое клуб",
    prompt5: "Как связаться",
    prompt6: "Лучшие маршруты по Андорре",
    ready: "Готов помочь",
    nextTrips: "Ближайшие выезды",
    join: "Вступление",
    sponsors: "Спонсоры",
    club: "Клуб",
    contact: "Контакт",
    nextTripsCta: "Открыть календарь",
    joinCta: "Перейти к контактам",
    sponsorsCta: "Смотреть спонсоров",
    routesCta: "Смотреть маршруты",
    clubCta: "Узнать о клубе",
    contactCta: "Связаться",
    fallbackTitle: "Я могу направить точнее",
    fallbackBody: "Попробуйте один из вопросов: ближайшие выезды, как вступить, спонсоры, контакты или что такое клуб.",
    guideTitle: "Что решает сейчас",
    guide1: "Выезды и календарь",
    guide1d: "Читает загруженный календарь и ведёт к следующей активности.",
    guide2: "Участие и контакты",
    guide2d: "Объясняет, как связаться с клубом и с чего начать вступление.",
    guide3: "Спонсоры и клуб",
    guide3d: "Кратко описывает видимых спонсоров и сам клуб.",
    history: "Недавние разговоры",
    sourceNote: "Ответ основан на текущей информации, загруженной на сайт.",
  },
};

const voiceLangByLanguage: Record<LanguageCode, string> = {
  ca: "ca-ES",
  es: "es-ES",
  fr: "fr-FR",
  en: "en-GB",
  pt: "pt-PT",
  de: "de-DE",
  ru: "ru-RU",
};

const getUpcomingEvents = (language: LanguageCode) =>
  [...clubEvents]
    .filter((event) => event.start && new Date(event.start) > new Date())
    .sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""))
    .slice(0, 3)
    .map((event) => `${event.title} · ${formatEventDateRange(event, language)}`);

const ClubAssistant = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<AssistantResponse>({ title: t.ready, body: t.fallbackBody });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const featuredSponsor = sponsorItems.find((item) => item.tier === "featured");
  const nextEvent = getNextEvent();
  const upcomingEvents = useMemo(() => getUpcomingEvents(language), [language]);

  useEffect(() => {
    setAnswer({ title: t.ready, body: t.fallbackBody });
    setHistory([]);
  }, [language, t.ready, t.fallbackBody]);

  const resolveAnswer = (rawQuestion: string): AssistantResponse => {
    const q = rawQuestion.toLowerCase();

    if (/(soci|socio|member|alta|adhesi|join)/.test(q)) {
      return {
        title: t.join,
        body:
          language === "es"
            ? "Para hacerte socio, la vía más clara ahora mismo es contactar directamente con el club desde la página de contacto. Puedes escribir a bmwclubandorra@gmail.com, llamar al +376 338 117 y explicar que quieres darte de alta como socio."
            : `Email: bmwclubandorra@gmail.com · Tel: +376 338 117. ${t.joinCta}.`,
        cta: { label: t.joinCta, href: "/contacte" },
      };
    }

    if (/(sortid|salid|event|calend|proxim|próxim|trip|outing)/.test(q)) {
      return {
        title: t.nextTrips,
        body:
          nextEvent
            ? `${language === "es" ? "La próxima salida cargada es" : `${t.nextTrips}:`} ${nextEvent.title} · ${formatEventDateRange(nextEvent, language)}.${upcomingEvents.length ? ` ${upcomingEvents.join(" · ")}` : ""}`
            : t.fallbackBody,
        cta: { label: t.nextTripsCta, href: "/calendari/2026" },
      };
    }

    if (/(itiner|ruta|route|road|andorra.*moto|andorra.*coche|driv)/.test(q)) {
      return {
        title: language === "es" ? "Itinerarios BMW en Andorra" : t.nextTrips,
        body:
          language === "es"
            ? "Ya tienes una guía específica con rutas pensadas para BMW en Andorra: itinerarios de coche, moto y mixtos, con duración, distancia, trazado recomendado y enfoque de conducción."
            : t.fallbackBody,
        cta: { label: t.routesCta, href: "/itineraris" },
      };
    }

    if (/(patro|sponsor|partner|marca)/.test(q)) {
      const names = sponsorItems.slice(0, 4).map((item) => item.name).join(", ");
      return {
        title: t.sponsors,
        body:
          language === "es"
            ? `El patrocinador principal visible ahora es ${featuredSponsor?.name ?? "Pyrénées Andorra"}. También destacan ${names}. Ya están presentados con identidad visual propia y acceso directo a sus webs.`
            : `${featuredSponsor?.name ?? "Pyrénées Andorra"}. ${names}.`,
        cta: { label: t.sponsorsCta, href: "/patrocinadors" },
      };
    }

    if (/(club|qu[eé] es|qui[eé]n|about|historia|welcome)/.test(q)) {
      return {
        title: t.club,
        body:
          language === "es"
            ? "BMW Club Andorra es una comunidad de propietarios y aficionados BMW en Andorra. La web ya reúne calendario, salidas, archivo histórico, destacados, patrocinadores y conexión con BMW Oficial dentro de una experiencia mucho más cuidada."
            : t.fallbackBody,
        cta: { label: t.clubCta, href: "/el-club" },
      };
    }

    if (/(contact|email|mail|telefon|phone|whatsapp)/.test(q)) {
      return {
        title: t.contact,
        body:
          language === "es"
            ? "Puedes contactar con el club por email en bmwclubandorra@gmail.com o por teléfono en el +376 338 117. La página de contacto también te prepara el mensaje y te lleva directo al calendario o al alta de socio."
            : "bmwclubandorra@gmail.com · +376 338 117.",
        cta: { label: t.contactCta, href: "/contacte" },
      };
    }

    return { title: t.fallbackTitle, body: t.fallbackBody };
  };

  const submitQuestion = (forced?: string) => {
    const question = (forced ?? query).trim();
    if (!question) {
      setAnswer({ title: t.fallbackTitle, body: t.fallbackBody });
      return;
    }
    const resolved = resolveAnswer(question);
    setAnswer(resolved);
    setHistory((prev) => [{ question, answer: resolved }, ...prev].slice(0, 3));
  };

  const handleVoiceReply = () => {
    if (!("speechSynthesis" in window)) {
      setAnswer({ title: t.fallbackTitle, body: t.noVoice });
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${answer.title}. ${answer.body}`);
    utterance.lang = voiceLangByLanguage[language];
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleListen = () => {
    const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setAnswer({ title: t.fallbackTitle, body: t.noVoice });
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = voiceLangByLanguage[language];
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? "";
      setQuery(transcript);
      submitQuestion(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const prompts = [t.prompt1, t.prompt2, t.prompt3, t.prompt4, t.prompt5, t.prompt6];

  return (
    <PageShell>
      <section className="pt-10 pb-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <Card className="glass-dark border-0 rounded-[2.5rem] overflow-hidden relative p-8 md:p-10 text-white shadow-elegant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.35),transparent_32%)]" />
            <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  <Sparkles className="h-4 w-4" />
                  {t.eyebrow}
                </div>
                <h1 className="mt-5 text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
                <p className="mt-5 max-w-3xl text-lg text-white/72">{t.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {prompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => {
                        setQuery(prompt);
                        submitQuestion(prompt);
                      }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-primary" /><div className="text-3xl font-bold">{upcomingEvents.length}</div></div>
                  <div className="mt-2 text-sm text-white/68">{t.nextTrips}</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3"><Users className="h-5 w-5 text-primary" /><div className="text-3xl font-bold">{sponsorItems.length}</div></div>
                  <div className="mt-2 text-sm text-white/68">{t.sponsors}</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3"><BadgeCheck className="h-5 w-5 text-primary" /><div className="text-3xl font-bold">24/7</div></div>
                  <div className="mt-2 text-sm text-white/68">{t.ready}</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
            <Card className="premium-card border-0 rounded-[2rem] p-6 md:p-7 shadow-elegant">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.placeholder} className="h-12 rounded-full border-border/70 bg-white/80" />
                <Button variant="hero" className="rounded-full h-12 px-6" onClick={() => submitQuestion()}>{t.ask}</Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-full" onClick={handleListen}>{isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}{isListening ? t.stop : t.listen}</Button>
                <Button variant="outline" className="rounded-full" onClick={handleVoiceReply}><Volume2 className="mr-2 h-4 w-4" />{t.speak}</Button>
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-border/70 bg-white/70 p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">{answer.title}</div>
                <p className="mt-3 text-lg text-foreground/88 leading-relaxed">{answer.body}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.sourceNote}</p>
                {answer.cta ? (
                  <Link to={answer.cta.href} className="inline-flex items-center gap-2 mt-5 text-primary font-semibold">
                    {answer.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </Card>

            <div className="grid gap-6">
              <Card className="glass-panel border-0 rounded-[2rem] p-6 md:p-7 shadow-elegant">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <Mail className="h-4 w-4" />
                  {t.guideTitle}
                </div>
                <div className="mt-5 grid gap-4 text-sm text-muted-foreground">
                  {[
                    { title: t.guide1, body: t.guide1d },
                    { title: t.guide2, body: t.guide2d },
                    { title: t.guide3, body: t.guide3d },
                  ].map((item) => (
                    <div key={item.title} className="rounded-[1.4rem] bg-white/75 p-4">
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="mt-2">{item.body}</div>
                    </div>
                  ))}
                  <div className="rounded-[1.4rem] bg-white/75 p-4">
                    <div className="font-semibold text-foreground">bmwclubandorra@gmail.com</div>
                    <div className="mt-1">+376 338 117</div>
                  </div>
                  {upcomingEvents.map((line) => (
                    <div key={line} className="rounded-[1.4rem] bg-white/75 p-4">{line}</div>
                  ))}
                  <div className="rounded-[1.4rem] bg-white/75 p-4">
                    {featuredSponsor ? `${featuredSponsor.name} · sponsor principal` : "BMW Club Andorra"}
                  </div>
                </div>
              </Card>

              <Card className="premium-card border-0 rounded-[2rem] p-6 shadow-elegant">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <MessageSquareText className="h-4 w-4" />
                  {t.history}
                </div>
                <div className="mt-5 grid gap-4">
                  {history.length === 0 ? (
                    <div className="rounded-[1.4rem] border border-border/70 bg-white/75 p-4 text-sm text-muted-foreground">{t.fallbackBody}</div>
                  ) : (
                    history.map((item, index) => (
                      <div key={`${item.question}-${index}`} className="rounded-[1.4rem] border border-border/70 bg-white/75 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">{item.question}</div>
                        <div className="mt-2 text-sm text-foreground/86">{item.answer.body}</div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ClubAssistant;
