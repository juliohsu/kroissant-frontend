import Inicio from "./pages/Inicio/Inicio";
import Reserva from "./pages/Reserva";
import { Route, Routes } from "react-router-dom";

function LandingDomain() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/reserva" element={<Reserva />} />
    </Routes>
  );
}

export default LandingDomain;
