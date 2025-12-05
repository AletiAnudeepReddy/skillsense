"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 100,
    });

    // Refresh AOS on component mount to catch dynamically rendered elements
    const handleRouteChange = () => {
      AOS.refresh();
    };

    window.addEventListener("load", handleRouteChange);
    return () => window.removeEventListener("load", handleRouteChange);
  }, []);

  return <>{children}</>;
}
