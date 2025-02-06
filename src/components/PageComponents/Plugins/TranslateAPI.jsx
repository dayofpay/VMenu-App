import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function TranslateAPI() {
  useEffect(() => {
    // Define the callback function for Google Translate initialization
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "bg",
          autoDisplay: true,
          includedLanguages: "hi,en,bn,ar,ja,iw,bg",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };

    // Check if the Google Translate script is already added to avoid reloading it
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function to reset Google Translate when leaving the page
    return () => {
      const translateElement = document.getElementById("google_translate_element");
      if (translateElement) {
        translateElement.innerHTML = ''; // Clear the existing translate element
      }
    };
  }, []); // Empty dependency ensures this runs only once

  return (
    <HelmetProvider>
      <Helmet>
        {/* Google Translate script is injected dynamically in the effect */}
      </Helmet>
      <div id="google_translate_element"></div>
    </HelmetProvider>
  );
}

export default TranslateAPI;
