import { Link } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Mail } from "lucide-react";
import { LanguageCode } from "@/lib/i18n";
import { sponsorItems } from "@/content/sponsorData";

interface FooterProps {
  language: LanguageCode;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    about: "Club i contingut",
    club: "El Club",
    partners: "Patrocinadors",
    sponsors: "Destacats",
    gallery: "Galeria",
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
    closing: "Experiència digital renovada amb calendari viu, arxiu recuperat i una galeria més cuidada.",
    contactCta: "Escriure al club",
  },
  es: {
    about: "Club y contenido",
    club: "El Club",
    partners: "Patrocinadores",
    sponsors: "Destacados",
    gallery: "Galería",
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
    closing: "Experiencia digital renovada con calendario vivo, archivo recuperado y una galería más cuidada.",
    contactCta: "Escribir al club",
  },
  fr: {
    about: "Club et contenus",
    club: "Le Club",
    partners: "Sponsors",
    sponsors: "Temps forts",
    gallery: "Galerie",
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
    closing: "Expérience numérique renouvelée avec calendrier vivant, archive restaurée et galerie plus soignée.",
    contactCta: "Écrire au club",
  },
  en: {
    about: "Club and content",
    club: "The Club",
    partners: "Sponsors",
    sponsors: "Highlights",
    gallery: "Gallery",
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
    closing: "Renewed digital experience with a live calendar, recovered archive and a more curated gallery.",
    contactCta: "Write to the club",
  },
  pt: {
    about: "Clube e conteúdo",
    club: "O Clube",
    partners: "Patrocinadores",
    sponsors: "Destaques",
    gallery: "Galeria",
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
    closing: "Experiência digital renovada com calendário vivo, arquivo recuperado e uma galeria mais cuidada.",
    contactCta: "Escrever ao clube",
  },
  de: {
    about: "Club und Inhalte",
    club: "Der Club",
    partners: "Sponsoren",
    sponsors: "Highlights",
    gallery: "Galerie",
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
    closing: "Erneuerte digitale Erfahrung mit lebendigem Kalender, wiederhergestelltem Archiv und einer kuratierteren Galerie.",
    contactCta: "Dem Club schreiben",
  },
  ru: {
    about: "Клуб и контент",
    club: "Клуб",
    partners: "Спонсоры",
    sponsors: "Главное",
    gallery: "Галерея",
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
    closing: "Обновлённый цифровой опыт с живым календарём, восстановленным архивом и более продуманной галереей.",
    contactCta: "Написать клубу",
  },
};

export const Footer = ({ language }: FooterProps) => {
  const t = translations[language];
  const footerSponsors = sponsorItems.filter((item) => item.link).slice(0, 3);

  return (
    <footer className="mt-auto bg-[linear-gradient(180deg,hsl(220_24%_10%)_0%,hsl(220_26%_8%)_100%)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr_0.9fr_0.8fr]">
          <div className="glass-dark rounded-[2rem] p-6 md:p-7 border border-white/8">
            <div className="flex items-center space-x-3">
              <img src="/club/logo-small.png" alt="BMW Club Andorra" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">{t.bmwClub}</span>
                <span className="text-sm text-white/60 leading-tight">Andorra</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/72">{t.description}</p>
            <p className="mt-3 text-sm text-white/58">{t.closing}</p>
            <a href="mailto:bmwclubandorra@gmail.com" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition-base hover:bg-white/12">
              {t.contactCta}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-lg mb-4">{t.about}</h3>
            <ul className="space-y-3">
              <li><Link to="/el-club" className="text-sm text-white/72 hover:text-white transition-base">{t.club}</Link></li>
              <li><Link to="/patrocinadors" className="text-sm text-white/72 hover:text-white transition-base">{t.partners}</Link></li>
              <li><Link to="/destacats" className="text-sm text-white/72 hover:text-white transition-base">{t.sponsors}</Link></li>
              <li><Link to="/galeria" className="text-sm text-white/72 hover:text-white transition-base">{t.gallery}</Link></li>
              <li><Link to="/bmw-oficial" className="text-sm text-white/72 hover:text-white transition-base">{t.contact}</Link></li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-lg mb-4">{t.premiumPartners}</h3>
            <ul className="space-y-3">
              {footerSponsors.map((sponsor) => (
                <li key={sponsor.id}>
                  <a href={sponsor.link?.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/72 hover:text-white transition-base">
                    {sponsor.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
              <h3 className="font-semibold text-lg mb-4">{t.legal}</h3>
              <ul className="space-y-3">
                <li><Link to="/privacitat" className="text-sm text-white/72 hover:text-white transition-base">{t.privacy}</Link></li>
                <li><Link to="/cookies" className="text-sm text-white/72 hover:text-white transition-base">{t.cookies}</Link></li>
                <li><Link to="/condicions" className="text-sm text-white/72 hover:text-white transition-base">{t.terms}</Link></li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
              <h3 className="font-semibold text-lg mb-4">{t.follow}</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/72 hover:text-white transition-base"><Facebook className="h-6 w-6" /></a>
                <a href="https://instagram.com/bmwclubandorra" target="_blank" rel="noopener noreferrer" className="text-white/72 hover:text-white transition-base"><Instagram className="h-6 w-6" /></a>
                <a href="mailto:bmwclubandorra@gmail.com" className="text-white/72 hover:text-white transition-base"><Mail className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/48">© {new Date().getFullYear()} {t.bmwClub}. {t.rights}.</p>
            <p className="text-xs text-white/42">BMW and the BMW logo are trademarks of BMW AG</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
