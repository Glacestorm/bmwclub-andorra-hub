import { ArrowUpRight, GaugeCircle, Newspaper, Settings2, Sparkles, Zap } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { officialBmwLinks } from "@/content/siteExperience";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "BMW Oficial",
    title: "Un hub més editorial, més útil i més digne de la marca",
    subtitle: "Aquest apartat connecta el club amb l'ecosistema oficial de BMW: portal principal, novetats, configurador, mobilitat elèctrica, serveis digitals i postvenda.",
    panelTitle: "Com s'ha de fer servir",
    panelBody: "No es tracta de duplicar BMW. Es tracta de donar una porta d'entrada elegant a la marca, amb un filtre útil per a socis, visitants i entusiastes.",
    action: "Obrir BMW.es",
    featured: "Selecció editorial",
    featuredTitle: "Tres portes clau per connectar el club amb el món BMW actual",
    resourceEyebrow: "Biblioteca oficial",
    resourceTitle: "Recursos de marca, producte i servei",
    useCasesEyebrow: "Com encaixa al club",
    useCasesTitle: "Un apartat útil, no només decoratiu",
    case1: "Descobrir novetats oficials sense sortir del relat del club.",
    case2: "Passar del contingut emocional a producte, configurador o servei oficial.",
    case3: "Donar una capa més actual i tecnològica a la web.",
  },
  es: {
    eyebrow: "BMW Oficial",
    title: "Un hub más editorial, más útil y más digno de la marca",
    subtitle: "Este apartado conecta el club con el ecosistema oficial de BMW: portal principal, novedades, configurador, movilidad eléctrica, servicios digitales y posventa.",
    panelTitle: "Cómo debe usarse",
    panelBody: "No se trata de duplicar BMW. Se trata de dar una puerta de entrada elegante a la marca, con un filtro útil para socios, visitantes y entusiastas.",
    action: "Abrir BMW.es",
    featured: "Selección editorial",
    featuredTitle: "Tres puertas clave para conectar el club con el BMW actual",
    resourceEyebrow: "Biblioteca oficial",
    resourceTitle: "Recursos de marca, producto y servicio",
    useCasesEyebrow: "Cómo encaja en el club",
    useCasesTitle: "Un apartado útil, no solo decorativo",
    case1: "Descubrir novedades oficiales sin salir del relato del club.",
    case2: "Pasar del contenido emocional a producto, configurador o servicio oficial.",
    case3: "Dar una capa más actual y tecnológica a la web.",
  },
  fr: {
    eyebrow: "BMW Officiel",
    title: "Un hub plus éditorial, plus utile et plus digne de la marque",
    subtitle: "Cette rubrique relie le club à l'écosystème officiel de BMW : portail principal, nouveautés, configurateur, mobilité électrique, services digitaux et après-vente.",
    panelTitle: "Comment l'utiliser",
    panelBody: "Il ne s'agit pas de dupliquer BMW. Il s'agit d'offrir une porte d'entrée élégante vers la marque, utile pour les membres, visiteurs et passionnés.",
    action: "Ouvrir BMW.es",
    featured: "Sélection éditoriale",
    featuredTitle: "Trois portes clés pour relier le club au BMW actuel",
    resourceEyebrow: "Bibliothèque officielle",
    resourceTitle: "Ressources de marque, produit et service",
    useCasesEyebrow: "Comment cela s'intègre au club",
    useCasesTitle: "Une rubrique utile, pas seulement décorative",
    case1: "Découvrir les nouveautés officielles sans quitter le récit du club.",
    case2: "Passer du contenu émotionnel au produit, configurateur ou service officiel.",
    case3: "Donner au site une couche plus actuelle et technologique.",
  },
  en: {
    eyebrow: "BMW Official",
    title: "A more editorial, more useful and more brand-worthy hub",
    subtitle: "This section connects the club with BMW's official ecosystem: main portal, updates, configurator, electric mobility, digital services and aftersales.",
    panelTitle: "How it should be used",
    panelBody: "This is not about duplicating BMW. It is about offering an elegant entry point into the brand, useful for members, visitors and enthusiasts.",
    action: "Open BMW.es",
    featured: "Editorial selection",
    featuredTitle: "Three key doors connecting the club with today's BMW",
    resourceEyebrow: "Official library",
    resourceTitle: "Brand, product and service resources",
    useCasesEyebrow: "How it fits the club",
    useCasesTitle: "A useful section, not just decorative",
    case1: "Discover official updates without leaving the club narrative.",
    case2: "Move from emotional content into product, configurator or official service.",
    case3: "Add a more current and technological layer to the website.",
  },
  pt: {
    eyebrow: "BMW Oficial",
    title: "Um hub mais editorial, mais útil e mais digno da marca",
    subtitle: "Esta secção liga o clube ao ecossistema oficial BMW: portal principal, novidades, configurador, mobilidade elétrica, serviços digitais e pós-venda.",
    panelTitle: "Como deve ser usado",
    panelBody: "Não se trata de duplicar a BMW. Trata-se de dar uma porta de entrada elegante para a marca, útil para sócios, visitantes e entusiastas.",
    action: "Abrir BMW.es",
    featured: "Seleção editorial",
    featuredTitle: "Três portas chave para ligar o clube à BMW atual",
    resourceEyebrow: "Biblioteca oficial",
    resourceTitle: "Recursos de marca, produto e serviço",
    useCasesEyebrow: "Como encaixa no clube",
    useCasesTitle: "Uma secção útil, não apenas decorativa",
    case1: "Descobrir novidades oficiais sem sair da narrativa do clube.",
    case2: "Passar do conteúdo emocional para produto, configurador ou serviço oficial.",
    case3: "Dar ao site uma camada mais atual e tecnológica.",
  },
  de: {
    eyebrow: "BMW Offiziell",
    title: "Ein redaktionellerer, nützlicherer und markengerechterer Hub",
    subtitle: "Dieser Bereich verbindet den Club mit dem offiziellen BMW-Ökosystem: Hauptportal, Neuheiten, Konfigurator, Elektromobilität, digitale Dienste und Aftersales.",
    panelTitle: "Wie er genutzt werden sollte",
    panelBody: "Es geht nicht darum, BMW zu duplizieren. Es geht darum, einen eleganten Einstieg in die Marke zu bieten, nützlich für Mitglieder, Besucher und Enthusiasten.",
    action: "BMW.es öffnen",
    featured: "Redaktionelle Auswahl",
    featuredTitle: "Drei Schlüsseltüren zwischen Club und aktuellem BMW",
    resourceEyebrow: "Offizielle Bibliothek",
    resourceTitle: "Marken-, Produkt- und Service-Ressourcen",
    useCasesEyebrow: "Wie es in den Club passt",
    useCasesTitle: "Ein nützlicher Bereich, nicht nur Dekoration",
    case1: "Offizielle Neuheiten entdecken, ohne den Club-Kontext zu verlassen.",
    case2: "Vom emotionalen Content zu Produkt, Konfigurator oder offiziellem Service wechseln.",
    case3: "Der Website eine aktuellere und technologischere Ebene geben.",
  },
  ru: {
    eyebrow: "BMW Official",
    title: "Более редакционный, полезный и достойный бренда хаб",
    subtitle: "Этот раздел связывает клуб с официальной экосистемой BMW: основной портал, новинки, конфигуратор, электромобильность, цифровые сервисы и послепродажное обслуживание.",
    panelTitle: "Как это должно работать",
    panelBody: "Смысл не в том, чтобы дублировать BMW. Смысл в том, чтобы дать элегантную точку входа в бренд, полезную для участников, посетителей и энтузиастов.",
    action: "Открыть BMW.es",
    featured: "Редакционный выбор",
    featuredTitle: "Три ключевых двери между клубом и современным BMW",
    resourceEyebrow: "Официальная библиотека",
    resourceTitle: "Ресурсы бренда, продукта и сервиса",
    useCasesEyebrow: "Как это вписывается в клуб",
    useCasesTitle: "Полезный раздел, а не просто декор",
    case1: "Открывать официальные новинки, не выходя из клубного контекста.",
    case2: "Переходить от эмоционального контента к продукту, конфигуратору или официальному сервису.",
    case3: "Добавлять сайту более актуальный и технологичный слой.",
  },
};

