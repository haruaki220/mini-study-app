import "./App.css";
import Auth from "./components/Auth/Auth.tsx";
import StudyApp from "./components/StudyApp/StudyApp.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";

function AppContent() {
  const { session, loading } = useAuth();
  if (loading) {
    return <p className="loading">loading...</p>;
  }

  return session ? <StudyApp /> : <Auth />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
