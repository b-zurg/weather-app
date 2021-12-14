import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  SupportedLanguage,
  TranslationKey,
  getTranslation,
} from "./translations";

interface TranslationsContextState {
  setCurrentLanguage: Dispatch<SetStateAction<SupportedLanguage>>;
  currentLanguage: SupportedLanguage;
}

export const TranslationsContext = React.createContext<
  TranslationsContextState | undefined
>(undefined);

const useTranslationsProvider = (): TranslationsContextState => {
  const context = useContext(TranslationsContext);
  if (!context)
    throw new Error(
      "Cannot use translations without a wrapping TranslationsProvider higher in the component tree"
    );
  return context;
};

interface TranslationsProviderProps {
  defaultLanguage?: SupportedLanguage;
}
export const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
  defaultLanguage,
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(
    defaultLanguage ?? "en"
  );
  return (
    <TranslationsContext.Provider
      value={{ currentLanguage, setCurrentLanguage }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslation = () => {
  const { currentLanguage } = useTranslationsProvider();
  return {
    t: (key: TranslationKey, variables?: Record<string, string>) =>
      getTranslation(key, currentLanguage, variables),
  };
};
