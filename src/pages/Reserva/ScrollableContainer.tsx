import React, { useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HorizontalScrollContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  maxWidth: "100%",
  padding: "10px 0",
  position: "relative",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  scrollbarWidth: "none",
});

const ScrollIconsContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  zIndex: 1,
  pointerEvents: "none",
});

const ScrollIcon = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  zIndex: 1,
  pointerEvents: "all",
  margin: "0 10px",
});

interface ScrollableContainerProps {
  id: string;
  scrollable: boolean;
  onScroll: () => void;
  children: React.ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  id,
  scrollable,
  onScroll,
  children,
}) => {
  useEffect(() => {
    const container = document.getElementById(id);
    if (container) {
      container.addEventListener("scroll", onScroll);
      return () => {
        container.removeEventListener("scroll", onScroll);
      };
    }
  }, [id, onScroll]);

  const scrollLeft = () => {
    const container = document.getElementById(id);
    if (container) container.scrollLeft -= 100;
  };

  const scrollRight = () => {
    const container = document.getElementById(id);
    if (container) container.scrollLeft += 100;
  };

  return (
    <Box position="relative" width="100%">
      <HorizontalScrollContainer id={id}>
        {children}
      </HorizontalScrollContainer>
      {scrollable && (
        <>
          <ScrollIconsContainer sx={{ left: 0 }}>
            <ScrollIcon onClick={scrollLeft}>
              <KeyboardArrowLeftIcon />
            </ScrollIcon>
          </ScrollIconsContainer>
          <ScrollIconsContainer sx={{ right: 0 }}>
            <ScrollIcon onClick={scrollRight}>
              <KeyboardArrowRightIcon />
            </ScrollIcon>
          </ScrollIconsContainer>
        </>
      )}
    </Box>
  );
};

export default ScrollableContainer;
