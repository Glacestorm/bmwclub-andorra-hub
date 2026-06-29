import { PageShell } from "@/components/PageShell";
import { BmwContentRenderer } from "@/components/BmwContentRenderer";
import { bmwContent } from "@/content/bmwContent";

const Galeria = () => {
  return (
    <PageShell>
      <BmwContentRenderer page={bmwContent.galeria} />
    </PageShell>
  );
};

export default Galeria;
