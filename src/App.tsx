import { lazy, Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
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
