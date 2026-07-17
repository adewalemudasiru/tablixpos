import React from "react";
import { useNavigate } from "react-router";

export default function TestPage() {
  const navigate = useNavigate();
  
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>✅ Routing Works!</h1>
      <p>The app is loading correctly.</p>
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "200px" }}>
        <button 
          onClick={() => navigate("/login")}
          style={{ padding: "10px", cursor: "pointer", background: "#e91835", color: "white", border: "none", borderRadius: "6px" }}
        >
          Go to Login
        </button>
        <button 
          onClick={() => navigate("/dashboard")}
          style={{ padding: "10px", cursor: "pointer", background: "#e91835", color: "white", border: "none", borderRadius: "6px" }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}