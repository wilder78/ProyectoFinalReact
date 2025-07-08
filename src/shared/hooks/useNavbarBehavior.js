// src/hooks/useNavbarBehavior.js
import { useEffect, useState } from "react";

const useNavbarBehavior = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return { scrolled, menuOpen, toggleMenu, closeMenu };
};

export default useNavbarBehavior;
