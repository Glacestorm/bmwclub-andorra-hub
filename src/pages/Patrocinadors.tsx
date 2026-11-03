import { Link } from "react-router-dom";
import { ArrowUpRight, Crown, Handshake } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { sponsorItems, type SponsorItem } from "@/content/sponsorData";
import { getLocalizedText } from "@/lib/localized";
import { translateText } from "@/lib/siteTranslations";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    eyebrow: "Patrocinadors i partners",
    title: "Les marques que donen suport al club",
    intro: "Empreses i col·laboradors que acompanyen el BMW Club Andorra. Algunes ofereixen avantatges per als socis.",
    ctaPrimary: "Fer-me patrocinador",
    featuredLabel: "Sponsor principal",
    premiumLabel: "Partners destacats",
    premiumTitle: "Patrocinadors del club",
    networkLabel: "Xarxa de col·laboradors",
    networkTitle: "Altres col·laboradors del club",
    openSite: "Obrir web oficial",
    memberBenefits: "Avantatges per a socis",
    statBrands: "marques en total",
    statSponsors: "patrocinadors",
    statCollaborators: "col·laboradors",
  },
  es: {
    eyebrow: "Patrocinadores y partners",
    title: "Las marcas que apoyan al club",
    intro: "Empresas y colaboradores que acompañan al BMW Club Andorra. Algunas ofrecen ventajas para los socios.",
    ctaPrimary: "Quiero ser patrocinador",
    featuredLabel: "Patrocinador principal",
    premiumLabel: "Partners destacados",
    premiumTitle: "Patrocinadores del club",
    networkLabel: "Red de colaboradores",
    networkTitle: "Otros colaboradores del club",
    openSite: "Abrir web oficial",
    memberBenefits: "Ventajas para socios",
    statBrands: "marcas en total",
    statSponsors: "patrocinadores",
    statCollaborators: "colaboradores",
  },
  fr: {
    eyebrow: "Sponsors et partenaires",
    title: "Les marques qui soutiennent le club",
    intro: "Entreprises et collaborateurs qui accompagnent le BMW Club Andorra. Certaines proposent des avantages aux membres.",
    ctaPrimary: "Devenir sponsor",
    featuredLabel: "Sponsor principal",
    premiumLabel: "Partenaires mis en avant",
    premiumTitle: "Sponsors du club",
    networkLabel: "Réseau de collaborateurs",
    networkTitle: "Autres collaborateurs du club",
    openSite: "Ouvrir le site officiel",
    memberBenefits: "Avantages membres",
    statBrands: "marques au total",
    statSponsors: "sponsors",
    statCollaborators: "collaborateurs",
  },
  en: {
    eyebrow: "Sponsors and partners",
    title: "The brands that support the club",
    intro: "Companies and collaborators working alongside BMW Club Andorra. Some of them offer benefits to members.",
    ctaPrimary: "Become a sponsor",
    featuredLabel: "Main sponsor",
    premiumLabel: "Featured partners",
    premiumTitle: "Club sponsors",
    networkLabel: "Support network",
    networkTitle: "Other club collaborators",
    openSite: "Open official site",
    memberBenefits: "Member benefits",
    statBrands: "brands in total",
    statSponsors: "sponsors",
    statCollaborators: "collaborators",
  },
  pt: {
    eyebrow: "Patrocinadores e parceiros",
    title: "As marcas que apoiam o clube",
    intro: "Empresas e colaboradores que acompanham o BMW Club Andorra. Algumas oferecem vantagens aos sócios.",
    ctaPrimary: "Quero ser patrocinador",
    featuredLabel: "Patrocinador principal",
    premiumLabel: "Parceiros em destaque",
    premiumTitle: "Patrocinadores do clube",
    networkLabel: "Rede de colaboradores",
    networkTitle: "Outros colaboradores do clube",
    openSite: "Abrir site oficial",
    memberBenefits: "Vantagens para sócios",
    statBrands: "marcas no total",
    statSponsors: "patrocinadores",
    statCollaborators: "colaboradores",
  },
  de: {
    eyebrow: "Sponsoren und Partner",
    title: "Die Marken, die den Club unterstützen",
    intro: "Unternehmen und Partner, die den BMW Club Andorra begleiten. Einige bieten Mitgliedern Vorteile.",
    ctaPrimary: "Sponsor werden",
    featuredLabel: "Hauptsponsor",
    premiumLabel: "Hervorgehobene Partner",
    premiumTitle: "Sponsoren des Clubs",
    networkLabel: "Partnernetzwerk",
    networkTitle: "Weitere Partner des Clubs",
    openSite: "Offizielle Website öffnen",
    memberBenefits: "Mitgliedervorteile",
    statBrands: "Marken insgesamt",
    statSponsors: "Sponsoren",
    statCollaborators: "Kooperationspartner",
  },
  ru: {
    eyebrow: "Спонсоры и партнёры",
    title: "Бренды, которые поддерживают клуб",
    intro: "Компании и партнёры, которые сотрудничают с BMW Club Andorra. Некоторые из них предлагают преимущества участникам клуба.",
    ctaPrimary: "Стать спонсором",
    featuredLabel: "Главный спонсор",
    premiumLabel: "Выделенные партнёры",
    premiumTitle: "Спонсоры клуба",
    networkLabel: "Сеть партнёров",
    networkTitle: "Другие партнёры клуба",
    openSite: "Открыть официальный сайт",
    memberBenefits: "Преимущества для участников",
    statBrands: "бренды",
    statSponsors: "спонсоры",
    statCollaborators: "партнёры",
  },
};

