import "./App.css";
import Auth from "./components/Auth.tsx";
import StudyApp from "./components/StudyApp.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";

function AppContent() {
  const { session, loading } = useAuth();
  console.log(session);
  if (loading) {
    return <p>loading...</p>;
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
