import "bootstrap/dist/css/bootstrap.min.css";

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