const SponsorLogoPlate = ({ sponsor, dark = false, compact = false }: { sponsor: SponsorItem; dark?: boolean; compact?: boolean }) => {
  const { language } = useLanguage();
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
          {translateText(language, sponsor.category)}
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
  const mainSponsors = sponsorItems.filter((item) => item.tier !== "support");

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
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-3xl font-bold">{sponsorItems.length}</div>
                  <div className="mt-2 text-sm text-white/68">{t.statBrands}</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-3xl font-bold">{mainSponsors.length}</div>
                  <div className="mt-2 text-sm text-white/68">{t.statSponsors}</div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-3xl font-bold">{supportSponsors.length}</div>
                  <div className="mt-2 text-sm text-white/68">{t.statCollaborators}</div>
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
                  <p className="mt-5 max-w-3xl text-lg md:text-xl text-white/80">{getLocalizedText(featuredSponsor.summary, language)}</p>
                </div>

                <div className="relative overflow-hidden rounded-[2.2rem] border p-6 md:p-7" style={{ borderColor: featuredSponsor.brand.border, background: `linear-gradient(160deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.03) 100%)`, boxShadow: `0 38px 80px -52px ${featuredSponsor.brand.accent}80` }}>
                  <div className="absolute -right-8 top-4 text-[84px] font-bold leading-none opacity-[0.06] hidden md:block">01</div>
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="text-sm font-semibold text-white/82">{translateText(language, featuredSponsor.category)}</div>
                    {featuredSponsor.link && (
                      <a href={featuredSponsor.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-base hover:bg-white/14">
                        {t.openSite}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <SponsorLogoPlate sponsor={featuredSponsor} dark />

                  <div className="rounded-[1.75rem] bg-white text-slate-950 p-6 shadow-elegant mt-5">
                    <div className="text-2xl font-bold text-balance">{featuredSponsor.name}</div>
                    <div className="mt-2 text-sm text-slate-500 uppercase tracking-[0.2em]">{translateText(language, featuredSponsor.category)}</div>
                    {featuredSponsor.benefit && (
                      <div className="mt-6 rounded-[1.5rem] p-5" style={{ background: featuredSponsor.brand.badge }}>
                        <div className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">{t.memberBenefits}</div>
                        <p className="mt-3 font-medium text-slate-800">{getLocalizedText(featuredSponsor.benefit, language)}</p>
                      </div>
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
              <Card key={sponsor.id} className="border rounded-[1.75rem] md:rounded-[2rem] p-5 md:p-6 hover-tilt h-full flex flex-col shadow-sm" style={{ background: sponsor.brand.surface, borderColor: sponsor.brand.border }}>
                <SponsorLogoPlate sponsor={sponsor} compact />
                <p className="mt-5 text-muted-foreground flex-1">{getLocalizedText(sponsor.summary, language)}</p>
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
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">{t.networkTitle}</h2>
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
