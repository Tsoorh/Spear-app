import { Routes, Route, HashRouter } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { AppFooter } from "./cmps/AppFooter.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { Calendar } from "./cmps/Calendar.jsx";
import { Products } from "./cmps/Products.jsx";
import { Forecast } from "./cmps/Forecast.jsx";
import { Gallery } from "./cmps/Gallery.jsx";
import { Login } from "./cmps/Login.jsx";
import { Register } from "./cmps/Register.jsx";
import { CatchDetails } from "./cmps/catch/CatchDetails.jsx";
import "./assets/styles/main.css"

function App() {
  return (
    <HashRouter>
      <div className="grid-container">
      <header className="item header">
        <AppHeader />
      </header>
      <main className="item main">
        <Routes>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/forecast" element={<Forecast />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/gallery/:catchId" element={<CatchDetails />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </main>
      <footer className="item footer">
        <AppFooter />
      </footer>
      </div>
    </HashRouter>
  );
}

export default App;
