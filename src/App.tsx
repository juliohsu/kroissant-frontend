import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Inicio from "./pages/Inicio/Inicio";
import Reserva from "./pages/Reserva/Reserva";

import theme from "./theme"; // Import the custom theme
import logoImage from './assets/kroissant-logo.png'; // Update the path to your logo image

const App: React.FC = () => {
  const handleEncomendaRedirect = () => {
    const message = "Olá, tudo bem? Quero fazer uma encomenda para...";
    const whatsappUrl = `https://wa.me/558386182324?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  const handleDeliveryRedirect = () => {
    window.location.href = "https://kroissant.alloy.al/menu/pedidos";
  };

  const handleContatoRedirect = () => {
    window.location.href = "https://wa.me/558321480945";
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ flexDirection: "column" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 2 }}>
              <img src={logoImage} alt="Logo" style={{ height: 60 }} />
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button color="inherit" component={Link} to="/">
                Inicio
              </Button>
              <Button color="inherit" component={Link} to="/reserva">
                Reserva
              </Button>
              <Button color="inherit" onClick={handleDeliveryRedirect}>
                Menu
              </Button>
              <Button color="inherit" onClick={handleEncomendaRedirect}>
                Encomenda
              </Button>
              <Button color="inherit" onClick={handleContatoRedirect}>
                Contato
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/reserva" element={<Reserva />} />
            {/* Use a custom function to redirect to external URL */}
            <Route path="/encomenda" element={<></>} />
            {/* Use a custom function to redirect to external WhatsApp */}
            <Route path="/contato" element={<></>} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
