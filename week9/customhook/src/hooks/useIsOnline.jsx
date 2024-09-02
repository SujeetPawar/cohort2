import { useEffect, useState } from "react";
export function useIsOnline() {
  const [isONline, setIsONline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsONline(true);
    };

    const handleOffline = () => {
      setIsONline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isONline;
}
