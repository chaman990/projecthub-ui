"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Rocket } from "lucide-react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    // If the page already finished loading before React hydrated, hide immediately
    if (document.readyState === "complete") {
      setTimeout(handleLoad, 2000);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#172578] via-[#0e1754] to-[#080d36] text-white">
          <div className="relative flex items-center justify-center mb-6">
            <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-indigo-400 opacity-20" />
            <div className="relative w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-lg">
              <Rocket className="w-9 h-9 text-sky-400 -rotate-12 animate-bounce" />
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-2">ProjectHub</h2>
          <p className="text-sm text-indigo-200 animate-pulse">
            Loading your workspace...
          </p>
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
}

export function useGlobalLoader() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useGlobalLoader must be used within a LoadingProvider");
  }
  return context;
}
