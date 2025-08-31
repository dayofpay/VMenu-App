import { useState, useEffect } from "react";

/**
 * Loads a script from a given URL and returns a boolean indicating
 * whether the script is loaded. Optionally, it can clean up the script
 * tag when the component is unmounted.
 * @param {string} url The URL of the script
 * @param {boolean} clean Whether to clean up the script tag or not
 * @param {function} cleanJob A function to be called when the script is cleaned up
 * @returns {boolean} Whether the script is loaded or not
 */
export function useScript(url, clean = false, cleanJob = () => {}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let create = false;
    let script = document.querySelector(`script[src="${url}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = url;
      script.async = true;

      // Set up event listeners for when the script is loaded
      // or when it fails to load
      script.onload = () => setLoaded(true);
      script.onerror = () => console.error(`Failed to load script: ${url}`);

      // Add the script to the document
      document.body.appendChild(script);
      create = true;
    } else {
      // If the script is already loaded, just set the state
      setLoaded(true);
    }

    // Clean up the script when the component is unmounted
    return () => {
      if (create && script && clean) {
        setLoaded(false);
        document.body.removeChild(script);
        cleanJob();
      }
    };
  }, [url, clean, cleanJob]);

  return loaded;
}
