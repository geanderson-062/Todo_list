import "./styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar";
import Tasklist from "./Components/Tasklist";

function App() {
  return (
    <>
      <Navbar />
      <Tasklist />
    </>
  );
}

export default App;
