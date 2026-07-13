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

interface NavbarProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const translations = {
  ca: {
    home: "Inici",
    club: "El Club",
    sponsors: "Patrocinadors",
    gallery: "Galeria",
    calendar: "Calendari",
    weather: "Meteo",
    contact: "Contacte",
    memberArea: "Àrea de Socis",
    joinUs: "Fes-te Soci",
  },
  es: {
    home: "Inicio",
    club: "El Club",
    sponsors: "Patrocinadores",
    gallery: "Galería",
    calendar: "Calendario",
    weather: "Meteo",
    contact: "Contacto",
    memberArea: "Área de Socios",
    joinUs: "Hazte Socio",
  },
  fr: {
    home: "Accueil",
    club: "Le Club",
    sponsors: "Sponsors",
    gallery: "Galerie",
    calendar: "Calendrier",
    weather: "Météo",
    contact: "Contact",
    memberArea: "Espace Membres",
    joinUs: "Devenir Membre",
  },
  en: {
    home: "Home",
    club: "The Club",
    sponsors: "Sponsors",
    gallery: "Gallery",
    calendar: "Calendar",
    weather: "Weather",
    contact: "Contact",
    memberArea: "Member Area",
    joinUs: "Join Us",
  },
};

const languages = [
  { code: "ca", name: "Català" },
  { code: "es", name: "Castellano" },
  { code: "fr", name: "Français" },
  { code: "en", name: "English" },
];

export const Navbar = ({ language, setLanguage }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[language as keyof typeof translations];

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
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/club/logo-small.png" alt="BMW Club Andorra" className="w-12 h-12 object-contain" />
            <div className="hidden md:flex flex-col">
              <span className="font-bold text-lg leading-tight">BMW CLUB</span>
              <span className="text-sm text-muted-foreground leading-tight">ANDORRA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {language.toUpperCase()}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
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
              <Button variant="hero" size="sm">
                {language === "ca"
                  ? "Calendari 2026"
                  : language === "es"
                    ? "Calendario 2026"
                    : language === "fr"
                      ? "Calendrier 2026"
                      : "Calendar 2026"}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
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
                    {language === "ca"
                      ? "Calendari 2026"
                      : language === "es"
                        ? "Calendario 2026"
                        : language === "fr"
                          ? "Calendrier 2026"
                          : "Calendar 2026"}
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
