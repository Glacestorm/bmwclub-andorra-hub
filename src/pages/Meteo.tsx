import { PageShell } from "@/components/PageShell";
import { BmwContentRenderer } from "@/components/BmwContentRenderer";
import { bmwContent } from "@/content/bmwContent";

const Meteo = () => {
  return (
    <PageShell>
      <BmwContentRenderer page={bmwContent.meteo} />
    </PageShell>
  );
};

export default Meteo;
