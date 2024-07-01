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

const spaces = [
  { id: 1, name: "Campo 2", image: require("../../assets/campo2.png") },
  { id: 2, name: "Campo 3", image: require("../../assets/campo3.png") },
  { id: 3, name: "Campo 4", image: require("../../assets/campo4.png") },
  { id: 4, name: "Campo 5", image: require("../../assets/campo5.png") },
];

const cakes = [
  { id: 1, name: "Mumu", image: require("../../assets/chiffoncake-mumu.jpg") },
  {
    id: 2,
    name: "Morango",
    image: require("../../assets/chiffoncake-morango.jpeg"),
  },
  {
    id: 3,
    name: "Belgano",
    image: require("../../assets/chiffoncake-belgano.jpeg"),
  },
  {
    id: 4,
    name: "Snickers",
    image: require("../../assets/chiffoncake-snickers.jpeg"),
  },
];

const decors = [
  { id: 1, name: "Verde", image: require("../../assets/mesa-posta-verde.jpg") },
  {
    id: 2,
    name: "Vermelho",
    image: require("../../assets/mesa-posta-vermelho.jpg"),
  },
  { id: 3, name: "Preto", image: require("../../assets/mesa-posta-preto.jpg") },
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

  const handleSubmit = () => {
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

    const message = `*RESERVA KROISSANT*\n\n*Nome Completo*: ${formData.name.toUpperCase()}\n*Numero WhatsApp*: ${formData.phone.toUpperCase()}\n\n*Data Reserva*: ${formData.date.toUpperCase()}\n*Hora Chegada*: ${formData.time.toUpperCase()}\n*Numero de Pessoas*: ${
      formData.numberOfPeople
    }\n*Espaço*: ${spaces
      .find((space) => space.id === selectedSpace)
      ?.name.toUpperCase()}\n\n*Mesa Posta*: ${
      decors.find((decor) => decor.id === selectedDecor)?.name.toUpperCase() ||
      "N/A"
    }\n\n*Bolo Chiffon*: ${
      cakes.find((cake) => cake.id === selectedCake)?.name.toUpperCase() ||
      "N/A"
    }\n*Tamanho*: ${cakeSize.toUpperCase() || "N/A"}`;

    const whatsappUrl = `https://wa.me/558386182324?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    window.location.reload();
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
        scrollable={spaces.length > 4}
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
        scrollable={decors.length > 4}
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
        scrollable={cakes.length > 4}
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
          <InputLabel id="cake-size-label">Tamanho do Bolo</InputLabel>
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
          *Depois de clicar em 'ENVIAR RESERVA', você será redirecionado ao
          WhatsApp para finalizar. Envie a mensagem automática ao gestor
          indicado.*
        </Typography>
      </Box>
    </CenteredBox>
  );
};

export default Reserva;
