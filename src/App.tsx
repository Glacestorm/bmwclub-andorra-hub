import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import Index from "./pages/Index";
import ElClub from "./pages/ElClub";
import Contacte from "./pages/Contacte";
import Patrocinadors from "./pages/Patrocinadors";
import Meteo from "./pages/Meteo";
import Calendari from "./pages/Calendari";
import CalendariYear from "./pages/CalendariYear";
import Destacats from "./pages/Destacats";
import Arxiu from "./pages/Arxiu";
import BmwOficial from "./pages/BmwOficial";
import ClubAssistant from "./pages/ClubAssistant";
import Itineraris from "./pages/Itineraris";
import DriveExperience from "./pages/DriveExperience";
import EventMode from "./pages/EventMode";
import PostDriveReport from "./pages/PostDriveReport";
import GestioClub from "./pages/GestioClub";
import EventDetail from "./pages/EventDetail";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";
import Galeria from "./pages/Galeria";
import GaleriaCollection from "./pages/GaleriaCollection";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("bmwclub-lazy-reload-once");
    }
  }, []);

  return (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <BrowserRouter>
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/el-club" element={<ElClub />} />
              <Route path="/contacte" element={<Contacte />} />
              <Route path="/alta-soci" element={<Contacte />} />
              <Route path="/galeria/sortides" element={<Navigate to="/galeria" replace />} />
              <Route path="/index.php/ca" element={<Navigate to="/" replace />} />
              <Route path="/index.php/ca/home-ca" element={<Navigate to="/" replace />} />
              <Route path="/index.php/ca/patrocinadors" element={<Navigate to="/patrocinadors" replace />} />
              <Route path="/index.php/ca/meteo" element={<Navigate to="/meteo" replace />} />
              <Route path="/index.php/ca/recull-fotos" element={<Navigate to="/galeria" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-historiques" element={<Navigate to="/galeria/historiques" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-historiques/anys-2011-2012" element={<Navigate to="/galeria/historiques/2011-2012" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-historiques/anys-2013-2014-2015" element={<Navigate to="/galeria/historiques/2013-2015" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-historiques/anys-2016-2020-2021" element={<Navigate to="/galeria/historiques/2016-2021" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-historiques/any-2022" element={<Navigate to="/galeria/historiques/2022" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-sortides" element={<Navigate to="/galeria" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-sortides/any-2024" element={<Navigate to="/galeria/sortides/2024" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-sortides/any-2025" element={<Navigate to="/galeria/sortides/2025" replace />} />
              <Route path="/index.php/ca/recull-fotos/fotos-sortides/any-2026" element={<Navigate to="/galeria/sortides/2026" replace />} />
              <Route path="/index.php/ca/component/dpcalendar/event/4o-cars-coffee" element={<Navigate to="/esdeveniments/cars-coffee-2026-07-12" replace />} />
              <Route path="/patrocinadors" element={<Patrocinadors />} />
              <Route path="/calendari" element={<Calendari />} />
              <Route path="/calendari/:year" element={<CalendariYear />} />
              <Route path="/destacats" element={<Destacats />} />
              <Route path="/arxiu" element={<Arxiu />} />
              <Route path="/bmw-oficial" element={<BmwOficial />} />
              <Route path="/assistent-ia" element={<ClubAssistant />} />
              <Route path="/itineraris" element={<Itineraris />} />
              <Route path="/drive-experience" element={<DriveExperience />} />
              <Route path="/event-mode" element={<EventMode />} />
              <Route path="/post-drive-report" element={<PostDriveReport />} />
              <Route path="/gestio-club" element={<GestioClub />} />
              <Route path="/esdeveniments/:eventId" element={<EventDetail />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/galeria/historiques" element={<GaleriaCollection />} />
              <Route path="/galeria/historiques/2011-2012" element={<GaleriaCollection />} />
              <Route path="/galeria/historiques/2013-2015" element={<GaleriaCollection />} />
              <Route path="/galeria/historiques/2016-2021" element={<GaleriaCollection />} />
              <Route path="/galeria/historiques/2022" element={<GaleriaCollection />} />
              <Route path="/galeria/sortides/2024" element={<GaleriaCollection />} />
              <Route path="/galeria/sortides/2025" element={<GaleriaCollection />} />
              <Route path="/galeria/sortides/2026" element={<GaleriaCollection />} />
              <Route path="/meteo" element={<Meteo />} />
              <Route path="/privacitat" element={<LegalPage pageKey="privacitat" />} />
              <Route path="/cookies" element={<LegalPage pageKey="cookies" />} />
              <Route path="/condicions" element={<LegalPage pageKey="condicions" />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
  );
};

export default App;
