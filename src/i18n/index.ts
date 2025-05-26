import i18n from "i18next";
import { zhJson } from "./locales/zh";
import { enJson } from "./locales/En";
import { LanguageType } from "@/constants";

export const initialI18nStore: Record<string, any> = {
  zh: zhJson,
  En: enJson,
};

export async function initI18n(lng = LanguageType.ZH) {
  await i18n.init({
    fallbackLng: lng,
    lng,
    debug: false,
    resources: initialI18nStore,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export const getLangPath = () => {
  const langs = [LanguageType.EN, LanguageType.ZH];
  return langs.map((lang) => ({
    params: { lang },
  }));
}