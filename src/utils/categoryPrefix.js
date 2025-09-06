import { getMenuLanguage } from "../services/appServices";

const GeneratePrefix = (itemCount, menuLang) => {
  const menuLanguage = getMenuLanguage(menuLang) || getMenuLanguage();

  return itemCount === 1
    ? menuLanguage.System_Dynamic_Text.Products.Singular
    : menuLanguage.System_Dynamic_Text.Products.Plural;
};

export default GeneratePrefix;
