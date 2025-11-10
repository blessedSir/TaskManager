import { useState } from "react";
import { registerUser, loginUser } from "../utils/api";

interface RegisterFormProps {
  onSuccess: () => void;
  darkMode: boolean;
}

export function RegisterForm({ onSuccess, darkMode }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(email, password);
      await loginUser(email, password);
      onSuccess();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      alert(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2
        className={`text-2xl font-bold ${
          darkMode ? "text-blue-400" : "text-blue-700"
        }`}
      >
        Register
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          darkMode
            ? "bg-gray-700 text-gray-100 border-gray-600"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={`border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          darkMode
            ? "bg-gray-700 text-gray-100 border-gray-600"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
