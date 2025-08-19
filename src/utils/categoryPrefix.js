import { getMenuLanguage } from "../services/appServices";

const menuLanguage = getMenuLanguage();

const GeneratePrefix = itemCount => [menuLanguage.System_Dynamic_Text.Products.Singular, menuLanguage.System_Dynamic_Text.Products.Singular, menuLanguage.System_Dynamic_Text.Products.Plural][Math.min(itemCount, 2)];

export default GeneratePrefix