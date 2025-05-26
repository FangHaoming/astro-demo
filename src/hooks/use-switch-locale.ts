"use client";

import { LanguageType } from "@/constants";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useSwitchLocale() {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const isEn = useMemo(() => {
    return (
      i18n.language === LanguageType.EN ||
      pathname.slice(1).startsWith(LanguageType.EN)
    );
  }, [pathname, i18n]);

  const locale = useMemo(() => {
    return isEn ? LanguageType.EN : LanguageType.ZH;
  }, [isEn]);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  return {
    locale,
  };
}
