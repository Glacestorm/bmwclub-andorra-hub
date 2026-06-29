import { PageShell } from "@/components/PageShell";
import { BmwContentRenderer } from "@/components/BmwContentRenderer";
import { bmwContent } from "@/content/bmwContent";

const Patrocinadors = () => {
  return (
    <PageShell>
      <BmwContentRenderer page={bmwContent.patrocinadors} />
    </PageShell>
  );
};

export default Patrocinadors;
