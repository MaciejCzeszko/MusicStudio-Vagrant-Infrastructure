import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { Studios } from "./pages/Studios";
import { Reservation } from "./pages/Reservation";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/studios" element={<Studios />} />
        <Route path="/reservation/:id" element={<Reservation />} />
      </Routes>
    </Router>
  );
}

export default App;
