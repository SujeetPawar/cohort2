import { useState, useEffect } from "react";

export function useMousePointer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEvent = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseEvent);
    return () => {
      window.removeEventListener("mousemove", handleMouseEvent);
    };
  }, []);

  return position;
}
