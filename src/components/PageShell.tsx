import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";

interface PageShellProps {
  children: ReactNode;
}

export const PageShell = ({ children }: PageShellProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      {children}
      <Footer language={language} />
    </div>
  );
};
