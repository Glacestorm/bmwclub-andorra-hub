import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail } from "lucide-react";
import { LanguageCode } from "@/lib/i18n";
import { sponsorItems } from "@/content/sponsorData";

interface FooterProps {
  language: LanguageCode;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    about: "Sobre Nosaltres",
    club: "El Club",
    partners: "Patrocinadors",
    sponsors: "Destacats",
    gallery: "Arxiu",
    contact: "BMW Oficial",
    legal: "Legal",
    privacy: "Privacitat",
    cookies: "Cookies",
    terms: "Condicions",
    follow: "Segueix-nos",
    premiumPartners: "Partners premium",
    rights: "Tots els drets reservats",
    bmwClub: "BMW Club Andorra",
    description: "Club de propietaris i entusiastes de BMW a Andorra",
  },
  es: {
    about: "Sobre nosotros",
    club: "El Club",
    partners: "Patrocinadores",
    sponsors: "Destacados",
    gallery: "Archivo",
    contact: "BMW Oficial",
    legal: "Legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    terms: "Condiciones",
    follow: "Síguenos",
    premiumPartners: "Partners premium",
    rights: "Todos los derechos reservados",
    bmwClub: "BMW Club Andorra",
    description: "Club de propietarios y entusiastas de BMW en Andorra",
  },
  fr: {
    about: "À propos",
    club: "Le Club",
    partners: "Sponsors",
    sponsors: "Temps forts",
    gallery: "Archive",
    contact: "BMW Officiel",
    legal: "Légal",
    privacy: "Confidentialité",
    cookies: "Cookies",
    terms: "Conditions",
    follow: "Suivez-nous",
    premiumPartners: "Partenaires premium",
    rights: "Tous droits réservés",
    bmwClub: "BMW Club Andorra",
    description: "Club de propriétaires et passionnés de BMW en Andorre",
  },
  en: {
    about: "About us",
    club: "The Club",
    partners: "Sponsors",
    sponsors: "Highlights",
    gallery: "Archive",
    contact: "BMW Official",
    legal: "Legal",
    privacy: "Privacy",
    cookies: "Cookies",
    terms: "Terms",
    follow: "Follow us",
    premiumPartners: "Premium partners",
    rights: "All rights reserved",
    bmwClub: "BMW Club Andorra",
    description: "BMW owners and enthusiasts club in Andorra",
  },
  pt: {
    about: "Sobre nós",
    club: "O Clube",
    partners: "Patrocinadores",
    sponsors: "Destaques",
    gallery: "Arquivo",
    contact: "BMW Oficial",
    legal: "Legal",
    privacy: "Privacidade",
    cookies: "Cookies",
    terms: "Condições",
    follow: "Siga-nos",
    premiumPartners: "Parceiros premium",
    rights: "Todos os direitos reservados",
    bmwClub: "BMW Club Andorra",
    description: "Clube de proprietários e entusiastas BMW em Andorra",
  },
  de: {
    about: "Über uns",
    club: "Der Club",
    partners: "Sponsoren",
    sponsors: "Highlights",
    gallery: "Archiv",
    contact: "BMW Offiziell",
    legal: "Rechtliches",
    privacy: "Datenschutz",
    cookies: "Cookies",
    terms: "Bedingungen",
    follow: "Folgen Sie uns",
    premiumPartners: "Premium-Partner",
    rights: "Alle Rechte vorbehalten",
    bmwClub: "BMW Club Andorra",
    description: "Club für BMW-Besitzer und Enthusiasten in Andorra",
  },
  ru: {
    about: "О нас",
    club: "Клуб",
    partners: "Спонсоры",
    sponsors: "Главное",
    gallery: "Архив",
    contact: "BMW Official",
    legal: "Правовая информация",
    privacy: "Конфиденциальность",
    cookies: "Cookies",
    terms: "Условия",
    follow: "Подписывайтесь",
    premiumPartners: "Премиум-партнёры",
    rights: "Все права защищены",
    bmwClub: "BMW Club Andorra",
    description: "Клуб владельцев и поклонников BMW в Андорре",
  },
};

export const Footer = ({ language }: FooterProps) => {
  const t = translations[language];
  const footerSponsors = sponsorItems.filter((item) => item.link).slice(0, 3);

  return (
    <footer className="bg-accent text-accent-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 mb-8">
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
              <li><Link to="/patrocinadors" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.partners}</Link></li>
              <li><Link to="/destacats" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.sponsors}</Link></li>
              <li><Link to="/arxiu" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.gallery}</Link></li>
              <li><Link to="/bmw-oficial" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">{t.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.premiumPartners}</h3>
            <ul className="space-y-2">
              {footerSponsors.map((sponsor) => (
                <li key={sponsor.id}>
                  <a href={sponsor.link?.href} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-foreground/80 hover:text-primary transition-base">
                    {sponsor.name}
                  </a>
                </li>
              ))}
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
