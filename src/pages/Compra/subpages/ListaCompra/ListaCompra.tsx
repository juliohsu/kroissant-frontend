import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { COMPRA_ROUTES } from "../../../../config/apiRoutes";
import {
  ItemCompra,
  ItensCompra,
  ItensCompraMap,
  ListaCompraProps,
} from "interfaces/compraInterfaces";
import LocalSeeIcon from "@mui/icons-material/LocalSee";

function ListaCompra({ onOpen }: ListaCompraProps) {
  /* FRONTEND */

  // estado dos dados dos itens de compra
  const [itensCompra, setItensCompra] = useState<ItensCompra>({
    listItemCompra: [],
  });

  // estado da seleção dos itens de compra
  const [checked, setChecked] = useState([0]);

  const handleItemToggle = (id: number) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // condição do dispositivo para definir as fontes do tema principal
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // estado de seleção da itensCompra de lista de compra
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleSelectedDate = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  // caso tiver lista de compra, mostre sua respectiva itensCompra
  const compraDate = selectedDate
    ? `LISTA DE COMPRA`
    : "Data da lista não selecionada.";

  /* BACKEND */

  // carregando os itens de compra
  const fetchItemCompra = async () => {
    try {
      const dateServer = selectedDate
        ? selectedDate.format("DD/MM/YY")
        : dayjs().format("DD/MM/YY");
      const response = await fetch(
        COMPRA_ROUTES.ITEMCOMPRA(`?date=${dateServer}`),
        {
          method: `GET`,
          headers: new Headers({
            "bypass-tunnel-reminder": "69420",
            "ngrok-skip-browser-warning": "69420",
          }),
        }
      );
      const res_json = await response.json();
      setItensCompra(res_json);
    } catch (err) {
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  // prompt de carregar os dados inicialmente e intervalo de 5 segundos
  useEffect(() => {
    fetchItemCompra();
    const interval = setInterval(() => {
      fetchItemCompra();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [selectedDate]);

  // função de estruturar os dados em um conjunto set
  const organizeRetrievedData = () => {
    const map: ItensCompraMap = {};
    itensCompra.listItemCompra?.forEach((item: ItemCompra) => {
      const fornecedorSection = `- ${item.fornNome} -`;
      const foodSection = item.secaoNome;
      const workSector = `${item.setorNome} (Responsável: ${item.responsavelNome})`;
      if (!map[fornecedorSection]) map[fornecedorSection] = {};
      if (!map[fornecedorSection][foodSection])
        map[fornecedorSection][foodSection] = {};
      if (!map[fornecedorSection][foodSection][workSector])
        map[fornecedorSection][foodSection][workSector] = [];
      map[fornecedorSection][foodSection][workSector].push(item);
    });
    return map;
  };

  // função de chamada set para organização dos dados carregados
  const dataMap = organizeRetrievedData();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "85vh" }}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* box títListo da lista */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isMobile ? <h2>{compraDate}</h2> : <h1>{compraDate}</h1>}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl>
                <DatePicker
                  label="Selecione a itensCompra da lista"
                  value={selectedDate}
                  onChange={(newDate) => {
                    handleSelectedDate(newDate);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                    },
                  }}
                  format="DD/MM/YYYY"
                  closeOnSelect
                />
              </FormControl>
            </LocalizationProvider>
          </Box>
          <br />
          {/* box conteúdo da lista */}
          <Box>
            {itensCompra.listItemCompra?.length === 0 ? (
              <Box sx={{ alignItems: "center", justifyItems: "center" }}>
                <h4>Na data selecionada não tem lista de compra. ;&#41;</h4>
              </Box>
            ) : (
              Object.keys(dataMap).map((fornecedorSection) => (
                <Box key={fornecedorSection}>
                  <Divider sx={{ marginY: "2rem" }} />
                  <h3>
                    {!fornecedorSection
                      ? fornecedorSection.toUpperCase()
                      : "Fornecedor não especificado"}
                  </h3>
                  {Object.keys(dataMap[fornecedorSection]).map(
                    (foodSection) => (
                      <Box key={foodSection}>
                        <h4>{foodSection.toUpperCase()}</h4>
                        {Object.keys(
                          dataMap[fornecedorSection][foodSection]
                        ).map((workSector) => (
                          <Box key={workSector}>
                            <Typography component="span" variant="body2">
                              {workSector}
                            </Typography>
                            <List>
                              {dataMap[fornecedorSection][foodSection][
                                workSector
                              ].map((item) => (
                                <>
                                  <ListItem
                                    key={item.itemId}
                                    sx={{
                                      marginTop: 0.1,
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "flex-start",
                                      alignItems: "left",
                                    }}
                                  >
                                    <ListItemButton
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100vw",
                                      }}
                                      onClick={() =>
                                        handleItemToggle(item.itemId)
                                      }
                                    >
                                      <Checkbox
                                        checked={checked.includes(item.itemId)}
                                        color="secondary"
                                      />
                                      <Box>
                                        <Typography
                                          component="span"
                                          sx={{ fontWeight: "bold" }}
                                          color={
                                            checked.includes(item.prodId)
                                              ? "gray"
                                              : "black"
                                          }
                                        >
                                          • {item.itemQntCompra}
                                          {item.unidadeAbv} {item.prodNome}
                                          {item.marcaNome
                                            ? ` (${item.marcaNome})`
                                            : " "}
                                        </Typography>
                                        <br />
                                        <Typography
                                          component="span"
                                          variant="caption"
                                          sx={{ fontWeight: "normal" }}
                                          color={
                                            checked.includes(item.prodId)
                                              ? "gray"
                                              : "black"
                                          }
                                        >
                                          [ Resta Apróx.: {item.itemQntRestante}
                                          {item.unidadeAbv}
                                          {item.itemVencimento
                                            ? ` ; Vencimento: 
                                                                                                                                    ${new Date(
                                                                                                                                      item.itemVencimento
                                                                                                                                    ).toLocaleDateString(
                                                                                                                                      "pt-BR"
                                                                                                                                    )} `
                                            : "; Sem Vencimento"}
                                          ]
                                        </Typography>
                                      </Box>
                                    </ListItemButton>
                                  </ListItem>
                                </>
                              ))}
                            </List>
                          </Box>
                        ))}
                      </Box>
                    )
                  )}
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <LocalSeeIcon
          onClick={onOpen}
          color="secondary"
          sx={{
            width: "100px",
            fontSize: "7rem",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 999,
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
}

export default ListaCompra;
