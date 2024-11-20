import { Box, Button, Typography } from "@mui/material";
import { CameraCaptureProps } from "interfaces/compraInterfaces";
import { useCallback, useRef, useState } from "react";

import ReplyIcon from "@mui/icons-material/Reply";
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
    <Box sx={{ position: "relative", height: img === "" ? "90vh" : "50vh" }}>
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 99
        }}
      >
        <ReplyIcon
          onClick={onClose}
          color="secondary"
          sx={{
            fontSize: "7rem",
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
            screenshotFormat="image/jpeg"
            height="100%"
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
          {img && <img src={img} alt="foto" width="100%" />}
          <Button
            onClick={reset}
            sx={{
              width: "100%",
              fontSize: "2.5rem",
              color: "black",
              backgroundColor: "white",
            }}
          >
            Tirar Denovo
          </Button>
          <Button
            onClick={sendImage}
            sx={{
              width: "100%",
              fontSize: "2.5rem",
              color: "white",
              backgroundColor: "black",
            }}
          >
            Enviar Foto
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CameraCapture;
