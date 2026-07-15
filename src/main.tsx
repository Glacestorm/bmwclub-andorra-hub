import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    const reloadKey = "bmwclub-preload-reload-once";

    if (window.sessionStorage.getItem(reloadKey) === "done") {
      return;
    }

    window.sessionStorage.setItem(reloadKey, "done");
    window.location.reload();
  });
}

createRoot(document.getElementById("root")!).render(<App />);
