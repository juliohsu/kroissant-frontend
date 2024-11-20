import { useState } from "react";
import ListaCompra from "./subpages/ListaCompra/ListaCompra";
import { Box } from "@mui/material";
import CameraCapture from "./components/Camera/CameraCapture";

function Compra() {
  const [takePhoto, setTakePhoto] = useState(false);
  const handleTakePhotoFalse = () => {
    setTakePhoto(false);
  };
  const handleTakePhotoTrue = () => {
    setTakePhoto(true);
  };
  const handleImageData = (image: string) => {
    setTakePhoto(false);
    console.log(image);
  };
  return (
    <Box>
      {takePhoto ? (
        <CameraCapture
          onClose={handleTakePhotoFalse}
          sendImgData={handleImageData}
        />
      ) : (
        <ListaCompra onOpen={handleTakePhotoTrue} />
      )}
    </Box>
  );
}

export default Compra;
