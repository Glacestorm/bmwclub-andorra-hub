import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeCheck, Crown, Handshake } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { sponsorItems } from "@/content/sponsorData";
import { getLocalizedText } from "@/lib/localized";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Patrocinadors i partners",
    title: "Un panell amb més valor, més visibilitat i millor presència per a les marques",
    intro:
      "Els patrocinadors han de veure clarament que formen part d'un club cuidat, premium i amb una presentació a l'altura. Per això ara tenen més presència, millor jerarquia visual i enllaç directe a la seva web.",
    ctaPrimary: "Fer-me patrocinador",
    ctaSecondary: "Veure BMW Oficial",
    featuredLabel: "Sponsor principal",
    premiumLabel: "Partners destacats",
    premiumTitle: "Un espai que projecta millor cada marca",
    networkLabel: "Xarxa de col·laboradors",
    networkIntro: "Un ecosistema visible i ordenat que reforça confiança, territori i qualitat percebuda.",
    openSite: "Obrir web oficial",
    memberBenefits: "Avantatges per a socis",
    benefitsSummary: "Descomptes, condicions especials i presència destacada dins l'ecosistema del club.",
    activeBrands: "marques visibles",
    linkedPartners: "partners amb enllaç",
    supportPartners: "col·laboradors de suport",
  },
  es: {
    eyebrow: "Patrocinadores y partners",
    title: "Un panel con más valor, más visibilidad y mejor presencia para las marcas",
    intro:
      "Los patrocinadores tienen que percibir claramente que forman parte de un club cuidado, premium y con una presentación a la altura. Por eso ahora tienen más presencia, mejor jerarquía visual y enlace directo a su web.",
    ctaPrimary: "Quiero ser patrocinador",
    ctaSecondary: "Ver BMW Oficial",
    featuredLabel: "Patrocinador principal",
    premiumLabel: "Partners destacados",
    premiumTitle: "Un espacio que proyecta mejor a cada marca",
    networkLabel: "Red de colaboradores",
    networkIntro: "Un ecosistema visible y ordenado que refuerza confianza, territorio y calidad percibida.",
    openSite: "Abrir web oficial",
    memberBenefits: "Ventajas para socios",
    benefitsSummary: "Descuentos, condiciones especiales y presencia destacada dentro del ecosistema del club.",
    activeBrands: "marcas visibles",
    linkedPartners: "partners con enlace",
    supportPartners: "colaboradores de soporte",
  },
  fr: {
    eyebrow: "Sponsors et partenaires",
    title: "Un panneau avec plus de valeur, plus de visibilité et une meilleure présence pour les marques",
    intro:
      "Les sponsors doivent percevoir clairement qu'ils font partie d'un club soigné, premium et présenté avec niveau. Ils disposent désormais de plus de présence, d'une meilleure hiérarchie visuelle et d'un lien direct vers leur site.",
    ctaPrimary: "Devenir sponsor",
    ctaSecondary: "Voir BMW Officiel",
    featuredLabel: "Sponsor principal",
    premiumLabel: "Partenaires mis en avant",
    premiumTitle: "Un espace qui valorise mieux chaque marque",
    networkLabel: "Réseau de collaborateurs",
    networkIntro: "Un écosystème visible et ordonné qui renforce la confiance, le territoire et la qualité perçue.",
    openSite: "Ouvrir le site officiel",
    memberBenefits: "Avantages membres",
    benefitsSummary: "Réductions, conditions spéciales et présence mise en avant dans l'écosystème du club.",
    activeBrands: "marques visibles",
    linkedPartners: "partenaires avec lien",
    supportPartners: "collaborateurs de soutien",
  },
  en: {
    eyebrow: "Sponsors and partners",
    title: "A panel with more value, more visibility and better presence for partner brands",
    intro:
      "Sponsors should immediately feel they are part of a carefully presented, premium club. That is why they now get more presence, a clearer visual hierarchy and direct links to their official sites.",
    ctaPrimary: "Become a sponsor",
    ctaSecondary: "View BMW Official",
    featuredLabel: "Main sponsor",
    premiumLabel: "Featured partners",
    premiumTitle: "A space that elevates each brand better",
    networkLabel: "Support network",
    networkIntro: "A visible, well-ordered ecosystem that reinforces trust, local roots and perceived quality.",
    openSite: "Open official site",
    memberBenefits: "Member benefits",
    benefitsSummary: "Discounts, special conditions and premium visibility inside the club ecosystem.",
    activeBrands: "visible brands",
    linkedPartners: "linked partners",
    supportPartners: "support collaborators",
  },
  pt: {
    eyebrow: "Patrocinadores e parceiros",
    title: "Um painel com mais valor, mais visibilidade e melhor presença para as marcas",
    intro:
      "Os patrocinadores devem perceber logo que fazem parte de um clube cuidado, premium e bem apresentado. Por isso passam agora a ter mais presença, melhor hierarquia visual e ligação direta ao site oficial.",
    ctaPrimary: "Quero ser patrocinador",
    ctaSecondary: "Ver BMW Oficial",
    featuredLabel: "Patrocinador principal",
    premiumLabel: "Parceiros em destaque",
    premiumTitle: "Um espaço que valoriza melhor cada marca",
    networkLabel: "Rede de colaboradores",
    networkIntro: "Um ecossistema visível e organizado que reforça confiança, território e qualidade percebida.",
    openSite: "Abrir site oficial",
    memberBenefits: "Vantagens para sócios",
    benefitsSummary: "Descontos, condições especiais e presença destacada dentro do ecossistema do clube.",
    activeBrands: "marcas visíveis",
    linkedPartners: "parceiros com link",
    supportPartners: "colaboradores de apoio",
  },
  de: {
    eyebrow: "Sponsoren und Partner",
    title: "Ein Bereich mit mehr Wert, mehr Sichtbarkeit und besserer Präsenz für Partnermarken",
    intro:
      "Sponsoren sollen sofort erkennen, dass sie Teil eines gepflegten, hochwertigen Clubs sind. Deshalb erhalten sie jetzt mehr Präsenz, eine klarere visuelle Hierarchie und direkte Links zu ihren offiziellen Websites.",
    ctaPrimary: "Sponsor werden",
    ctaSecondary: "BMW Offiziell ansehen",
    featuredLabel: "Hauptsponsor",
    premiumLabel: "Hervorgehobene Partner",
    premiumTitle: "Ein Bereich, der jede Marke besser aufwertet",
    networkLabel: "Partnernetzwerk",
    networkIntro: "Ein sichtbares und geordnetes Ökosystem, das Vertrauen, regionale Verankerung und wahrgenommene Qualität stärkt.",
    openSite: "Offizielle Website öffnen",
    memberBenefits: "Mitgliedervorteile",
    benefitsSummary: "Rabatte, Sonderkonditionen und hochwertige Sichtbarkeit innerhalb des Club-Ökosystems.",
    activeBrands: "sichtbare Marken",
    linkedPartners: "Partner mit Link",
    supportPartners: "Support-Partner",
  },
  ru: {
    eyebrow: "Спонсоры и партнёры",
    title: "Панель с большей ценностью, заметностью и лучшим присутствием для партнёрских брендов",
    intro:
      "Спонсоры должны сразу видеть, что они являются частью аккуратно оформленного премиального клуба. Поэтому теперь у них больше присутствия, более чёткая визуальная иерархия и прямые ссылки на официальные сайты.",
    ctaPrimary: "Стать спонсором",
    ctaSecondary: "Открыть BMW Official",
    featuredLabel: "Главный спонсор",
    premiumLabel: "Выделенные партнёры",
    premiumTitle: "Пространство, которое лучше подаёт каждый бренд",
    networkLabel: "Сеть партнёров",
    networkIntro: "Видимая и упорядоченная экосистема, усиливающая доверие, локальную связь и ощущение качества.",
    openSite: "Открыть официальный сайт",
    memberBenefits: "Преимущества для участников",
    benefitsSummary: "Скидки, специальные условия и заметное присутствие внутри экосистемы клуба.",
    activeBrands: "видимых брендов",
    linkedPartners: "партнёров со ссылкой",
    supportPartners: "поддерживающих партнёров",
  },
};

