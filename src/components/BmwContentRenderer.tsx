import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageContent } from "@/content/bmwContent";

interface RendererProps {
  page: PageContent;
}

export const BmwContentRenderer = ({ page }: RendererProps) => {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            {page.hero.eyebrow ? (
              <p className="text-sm uppercase tracking-[0.25em] text-primary">{page.hero.eyebrow}</p>
            ) : null}
            <h1 className="text-4xl md:text-6xl font-bold text-balance">{page.hero.title}</h1>
            {page.hero.subtitle ? (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{page.hero.subtitle}</p>
            ) : null}
            {page.hero.primaryCta || page.hero.secondaryCta ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {page.hero.primaryCta ? (
                  <Link to={page.hero.primaryCta.href}>
                    <Button variant="hero" size="lg">
                      {page.hero.primaryCta.label}
                    </Button>
                  </Link>
                ) : null}
                {page.hero.secondaryCta ? (
                  <Link to={page.hero.secondaryCta.href}>
                    <Button variant="outline" size="lg">
                      {page.hero.secondaryCta.label}
                    </Button>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 space-y-12">
          {page.intro ? (
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">{page.intro}</p>
            </div>
          ) : null}

          {page.sections?.map((section, index) => {
            if (section.type === "intro") {
              return (
                <div key={index} className="max-w-4xl mx-auto space-y-5">
                  {section.title ? <h2 className="text-3xl font-bold text-center">{section.title}</h2> : null}
                  <div className="space-y-4 text-lg leading-relaxed text-muted-foreground text-center">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            }

            if (section.type === "cards") {
              return (
                <div key={index} className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-center">{section.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {section.items.map((item) => (
                      <Card key={item.title} className="p-6 h-full hover:shadow-elegant transition-all">
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground mb-5">{item.text}</p>
                        {item.href ? (
                          <Link to={item.href} className="text-primary font-medium hover:underline">
                            Veure més
                          </Link>
                        ) : null}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="space-y-8 max-w-6xl mx-auto">
                {section.featured ? (
                  <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <Badge className="mb-4">Sponsor principal</Badge>
                    <h2 className="text-3xl font-bold mb-5">{section.featured.name}</h2>
                    <ul className="space-y-3 text-muted-foreground">
                      {section.featured.benefits.map((benefit) => (
                        <li key={benefit}>• {benefit}</li>
                      ))}
                    </ul>
                  </Card>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.partners.map((partner) => (
                    <Card key={partner.name} className="p-6 hover:shadow-elegant transition-all">
                      <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                      {partner.note ? <p className="text-sm text-muted-foreground">{partner.note}</p> : null}
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

          {page.groups?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {page.groups.map((group) => (
                <Card key={group.href} className="p-6 hover:shadow-elegant transition-all">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{group.title}</h2>
                    </div>
                    <div className="space-y-2">
                      {group.children?.map((child) => (
                        <Link key={child.href} to={child.href} className="block text-muted-foreground hover:text-primary transition-base">
                          {child.title}
                        </Link>
                      ))}
                    </div>
                    <Link to={group.href} className="inline-block text-primary font-medium hover:underline">
                      Obrir secció
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : null}

          {page.albums?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {page.albums.map((album) => (
                <Card key={`${album.year ?? "album"}-${album.title}`} className="p-6 hover:shadow-elegant transition-all">
                  {album.year ? <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">{album.year}</p> : null}
                  <h2 className="text-lg font-semibold text-balance">{album.title}</h2>
                </Card>
              ))}
            </div>
          ) : null}

          {page.legacyImage ? (
            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden p-0">
                <img src={page.legacyImage.src} alt={page.legacyImage.alt} className="w-full h-auto object-cover" />
              </Card>
            </div>
          ) : null}

          {page.disclaimer || page.implementationNote ? (
            <div className="max-w-3xl mx-auto pt-4 text-center space-y-2">
              {page.disclaimer ? <p className="text-sm text-muted-foreground">{page.disclaimer}</p> : null}
              {page.implementationNote ? <p className="text-sm text-amber-700">{page.implementationNote}</p> : null}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};
