import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import InputField from "../../components/inputField/inputField";
import { useAuthStore } from "../../Store/authStore";


export default function LoginPage() {
  const navigate = useNavigate();

  // Zustand state & actions
  const { username, setUsername, login } = useAuthStore();

  // Local state for password & rememberMe 
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password, rememberMe);
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="form-title">Welcome back</h1>

          {/* Username */}
          <InputField
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
            e.preventDefault(); // prevent form submission
            const passwordInput = document.getElementById("password-input");
            passwordInput?.focus();
    }
  }}
          />

          {/* Password */}
          <InputField
            id="password-input"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember me */}
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          {/* Button */}
          <button type="submit" className="login-button">
             Login
          </button>
        </form>
      </main>
    </div>
  );
}
