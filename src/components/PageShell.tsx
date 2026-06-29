import { ReactNode, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface PageShellProps {
  children: ReactNode;
}

export const PageShell = ({ children }: PageShellProps) => {
  const [language, setLanguage] = useState("ca");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      {children}
      <Footer language={language} />
    </div>
  );
};
