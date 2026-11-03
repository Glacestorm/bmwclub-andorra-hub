import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { LanguageCode } from "@/lib/i18n";

const translations: Record<LanguageCode, { message: string; home: string }> = {
  ca: { message: "Aquesta pàgina no existeix.", home: "Tornar a l’inici" },
  es: { message: "Esta página no existe.", home: "Volver al inicio" },
  fr: { message: "Cette page n’existe pas.", home: "Retour à l’accueil" },
  en: { message: "This page does not exist.", home: "Back to home" },
  pt: { message: "Esta página não existe.", home: "Voltar ao início" },
  de: { message: "Diese Seite existiert nicht.", home: "Zur Startseite" },
  ru: { message: "Эта страница не существует.", home: "На главную" },
};

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language] ?? translations.ca;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">{t.message}</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          {t.home}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
