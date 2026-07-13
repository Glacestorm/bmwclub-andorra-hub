import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LanguageCode, supportedLanguages } from "@/lib/i18n";

interface NavbarProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: { home: "Inici", club: "El Club", calendar: "Calendari", sponsors: "Patrocinadors", featured: "Destacats", archive: "Arxiu", official: "BMW Oficial", assistant: "Assistent IA", gallery: "Galeria", contact: "Contacte", calendarCta: "Calendari 2026" },
  es: { home: "Inicio", club: "El Club", calendar: "Calendario", sponsors: "Patrocinadores", featured: "Destacados", archive: "Archivo", official: "BMW Oficial", assistant: "Asistente IA", gallery: "Galería", contact: "Contacto", calendarCta: "Calendario 2026" },
  fr: { home: "Accueil", club: "Le Club", calendar: "Calendrier", sponsors: "Sponsors", featured: "Temps forts", archive: "Archive", official: "BMW Officiel", assistant: "Assistant IA", gallery: "Galerie", contact: "Contact", calendarCta: "Calendrier 2026" },
  en: { home: "Home", club: "The Club", calendar: "Calendar", sponsors: "Sponsors", featured: "Highlights", archive: "Archive", official: "BMW Official", assistant: "AI Concierge", gallery: "Gallery", contact: "Contact", calendarCta: "Calendar 2026" },
  pt: { home: "Início", club: "O Clube", calendar: "Calendário", sponsors: "Patrocinadores", featured: "Destaques", archive: "Arquivo", official: "BMW Oficial", assistant: "Assistente IA", gallery: "Galeria", contact: "Contacto", calendarCta: "Calendário 2026" },
  de: { home: "Startseite", club: "Der Club", calendar: "Kalender", sponsors: "Sponsoren", featured: "Highlights", archive: "Archiv", official: "BMW Offiziell", assistant: "KI-Assistent", gallery: "Galerie", contact: "Kontakt", calendarCta: "Kalender 2026" },
  ru: { home: "Главная", club: "Клуб", calendar: "Календарь", sponsors: "Спонсоры", featured: "Главное", archive: "Архив", official: "BMW Official", assistant: "ИИ помощник", gallery: "Галерея", contact: "Контакты", calendarCta: "Календарь 2026" },
};

export const Navbar = ({ language, setLanguage }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];

  const navLinks = [
    { path: "/", label: t.home },
    { path: "/el-club", label: t.club },
    { path: "/calendari", label: t.calendar },
    { path: "/patrocinadors", label: t.sponsors },
    { path: "/destacats", label: t.featured },
    { path: "/arxiu", label: t.archive },
    { path: "/bmw-oficial", label: t.official },
    { path: "/assistent-ia", label: t.assistant },
    { path: "/galeria", label: t.gallery },
    { path: "/contacte", label: t.contact },
  ];

  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/72 backdrop-blur-xl border-b border-white/40 shadow-[0_14px_48px_-28px_rgba(15,23,42,.28)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <img src="/club/logo-small.png" alt="BMW Club Andorra" className="w-12 h-12 object-contain" />
            <div className="hidden md:flex flex-col">
              <span className="font-bold text-lg leading-tight">BMW CLUB</span>
              <span className="text-sm text-muted-foreground leading-tight">ANDORRA</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1 glass-panel rounded-full px-2 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-base rounded-full ${isActive(link.path) ? "text-primary bg-white shadow-sm" : "text-foreground hover:text-primary hover:bg-white/60"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 rounded-full border border-white/40 bg-white/50 backdrop-blur-md">
                  {language.toUpperCase()}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {supportedLanguages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className={language === lang.code ? "bg-secondary" : ""}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/calendari/2026" className="hidden md:block">
              <Button variant="hero" size="sm" className="rounded-full">{t.calendarCta}</Button>
            </Link>

            <Button variant="ghost" size="icon" className="xl:hidden rounded-full border border-white/40 bg-white/55 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-border/60">
            <div className="glass-panel rounded-[1.5rem] p-3 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-3 text-sm font-medium transition-base rounded-2xl ${isActive(link.path) ? "text-primary bg-white shadow-sm" : "text-foreground hover:bg-white/60"}`}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-2"><Link to="/calendari/2026" className="block" onClick={() => setIsMobileMenuOpen(false)}><Button variant="hero" size="sm" className="w-full rounded-full">{t.calendarCta}</Button></Link></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
