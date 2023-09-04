import React from "react";
//libs
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
//conponents
import Navbar from "./Components/main_components/Navbar";
import Tasklist from "./Components/main_components/Tasklist";
import Animation from "./Components/main_components/Animation";
import Footer from "./Components/main_components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Animation />
      <Tasklist />
      <Footer />
    </>
  );
}

export default App;
