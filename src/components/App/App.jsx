import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Home from "../Home/Home.jsx";
import Explorer from "../Explorer/Explorer.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
  return (
    <HashRouter>
      <div className="page">
        <Header />

        <main className="page__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<Explorer />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
