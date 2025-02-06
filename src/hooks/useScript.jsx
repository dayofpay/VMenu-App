import { useState, useEffect } from "react";

export function useScript(url, clean = false, cleanJob = () => {}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let create = false;
    let script = document.querySelector(`script[src="${url}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = url;
      script.async = true;

      script.onload = () => setLoaded(true);
      script.onerror = () => console.error(`Failed to load script: ${url}`);

      document.body.appendChild(script);
      create = true;
    } else {
      setLoaded(true);
    }

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
