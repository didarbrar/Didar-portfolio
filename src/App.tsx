import { lazy, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

import { useEffect, useState } from "react";

const App = () => {
  const [bootError, setBootError] = useState<string | null>(null);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      setBootError(event.message);
      console.error("Global error: ", event.error || event.message);
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const message = (event.reason && (event.reason.message || event.reason.toString())) || "Unhandled promise rejection";
      setBootError(message);
      console.error("Unhandled promise rejection:", event.reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (bootError) {
    return (
      <div style={{ minHeight: "100vh", padding: "2rem", color: "white", backgroundColor: "#0a0e17" }}>
        <h1>Application failed to start</h1>
        <p>{bootError}</p>
        <p>If you changed the domain, make sure the correct Vercel URL is used: <a href="https://didar-portfolio-one.vercel.app" style={{ color: "#5eead4" }}>didar-portfolio-one.vercel.app</a>.</p>
      </div>
    );
  }

  return (
    <>
      <LoadingProvider>
        <ErrorBoundary>
          <Suspense fallback={<div style={{ minHeight: "100vh", color: "white", padding: "2rem" }}>Loading application...</div>}>
            <MainContainer>
              <Suspense fallback={<div style={{ padding: "2rem", color: "white" }}>Loading 3D character...</div>}>
                <CharacterModel />
              </Suspense>
            </MainContainer>
          </Suspense>
        </ErrorBoundary>
      </LoadingProvider>
    </>
  );
};
export default App;
