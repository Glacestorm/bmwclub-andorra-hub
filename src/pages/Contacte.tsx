import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, Record<string, string>> = {
  ca: {
    title: "Contacte",
    subtitle: "Posa't en contacte amb nosaltres",
    name: "Nom",
    email: "Email",
    message: "Missatge",
    send: "Obrir email",
    emailAddress: "bmwclubandorra@gmail.com",
    phoneLabel: "Telèfon",
    phone: "+376 338 117",
    locationLabel: "Ubicació",
    location: "C/ del Picó, 1-3, AD700 Escaldes-Engordany",
    getInTouch: "Com contactar-nos",
    formHelp: "Aquest formulari obre el teu client de correu amb el missatge preparat.",
    successMessage: "S'obre el teu client de correu amb el missatge preparat.",
    errorMessage: "Si us plau, omple tots els camps",
    intro: "Si tens qualsevol pregunta o vols més informació sobre el club, no dubtis a contactar-nos.",
    subjectPrefix: "Consulta web BMW Club Andorra",
    bodyName: "Nom",
    supportTitle: "Canal directe del club",
    supportText: "Per consultes de soci, col·laboracions, esdeveniments o patrocinadors.",
    scheduleLabel: "Resposta",
    scheduleText: "Normalment per email, amb context clar i seguiment fàcil.",
    calendarCta: "Veure calendari",
  },
  es: {
    title: "Contacto",
    subtitle: "Ponte en contacto con nosotros",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Abrir email",
    emailAddress: "bmwclubandorra@gmail.com",
    phoneLabel: "Teléfono",
    phone: "+376 338 117",
    locationLabel: "Ubicación",
    location: "C/ del Picó, 1-3, AD700 Escaldes-Engordany",
    getInTouch: "Cómo contactarnos",
    formHelp: "Este formulario abre tu cliente de correo con el mensaje preparado.",
    successMessage: "Se abre tu cliente de correo con el mensaje preparado.",
    errorMessage: "Por favor, completa todos los campos",
    intro: "Si tienes cualquier pregunta o quieres más información sobre el club, no dudes en contactarnos.",
    subjectPrefix: "Consulta web BMW Club Andorra",
    bodyName: "Nombre",
    supportTitle: "Canal directo del club",
    supportText: "Para consultas de socio, colaboraciones, eventos o patrocinadores.",
    scheduleLabel: "Respuesta",
    scheduleText: "Normalmente por email, con contexto claro y seguimiento fácil.",
    calendarCta: "Ver calendario",
  },
  fr: {
    title: "Contact",
    subtitle: "Contactez-nous",
    name: "Nom",
    email: "Email",
    message: "Message",
    send: "Ouvrir l'email",
    emailAddress: "bmwclubandorra@gmail.com",
    phoneLabel: "Téléphone",
    phone: "+376 338 117",
    locationLabel: "Adresse",
    location: "C/ del Picó, 1-3, AD700 Escaldes-Engordany",
    getInTouch: "Comment nous contacter",
    formHelp: "Ce formulaire ouvre votre client mail avec le message préparé.",
    successMessage: "Votre client mail va s'ouvrir avec le message préparé.",
    errorMessage: "Veuillez remplir tous les champs",
    intro: "Si vous avez des questions ou souhaitez plus d'informations sur le club, n'hésitez pas à nous contacter.",
    subjectPrefix: "Demande site BMW Club Andorra",
    bodyName: "Nom",
    supportTitle: "Canal direct du club",
    supportText: "Pour les demandes d'adhésion, collaborations, événements ou sponsors.",
    scheduleLabel: "Réponse",
    scheduleText: "Généralement par email, avec un contexte clair et un suivi simple.",
    calendarCta: "Voir le calendrier",
  },
  en: {
    title: "Contact",
    subtitle: "Get in touch with us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Open email",
    emailAddress: "bmwclubandorra@gmail.com",
    phoneLabel: "Phone",
    phone: "+376 338 117",
    locationLabel: "Location",
    location: "C/ del Picó, 1-3, AD700 Escaldes-Engordany",
    getInTouch: "How to contact us",
    formHelp: "This form opens your email client with the message prepared.",
    successMessage: "Your email client will open with the prepared message.",
    errorMessage: "Please fill in all fields",
    intro: "If you have any questions or want more information about the club, don't hesitate to contact us.",
    subjectPrefix: "BMW Club Andorra website enquiry",
    bodyName: "Name",
    supportTitle: "Direct club channel",
    supportText: "For member enquiries, collaborations, events or sponsors.",
    scheduleLabel: "Response",
    scheduleText: "Usually by email, with clear context and easy follow-up.",
    calendarCta: "View calendar",
  },
  pt: {
    title: "Contacto",
    subtitle: "Entre em contacto connosco",
    name: "Nome",
    email: "Email",
    message: "Mensagem",
    send: "Abrir email",
    emailAddress: "bmwclubandorra@gmail.com",
    phoneLabel: "Telefone",
    phone: "+376 338 117",
    locationLabel: "Localização",
    location: "C/ del Picó, 1-3, AD700 Escaldes-Engordany",
    getInTouch: "Como contactar-nos",
    formHelp: "Este formulário abre o seu cliente de email com a mensagem preparada.",
    successMessage: "O seu cliente de email vai abrir com a mensagem preparada.",
    errorMessage: "Por favor, preencha todos os campos",
    intro: "Se tiver qualquer pergunta ou quiser mais informação sobre o clube, não hesite em contactar-nos.",
    subjectPrefix: "Pedido web BMW Club Andorra",
    bodyName: "Nome",
    supportTitle: "Canal direto do clube",
    supportText: "Para pedidos de sócio, colaborações, eventos ou patrocinadores.",
    scheduleLabel: "Resposta",
    scheduleText: "Normalmente por email, com contexto claro e acompanhamento simples.",
    calendarCta: "Ver calendário",
  },
  de: {
    title: "Kontakt",
    subtitle: "Nehmen Sie Kontakt mit uns auf",
    name: "Name",
    email: "E-Mail",
    message: "Nachricht",
    send: "E-Mail öffnen",
    emailAddress: "bmwclubandorra@gmail.com",
    phoneLabel: "Telefon",
    phone: "+376 338 117",
    locationLabel: "Standort",
    location: "C/ del Picó, 1-3, AD700 Escaldes-Engordany",
    getInTouch: "So erreichen Sie uns",
    formHelp: "Dieses Formular öffnet Ihr E-Mail-Programm mit der vorbereiteten Nachricht.",
    successMessage: "Ihr E-Mail-Programm wird mit der vorbereiteten Nachricht geöffnet.",
    errorMessage: "Bitte füllen Sie alle Felder aus",
    intro: "Wenn Sie Fragen haben oder mehr Informationen über den Club möchten, kontaktieren Sie uns gerne.",
    subjectPrefix: "Anfrage Website BMW Club Andorra",
    bodyName: "Name",
    supportTitle: "Direkter Club-Kanal",
    supportText: "Für Mitgliederanfragen, Kooperationen, Events oder Sponsoren.",
    scheduleLabel: "Antwort",
    scheduleText: "Normalerweise per E-Mail, mit klarem Kontext und einfacher Nachverfolgung.",
    calendarCta: "Kalender ansehen",
  },
  ru: {
    title: "Контакты",
    subtitle: "Свяжитесь с нами",
    name: "Имя",
    email: "Email",
    message: "Сообщение",
    send: "Открыть email",
    emailAddress: "bmwclubandorra@gmail.com",
    phoneLabel: "Телефон",
    phone: "+376 338 117",
    locationLabel: "Адрес",
    location: "C/ del Picó, 1-3, AD700 Escaldes-Engordany",
    getInTouch: "Как с нами связаться",
    formHelp: "Эта форма откроет ваш почтовый клиент с подготовленным сообщением.",
    successMessage: "Ваш почтовый клиент откроется с подготовленным сообщением.",
    errorMessage: "Пожалуйста, заполните все поля",
    intro: "Если у вас есть вопросы или вы хотите узнать больше о клубе, свяжитесь с нами.",
    subjectPrefix: "Запрос с сайта BMW Club Andorra",
    bodyName: "Имя",
    supportTitle: "Прямой канал клуба",
    supportText: "Для запросов участников, партнёрств, событий или спонсоров.",
    scheduleLabel: "Ответ",
    scheduleText: "Обычно по email, с понятным контекстом и удобным сопровождением.",
    calendarCta: "Открыть календарь",
  },
};

