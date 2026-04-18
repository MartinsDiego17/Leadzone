"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ButtonScroll = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      className={`
        fixed bottom-8 right-8 z-50
        cursor-pointer
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-primary text-black
        shadow-[0_0_20px_rgba(168,255,62,0.4)]
        transition-all duration-300 ease-in-out
        hover:bg-lime-light hover:shadow-[0_0_30px_rgba(168,255,62,0.6)] hover:scale-110
        active:scale-95
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
      `}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}