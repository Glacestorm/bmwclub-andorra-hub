import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageProvider";

const Index = lazy(() => import("./pages/Index"));
const ElClub = lazy(() => import("./pages/ElClub"));
const Contacte = lazy(() => import("./pages/Contacte"));
const Patrocinadors = lazy(() => import("./pages/Patrocinadors"));
const Galeria = lazy(() => import("./pages/Galeria"));
const GaleriaCollection = lazy(() => import("./pages/GaleriaCollection"));
const Meteo = lazy(() => import("./pages/Meteo"));
const Calendari = lazy(() => import("./pages/Calendari"));
const CalendariYear = lazy(() => import("./pages/CalendariYear"));
const Destacats = lazy(() => import("./pages/Destacats"));
const Arxiu = lazy(() => import("./pages/Arxiu"));
const BmwOficial = lazy(() => import("./pages/BmwOficial"));
const ClubAssistant = lazy(() => import("./pages/ClubAssistant"));
const Itineraris = lazy(() => import("./pages/Itineraris"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="premium-card w-full max-w-xl rounded-[2rem] border-0 p-10 text-center shadow-elegant">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">BMW Club Andorra</p>
        <div className="mx-auto mt-5 h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <h2 className="mt-6 text-2xl font-bold text-balance">Carregant experiència premium…</h2>
        <p className="mt-3 text-sm text-muted-foreground">Estem obrint la següent secció del club amb càrrega diferida per reduir el pes inicial.</p>
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
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
              <Route path="/assistent-ia" element={<ClubAssistant />} />
              <Route path="/itineraris" element={<Itineraris />} />
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
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
