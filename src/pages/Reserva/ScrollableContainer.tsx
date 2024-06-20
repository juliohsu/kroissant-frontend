// ScrollableContainer.tsx
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
  top: 0,
  bottom: 0,
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
  marginRight: "10px",
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

  return (
    <HorizontalScrollContainer id={id}>
      {children}
      {scrollable && (
        <ScrollIconsContainer sx={{ right: 0 }}>
          <ScrollIcon
            onClick={() => {
              const container = document.getElementById(id);
              if (container) container.scrollLeft += 100;
            }}
          >
            <KeyboardArrowRightIcon />
          </ScrollIcon>
          <ScrollIcon
            onClick={() => {
              const container = document.getElementById(id);
              if (container) container.scrollLeft -= 100;
            }}
          >
            <KeyboardArrowLeftIcon />
          </ScrollIcon>
        </ScrollIconsContainer>
      )}
    </HorizontalScrollContainer>
  );
};

export default ScrollableContainer;
