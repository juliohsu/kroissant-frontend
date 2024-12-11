import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Space from "./Space";
import Cake from "./Cake";
import Decor from "./Decor";
import ScrollableContainer from "./ScrollableContainer";
import { COMPRA_ROUTES } from "../../../../config/apiRoutes";

const spaces = [
  {
    id: 1,
    name: `Campo 2 (MAX: 20 PESSOAS)`,
    image: require("../../../../assets/campo2.png"),
  },
  {
    id: 2,
    name: `Campo 3 (MAX: 30 PESSOAS)`,
    image: require("../../../../assets/campo3.png"),
  },
  {
    id: 3,
    name: "Campo 4 (MAX: 20 PESSOAS)",
    image: require("../../../../assets/campo4.png"),
  },
  {
    id: 4,
    name: "Campo 5 (MAX: 50 PESSOAS)",
    image: require("../../../../assets/campo5.png"),
  },
];

const cakes = [
  { id: 1, name: "Mumu", image: require("../../../../assets/chiffoncake-mumu.jpg") },
  {
    id: 2,
    name: "Morango",
    image: require("../../../../assets/chiffoncake-morango.jpeg"),
  },
  {
    id: 3,
    name: "Belgano",
    image: require("../../../../assets/chiffoncake-belgano.jpeg"),
  },
  {
    id: 4,
    name: "Snickers",
    image: require("../../../../assets/chiffoncake-snickers.jpeg"),
  },
];

const decors = [
  { id: 1, name: "Verde", image: require("../../../../assets/mesa-posta-verde.jpg") },
  {
    id: 2,
    name: "Vermelho",
    image: require("../../../../assets/mesa-posta-vermelho.jpg"),
  },
  { id: 3, name: "Preto", image: require("../../../../assets/mesa-posta-preto.jpg") },
];

const CenteredBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  padding: "20px",
});

