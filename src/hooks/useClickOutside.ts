import { useEffect, useState } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLElement>) => {
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
  const handleClick = (ev: MouseEvent) => {
    if (ref.current && !ref.current.contains(ev.target as Node)) {
      setIsClickedOutside(true);
    } else {
      setIsClickedOutside(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return isClickedOutside;
};
