export enum LanguageType {
  ZH = "zh",
  EN = "En"
}

export const checkEn = (lang: `${LanguageType}`) => lang === LanguageType.EN;