const iconList = [Newspaper, Zap, Settings2, GaugeCircle, Sparkles, ArrowUpRight];

const BmwOficial = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const featuredLinks = officialBmwLinks.slice(0, 3);
  const secondaryLinks = officialBmwLinks.slice(3);

  return (
    <PageShell>
      <section className="pt-10 pb-10">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-[1fr_0.85fr] gap-8 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{t.subtitle}</p>
          </div>
          <Card className="glass-dark rounded-[2rem] p-8 border-0 text-white">
            <h2 className="text-2xl font-bold">{t.panelTitle}</h2>
            <p className="mt-3 text-white/75">{t.panelBody}</p>
            <div className="mt-6">
              <a href={officialBmwLinks[0]?.href} target="_blank" rel="noreferrer"><Button variant="hero">{t.action}</Button></a>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.featured}</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-balance">{t.featuredTitle}</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredLinks.map((item, index) => {
              const Icon = iconList[index % iconList.length];
              const large = index === 0;
              return (
                <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className={`block ${large ? "lg:col-span-2" : ""}`}>
                  <Card className={`border-0 rounded-[2.2rem] overflow-hidden h-full ${large ? "glass-dark text-white" : "premium-card"}`}>
                    <div className="p-8 md:p-9 h-full flex flex-col justify-between">
                      <div>
                        <div className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${large ? "bg-white/10 text-white/80" : "bg-primary/10 text-primary"}`}>
                          {getLocalizedText(item.tag, language)}
                        </div>
                        <div className={`rounded-2xl p-3 w-fit mt-6 ${large ? "bg-white/10" : "bg-secondary/70"}`}><Icon className={`h-5 w-5 ${large ? "text-white" : "text-primary"}`} /></div>
                        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-balance">{getLocalizedText(item.title, language)}</h2>
                        <p className={`mt-4 ${large ? "text-white/75" : "text-muted-foreground"}`}>{getLocalizedText(item.summary, language)}</p>
                      </div>
                      <div className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${large ? "text-white" : "text-primary"}`}>
                        {getLocalizedText(item.cta, language)}
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-[0.92fr_1.08fr] gap-6 items-stretch">
          <Card className="premium-card border-0 rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.useCasesEyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">{t.useCasesTitle}</h2>
            <div className="mt-6 grid gap-4">
              {[t.case1, t.case2, t.case3].map((item, index) => (
                <div key={item} className="rounded-[1.5rem] bg-white/80 border border-white/80 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">0{index + 1}</div>
                  <p className="mt-2 font-medium text-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-panel border-0 rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.resourceEyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">{t.resourceTitle}</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {secondaryLinks.map((item, index) => {
                const Icon = iconList[(index + 3) % iconList.length];
                return (
                  <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="rounded-[1.5rem] bg-white/80 border border-white/80 p-5 block hover:bg-white transition-base">
                    <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{getLocalizedText(item.tag, language)}</div>
                    <div className="rounded-2xl bg-secondary/70 p-3 w-fit mt-4"><Icon className="h-5 w-5 text-primary" /></div>
                    <h3 className="mt-4 text-xl font-bold text-balance">{getLocalizedText(item.title, language)}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{getLocalizedText(item.summary, language)}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">{getLocalizedText(item.cta, language)} <ArrowUpRight className="h-4 w-4" /></div>
                  </a>
                );
              })}
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default BmwOficial;
