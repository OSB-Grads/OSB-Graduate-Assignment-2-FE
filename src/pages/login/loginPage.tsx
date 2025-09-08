import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import InputField  from "../input_Field/inputField";
import { apiFetch } from "../../lib/apiClient";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();


const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = { username, password };

  try {
    // Call backend login via central API client
    const data = await apiFetch<{ token: string }>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    
    console.log(username,password);
    console.log("Login success:", data);


    // Save token to localStorage based on rememberMe
    if (rememberMe) {
      localStorage.setItem("access_token", data.token);
    } else {
      sessionStorage.setItem("access_token", data.token);
    }

    // Navigate to dashboard
    navigate("/dashboard");

  } catch (error: any) {
    console.error("Login failed:", error.message);
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
                  e.preventDefault(); // prevent form submission without password

                 // Move focus to password field
                  const passwordInput = document.getElementById("password-input");
                  passwordInput?.focus();
                  }
                }
    }
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

                            {/* Links */}
          <div className="links">
            <p>
              Don’t have an account? <a href="/register">Register</a>
            </p>
            <p>
              <a href="/forgotPassword">Forgot Password?</a>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
