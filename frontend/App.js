import React from 'react';
import MainComponent from './components/MainComponent';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: require("./translations/en.json"),
  hi: require("./translations/hi.json"),
  te: require("./translations/te.json"),
  ta: require("./translations/ta.json")
};

// Setting the user's default language
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default class App extends React.Component {
  render() {
    return (
      <MainComponent />
    );
  }
}
