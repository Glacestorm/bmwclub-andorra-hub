import { ArrowUpRight, Newspaper, Zap, Settings2, GaugeCircle, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { officialBmwLinks } from "@/content/siteExperience";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { eyebrow: "BMW Oficial", title: "Pont directe amb la marca", subtitle: "Aquest apartat connecta el club amb l'ecosistema oficial de BMW: portal principal, novetats, configurador, mobilitat elèctrica, serveis digitals i postvenda.", panelTitle: "Com ho faria servir", panelBody: "No copiaria contingut oficial dins la web del club. El que sí funciona és un hub elegant, clar i ben curat que porti a fonts oficials i novetats de la marca.", action: "Veure hub oficial" },
  es: { eyebrow: "BMW Oficial", title: "Puente directo con la marca", subtitle: "Este apartado conecta el club con el ecosistema oficial de BMW: portal principal, novedades, configurador, movilidad eléctrica, servicios digitales y posventa.", panelTitle: "Cómo lo usaría", panelBody: "No copiaría contenido oficial dentro de la web del club. Lo que sí funciona es un hub elegante, claro y bien curado que lleve a fuentes oficiales y novedades de la marca.", action: "Ver hub oficial" },
  fr: { eyebrow: "BMW Officiel", title: "Pont direct avec la marque", subtitle: "Cette rubrique relie le club à l'écosystème officiel de BMW : portail principal, nouveautés, configurateur, mobilité électrique, services digitaux et après-vente.", panelTitle: "Comment l'utiliser", panelBody: "Je ne copierais pas le contenu officiel dans le site du club. Ce qui fonctionne, c'est un hub élégant, clair et bien curé menant vers les sources officielles et les nouveautés de la marque.", action: "Voir le hub officiel" },
  en: { eyebrow: "BMW Official", title: "A direct bridge to the brand", subtitle: "This section connects the club with BMW's official ecosystem: main portal, updates, configurator, electric mobility, digital services and aftersales.", panelTitle: "How I would use it", panelBody: "I would not copy official content into the club website. What works is an elegant, clear and curated hub pointing to official sources and brand updates.", action: "Open official hub" },
  pt: { eyebrow: "BMW Oficial", title: "Ponte direta com a marca", subtitle: "Esta secção liga o clube ao ecossistema oficial BMW: portal principal, novidades, configurador, mobilidade elétrica, serviços digitais e pós-venda.", panelTitle: "Como o usaria", panelBody: "Não copiaria conteúdo oficial para dentro do site do clube. O que funciona é um hub elegante, claro e bem curado que leve a fontes oficiais e novidades da marca.", action: "Ver hub oficial" },
  de: { eyebrow: "BMW Offiziell", title: "Direkte Brücke zur Marke", subtitle: "Dieser Bereich verbindet den Club mit dem offiziellen BMW-Ökosystem: Hauptportal, Neuheiten, Konfigurator, Elektromobilität, digitale Dienste und Aftersales.", panelTitle: "So würde ich es nutzen", panelBody: "Ich würde keine offiziellen Inhalte in die Club-Website kopieren. Was funktioniert, ist ein eleganter, klarer und kuratierter Hub zu offiziellen Quellen und Marken-News.", action: "Offiziellen Hub öffnen" },
  ru: { eyebrow: "BMW Official", title: "Прямой мост к бренду", subtitle: "Этот раздел связывает клуб с официальной экосистемой BMW: основной портал, новинки, конфигуратор, электромобильность, цифровые сервисы и послепродажное обслуживание.", panelTitle: "Как это использовать", panelBody: "Я бы не копировал официальный контент внутрь сайта клуба. Рабочий вариант — элегантный, понятный и аккуратно собранный хаб с переходами к официальным источникам и новинкам бренда.", action: "Открыть официальный хаб" },
};

const iconList = [Newspaper, Zap, Settings2, GaugeCircle, Sparkles, ArrowUpRight];

const BmwOficial = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageShell>
      <section className="pt-32 pb-14 section-shell">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-[1fr_0.85fr] gap-8 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">{t.eyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{t.subtitle}</p>
          </div>
          <Card className="glass-dark rounded-[2rem] p-8 border-0 text-white">
            <h2 className="text-2xl font-bold">{t.panelTitle}</h2>
            <p className="mt-3 text-white/75">{t.panelBody}</p>
            <div className="mt-6"><Button variant="hero">{t.action}</Button></div>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {officialBmwLinks.map((item, index) => {
            const Icon = iconList[index % iconList.length];
            return (
              <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="block hover-tilt">
                <Card className="premium-card border-0 rounded-[2rem] p-6 h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{getLocalizedText(item.tag, language)}</div>
                      <div>
                        <div className="rounded-2xl bg-secondary/70 p-3 w-fit mb-4"><Icon className="h-5 w-5 text-primary" /></div>
                        <h2 className="text-2xl font-bold text-balance">{getLocalizedText(item.title, language)}</h2>
                        <p className="mt-3 text-sm text-muted-foreground">{getLocalizedText(item.summary, language)}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-primary shrink-0" />
                  </div>
                  <div className="mt-6 text-sm font-medium text-primary">{getLocalizedText(item.cta, language)}</div>
                </Card>
              </a>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
};

export default BmwOficial;
