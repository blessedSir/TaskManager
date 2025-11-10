import { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

export function AuthPage({ onAuth }: { onAuth: () => void }) {
  const [isRegister, setIsRegister] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Загрузка темы
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(JSON.parse(savedTheme));
  }, []);

  // Сохранение темы
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`max-w-md w-full p-8 border rounded-lg shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        {/* Кнопка смены темы */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 border rounded-lg transition-colors duration-300 flex items-center justify-center ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-900 hover:text-yellow-300 hover:bg-gray-400"
            }`}
          >
            <FontAwesomeIcon
              className="text-current"
              icon={darkMode ? faSun : faMoon}
            />
          </button>
        </div>

        {isRegister ? (
          <RegisterForm onSuccess={onAuth} darkMode={darkMode} />
        ) : (
          <LoginForm onSuccess={onAuth} darkMode={darkMode} />
        )}

        <button
          className={`mt-6 underline hover:text-blue-700 transition w-full text-center ${
            darkMode ? "text-blue-400" : "text-blue-500"
          }`}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}
