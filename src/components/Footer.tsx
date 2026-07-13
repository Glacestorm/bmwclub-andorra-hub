import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail } from "lucide-react";
import { LanguageCode } from "@/lib/i18n";

interface FooterProps {
  language: LanguageCode;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    about: "Sobre Nosaltres",
    club: "El Club",
    sponsors: "Patrocinadors",
    gallery: "Galeria",
    contact: "Contacte",
    legal: "Legal",
    privacy: "Privacitat",
    cookies: "Cookies",
    terms: "Condicions",
    follow: "Segueix-nos",
    rights: "Tots els drets reservats",
    bmwClub: "BMW Club Andorra",
    description: "Club de propietaris i entusiastes de BMW a Andorra",
  },
  es: {
    about: "Sobre nosotros",
    club: "El Club",
    sponsors: "Patrocinadores",
    gallery: "Galería",
    contact: "Contacto",
    legal: "Legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    terms: "Condiciones",
    follow: "Síguenos",
    rights: "Todos los derechos reservados",
    bmwClub: "BMW Club Andorra",
    description: "Club de propietarios y entusiastas de BMW en Andorra",
  },
  fr: {
    about: "À propos",
    club: "Le Club",
    sponsors: "Sponsors",
    gallery: "Galerie",
    contact: "Contact",
    legal: "Légal",
    privacy: "Confidentialité",
    cookies: "Cookies",
    terms: "Conditions",
    follow: "Suivez-nous",
    rights: "Tous droits réservés",
    bmwClub: "BMW Club Andorra",
    description: "Club de propriétaires et passionnés de BMW en Andorre",
  },
  en: {
    about: "About us",
    club: "The Club",
    sponsors: "Sponsors",
    gallery: "Gallery",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy",
    cookies: "Cookies",
    terms: "Terms",
    follow: "Follow us",
    rights: "All rights reserved",
    bmwClub: "BMW Club Andorra",
    description: "BMW owners and enthusiasts club in Andorra",
  },
  pt: {
    about: "Sobre nós",
    club: "O Clube",
    sponsors: "Patrocinadores",
    gallery: "Galeria",
    contact: "Contacto",
    legal: "Legal",
    privacy: "Privacidade",
    cookies: "Cookies",
    terms: "Condições",
    follow: "Siga-nos",
    rights: "Todos os direitos reservados",
    bmwClub: "BMW Club Andorra",
    description: "Clube de proprietários e entusiastas BMW em Andorra",
  },
  de: {
    about: "Über uns",
    club: "Der Club",
    sponsors: "Sponsoren",
    gallery: "Galerie",
    contact: "Kontakt",
    legal: "Rechtliches",
    privacy: "Datenschutz",
    cookies: "Cookies",
    terms: "Bedingungen",
    follow: "Folgen Sie uns",
    rights: "Alle Rechte vorbehalten",
    bmwClub: "BMW Club Andorra",
    description: "Club für BMW-Besitzer und Enthusiasten in Andorra",
  },
  ru: {
    about: "О нас",
    club: "Клуб",
    sponsors: "Спонсоры",
    gallery: "Галерея",
    contact: "Контакты",
    legal: "Правовая информация",
    privacy: "Конфиденциальность",
    cookies: "Cookies",
    terms: "Условия",
    follow: "Подписывайтесь",
    rights: "Все права защищены",
    bmwClub: "BMW Club Andorra",
    description: "Клуб владельцев и поклонников BMW в Андорре",
  },
};

export const Footer = ({ language }: FooterProps) => {
  const t = translations[language];

  return (
    <footer className="bg-accent text-accent-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/club/logo-small.png" alt="BMW Club Andorra" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">{t.bmwClub}</span>
              </div>
            </div>
            <p className="text-sm text-accent-foreground/80">{t.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.about}</h3>
            <ul className="space-y-2">
              <li><Link to="/el-club" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.club}</Link></li>
              <li><Link to="/patrocinadors" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.sponsors}</Link></li>
              <li><Link to="/galeria" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.gallery}</Link></li>
              <li><Link to="/contacte" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li><Link to="/privacitat" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.privacy}</Link></li>
              <li><Link to="/cookies" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.cookies}</Link></li>
              <li><Link to="/condicions" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.terms}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.follow}</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-accent-foreground/80 hover:text-primary transition-base"><Facebook className="h-6 w-6" /></a>
              <a href="https://instagram.com/bmwclubandorra" target="_blank" rel="noopener noreferrer" className="text-accent-foreground/80 hover:text-primary transition-base"><Instagram className="h-6 w-6" /></a>
              <a href="mailto:bmwclubandorra@gmail.com" className="text-accent-foreground/80 hover:text-primary transition-base"><Mail className="h-6 w-6" /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-accent-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-accent-foreground/60">© {new Date().getFullYear()} {t.bmwClub}. {t.rights}.</p>
            <p className="text-xs text-accent-foreground/60">BMW and the BMW logo are trademarks of BMW AG</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
