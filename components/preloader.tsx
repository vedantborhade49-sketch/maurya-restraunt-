"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import gsap from "gsap";

const PreloaderContext = createContext({ loading: true });

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <PreloaderContext.Provider value={{ loading: false }}>
      {children}
    </PreloaderContext.Provider>
  );
}
