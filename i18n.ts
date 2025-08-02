import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to BackpackBuddy',
      explore: 'Explore'
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido a BackpackBuddy',
      explore: 'Explorar'
    }
  }
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources
});

export default i18n;