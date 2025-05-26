"use client";
import { useState, useEffect, useRef } from "react";

export function useInView(
  options?: IntersectionObserverInit,
): [React.RefObject<HTMLElement>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targetElement = elementRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [options]);

  return [elementRef, isInView];
}
