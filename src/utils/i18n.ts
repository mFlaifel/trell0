import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'Your workspace': 'Your workspace ',
      'Create new board': 'Create new board',
      'Board name': 'Board name',
      "Type board's name": "Type board's name",
      OK: 'OK',
      Cancel: 'Cancel',
      ' + add List': ' + add List',
      ' + add Card': ' + add Card',
      'Add List': 'Add List',
      'Type here': 'Type here',
    },
  },
  fr: {
    translation: {
      'Your workspace': 'Votre espace de travail',
      'Create new board': 'Créer un nouveau tableau',
      'Board name': 'Nom du conseil',
      "Type board's name": 'Tapez le nom du tableau',
      OK: "D'ACCORD",
      Cancel: 'Annuler',
      ' + add List': ' + ajouter une liste',
      ' + add Card': ' + ajouter une carte',
      'Add List': 'Ajouter la liste',
      'Type here': 'Écrivez ici',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
