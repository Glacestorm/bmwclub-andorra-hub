import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ElClub from "./pages/ElClub";
import Contacte from "./pages/Contacte";
import Patrocinadors from "./pages/Patrocinadors";
import Galeria from "./pages/Galeria";
import GaleriaCollection from "./pages/GaleriaCollection";
import Meteo from "./pages/Meteo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/el-club" element={<ElClub />} />
          <Route path="/contacte" element={<Contacte />} />
          <Route path="/patrocinadors" element={<Patrocinadors />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
