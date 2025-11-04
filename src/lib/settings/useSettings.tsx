"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  ReactNode,
} from "react";

export interface SettingsData {
  fullName: string;
  email: string;
  title: string;
  experience: string;
  contactMethod: string[];
  timeZone: string;
  additionalNote: string;
}

interface SettingsContextType {
  settings: SettingsData;
  updateSettings: (settings: Partial<SettingsData>) => void;
  saveSettings: () => void;
}

const defaultSettings: SettingsData = {
  fullName: "",
  email: "",
  title: "",
  experience: "",
  contactMethod: [],
  timeZone: "Eastern",
  additionalNote: "",
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Always start with defaultSettings to ensure SSR/client hydration match
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  // Use ref to access current settings without causing re-renders
  // Initialize with defaultSettings to ensure it's set before first render
  const settingsRef = useRef<SettingsData>(defaultSettings);
  // Track if we've loaded from localStorage to prevent double-loading
  const hasLoadedRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Load from localStorage after mount (client-side only, after hydration)
  // This is necessary to synchronize external state (localStorage) with React state
  // after hydration, ensuring SSR/client render match on first render.
  // This is a valid use case for calling setState in an effect (synchronizing external state).
  useEffect(() => {
    if (!hasLoadedRef.current && typeof window !== "undefined") {
      hasLoadedRef.current = true;
      try {
        const saved = localStorage.getItem("userSettings");
        if (saved) {
          const parsed = JSON.parse(saved);
          // Synchronizing external state (localStorage) with React state after mount
          setSettings(parsed);
          settingsRef.current = parsed;
        }
      } catch {
        // Invalid JSON, use defaults (already set)
      }
    }
  }, []);

  const updateSettings = useCallback((updates: Partial<SettingsData>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...updates };
      // Update ref immediately to keep it in sync
      settingsRef.current = updated;
      return updated;
    });
  }, []);

  // Use ref to avoid dependency on settings (prevents infinite loop)
  const saveSettings = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "userSettings",
          JSON.stringify(settingsRef.current)
        );
      } catch {
        // localStorage not available
      }
    }
  }, []);

  // Memoize context value to prevent infinite re-renders
  const contextValue = useMemo(
    () => ({
      settings,
      updateSettings,
      saveSettings,
    }),
    [settings, updateSettings, saveSettings]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    // Return default context instead of throwing to allow graceful degradation
    return {
      settings: defaultSettings,
      updateSettings: () => {},
      saveSettings: () => {},
    };
  }
  return context;
}
