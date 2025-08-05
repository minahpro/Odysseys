"use client";
import { useEffect } from "react";
import AOS from "aos";

function Aos() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default Aos;