const Reserva: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);
  const [selectedCake, setSelectedCake] = useState<number | null>(null);
  const [selectedDecor, setSelectedDecor] = useState<number | null>(null);
  const [cakeSize, setCakeSize] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    numberOfPeople: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSpaceClick = (id: number) => {
    setSelectedSpace(id === selectedSpace ? null : id);
  };

  const handleCakeClick = (id: number) => {
    if (id === selectedCake) {
      setSelectedCake(null);
      setCakeSize(""); // Reset cake size when cake is deselected
    } else {
      setSelectedCake(id);
    }
  };

  const handleDecorClick = (id: number) => {
    setSelectedDecor(id === selectedDecor ? null : id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    setCakeSize(event.target.value as string);
  };

  /* async function twilioSendMsg(
    whatsappNum: string,
    templateData: TemplateData
  ) {
    const ACC_SID = "AC26e2dfddcd1d71e0ad52cb91e9b83758";
    const AUTH_TOKEN = "65d492c08c3c1a7ef4bf5db5a94a1b6b";
    const client = new Twilio(ACC_SID, AUTH_TOKEN);
    const senderNum = "MG7c42b16e4117a4338e6782d496251ae9";
    const templateSid = "HXd659e3b37514ca2157c08714b84ba84f";
    try {
      // Send the message using the Twilio API and the selected template
      await client.messages.create({
        from: senderNum, // Twilio WhatsApp number
        to: whatsappNum, // Recipient's WhatsApp number
        contentSid: templateSid,
        contentVariables: JSON.stringify(templateData),
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  } */

  const templateData = {
    nome_completo: formData.name.toUpperCase(),
    numero_whatsapp: formData.phone.toUpperCase(),
    data_reserva: formData.date,
    hora_chegada: formData.time,
    numero_de_pessoas: formData.numberOfPeople,
    espaco:
      spaces.find((space) => space.id === selectedSpace)?.name.toUpperCase() ||
      "N/A",
    mesa_posta:
      decors.find((decor) => decor.id === selectedDecor)?.name.toUpperCase() ||
      "N/A",
    bolo_chiffon:
      cakes.find((cake) => cake.id === selectedCake)?.name.toUpperCase() ||
      "N/A",
    tamanho: cakeSize.toUpperCase() || "N/A",
  };

  const handleSubmit = async () => {
    if (!selectedSpace) {
      setError("Por favor, selecione um espaço.");
      return;
    }
    if (
      !formData.name ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.numberOfPeople
    ) {
      setError("Por favor, preencha todos os campos abaixo.");
      return;
    }
    if (selectedCake && !cakeSize) {
      setError("Por favor, selecione o tamanho do bolo.");
      return;
    }

    setError(null);

    try {
      const response = await fetch(COMPRA_ROUTES.RESERVA(), {
        method: "POST",
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(templateData),
      });
      if (!response.ok) {
        alert(
          "Servidor da reserva retornado com erro, por favor entre em contato com o suporte +5583991409999"
        );
      } else {
        alert(
          "Reserva feita com sucesso! Agora só aguardar o gestor entrar em contato :)"
        );
      }
    } catch (err) {
      alert(
        "Erro ao enviar a reserva, entre em contato com o suporte +5583991409999"
      );
    }

    const message = `*RESERVA KROISSANT*\n\n*Nome Completo*: ${formData.name.toUpperCase()}\n*Numero WhatsApp*: ${formData.phone.toUpperCase()}\n\n*Data Reserva*: ${formData.date.toUpperCase()}\n*Hora Chegada*: ${formData.time.toUpperCase()}\n*Numero de Pessoas*: ${
      formData.numberOfPeople
    }\n*Espaço*: ${
      spaces.find((space) => space.id === selectedSpace)?.name.toUpperCase() ||
      "N/A"
    }\n\n*Mesa Posta*: ${
      decors.find((decor) => decor.id === selectedDecor)?.name.toUpperCase() ||
      "N/A"
    }\n\n*Bolo Chiffon*: ${
      cakes.find((cake) => cake.id === selectedCake)?.name.toUpperCase() ||
      "N/A"
    }\n*Tamanho*: ${cakeSize.toUpperCase() || "N/A"}`;

    const whatsappUrl = `https://wa.me/5583991409999?text=${encodeURIComponent(
      message
    )}`; /* 
    window.open(whatsappUrl, "_blank");

    window.location.reload(); */
  };

  return (
    <CenteredBox>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ marginBottom: "50px" }}
      >
        Reserva sua experiência
      </Typography>

      <Typography variant="h4" gutterBottom>
        Espaços
      </Typography>
      <Typography variant="body1" gutterBottom>
        Escolha gratuitamente um dos nossos espaços exclusivos para tornar o seu
        evento inesquecível.
      </Typography>
      <ScrollableContainer
        id="spaces-container"
        scrollable={spaces.length > 2}
        onScroll={() => {}}
      >
        {spaces.map((space) => (
          <Box key={space.id} sx={{ marginBottom: "20px" }}>
            <Space
              id={space.id}
              name={space.name}
              image={space.image}
              selected={selectedSpace === space.id}
              onClick={() => handleSpaceClick(space.id)}
            />
          </Box>
        ))}
      </ScrollableContainer>

      <Typography variant="h4" gutterBottom>
        Mesas Postas
      </Typography>
      <Typography variant="body1" gutterBottom>
        Opcionalmente, escolha uma decoração especial para tornar a sua
        experiência ainda mais completa. *Qualquer mesa posta custa 10 reais por
        pessoa.*
      </Typography>
      <ScrollableContainer
        id="decors-container"
        scrollable={decors.length > 2}
        onScroll={() => {}}
      >
        {decors.map((decor) => (
          <Box key={decor.id} sx={{ marginBottom: "20px" }}>
            <Decor
              id={decor.id}
              name={decor.name}
              image={decor.image}
              selected={selectedDecor === decor.id}
              onClick={() => handleDecorClick(decor.id)}
            />
          </Box>
        ))}
      </ScrollableContainer>

      <Typography variant="h4" gutterBottom>
        Bolos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Opcionalmente, você pode incluir na sua reserva um bolo para comemorar
        perfeitamente sua festa! *Escolhe um dos sabores abaixo, para ver
        preço.*
      </Typography>
      <ScrollableContainer
        id="cakes-container"
        scrollable={cakes.length > 2}
        onScroll={() => {}}
      >
        {cakes.map((cake) => (
          <Box key={cake.id} sx={{ marginBottom: "20px" }}>
            <Cake
              id={cake.id}
              name={cake.name}
              image={cake.image}
              selected={selectedCake === cake.id}
              onClick={() => handleCakeClick(cake.id)}
            />
          </Box>
        ))}
      </ScrollableContainer>

      {selectedCake !== null && (
        <FormControl
          fullWidth
          margin="normal"
          sx={{ marginTop: "5px", width: "100%", maxWidth: "600px" }}
        >
          <Typography variant="h5" gutterBottom>
            Escolhe o tamanho do bolo
          </Typography>
          <Select
            labelId="cake-size-label"
            value={cakeSize}
            onChange={handleSizeChange}
          >
            <MenuItem value="Grande">Grande R$ 150 (20 pessoas)</MenuItem>
            <MenuItem value="Pequeno">Pequeno R$ 80 (10 pessoas)</MenuItem>
          </Select>
        </FormControl>
      )}

      <Box
        component="form"
        sx={{ marginTop: "20px", width: "100%", maxWidth: "600px" }}
      >
        <Typography variant="h5" gutterBottom>
          Formulário p/ reserva
        </Typography>
        {error && (
          <Typography color="error" sx={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Nome Completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Número de WhatsApp"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantidade de Pessoas"
          name="numberOfPeople"
          value={formData.numberOfPeople}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data"
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Horário"
          name="time"
          value={formData.time}
          onChange={handleChange}
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{ marginTop: "20px", width: "100%", maxWidth: "600px" }}
        >
          Enviar Reserva
        </Button>
        <Typography variant="body1" gutterBottom>
          *Depois de clicar em 'ENVIAR RESERVA', sua reserva será enviado ao
          nosso gestor de reserva.
          <br />
          Caso não for retornado dentro de 3 horas, conta com ele via WhatsApp
          +5583991409999.*
        </Typography>
      </Box>
    </CenteredBox>
  );
};

export default Reserva;
