import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeCheck, Crown, Handshake, ShieldCheck, Sparkles, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { sponsorItems, type SponsorItem } from "@/content/sponsorData";
import { getLocalizedText } from "@/lib/localized";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Patrocinadors i partners",
    title: "Un panell amb més valor, més visibilitat i millor presència per a les marques",
    intro: "Els patrocinadors han de veure clarament que formen part d'un club cuidat, premium i amb una presentació a l'altura. Per això ara tenen més presència, millor jerarquia visual, color de marca com a accent i identitat pròpia dins cada targeta.",
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
    presentingPartner: "Partner presentador del club",
    featuredStatement: "La marca que més ha de brillar dins aquest panell perquè connecta club, territori i experiència BMW.",
    officialPresence: "Presència premium",
    officialPresenceDesc: "Visibilitat principal dins el panell, home i peu de pàgina.",
    memberValue: "Valor per als socis",
    memberValueDesc: "Condicions especials, recanvis, accessoris i context comercial clar.",
    trustLabel: "Confiança de marca",
    trustDesc: "Una presentació més sòlida per a un sponsor que ha de sentir-se central.",
    visualIdentity: "Identitat visual",
  },
  es: {
    eyebrow: "Patrocinadores y partners",
    title: "Un panel con más valor, más visibilidad y mejor presencia para las marcas",
    intro: "Los patrocinadores tienen que percibir claramente que forman parte de un club cuidado, premium y con una presentación a la altura. Por eso ahora tienen más presencia, mejor jerarquía visual, color de marca como acento e identidad propia dentro de cada tarjeta.",
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
    presentingPartner: "Partner presentador del club",
    featuredStatement: "La marca que más debe brillar dentro de este panel porque conecta club, territorio y experiencia BMW.",
    officialPresence: "Presencia premium",
    officialPresenceDesc: "Visibilidad principal dentro del panel, home y pie de página.",
    memberValue: "Valor para socios",
    memberValueDesc: "Condiciones especiales, recambios, accesorios y contexto comercial claro.",
    trustLabel: "Confianza de marca",
    trustDesc: "Una presentación más sólida para un patrocinador que debe sentirse central.",
    visualIdentity: "Identidad visual",
  },
  fr: {
    eyebrow: "Sponsors et partenaires",
    title: "Un panneau avec plus de valeur, plus de visibilité et une meilleure présence pour les marques",
    intro: "Les sponsors doivent percevoir clairement qu'ils font partie d'un club soigné, premium et présenté avec niveau. Ils disposent désormais de plus de présence, d'une meilleure hiérarchie visuelle, d'une couleur de marque en accent et d'une identité propre dans chaque carte.",
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
    presentingPartner: "Partenaire référent du club",
    featuredStatement: "La marque qui doit le plus rayonner dans ce panneau car elle relie club, territoire et expérience BMW.",
    officialPresence: "Présence premium",
    officialPresenceDesc: "Visibilité principale dans le panneau, l'accueil et le pied de page.",
    memberValue: "Valeur membre",
    memberValueDesc: "Conditions spéciales, pièces, accessoires et contexte commercial clair.",
    trustLabel: "Confiance de marque",
    trustDesc: "Une présentation plus solide pour un sponsor qui doit se sentir central.",
    visualIdentity: "Identité visuelle",
  },
  en: {
    eyebrow: "Sponsors and partners",
    title: "A panel with more value, more visibility and better presence for partner brands",
    intro: "Sponsors should immediately feel they are part of a carefully presented, premium club. That is why they now get more presence, clearer hierarchy, brand colour accents and a stronger identity on every card.",
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
    presentingPartner: "Presenting partner of the club",
    featuredStatement: "The brand that should shine the most in this panel because it connects the club, the territory and the BMW experience.",
    officialPresence: "Premium presence",
    officialPresenceDesc: "Primary visibility across this panel, the homepage and the footer.",
    memberValue: "Member value",
    memberValueDesc: "Special conditions, parts, accessories and clear commercial context.",
    trustLabel: "Brand trust",
    trustDesc: "A stronger presentation for a sponsor that should feel central.",
    visualIdentity: "Visual identity",
  },
  pt: {
    eyebrow: "Patrocinadores e parceiros",
    title: "Um painel com mais valor, mais visibilidade e melhor presença para as marcas",
    intro: "Os patrocinadores devem perceber logo que fazem parte de um clube cuidado, premium e bem apresentado. Por isso passam agora a ter mais presença, melhor hierarquia visual, cor de marca como acento e identidade própria em cada cartão.",
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
    presentingPartner: "Parceiro apresentador do clube",
    featuredStatement: "A marca que mais deve brilhar neste painel porque liga clube, território e experiência BMW.",
    officialPresence: "Presença premium",
    officialPresenceDesc: "Visibilidade principal dentro do painel, home e rodapé.",
    memberValue: "Valor para sócios",
    memberValueDesc: "Condições especiais, peças, acessórios e contexto comercial claro.",
    trustLabel: "Confiança de marca",
    trustDesc: "Uma apresentação mais sólida para um patrocinador que deve sentir-se central.",
    visualIdentity: "Identidade visual",
  },
  de: {
    eyebrow: "Sponsoren und Partner",
    title: "Ein Bereich mit mehr Wert, mehr Sichtbarkeit und besserer Präsenz für Partnermarken",
    intro: "Sponsoren sollen sofort erkennen, dass sie Teil eines gepflegten, hochwertigen Clubs sind. Deshalb erhalten sie jetzt mehr Präsenz, klarere Hierarchie, Markenfarben als Akzent und eine stärkere Identität auf jeder Karte.",
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
    presentingPartner: "Präsentierender Partner des Clubs",
    featuredStatement: "Die Marke, die in diesem Bereich am stärksten strahlen sollte, weil sie Club, Region und BMW-Erlebnis verbindet.",
    officialPresence: "Premium-Präsenz",
    officialPresenceDesc: "Hauptsichtbarkeit in diesem Bereich, auf der Startseite und im Footer.",
    memberValue: "Mitgliedernutzen",
    memberValueDesc: "Sonderkonditionen, Teile, Zubehör und klarer kommerzieller Kontext.",
    trustLabel: "Markenvertrauen",
    trustDesc: "Eine stärkere Präsentation für einen Sponsor, der zentral wirken soll.",
    visualIdentity: "Visuelle Identität",
  },
  ru: {
    eyebrow: "Спонсоры и партнёры",
    title: "Панель с большей ценностью, заметностью и лучшим присутствием для партнёрских брендов",
    intro: "Спонсоры должны сразу видеть, что они являются частью аккуратно оформленного премиального клуба. Поэтому теперь у них больше присутствия, более чёткая иерархия, фирменные цветовые акценты и своя идентичность на каждой карточке.",
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
    presentingPartner: "Ключевой партнёр клуба",
    featuredStatement: "Бренд, который должен сиять сильнее всех в этой панели, потому что связывает клуб, территорию и опыт BMW.",
    officialPresence: "Премиальное присутствие",
    officialPresenceDesc: "Главная видимость в этой панели, на главной странице и в футере.",
    memberValue: "Ценность для участников",
    memberValueDesc: "Специальные условия, запчасти, аксессуары и понятный коммерческий контекст.",
    trustLabel: "Доверие к бренду",
    trustDesc: "Более сильная подача для спонсора, который должен ощущаться центральным.",
    visualIdentity: "Визуальная идентичность",
  },
};

