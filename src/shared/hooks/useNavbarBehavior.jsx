// src/hooks/useNavbarBehavior.js
import { useState, useEffect } from "react";

function useNavbarBehavior() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isOpen, setIsOpen, scrolled, toggleNavbar };
}

export default useNavbarBehavior;