const Patrocinadors = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const featuredSponsor = sponsorItems.find((item) => item.tier === "featured");
  const premiumSponsors = sponsorItems.filter((item) => item.tier === "premium");
  const supportSponsors = sponsorItems.filter((item) => item.tier === "support");
  const linkedSponsors = sponsorItems.filter((item) => item.link);

  return (
    <PageShell>
      <section className="pt-10 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2.5rem] overflow-hidden relative p-8 md:p-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.35),transparent_32%)]" />
            <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  <Handshake className="h-4 w-4" />
                  {t.eyebrow}
                </div>
                <h1 className="mt-5 text-4xl md:text-6xl font-bold text-balance max-w-4xl">{t.title}</h1>
                <p className="mt-5 max-w-3xl text-lg text-white/72">{t.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contacte">
                    <Button variant="hero" size="lg" className="rounded-full">{t.ctaPrimary}</Button>
                  </Link>
                  <Link to="/bmw-oficial">
                    <Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                      {t.ctaSecondary}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-3xl font-bold">{sponsorItems.length}</div>
                  <div className="mt-2 text-sm text-white/68">{t.activeBrands}</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-3xl font-bold">{linkedSponsors.length}</div>
                  <div className="mt-2 text-sm text-white/68">{t.linkedPartners}</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-3xl font-bold">{supportSponsors.length}</div>
                  <div className="mt-2 text-sm text-white/68">{t.supportPartners}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {featuredSponsor && (
        <section className="pb-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="premium-card border-0 rounded-[2.5rem] overflow-hidden p-8 md:p-10">
              <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    <Crown className="h-4 w-4" />
                    {t.featuredLabel}
                  </div>
                  <h2 className="mt-5 text-3xl md:text-5xl font-bold text-balance">{featuredSponsor.name}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">{getLocalizedText(featuredSponsor.summary, language)}</p>
                  {featuredSponsor.benefit && (
                    <div className="mt-6 rounded-[1.5rem] bg-secondary/70 p-5">
                      <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">{t.memberBenefits}</div>
                      <p className="mt-3 font-medium text-foreground/90">{getLocalizedText(featuredSponsor.benefit, language)}</p>
                    </div>
                  )}
                </div>

                <div className="glass-panel rounded-[2rem] p-6 md:p-7">
                  <div className="rounded-[1.5rem] bg-accent text-white p-6 shadow-elegant">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                      <BadgeCheck className="h-4 w-4" />
                      BMW Club Andorra
                    </div>
                    <p className="mt-4 text-xl font-semibold text-balance">{t.benefitsSummary}</p>
                    {featuredSponsor.link && (
                      <a href={featuredSponsor.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-white">
                        {t.openSite}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <section className="pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.premiumLabel}</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-balance">{t.premiumTitle}</h2>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {premiumSponsors.map((sponsor) => (
              <Card key={sponsor.id} className="premium-card border-0 rounded-[2rem] p-6 hover-tilt h-full flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">{t.premiumLabel}</div>
                    <h3 className="mt-3 text-2xl font-bold text-balance">{sponsor.name}</h3>
                  </div>
                  <div className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {sponsor.category}
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground flex-1">{getLocalizedText(sponsor.summary, language)}</p>
                {sponsor.benefit && (
                  <div className="mt-5 rounded-[1.35rem] bg-secondary/70 p-4 text-sm text-foreground/85">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">{t.memberBenefits}</div>
                    {getLocalizedText(sponsor.benefit, language)}
                  </div>
                )}
                {sponsor.link && (
                  <a href={sponsor.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-6 text-primary font-semibold">
                    {t.openSite}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-panel border-0 rounded-[2.25rem] p-8 md:p-10">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.networkLabel}</p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">{t.networkIntro}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {supportSponsors.map((sponsor) => (
                  <div key={sponsor.id} className="rounded-[1.5rem] bg-white/70 border border-white/70 p-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,.35)]">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{sponsor.category}</div>
                    <div className="mt-3 text-xl font-bold text-balance">{sponsor.name}</div>
                    <p className="mt-3 text-sm text-muted-foreground">{getLocalizedText(sponsor.summary, language)}</p>
                    {sponsor.link && (
                      <a href={sponsor.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary">
                        {t.openSite}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
};

export default Patrocinadors;
