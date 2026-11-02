import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountdownToNextEvent } from "@/components/calendar/CountdownToNextEvent";
import { HomeWelcomeShowcase } from "@/components/home/HomeWelcomeShowcase";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";
import { getLocalizedText } from "@/lib/localized";
import { archiveItems } from "@/content/siteExperience";
import { sponsorItems } from "@/content/sponsorData";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    archiveEyebrow: "Arxiu del club",
    archiveTitle: "Documents, revistes i vídeos de la història del club",
    archiveCta: "Obrir arxiu",
    sponsorsEyebrow: "Patrocinadors",
    sponsorsTitle: "Empreses i marques que col·laboren amb el club",
    sponsorsCta: "Veure patrocinadors",
    sponsorsOpen: "Obrir web",
    featuredSponsorLabel: "Patrocinador principal",
    journalEyebrow: "Explora",
    journalTitle: "Coneix el club, la seva galeria i els seus patrocinadors",
    journalClub: "El Club",
    journalClubText: "Qui som, què fem i com fer-te'n soci.",
    journalGallery: "Galeria",
    journalGalleryText: "Fotos de les sortides i de la història del club, ordenades per anys.",
    journalBrand: "Patrocinadors",
    journalBrandText: "Les empreses i marques que donen suport al club.",
    journalOpen: "Entrar",
  },
  es: {
    archiveEyebrow: "Archivo del club",
    archiveTitle: "Documentos, revistas y vídeos de la historia del club",
    archiveCta: "Abrir archivo",
    sponsorsEyebrow: "Patrocinadores",
    sponsorsTitle: "Empresas y marcas que colaboran con el club",
    sponsorsCta: "Ver patrocinadores",
    sponsorsOpen: "Abrir web",
    featuredSponsorLabel: "Patrocinador principal",
    journalEyebrow: "Explora",
    journalTitle: "Conoce el club, su galería y sus patrocinadores",
    journalClub: "El Club",
    journalClubText: "Quiénes somos, qué hacemos y cómo hacerte socio.",
    journalGallery: "Galería",
    journalGalleryText: "Fotos de las salidas y de la historia del club, ordenadas por años.",
    journalBrand: "Patrocinadores",
    journalBrandText: "Las empresas y marcas que apoyan al club.",
    journalOpen: "Entrar",
  },
  fr: {
    archiveEyebrow: "Archive du club",
    archiveTitle: "Documents, magazines et vidéos de l'histoire du club",
    archiveCta: "Ouvrir l'archive",
    sponsorsEyebrow: "Sponsors",
    sponsorsTitle: "Les entreprises et marques partenaires du club",
    sponsorsCta: "Voir les sponsors",
    sponsorsOpen: "Ouvrir le site",
    featuredSponsorLabel: "Sponsor principal",
    journalEyebrow: "Explorer",
    journalTitle: "Découvrez le club, sa galerie et ses sponsors",
    journalClub: "Le Club",
    journalClubText: "Qui nous sommes, ce que nous faisons et comment devenir membre.",
    journalGallery: "Galerie",
    journalGalleryText: "Photos des sorties et de l'histoire du club, classées par année.",
    journalBrand: "Sponsors",
    journalBrandText: "Les entreprises et marques qui soutiennent le club.",
    journalOpen: "Entrer",
  },
  en: {
    archiveEyebrow: "Club archive",
    archiveTitle: "Documents, magazines and videos from the club's history",
    archiveCta: "Open archive",
    sponsorsEyebrow: "Sponsors",
    sponsorsTitle: "Companies and brands that work with the club",
    sponsorsCta: "View sponsors",
    sponsorsOpen: "Open site",
    featuredSponsorLabel: "Main sponsor",
    journalEyebrow: "Explore",
    journalTitle: "Get to know the club, its gallery and its sponsors",
    journalClub: "The Club",
    journalClubText: "Who we are, what we do and how to become a member.",
    journalGallery: "Gallery",
    journalGalleryText: "Photos of the club's outings and history, organised by year.",
    journalBrand: "Sponsors",
    journalBrandText: "The companies and brands that support the club.",
    journalOpen: "Open",
  },
  pt: {
    archiveEyebrow: "Arquivo do clube",
    archiveTitle: "Documentos, revistas e vídeos da história do clube",
    archiveCta: "Abrir arquivo",
    sponsorsEyebrow: "Patrocinadores",
    sponsorsTitle: "Empresas e marcas que colaboram com o clube",
    sponsorsCta: "Ver patrocinadores",
    sponsorsOpen: "Abrir site",
    featuredSponsorLabel: "Patrocinador principal",
    journalEyebrow: "Explorar",
    journalTitle: "Conheça o clube, a sua galeria e os seus patrocinadores",
    journalClub: "O Clube",
    journalClubText: "Quem somos, o que fazemos e como se tornar sócio.",
    journalGallery: "Galeria",
    journalGalleryText: "Fotos dos passeios e da história do clube, organizadas por ano.",
    journalBrand: "Patrocinadores",
    journalBrandText: "As empresas e marcas que apoiam o clube.",
    journalOpen: "Entrar",
  },
  de: {
    archiveEyebrow: "Club-Archiv",
    archiveTitle: "Dokumente, Magazine und Videos aus der Geschichte des Clubs",
    archiveCta: "Archiv öffnen",
    sponsorsEyebrow: "Sponsoren",
    sponsorsTitle: "Unternehmen und Marken, die mit dem Club zusammenarbeiten",
    sponsorsCta: "Sponsoren ansehen",
    sponsorsOpen: "Website öffnen",
    featuredSponsorLabel: "Hauptsponsor",
    journalEyebrow: "Entdecken",
    journalTitle: "Lernen Sie den Club, seine Galerie und seine Sponsoren kennen",
    journalClub: "Der Club",
    journalClubText: "Wer wir sind, was wir machen und wie Sie Mitglied werden.",
    journalGallery: "Galerie",
    journalGalleryText: "Fotos von Ausfahrten und aus der Geschichte des Clubs, nach Jahren geordnet.",
    journalBrand: "Sponsoren",
    journalBrandText: "Die Unternehmen und Marken, die den Club unterstützen.",
    journalOpen: "Öffnen",
  },
  ru: {
    archiveEyebrow: "Архив клуба",
    archiveTitle: "Документы, журналы и видео из истории клуба",
    archiveCta: "Открыть архив",
    sponsorsEyebrow: "Спонсоры",
    sponsorsTitle: "Компании и бренды, которые сотрудничают с клубом",
    sponsorsCta: "Открыть спонсоров",
    sponsorsOpen: "Открыть сайт",
    featuredSponsorLabel: "Главный спонсор",
    journalEyebrow: "Узнать больше",
    journalTitle: "Познакомьтесь с клубом, его галереей и спонсорами",
    journalClub: "Клуб",
    journalClubText: "Кто мы, чем занимаемся и как вступить в клуб.",
    journalGallery: "Галерея",
    journalGalleryText: "Фотографии выездов и истории клуба по годам.",
    journalBrand: "Спонсоры",
    journalBrandText: "Компании и бренды, которые поддерживают клуб.",
    journalOpen: "Открыть",
  },
};

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const featuredSponsor = sponsorItems.find((item) => item.tier === "featured");
  const featuredSponsorHasLightLogoPlate = featuredSponsor?.id === "pyrenees-andorra";
  const homeSponsors = sponsorItems.filter((item) => item.link && item.tier !== "featured").slice(0, 3);
  const homeSponsorsWithLightLogoPlate = new Set(["coma-hotel", "basar-valira", "santeloi"]);

  return (
    <PageShell>
      <Hero language={language} />
      <HomeWelcomeShowcase />

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <CountdownToNextEvent />
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
              { title: t.journalClub, href: "/el-club", text: t.journalClubText },
              { title: t.journalGallery, href: "/galeria", text: t.journalGalleryText },
              { title: t.journalBrand, href: "/patrocinadors", text: t.journalBrandText },
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
        <div className="container mx-auto px-4 max-w-4xl">
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
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
