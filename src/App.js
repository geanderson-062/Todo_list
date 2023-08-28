import React from "react";
//bootstrapp
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import Navbar from "./Components/Navbar";
import Tasklist from "./Components/Tasklist";
import Animation from "./Components/Animation";

function App() {
  return (
    <>
      <Navbar />
      <Animation />
      <Tasklist />
    </>
  );
}

export default App;
