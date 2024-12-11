import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Drawer } from "@mui/material";

import theme from "./theme"; // Import the custom theme

import logoImage from "./assets/kroissant-logo.png"; // Update the path to your logo image
import compraImage from "./assets/compra_24hrs.png";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const NavBar: React.FC = () => {
  const handleEncomendaRedirect = () => {
    const message = "Olá, tudo bem? Quero fazer uma encomenda para...";
    const whatsappUrl = `https://wa.me/558321480945?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappUrl;
  };

  const handleDeliveryRedirect = () => {
    window.location.href =
      "https://www.ifood.com.br/delivery/campina-grande-pb/kroissant-jardim-tavares/a8a0c010-25f3-4571-9c38-8e92feda4234?utm_medium=share";
  };

  const handleSuporteRedirect = () => {
    window.location.href = "https://wa.me/558321480945";
  };

  const location = useLocation();
  const showNav = !location.pathname.startsWith("/lista-compra");
  const documentTitle = document.title;
  const firstDomain = window.location.hostname.split(".")[0];
  const secondDomain = window.location.hostname.split(".")[1];
  let trueDomain = "";
  if (firstDomain === "www") {
    trueDomain = secondDomain;
  } else {
    trueDomain = firstDomain;
  }
  const [sideDrawer, setSideDrawer] = useState(false);

  const handleSideDrawer = (bool: boolean) => {
    setSideDrawer(bool);
  };

  return trueDomain !== "compra" ? (
    <AppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "center" }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          <img src={logoImage} alt="Logo" style={{ height: 60 }} />
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/reserva">
            Reserva
          </Button>
          <Button color="inherit" onClick={handleDeliveryRedirect}>
            Delivery
          </Button>
          <Button color="inherit" onClick={handleEncomendaRedirect}>
            Encomenda
          </Button>
          <Button color="inherit" onClick={handleSuporteRedirect}>
            Suporte
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  ) : (
    <>
      <AppBar
        position="sticky"
        sx={{ zIndex: theme.zIndex.drawer + 1, height: "10vh" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button onClick={() => handleSideDrawer(!sideDrawer)}>
            <MenuOpenIcon />
          </Button>
          <Box>
            <img
              src={compraImage}
              style={{ height: "8vh", marginTop: "2vh" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={sideDrawer} onClose={() => handleSideDrawer(false)}>
        <Box
          role="presentation"
          onClick={() => handleSideDrawer(false)}
          sx={{
            width: "100vw",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Button
              variant="contained"
              color="inherit"
              sx={{ fontSize: "1.25rem", marginBottom: "1rem", width: "80%" }}
              component={Link}
              to="/"
              startIcon={<CheckBoxIcon />}
            >
              Lista Compra
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{ fontSize: "1.25rem", marginBottom: "1rem", width: "80%" }}
              startIcon={<ListAltIcon />}
              component={Link}
              to="/pedido"
            >
              Pedido Compra
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{ fontSize: "1.25rem", marginBottom: "1rem", width: "80%" }}
              startIcon={<AutoStoriesIcon />}
              component={Link}
              to="/biblioteca"
            >
              BiBlioteca
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
