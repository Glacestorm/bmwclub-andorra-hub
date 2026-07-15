import { lazy, type ComponentType } from "react";

const RELOAD_KEY = "bmwclub-lazy-reload-once";

type ModuleWithDefault<T> = { default: T };

const scheduleReloadOnce = () => {
  if (typeof window === "undefined") {
    throw new Error("Lazy module unavailable during SSR");
  }

  if (window.sessionStorage.getItem(RELOAD_KEY) === "done") {
    throw new Error("Lazy module unavailable after reload");
  }

  window.sessionStorage.setItem(RELOAD_KEY, "done");
  window.location.reload();
  return new Promise<never>(() => {
    // Keep the promise pending while the browser reloads.
  });
};

export const lazyWithAutoReload = <T extends ComponentType<any>>(
  importer: () => Promise<ModuleWithDefault<T>>,
) =>
  lazy(async () => {
    try {
      const module = await importer();
      if (!module?.default) {
        return scheduleReloadOnce();
      }
      return module;
    } catch (error) {
      return scheduleReloadOnce();
    }
  });
