"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Language } from "@/data/site-content";

type Theme = "dark" | "light";
type SoundKind = "hover" | "click" | "transition";

type SiteContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  playSound: (kind: SoundKind) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const didHydrateRef = useRef(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const savedSound = window.localStorage.getItem("portfolio-sound");

    if (savedLanguage === "ar" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    } else {
      setLanguage("ar");
    }

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    if (savedSound === "true") {
      setSoundEnabled(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.body.classList.toggle("light", theme === "light");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-sound", String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    if (!didHydrateRef.current) {
      didHydrateRef.current = true;
      return;
    }

    if (soundEnabled) {
      window.setTimeout(() => {
        void playSound("click", true);
      }, 30);
    }
  }, [soundEnabled]);

  const playSound = useCallback(
    async (kind: SoundKind, force = false) => {
      if ((!soundEnabled && !force) || typeof window === "undefined") return;

      const AudioContextClass =
        window.AudioContext ||
        // @ts-expect-error Legacy Safari name.
        window.webkitAudioContext;

      if (!AudioContextClass) return;

      if (!audioRef.current) {
        audioRef.current = new AudioContextClass();
      }

      const context = audioRef.current;
      if (context.state === "suspended") {
        await context.resume().catch(() => undefined);
      }
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = kind === "click" ? "triangle" : "sine";
      oscillator.frequency.value =
        kind === "hover" ? 510 : kind === "click" ? 320 : 220;

      const peak =
        kind === "hover"
          ? 0.022
          : kind === "click"
            ? 0.05
            : 0.032;
      const duration = kind === "hover" ? 0.12 : kind === "click" ? 0.2 : 0.24;

      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(peak, context.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration + 0.02);
    },
    [soundEnabled],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      soundEnabled,
      setSoundEnabled,
      playSound,
    }),
    [language, theme, soundEnabled, playSound],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within SiteProvider");
  }
  return context;
}
