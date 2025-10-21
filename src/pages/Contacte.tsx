import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contacte = () => {
  const [language, setLanguage] = useState("ca");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const translations = {
    ca: {
      title: "Contacte",
      subtitle: "Posa't en contacte amb nosaltres",
      name: "Nom",
      email: "Email",
      message: "Missatge",
      send: "Enviar Missatge",
      emailAddress: "info@bmwclubandorra.com",
      phone: "+376 XXX XXX",
      location: "Andorra la Vella, Andorra",
      getInTouch: "Com Contactar-nos",
      successMessage: "Missatge enviat correctament!",
      errorMessage: "Si us plau, omple tots els camps",
    },
    es: {
      title: "Contacto",
      subtitle: "Ponte en contacto con nosotros",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar Mensaje",
      emailAddress: "info@bmwclubandorra.com",
      phone: "+376 XXX XXX",
      location: "Andorra la Vella, Andorra",
      getInTouch: "Cómo Contactarnos",
      successMessage: "¡Mensaje enviado correctamente!",
      errorMessage: "Por favor, completa todos los campos",
    },
    fr: {
      title: "Contact",
      subtitle: "Contactez-nous",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer le Message",
      emailAddress: "info@bmwclubandorra.com",
      phone: "+376 XXX XXX",
      location: "Andorre-la-Vieille, Andorre",
      getInTouch: "Comment Nous Contacter",
      successMessage: "Message envoyé avec succès!",
      errorMessage: "Veuillez remplir tous les champs",
    },
    en: {
      title: "Contact",
      subtitle: "Get in touch with us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      emailAddress: "info@bmwclubandorra.com",
      phone: "+376 XXX XXX",
      location: "Andorra la Vella, Andorra",
      getInTouch: "How to Contact Us",
      successMessage: "Message sent successfully!",
      errorMessage: "Please fill in all fields",
    },
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.errorMessage);
      return;
    }

    // Here you would typically send the form data to a backend
    console.log("Form submitted:", formData);
    toast.success(t.successMessage);
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.name}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.message}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.message}
                    rows={6}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  {t.send}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t.getInTouch}</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === "ca" && "Si tens qualsevol pregunta o vols més informació sobre el club, no dubtis en contactar-nos."}
                  {language === "es" && "Si tienes cualquier pregunta o quieres más información sobre el club, no dudes en contactarnos."}
                  {language === "fr" && "Si vous avez des questions ou souhaitez plus d'informations sur le club, n'hésitez pas à nous contacter."}
                  {language === "en" && "If you have any questions or want more information about the club, don't hesitate to contact us."}
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{t.email}</h3>
                      <a href="mailto:info@bmwclubandorra.com" className="text-primary hover:underline">
                        {t.emailAddress}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{language === "ca" ? "Telèfon" : language === "es" ? "Teléfono" : language === "fr" ? "Téléphone" : "Phone"}</h3>
                      <p className="text-muted-foreground">{t.phone}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-elegant transition-all">
                  <div className="flex items-start gap-4">
                    <div className="gradient-hero w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{language === "ca" ? "Ubicació" : language === "es" ? "Ubicación" : language === "fr" ? "Emplacement" : "Location"}</h3>
                      <p className="text-muted-foreground">{t.location}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default Contacte;