const SponsorLogoPlate = ({ sponsor, dark = false, compact = false }: { sponsor: SponsorItem; dark?: boolean; compact?: boolean }) => {
  const logoFit = sponsor.brand.logoFit ?? "standard";
  const isPyrenees = sponsor.id === "pyrenees-andorra";

  const logoClassByFit = {
    standard: compact
      ? "max-h-[84%] max-w-[94%] w-auto"
      : "max-h-[88%] max-w-[96%] w-auto",
    wide: compact
      ? "w-[94%] max-h-[72%]"
      : "w-[96%] max-h-[78%]",
    tall: compact
      ? "max-h-[88%] max-w-[76%] w-auto"
      : "max-h-[92%] max-w-[82%] w-auto",
  } as const;

  return (
    <div
      className={`relative overflow-hidden rounded-[1.6rem] border ${compact ? "p-4" : "p-5 md:p-6"}`}
      style={{
        background: sponsor.brand.surface,
        borderColor: sponsor.brand.border,
        color: sponsor.brand.text,
        boxShadow: dark ? `0 30px 70px -40px ${sponsor.brand.accent}55` : `0 18px 45px -35px ${sponsor.brand.accent}40`,
      }}
    >
      <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at top right, ${sponsor.brand.accent}22, transparent 38%)` }} />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: sponsor.brand.text, opacity: 0.62 }}>
            {sponsor.accent ?? sponsor.name}
          </div>
          <div className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] max-w-full break-words" style={{ background: sponsor.brand.badge, color: sponsor.brand.text }}>
          {sponsor.category}
          </div>
        </div>

        <div
          className={`flex items-center justify-center rounded-[1.4rem] border ${compact ? "h-[120px] sm:h-[132px] p-3" : "h-[168px] sm:h-[192px] md:h-[216px] p-3 md:p-4"}`}
          style={{
            borderColor: isPyrenees ? "rgba(255,255,255,0.82)" : sponsor.brand.border,
            background: isPyrenees
              ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)"
              : dark
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.38)",
            boxShadow: isPyrenees ? "inset 0 1px 0 rgba(255,255,255,0.75), 0 18px 40px -28px rgba(255,255,255,0.28)" : undefined,
          }}
        >
          <img
            src={sponsor.brand.logoPath}
            alt={`${sponsor.name} logo`}
            className={`${logoClassByFit[logoFit]} object-contain ${isPyrenees ? "drop-shadow-[0_1px_1px_rgba(255,255,255,0.18)]" : ""}`}
            loading="lazy"
          />
        </div>

        <div>
          <div className={`${compact ? "text-xl" : "text-2xl md:text-[1.9rem]"} font-bold leading-tight text-balance`}>
            {sponsor.name}
          </div>
        </div>
      </div>
    </div>
  );
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
          <Card className="glass-dark border-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative p-6 md:p-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.35),transparent_32%)]" />
            <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  <Handshake className="h-4 w-4" />
                  {t.eyebrow}
                </div>
                <h1 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-bold text-balance max-w-4xl">{t.title}</h1>
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

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
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
            <Card
              className="glass-dark border rounded-[2rem] md:rounded-[2.75rem] overflow-hidden p-6 md:p-10 text-white relative shadow-[0_40px_110px_-48px_rgba(15,23,42,.75)]"
              style={{ borderColor: featuredSponsor.brand.border }}
            >
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 12% 18%, rgba(255,255,255,.08), transparent 18%), radial-gradient(circle at 82% 12%, ${featuredSponsor.brand.accent}66, transparent 30%)` }} />
              <div className="absolute inset-y-0 right-0 hidden w-[34%] lg:block" style={{ background: `linear-gradient(180deg, ${featuredSponsor.brand.accent}14 0%, transparent 100%)` }} />
              <div className="relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                    <Crown className="h-4 w-4 text-primary" />
                    {t.featuredLabel}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-balance leading-[0.92]">{featuredSponsor.name}</h2>
                    {featuredSponsor.accent && <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{featuredSponsor.accent}</span>}
                  </div>
                  <p className="mt-5 max-w-3xl text-lg md:text-xl text-white/80">{t.featuredStatement}</p>
                  <p className="mt-5 text-base md:text-lg text-white/68 max-w-3xl">{getLocalizedText(featuredSponsor.summary, language)}</p>

                  <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[
                      { icon: Sparkles, title: t.officialPresence, desc: t.officialPresenceDesc },
                      { icon: ShieldCheck, title: t.memberValue, desc: t.memberValueDesc },
                      { icon: Star, title: t.trustLabel, desc: t.trustDesc },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
                          <div className="rounded-2xl bg-white/10 p-3 w-fit"><Icon className="h-5 w-5 text-primary" /></div>
                          <div className="mt-4 text-lg font-semibold">{item.title}</div>
                          <p className="mt-2 text-sm text-white/66">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2.2rem] border p-6 md:p-7" style={{ borderColor: featuredSponsor.brand.border, background: `linear-gradient(160deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.03) 100%)`, boxShadow: `0 38px 80px -52px ${featuredSponsor.brand.accent}80` }}>
                  <div className="absolute -right-8 top-4 text-[84px] font-bold leading-none opacity-[0.06] hidden md:block">01</div>
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-white/55">{t.visualIdentity}</div>
                      <div className="mt-2 text-sm font-semibold text-white/82">{featuredSponsor.category}</div>
                    </div>
                    {featuredSponsor.link && (
                      <a href={featuredSponsor.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-base hover:bg-white/14">
                        {t.openSite}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <SponsorLogoPlate sponsor={featuredSponsor} dark />

                  <div className="rounded-[1.75rem] bg-white text-slate-950 p-6 shadow-elegant mt-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      <BadgeCheck className="h-4 w-4" />
                      {t.presentingPartner}
                    </div>
                    <div className="mt-4 text-2xl font-bold text-balance">{featuredSponsor.name}</div>
                    <div className="mt-2 text-sm text-slate-500 uppercase tracking-[0.2em]">{featuredSponsor.category}</div>
                    {featuredSponsor.benefit && (
                      <div className="mt-6 rounded-[1.5rem] p-5" style={{ background: featuredSponsor.brand.badge }}>
                        <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">{t.memberBenefits}</div>
                        <p className="mt-3 font-medium text-slate-800">{getLocalizedText(featuredSponsor.benefit, language)}</p>
                      </div>
                    )}
                    <p className="mt-5 text-sm text-slate-600">{t.benefitsSummary}</p>
                    <div className="mt-6 rounded-[1.4rem] p-4 text-sm font-medium" style={{ background: featuredSponsor.brand.badge, color: featuredSponsor.brand.text }}>
                      {featuredSponsor.accent ?? t.featuredLabel}
                    </div>
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
              <Card key={sponsor.id} className="border rounded-[1.75rem] md:rounded-[2rem] p-5 md:p-6 hover-tilt h-full flex flex-col shadow-sm" style={{ background: sponsor.brand.surface, borderColor: sponsor.brand.border }}>
                <SponsorLogoPlate sponsor={sponsor} compact />
                <div className="mt-5 text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: sponsor.brand.accent }}>{t.visualIdentity}</div>
                <p className="mt-4 text-muted-foreground flex-1">{getLocalizedText(sponsor.summary, language)}</p>
                {sponsor.benefit && (
                  <div className="mt-5 rounded-[1.35rem] p-4 text-sm text-foreground/85" style={{ background: sponsor.brand.badge }}>
                    <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: sponsor.brand.accent }}>{t.memberBenefits}</div>
                    {getLocalizedText(sponsor.benefit, language)}
                  </div>
                )}
                {sponsor.link && (
                  <a href={sponsor.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-6 font-semibold" style={{ color: sponsor.brand.accent }}>
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
          <Card className="glass-panel border-0 rounded-[2rem] md:rounded-[2.25rem] p-6 md:p-10">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">{t.networkLabel}</p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">{t.networkIntro}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {supportSponsors.map((sponsor) => (
                  <div key={sponsor.id} className="rounded-[1.5rem] border p-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,.35)]" style={{ background: sponsor.brand.surface, borderColor: sponsor.brand.border }}>
                    <SponsorLogoPlate sponsor={sponsor} compact />
                    <p className="mt-3 text-sm text-muted-foreground">{getLocalizedText(sponsor.summary, language)}</p>
                    {sponsor.link && (
                      <a href={sponsor.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold" style={{ color: sponsor.brand.accent }}>
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
