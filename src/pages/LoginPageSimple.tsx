import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPageSimple() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "400px", width: "100%", background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ marginBottom: "8px", fontSize: "24px", fontWeight: 600 }}>Welcome to Tablix</h1>
        <p style={{ marginBottom: "24px", color: "#6b7280" }}>Sign in to access your administrator system</p>
        
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid #d0d5dd",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            padding: "12px",
            background: "#e91835",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Continue
        </button>

        <p style={{ marginTop: "16px", textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
          New to Tablix?{" "}
          <button
            onClick={() => navigate("/signup")}
            style={{ color: "#e91835", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}