import { BrowserRouter } from "react-router-dom";
import Header from "../Header/Header.jsx";
// import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        {/* <Main /> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
