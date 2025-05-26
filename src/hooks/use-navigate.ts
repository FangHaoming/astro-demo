"use client";
import { LanguageType } from "@/constants";
import { useI18n } from "@/hooks";
import { useCallback, useMemo } from "react";

export function useNavigate(isFooter?: boolean) {
  const { t, isEn } = useI18n("main");
  const localePrefix = useMemo(
    () => (isEn ? `/${LanguageType.EN}` : ""),
    [isEn],
  );

  const navigate = useCallback(
    (to: string) => {
      window.location.href = `${localePrefix}${to}`;
    },
    [localePrefix],
  );

  const navList = useMemo(() => {
    return [
      {
        name: t("nav_home"),
        to: "/",
        hidden: isFooter,
      },
      {
        name: t("nav_product"),
        to: "/products.html",
      },
      {
        name: t("nav_solution"),
        to: "/solutions",
        hiddenInEn: true,
        hidden: true,
      },
      {
        name: t("nav_case"),
        to: "/case.html",
      },
      {
        name: t("nav_about"),
        to: "/about.html",
      },
      {
        name: t("nav_contact"),
        to: "/about.html#about-bottom",
        hidden: !isFooter,
      },
      {
        name: t("nav_join"),
        link: "https://rayvision.zhiye.com/",
        rel: "nofollow",
        hiddenInEn: true,
      },
    ]
      .filter((i) => !i.hidden && !(isEn && i.hiddenInEn))
      .map((item) => {
        if (item.to)
          return {
            ...item,
            to: `${localePrefix}${isEn && item.to === "/" ? "" : item.to}`,
          };
        return item;
      });
  }, [isEn, isFooter, t, localePrefix]);

  return { navList, navigate };
}
