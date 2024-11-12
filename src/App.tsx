import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {  CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import the custom theme

import NavBar from "./NavBar";

import Inicio from "./pages/Inicio/Inicio";
import Reserva from "./pages/Reserva/Reserva";

import ListaCompra from "./pages/ListaCompra/ListaCompra";
import PedidoCompra from "./pages/ListaCompra/subpages/PedidoCompra/PedidoCompra";
import ProdutoBib from "./pages/ListaCompra/subpages/BibCompra/ProdutoBib/ProdutoBib";

const App: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Box>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/reserva" element={<Reserva />} />
            {/* Use a custom function to redirect to external URL */}
            <Route path="/encomenda" element={<></>} />
            {/* Use a custom function to redirect to external WhatsApp */}
            <Route path="/suporte" element={<></>} />
            <Route path="/lista-compra" element={<ListaCompra />} />
            <Route path="/lista-compra/pedido-compra" element={<PedidoCompra />} />
            <Route path="/lista-compra/biblioteca-produto" element={<ProdutoBib />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
