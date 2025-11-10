import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { TaskPage } from "./pages/TaskPage";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleAuth = () => setToken(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <TaskPage onLogout={handleLogout} />
            ) : (
              <AuthPage onAuth={handleAuth} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
