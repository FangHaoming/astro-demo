import type { LanguageType } from "../constants";

export type ISeoProps = Partial<{
  title: string;
  keywords: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogUrl: string;
  type: string;
  lang: `${LanguageType}`;
}>;