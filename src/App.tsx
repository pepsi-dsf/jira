import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticateApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import "./App.css";
import { FullPageErrorFallback } from "components/lib";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticateApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
