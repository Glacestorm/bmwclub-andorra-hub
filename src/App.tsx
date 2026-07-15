import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import { lazyWithAutoReload } from "@/lib/lazyWithAutoReload";
import Galeria from "./pages/Galeria";
import GaleriaCollection from "./pages/GaleriaCollection";

const Index = lazyWithAutoReload(() => import("./pages/Index"));
const ElClub = lazyWithAutoReload(() => import("./pages/ElClub"));
const Contacte = lazyWithAutoReload(() => import("./pages/Contacte"));
const Patrocinadors = lazyWithAutoReload(() => import("./pages/Patrocinadors"));
const Meteo = lazyWithAutoReload(() => import("./pages/Meteo"));
const Calendari = lazyWithAutoReload(() => import("./pages/Calendari"));
const CalendariYear = lazyWithAutoReload(() => import("./pages/CalendariYear"));
const Destacats = lazyWithAutoReload(() => import("./pages/Destacats"));
const Arxiu = lazyWithAutoReload(() => import("./pages/Arxiu"));
const BmwOficial = lazyWithAutoReload(() => import("./pages/BmwOficial"));
const ClubAssistant = lazyWithAutoReload(() => import("./pages/ClubAssistant"));
const Itineraris = lazyWithAutoReload(() => import("./pages/Itineraris"));
const GestioClub = lazyWithAutoReload(() => import("./pages/GestioClub"));
const EventDetail = lazyWithAutoReload(() => import("./pages/EventDetail"));
const LegalPage = lazyWithAutoReload(() => import("./pages/LegalPage"));
const NotFound = lazyWithAutoReload(() => import("./pages/NotFound"));

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
            <Suspense fallback={<RouteFallback />}>
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
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
  );
};

export default App;
