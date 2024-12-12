// Space.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface SpaceProps {
  id: number;
  name: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}

const Space: React.FC<SpaceProps> = ({ id, name, image, selected, onClick }) => (
  <Box sx={{ margin: "0 10px" }}>
    <Box
      sx={{
        height: "150px", 
        width: "150px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "10px",
        cursor: "pointer",
        border: selected ? "5px solid red" : "2px solid transparent",
      }}
      onClick={onClick}
    />
    <Typography align="center">{name}</Typography>
  </Box>
);

export default Space;
