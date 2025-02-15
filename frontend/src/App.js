import React from "react";
import UploadResume from "./UploadResume"; // ✅ Corrected path
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>📄 Smart Resume Analyzer</h1>
      <UploadResume />
    </div>
  );
}

export default App;
