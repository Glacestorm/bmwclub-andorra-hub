import { Navigate, useLocation } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { BmwContentRenderer } from "@/components/BmwContentRenderer";
import { bmwContent } from "@/content/bmwContent";

const pageByPath: Record<string, keyof typeof bmwContent> = {
  "/galeria/historiques": "historiques",
  "/galeria/historiques/2011-2012": "historiques_2011_2012",
  "/galeria/historiques/2013-2015": "historiques_2013_2015",
  "/galeria/historiques/2016-2021": "historiques_2016_2021",
  "/galeria/historiques/2022": "historiques_2022",
  "/galeria/sortides/2024": "sortides_2024",
  "/galeria/sortides/2025": "sortides_2025",
  "/galeria/sortides/2026": "sortides_2026",
};

const GaleriaCollection = () => {
  const location = useLocation();
  const key = pageByPath[location.pathname];

  if (!key) {
    return <Navigate to="/galeria" replace />;
  }

  return (
    <PageShell>
      <BmwContentRenderer page={bmwContent[key]} />
    </PageShell>
  );
};

export default GaleriaCollection;
