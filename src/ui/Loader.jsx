// src/ui/Loader.jsx
import React from "react";

const squareStyle = {
  width: "20px",
  height: "20px",
  margin: "0 8px",
  backgroundColor: "#4f46e5", // Indigo-600
  animation: "bounce 0.6s infinite ease-in-out",
};

export default function Loader() {
  return (
    <div style={containerStyle}>
      <div style={{ ...squareStyle, animationDelay: "0s" }}></div>
      <div style={{ ...squareStyle, animationDelay: "0.2s" }}></div>
      <div style={{ ...squareStyle, animationDelay: "0.4s" }}></div>
      <style>{keyframes}</style>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f9fafb", // light background
};

const keyframes = `
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.4);
    opacity: 1;
  }
}
`;
