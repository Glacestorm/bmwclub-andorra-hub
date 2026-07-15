import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("BMW Club Andorra render error", error, errorInfo);
  }

  render() {
    if (!this.state.error) return this.props.children;

    const errorMessage = this.state.error.message || "Unknown render error";
    const path = typeof window !== "undefined" ? window.location.pathname : "";

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
          <Card className="premium-card w-full max-w-2xl rounded-[2rem] border-0 p-8 shadow-elegant">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">BMW Club Andorra</p>
            <h1 className="mt-4 text-3xl font-bold text-balance">La pàgina s’ha carregat amb un error</h1>
            <p className="mt-3 text-muted-foreground">
              Hem interceptat el fallo perquè la web no es quedi en blanc. Prova a recarregar la ruta i, si venies d’un deploy recent,
              la següent càrrega hauria d’entrar neta.
            </p>
            <div className="mt-6 rounded-2xl bg-secondary/70 p-4 text-sm text-slate-700">
              <p><strong>Ruta:</strong> {path || "/"}</p>
              <p className="mt-2 break-words"><strong>Error:</strong> {errorMessage}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" className="rounded-full" onClick={() => window.location.reload()}>
                Tornar a carregar
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => (window.location.href = "/galeria")}>
                Tornar a galeria
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
