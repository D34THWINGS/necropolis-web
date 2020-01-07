let i18nContext = React.createContext("fr");

let useTranslation = () => {
  let language = React.useContext(i18nContext);
  let getKey =
    switch (language) {
    | "en" => EnTranslations.getKey
    | "fr" => FrTranslations.getKey
    | _ => EnTranslations.getKey
    };
  let t = key => getKey(key);
  t;
};

module I18nContextProvider = {
  let makeProps = (~value, ~children, ()) => {
    "value": value,
    "children": children,
  };

  let make = React.Context.provider(i18nContext);
};

module Provider = {
  [@react.component]
  let make = (~language="fr", ~children) =>
    <I18nContextProvider value=language> children </I18nContextProvider>;
};