
import { checkEn, LanguageType } from '@/constants';
import i18next from 'i18next';
import type { TOptions } from 'i18next';

export const useI18n = (ns?: string | string[]) => {
  const isEn = checkEn(i18next.language as LanguageType);
  return {
    t: (key: string, options?: TOptions) => {
      // 如果 key 包含冒号，说明已经指定了命名空间
      if (key.includes(':')) {
        return i18next.t(key, options);
      }
      
      // 如果提供了多个命名空间，依次尝试每个命名空间
      if (Array.isArray(ns)) {
        for (const namespace of ns) {
          const translation = i18next.t(`${namespace}:${key}`, { ...options, ns: namespace });
          if (translation !== key) {
            return translation;
          }
        }
      }
      
      // 单个命名空间或默认情况
      return i18next.t(key, { ...options, ns });
    },
    i18n: i18next,
    isEn,
    localeClass: isEn ? "en" : ""
  };
};