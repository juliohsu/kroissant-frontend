import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import the custom theme

import NavBar from "./NavBar";
import React from "react";
import CompraDomain from "./domains/CompraDomain";
import LandingDomain from "./domains/LandingDomain";

const App: React.FC = () => {
  const firstDomain = window.location.hostname.split(".")[0];
  let secondDomain = window.location.hostname.split(".")[1];
  let trueDomain = "";
  if (firstDomain === "www") {
    trueDomain = secondDomain;
  } else {
    trueDomain = firstDomain;
  }
  React.useEffect(() => {
    console.log(trueDomain);
    switch (trueDomain) {
      case "compra":
        document.title = "KROISSANT - Compra 24hrs";
        break;
      default:
        document.title = "KROISSANT - Croissant Autêntico";
        break;
    }
  }, [firstDomain]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Box>
          {(() => {
            switch (trueDomain) {
              case "compra":
                return <CompraDomain />;
              default:
                return <LandingDomain />;
            }
          })()}
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
