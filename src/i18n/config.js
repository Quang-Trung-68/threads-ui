import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enCommon from "../locales/en/common.json";
import enAuth from "../locales/en/auth.json";
import enPost from "../locales/en/post.json";
import enUser from "../locales/en/user.json";
import enFeed from "../locales/en/feed.json";

import viCommon from "../locales/vi/common.json";
import viAuth from "../locales/vi/auth.json";
import viPost from "../locales/vi/post.json";
import viUser from "../locales/vi/user.json";
import viFeed from "../locales/vi/feed.json";
import enValidation from "../locales/en/validation.json";
import viValidation from "../locales/vi/validation.json";


const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    post: enPost,
    user: enUser,
    feed: enFeed,
    validation: enValidation,

  },
  vi: {
    common: viCommon,
    auth: viAuth,
    post: viPost,
    user: viUser,
    feed: viFeed,
    validation: viValidation,

  },
};

// Get saved language from localStorage or default to Vietnamese
const savedLanguage = localStorage.getItem("i18nextLng") || "vi";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Use saved language or default
  fallbackLng: "en", // Fallback language
  defaultNS: "common", // Default namespace
  ns: ["common", "auth", "post", "user", "feed", "validation"], // Available namespaces

  fallbackNS: "common", // Fallback to common namespace if key not found

  interpolation: {
    escapeValue: false, // React already escapes values
  },

  // Language detection settings
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
  },
});

// Save language changes to localStorage
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
