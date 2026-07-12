import { PageShell } from "@/components/PageShell";
import { Card } from "@/components/ui/card";
import { legalContent, type LegalPageKey } from "@/content/legalContent";

interface LegalPageProps {
  pageKey: LegalPageKey;
}

const LegalPage = ({ pageKey }: LegalPageProps) => {
  const page = legalContent[pageKey];

  return (
    <PageShell>
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">BMW Club Andorra</p>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">{page.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{page.intro}</p>
            <p className="text-sm text-muted-foreground">Última actualització: {page.updatedAt}</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {page.sections.map((section) => (
              <Card key={section.title} className="p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default LegalPage;
