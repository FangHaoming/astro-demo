"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { RefObject, useEffect } from "react";

/**
 * @description use like below
 * import React, { useRef } from 'react'
 * const Wrap = () => {
 *   const ref = useRef()
 *   useClickOutside(ref, () => callback, isTrigger?:boolean)
 *   return <Element ref={ref} />
 * }
 */
export function useClickOutside(
  ref: string | RefObject<HTMLElement>,
  callback: (e?: any) => void,
  isTrigger = true,
  dep = [] as any[],
) {
  useEffect(() => {
    if (isTrigger) {
      const handleClickOutside = (e: any) => {
        if (typeof ref === "string") {
          const el = document.querySelector(ref);
          if (el && !el.contains(e.target)) {
            callback(e);
          }
          return;
        }
        if (Array.isArray(ref)) {
          if (
            ref.every((r) => r && r.current && !r.current.contains(e.target))
          ) {
            callback(e);
          }
        } else {
          ref && ref.current && !ref.current.contains(e.target) && callback(e);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isTrigger, ...dep]);
}
