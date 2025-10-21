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
    routes: "Rutes",
    gallery: "Galeria",
    calendar: "Calendari",
    contact: "Contacte",
    memberArea: "Àrea de Socis",
    joinUs: "Fes-te Soci",
  },
  es: {
    home: "Inicio",
    club: "El Club",
    routes: "Rutas",
    gallery: "Galería",
    calendar: "Calendario",
    contact: "Contacto",
    memberArea: "Área de Socios",
    joinUs: "Hazte Socio",
  },
  fr: {
    home: "Accueil",
    club: "Le Club",
    routes: "Routes",
    gallery: "Galerie",
    calendar: "Calendrier",
    contact: "Contact",
    memberArea: "Espace Membres",
    joinUs: "Devenir Membre",
  },
  en: {
    home: "Home",
    club: "The Club",
    routes: "Routes",
    gallery: "Gallery",
    calendar: "Calendar",
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
    { path: "/rutes", label: t.routes },
    { path: "/galeria", label: t.gallery },
    { path: "/calendari", label: t.calendar },
    { path: "/contacte", label: t.contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-hero rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">BMW</span>
            </div>
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

            {/* Member Area Button - Desktop */}
            <Link to="/area-soci" className="hidden md:block">
              <Button variant="outline" size="sm">
                {t.memberArea}
              </Button>
            </Link>

            {/* Join Button */}
            <Link to="/alta-soci" className="hidden md:block">
              <Button variant="hero" size="sm">
                {t.joinUs}
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
                <Link to="/area-soci" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    {t.memberArea}
                  </Button>
                </Link>
                <Link to="/alta-soci" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="hero" size="sm" className="w-full">
                    {t.joinUs}
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