const Contacte = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.errorMessage);
      return;
    }

    const subject = encodeURIComponent(`${t.subjectPrefix} - ${formData.name}`);
    const body = encodeURIComponent([`${t.bodyName}: ${formData.name}`, `Email: ${formData.email}`, "", formData.message].join("\n"));
    window.location.href = `mailto:${t.emailAddress}?subject=${subject}&body=${body}`;
    toast.success(t.successMessage);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <PageShell>
      <section className="pt-10 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="glass-dark border-0 rounded-[2.5rem] overflow-hidden relative p-8 md:p-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,177,.35),transparent_30%)]" />
            <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  <Mail className="h-4 w-4" />
                  {t.subtitle}
                </div>
                <h1 className="mt-5 text-4xl md:text-6xl font-bold text-balance">{t.title}</h1>
                <p className="mt-5 max-w-3xl text-lg text-white/76">{t.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${t.emailAddress}`}>
                    <Button variant="hero" size="lg" className="rounded-full">{t.send}</Button>
                  </a>
                  <Link to="/calendari/2026">
                    <Button variant="outline" size="lg" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">{t.calendarCta}</Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-lg font-semibold">{t.supportTitle}</div>
                  <div className="mt-2 text-sm text-white/65">{t.supportText}</div>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-lg font-semibold">{t.scheduleLabel}</div>
                  <div className="mt-2 text-sm text-white/65">{t.scheduleText}</div>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <div className="text-lg font-semibold">BMW Club Andorra</div>
                  <div className="mt-2 text-sm text-white/65">{t.getInTouch}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-[1fr_0.92fr] gap-6 items-start">
          <Card className="premium-card border-0 rounded-[2.2rem] p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">BMW Club Andorra</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">{t.getInTouch}</h2>
                <p className="mt-3 text-muted-foreground">{t.formHelp}</p>
              </div>
              <div className="space-y-2"><Label htmlFor="name">{t.name}</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t.name} /></div>
              <div className="space-y-2"><Label htmlFor="email">{t.email}</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t.email} /></div>
              <div className="space-y-2"><Label htmlFor="message">{t.message}</Label><Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t.message} rows={7} /></div>
              <Button type="submit" variant="hero" size="lg" className="w-full gap-2">{t.send}<ArrowRight className="h-5 w-5" /></Button>
            </form>
          </Card>

          <div className="grid gap-4">
            <Card className="glass-panel border-0 rounded-[2rem] p-6 hover-tilt">
              <div className="flex items-start gap-4"><div className="gradient-hero w-12 h-12 rounded-[1rem] flex items-center justify-center flex-shrink-0"><Mail className="h-6 w-6 text-primary-foreground" /></div><div><h3 className="font-semibold text-lg mb-1">{t.email}</h3><a href={`mailto:${t.emailAddress}`} className="text-primary hover:underline break-all">{t.emailAddress}</a><p className="mt-2 text-sm text-muted-foreground">{t.supportText}</p></div></div>
            </Card>
            <Card className="glass-panel border-0 rounded-[2rem] p-6 hover-tilt">
              <div className="flex items-start gap-4"><div className="gradient-hero w-12 h-12 rounded-[1rem] flex items-center justify-center flex-shrink-0"><Phone className="h-6 w-6 text-primary-foreground" /></div><div><h3 className="font-semibold text-lg mb-1">{t.phoneLabel}</h3><p className="text-foreground/90">{t.phone}</p><p className="mt-2 text-sm text-muted-foreground">BMW Club Andorra</p></div></div>
            </Card>
            <Card className="glass-panel border-0 rounded-[2rem] p-6 hover-tilt">
              <div className="flex items-start gap-4"><div className="gradient-hero w-12 h-12 rounded-[1rem] flex items-center justify-center flex-shrink-0"><MapPin className="h-6 w-6 text-primary-foreground" /></div><div><h3 className="font-semibold text-lg mb-1">{t.locationLabel}</h3><p className="text-foreground/90">{t.location}</p></div></div>
            </Card>
            <Card className="premium-card border-0 rounded-[2rem] p-6">
              <div className="flex items-start gap-4"><div className="rounded-[1rem] bg-primary/10 p-3"><CalendarClock className="h-6 w-6 text-primary" /></div><div><h3 className="font-semibold text-lg mb-1">{t.scheduleLabel}</h3><p className="text-muted-foreground">{t.scheduleText}</p></div></div>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Contacte;
