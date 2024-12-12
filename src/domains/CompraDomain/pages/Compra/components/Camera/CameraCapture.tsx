import { Box, Button, Typography } from "@mui/material";
import { CameraCaptureProps } from "interfaces/compraInterfaces";
import { useCallback, useRef, useState } from "react";

import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";

import Webcam from "react-webcam";

function CameraCapture({ onClose, sendImgData }: CameraCaptureProps) {
  const [img, setImg] = useState<string>("");
  const webcamRef = useRef<Webcam | null>(null);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc !== null) {
        setImg(imageSrc);
      }
    }
  }, [webcamRef]);
  const reset = () => {
    setImg("");
  };
  const sendImage = () => {
    sendImgData(img);
  };
  return (
    <Box sx={{ position: "relative", height: img === "" ? "76vh" : "60vh" }}>
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 99,
        }}
      >
        <ReplyIcon
          onClick={onClose}
          color="secondary"
          sx={{
            fontSize: "5rem",
            cursor: "pointer",
          }}
        />
      </Box>
      {img === "" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "92%",
          }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            height="100%"
            videoConstraints={{
              facingMode: "environment", // Ensure you're using the back camera (for mobile)
              width: 1284, // Higher width for better quality
              height: 2778, // Higher height for better quality
            }}
          />
          <Button
            onClick={capture}
            sx={{
              width: "100%",
              color: "white",
              backgroundColor: "black",
              fontSize: "2.5rem",
              transition: "none", // Disable transition effect
              "&:hover": {
                backgroundColor: "black", // Keep the background color the same on hover
              },
              "&:active": {
                backgroundColor: "black", // Keep the background color the same when clicked
              },
              "&:focus": {
                backgroundColor: "black", // Keep the background color the same when focused
                boxShadow: "none", // Remove any focus outline
              },
            }}
          >
            Tirar Foto
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "92%",
          }}
        >
          {img && (
            <img
              src={img}
              alt="foto"
              width={window.innerWidth <= 768 ? "100%" : "50%"}
            />
          )}
          <SendIcon
            onClick={sendImage}
            color="secondary"
            sx={{
              fontSize: "3.5rem",
              cursor: "pointer",
              position: "absolute",
              top: 30,
              right: 30,
              zIndex: 99,
            }}
          />
          <Button
            onClick={reset}
            sx={{
              width: "100%",
              fontSize: "2.5rem",
              color: "white",
              backgroundColor: "black",
              transition: "none", // Disable transition effect
              "&:hover": {
                backgroundColor: "black", // Keep the background color the same on hover
              },
              "&:active": {
                backgroundColor: "black", // Keep the background color the same when clicked
              },
              "&:focus": {
                backgroundColor: "black", // Keep the background color the same when focused
                boxShadow: "none", // Remove any focus outline
              },
            }}
          >
            Tirar Denovo
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CameraCapture;
