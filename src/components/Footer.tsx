import { Link } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, Mail, Sparkles } from "lucide-react";
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
    assistant: "Assistent IA",
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
    assistantEyebrow: "Conserge IA",
    assistantBody: "Guia el visitant sobre sortides, socis, contacte i vida del club.",
    assistantCta: "Obrir assistent",
  },
  es: {
    about: "Club y contenido",
    club: "El Club",
    partners: "Patrocinadores",
    sponsors: "Destacados",
    assistant: "Asistente IA",
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
    assistantEyebrow: "Conserje IA",
    assistantBody: "Guía al visitante sobre salidas, socios, contacto y vida del club.",
    assistantCta: "Abrir asistente",
  },
  fr: {
    about: "Club et contenus",
    club: "Le Club",
    partners: "Sponsors",
    sponsors: "Temps forts",
    assistant: "Assistant IA",
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
    assistantEyebrow: "Concierge IA",
    assistantBody: "Guide le visiteur sur les sorties, l'adhésion, le contact et la vie du club.",
    assistantCta: "Ouvrir l'assistant",
  },
  en: {
    about: "Club and content",
    club: "The Club",
    partners: "Sponsors",
    sponsors: "Highlights",
    assistant: "AI Concierge",
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
    assistantEyebrow: "AI concierge",
    assistantBody: "Guides visitors through outings, membership, contact and the club story.",
    assistantCta: "Open assistant",
  },
  pt: {
    about: "Clube e conteúdo",
    club: "O Clube",
    partners: "Patrocinadores",
    sponsors: "Destaques",
    assistant: "Assistente IA",
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
    assistantEyebrow: "Concierge IA",
    assistantBody: "Orienta o visitante sobre passeios, sócios, contacto e vida do clube.",
    assistantCta: "Abrir assistente",
  },
  de: {
    about: "Club und Inhalte",
    club: "Der Club",
    partners: "Sponsoren",
    sponsors: "Highlights",
    assistant: "KI-Assistent",
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
    assistantEyebrow: "KI-Concierge",
    assistantBody: "Hilft Besuchern bei Ausfahrten, Mitgliedschaft, Kontakt und Clubverständnis.",
    assistantCta: "Assistent öffnen",
  },
  ru: {
    about: "Клуб и контент",
    club: "Клуб",
    partners: "Спонсоры",
    sponsors: "Главное",
    assistant: "ИИ помощник",
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
    assistantEyebrow: "ИИ-консьерж",
    assistantBody: "Помогает посетителю с выездами, участием, контактами и жизнью клуба.",
    assistantCta: "Открыть помощника",
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
              <li><Link to="/assistent-ia" className="text-sm text-white/72 hover:text-white transition-base">{t.assistant}</Link></li>
              <li><Link to="/galeria" className="text-sm text-white/72 hover:text-white transition-base">{t.gallery}</Link></li>
              <li><Link to="/bmw-oficial" className="text-sm text-white/72 hover:text-white transition-base">{t.contact}</Link></li>
            </ul>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {t.assistantEyebrow}
              </div>
              <p className="mt-4 text-sm text-white/68">{t.assistantBody}</p>
              <Link to="/assistent-ia" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                {t.assistantCta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

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
