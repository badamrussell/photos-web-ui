import React from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    }
    window.addEventListener('scroll', updateScrollPosition);
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, []);

  return [scrollPosition,];
}