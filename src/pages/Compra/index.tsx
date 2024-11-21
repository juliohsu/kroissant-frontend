import { useState } from "react";
import ListaCompra from "./subpages/ListaCompra/ListaCompra";
import { Box } from "@mui/material";
import CameraCapture from "./components/Camera/CameraCapture";
import { COMPRA_ROUTES } from "./../../config/apiRoutes";
import { dataURLtoBlob } from "../../utils/helper";

function Compra() {
  const [takePhoto, setTakePhoto] = useState(false);
  const handleTakePhotoFalse = () => {
    setTakePhoto(false);
  };
  const handleTakePhotoTrue = () => {
    setTakePhoto(true);
  };
  const handleImageData = async (image: string) => {
    setTakePhoto(false);
    try {
      const formData = new FormData();
      const imageBlob = dataURLtoBlob(image);
      formData.append("nota_compra", imageBlob, "nota_compra.jpg");
      const response = await fetch(COMPRA_ROUTES.ITENSCOMPRA(), {
        method: "POST",
        body: formData,
        mode: "cors",
      });
      if (response.ok) {
        const resJson = await response.json();
        alert(`Texto extraido:\n` + resJson.text);
      } else {
        alert("Erro ao processar imagem.");
      }
    } catch (err) {
      alert(err);
      console.error(err);
    }
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
