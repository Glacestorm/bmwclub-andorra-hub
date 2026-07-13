import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageCode, supportedLanguages } from "@/lib/i18n";

interface NavbarProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    home: "Inici",
    club: "El Club",
    sponsors: "Patrocinadors",
    gallery: "Galeria",
    calendar: "Calendari",
    weather: "Meteo",
    contact: "Contacte",
    calendarCta: "Calendari 2026",
  },
  es: {
    home: "Inicio",
    club: "El Club",
    sponsors: "Patrocinadores",
    gallery: "Galería",
    calendar: "Calendario",
    weather: "Meteo",
    contact: "Contacto",
    calendarCta: "Calendario 2026",
  },
  fr: {
    home: "Accueil",
    club: "Le Club",
    sponsors: "Sponsors",
    gallery: "Galerie",
    calendar: "Calendrier",
    weather: "Météo",
    contact: "Contact",
    calendarCta: "Calendrier 2026",
  },
  en: {
    home: "Home",
    club: "The Club",
    sponsors: "Sponsors",
    gallery: "Gallery",
    calendar: "Calendar",
    weather: "Weather",
    contact: "Contact",
    calendarCta: "Calendar 2026",
  },
  pt: {
    home: "Início",
    club: "O Clube",
    sponsors: "Patrocinadores",
    gallery: "Galeria",
    calendar: "Calendário",
    weather: "Meteorologia",
    contact: "Contacto",
    calendarCta: "Calendário 2026",
  },
  de: {
    home: "Startseite",
    club: "Der Club",
    sponsors: "Sponsoren",
    gallery: "Galerie",
    calendar: "Kalender",
    weather: "Wetter",
    contact: "Kontakt",
    calendarCta: "Kalender 2026",
  },
  ru: {
    home: "Главная",
    club: "Клуб",
    sponsors: "Спонсоры",
    gallery: "Галерея",
    calendar: "Календарь",
    weather: "Погода",
    contact: "Контакты",
    calendarCta: "Календарь 2026",
  },
};

export const Navbar = ({ language, setLanguage }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];

  const navLinks = [
    { path: "/", label: t.home },
    { path: "/el-club", label: t.club },
    { path: "/calendari", label: t.calendar },
    { path: "/meteo", label: t.weather },
    { path: "/patrocinadors", label: t.sponsors },
    { path: "/galeria", label: t.gallery },
    { path: "/contacte", label: t.contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/club/logo-small.png" alt="BMW Club Andorra" className="w-12 h-12 object-contain" />
            <div className="hidden md:flex flex-col">
              <span className="font-bold text-lg leading-tight">BMW CLUB</span>
              <span className="text-sm text-muted-foreground leading-tight">ANDORRA</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-base rounded-sm ${
                  isActive(link.path)
                    ? "text-primary bg-secondary"
                    : "text-foreground hover:text-primary hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {language.toUpperCase()}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {supportedLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-secondary" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/calendari/2026" className="hidden md:block">
              <Button variant="hero" size="sm">{t.calendarCta}</Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium transition-base rounded-sm ${
                    isActive(link.path)
                      ? "text-primary bg-secondary"
                      : "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                <Link to="/calendari/2026" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="hero" size="sm" className="w-full">
                    {t.calendarCta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
