import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Explore } from "./pages/Explore";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explore" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
