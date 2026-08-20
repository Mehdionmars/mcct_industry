import React, { useCallback, useState } from "react";
import Routes from "./Routes";
import SplashScreen from "./components/ui/SplashScreen";
import LanguageProvider from "./i18n/LanguageProvider";

const SPLASH_KEY = "mcct-splash-seen";

function App() {
  // L'écran d'accueil n'apparaît qu'une fois par session (pas à chaque rechargement).
  const [showSplash, setShowSplash] = useState(
    () => typeof window !== "undefined" && window.sessionStorage?.getItem(SPLASH_KEY) !== "1"
  );

  const dismissSplash = useCallback(() => {
    window.sessionStorage?.setItem(SPLASH_KEY, "1");
    setShowSplash(false);
  }, []);

  return (
    <LanguageProvider>
      {showSplash ? <SplashScreen onDone={dismissSplash} /> : null}
      <Routes />
    </LanguageProvider>
  );
}

export default App;
