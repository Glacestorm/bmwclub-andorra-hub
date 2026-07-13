import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
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
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-5xl md:text-6xl font-bold mb-6">{t.title}</h1><p className="text-xl text-muted-foreground">{t.subtitle}</p></div></div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-sm text-muted-foreground">{t.formHelp}</p>
                <div className="space-y-2"><Label htmlFor="name">{t.name}</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t.name} /></div>
                <div className="space-y-2"><Label htmlFor="email">{t.email}</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t.email} /></div>
                <div className="space-y-2"><Label htmlFor="message">{t.message}</Label><Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t.message} rows={6} /></div>
                <Button type="submit" variant="hero" size="lg" className="w-full">{t.send}</Button>
              </form>
            </Card>

            <div className="space-y-8">
              <div><h2 className="text-3xl font-bold mb-6">{t.getInTouch}</h2><p className="text-lg text-muted-foreground mb-8">{t.intro}</p></div>
              <div className="space-y-6">
                <Card className="p-6 hover:shadow-elegant transition-all"><div className="flex items-start gap-4"><div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"><Mail className="h-6 w-6 text-primary-foreground" /></div><div><h3 className="font-semibold text-lg mb-1">{t.email}</h3><a href="mailto:bmwclubandorra@gmail.com" className="text-primary hover:underline">{t.emailAddress}</a></div></div></Card>
                <Card className="p-6 hover:shadow-elegant transition-all"><div className="flex items-start gap-4"><div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"><Phone className="h-6 w-6 text-primary-foreground" /></div><div><h3 className="font-semibold text-lg mb-1">{t.phoneLabel}</h3><p className="text-muted-foreground">{t.phone}</p></div></div></Card>
                <Card className="p-6 hover:shadow-elegant transition-all"><div className="flex items-start gap-4"><div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"><MapPin className="h-6 w-6 text-primary-foreground" /></div><div><h3 className="font-semibold text-lg mb-1">{t.locationLabel}</h3><p className="text-muted-foreground">{t.location}</p></div></div></Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Contacte;
