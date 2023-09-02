import React from "react";
import { useState } from "react";
//bootstrapp
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { FiSun, FiMoon } from "react-icons/fi";

import Navbar from "./Components/Navbar";
import Tasklist from "./Components/Tasklist";
import Animation from "./Components/Animation";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };
  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Navbar />
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          style={{
            marginTop: 20,
            maxWidth: 50,
            maxHeight: 50,
            marginLeft: 30,
          }}
          onClick={toggleDarkMode}
          class="btn btn-primary me-md-2"
          type="button"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
      <Animation />
      <Tasklist />
    </div>
  );
}

export default App;
