import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageProvider";
import Index from "./pages/Index";
import ElClub from "./pages/ElClub";
import Contacte from "./pages/Contacte";
import Patrocinadors from "./pages/Patrocinadors";
import Galeria from "./pages/Galeria";
import GaleriaCollection from "./pages/GaleriaCollection";
import Meteo from "./pages/Meteo";
import Calendari from "./pages/Calendari";
import CalendariYear from "./pages/CalendariYear";
import Destacats from "./pages/Destacats";
import Arxiu from "./pages/Arxiu";
import BmwOficial from "./pages/BmwOficial";
import EventDetail from "./pages/EventDetail";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/patrocinadors" element={<Patrocinadors />} />
          <Route path="/calendari" element={<Calendari />} />
          <Route path="/calendari/2026" element={<CalendariYear />} />
          <Route path="/calendari/2025" element={<CalendariYear />} />
          <Route path="/calendari/2024" element={<CalendariYear />} />
          <Route path="/calendari/2022" element={<CalendariYear />} />
          <Route path="/calendari/2021" element={<CalendariYear />} />
          <Route path="/calendari/2020" element={<CalendariYear />} />
          <Route path="/calendari/2016" element={<CalendariYear />} />
          <Route path="/calendari/2015" element={<CalendariYear />} />
          <Route path="/calendari/2014" element={<CalendariYear />} />
          <Route path="/calendari/2013" element={<CalendariYear />} />
          <Route path="/calendari/2011" element={<CalendariYear />} />
          <Route path="/destacats" element={<Destacats />} />
          <Route path="/arxiu" element={<Arxiu />} />
          <Route path="/bmw-oficial" element={<BmwOficial />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
