import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import withObjectData from "../../../HOC/withObjectInfo";
import LoadingAnimation from "../../Animations/Loading";
import { do_action } from "../../../services/userServices";

function TranslateAPI({ objectData }) {
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);

  useEffect(() => {
    if (!objectData) {
      return;
    }

    const objectLanguageJSObject = objectData?.MODULES?.OBJECT_INFO?.ENABLED_LANGUAGES;

    if (!objectLanguageJSObject) {
      setIsTranslationEnabled(false);
      return;
    }

    console.log(objectLanguageJSObject, "objectLanguageJSObject");

    let languageOptions = objectLanguageJSObject.useAllAvailableLanguages
      ? {
          pageLanguage: "bg",
          autoDisplay: true,
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        }
      : {
          pageLanguage: "bg",
          autoDisplay: true,
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          includedLanguages: [
            "bg",
            ...(Array.isArray(objectLanguageJSObject?.options)
              ? objectLanguageJSObject?.options
              : objectLanguageJSObject?.options?.split(",") || ["en"]),
          ].join(","),
        };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(languageOptions, "google_translate_element");
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const translateElement = document.getElementById("google_translate_element");
      if (translateElement) {
        translateElement.innerHTML = "";
      }
    };
  }, []);

  const resetTranslation = () => {
    do_action("reset_translation",{message: "Translation reset"});
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <HelmetProvider>
      <Helmet>{/* V-MENU.API.TRANSLATION */}</Helmet>
      {isTranslationEnabled ? (
        <>
          <div id="google_translate_element"></div>
          
          <button
            onClick={resetTranslation}
            className="btn btn-primary"
            style={{ marginTop: "10px", padding: "5px 10px" }}
          >
            Reset Options
          </button>
        </>
      ) : (
        <div style={{ color: "#d9534f", fontWeight: "bold", marginTop: "10px" }}>
          🌍 Translation is not enabled for this object.
        </div>
      )}
    </HelmetProvider>
  );
}

const ShowTranslateAPI = withObjectData(TranslateAPI);
export default ShowTranslateAPI;
