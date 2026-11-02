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
    gallery: "Galeria",
    contact: "Contacte",
    legal: "Legal",
    privacy: "Privacitat",
    cookies: "Cookies",
    terms: "Condicions",
    follow: "Segueix-nos",
    premiumPartners: "Patrocinadors",
    rights: "Tots els drets reservats",
    bmwClub: "BMW Club Andorra",
    description: "Club de propietaris i entusiastes de BMW a Andorra",
    contactCta: "Escriure al club",
    admin: "Accés club",
  },
  es: {
    about: "Club y contenido",
    club: "El Club",
    partners: "Patrocinadores",
    gallery: "Galería",
    contact: "Contacto",
    legal: "Legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    terms: "Condiciones",
    follow: "Síguenos",
    premiumPartners: "Patrocinadores",
    rights: "Todos los derechos reservados",
    bmwClub: "BMW Club Andorra",
    description: "Club de propietarios y entusiastas de BMW en Andorra",
    contactCta: "Escribir al club",
    admin: "Acceso club",
  },
  fr: {
    about: "Club et contenus",
    club: "Le Club",
    partners: "Sponsors",
    gallery: "Galerie",
    contact: "Contact",
    legal: "Légal",
    privacy: "Confidentialité",
    cookies: "Cookies",
    terms: "Conditions",
    follow: "Suivez-nous",
    premiumPartners: "Sponsors",
    rights: "Tous droits réservés",
    bmwClub: "BMW Club Andorra",
    description: "Club de propriétaires et passionnés de BMW en Andorre",
    contactCta: "Écrire au club",
    admin: "Accès club",
  },
  en: {
    about: "Club and content",
    club: "The Club",
    partners: "Sponsors",
    gallery: "Gallery",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy",
    cookies: "Cookies",
    terms: "Terms",
    follow: "Follow us",
    premiumPartners: "Sponsors",
    rights: "All rights reserved",
    bmwClub: "BMW Club Andorra",
    description: "BMW owners and enthusiasts club in Andorra",
    contactCta: "Write to the club",
    admin: "Club access",
  },
  pt: {
    about: "Clube e conteúdo",
    club: "O Clube",
    partners: "Patrocinadores",
    gallery: "Galeria",
    contact: "Contacto",
    legal: "Legal",
    privacy: "Privacidade",
    cookies: "Cookies",
    terms: "Condições",
    follow: "Siga-nos",
    premiumPartners: "Patrocinadores",
    rights: "Todos os direitos reservados",
    bmwClub: "BMW Club Andorra",
    description: "Clube de proprietários e entusiastas BMW em Andorra",
    contactCta: "Escrever ao clube",
    admin: "Acesso clube",
  },
  de: {
    about: "Club und Inhalte",
    club: "Der Club",
    partners: "Sponsoren",
    gallery: "Galerie",
    contact: "Kontakt",
    legal: "Rechtliches",
    privacy: "Datenschutz",
    cookies: "Cookies",
    terms: "Bedingungen",
    follow: "Folgen Sie uns",
    premiumPartners: "Sponsoren",
    rights: "Alle Rechte vorbehalten",
    bmwClub: "BMW Club Andorra",
    description: "Club für BMW-Besitzer und Enthusiasten in Andorra",
    contactCta: "Dem Club schreiben",
    admin: "Club-Zugang",
  },
  ru: {
    about: "Клуб и контент",
    club: "Клуб",
    partners: "Спонсоры",
    gallery: "Галерея",
    contact: "Контакты",
    legal: "Правовая информация",
    privacy: "Конфиденциальность",
    cookies: "Cookies",
    terms: "Условия",
    follow: "Подписывайтесь",
    premiumPartners: "Спонсоры",
    rights: "Все права защищены",
    bmwClub: "BMW Club Andorra",
    description: "Клуб владельцев и поклонников BMW в Андорре",
    contactCta: "Написать клубу",
    admin: "Доступ клуба",
  },
};

export const Footer = ({ language }: FooterProps) => {
  const t = translations[language];
  const footerSponsors = sponsorItems.filter((item) => item.link).slice(0, 3);

  return (
    <footer className="mt-auto bg-[linear-gradient(180deg,hsl(220_24%_10%)_0%,hsl(220_26%_8%)_100%)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr_1fr_0.8fr]">
          <div className="glass-dark rounded-[2rem] p-6 md:p-7 border border-white/8">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-white/12 bg-white/10 shadow-[0_16px_40px_-28px_rgba(0,0,0,.55)]">
                <img src="/club/logo-small.png" alt="BMW Club Andorra" className="h-12 w-12 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight tracking-[0.04em]">{t.bmwClub}</span>
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/60 leading-tight">Andorra</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/72">{t.description}</p>
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
              <li><Link to="/galeria" className="text-sm text-white/72 hover:text-white transition-base">{t.gallery}</Link></li>
            </ul>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
              <h3 className="font-semibold text-lg mb-4">{t.premiumPartners}</h3>
              <ul className="space-y-3">
                {footerSponsors.map((sponsor) => (
                  <li key={sponsor.id}>
                    <a href={sponsor.link?.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-white/8 bg-white/[0.04] p-3 text-sm text-white/72 hover:text-white hover:bg-white/[0.06] transition-base">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="rounded-xl px-3 py-2" style={{ background: sponsor.brand.surface, border: `1px solid ${sponsor.brand.border}` }}>
                          <img src={sponsor.brand.logoPath} alt={`${sponsor.name} logo`} className="h-6 w-auto max-w-[88px] object-contain" loading="lazy" />
                        </div>
                        <span className="truncate">{sponsor.name}</span>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
              <h3 className="font-semibold text-lg mb-4">{t.legal}</h3>
              <ul className="space-y-3">
                <li><Link to="/privacitat" className="text-sm text-white/72 hover:text-white transition-base">{t.privacy}</Link></li>
                <li><Link to="/cookies" className="text-sm text-white/72 hover:text-white transition-base">{t.cookies}</Link></li>
                <li><Link to="/condicions" className="text-sm text-white/72 hover:text-white transition-base">{t.terms}</Link></li>
                <li><Link to="/gestio-club" className="text-sm text-white/72 hover:text-white transition-base">{t.admin}</Link></li>
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
