import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import {
  Categoria,
  Categorias,
  Fornecedores,
  Marcas,
  Produto,
  Produtos,
  Unidade,
  Unidades,
} from "interfaces/compraInterfaces";
import { COMPRA_ROUTES } from "../../../../../config/apiRoutes";

import ProdutoBibDelete from "./ProdutoBibDelete";
import ProdutoBibEdit from "./ProdutoBibEdit";

function ProdutoBib() {
  /* FRONTEND */

  // produtoDisplayJson state
  const [produtoDisplayJson, setProdutoDisplayJson] = useState<Produtos>({
    listProduto: [],
  });

  // produtoDisplayButton state
  const [produtoDisplayTextField, setProdutoDisplayTextField] = useState("");
  const handleProdutoDisplayTextField = (event: any) => {
    setProdutoDisplayTextField(event.target.value);
  };

  // produto state
  const [produtoNome, setProdutoNome] = useState("");
  const handleDigitProdutoNome = (event: any) => {
    setProdutoNome(event.target.value);
  };

  // categoria state
  const [categoria_json, setCategoriaJson] = useState<Categorias>({
    listCategoria: [],
  });

  // categoria select state
  const [selectCategoria, setSelectCategoria] = useState<number | "">("");
  const handleSelectCategoria = (event: any) => {
    setSelectCategoria(event.target.value);
  };

  // marca state
  const [marcaJson, setMarcaJson] = useState<Marcas>({ listMarca: [] });

  // marca select state
  const [selectMarca, setSelectMarca] = useState<number | "">(88);
  const handleSelectMarca = (event: any) => {
    setSelectMarca(event.target.value);
  };

  // unidade state
  const [unidade_json, setUnidadeJson] = useState<Unidades>({
    listUnidade: [],
  });

  // unidade select state
  const [selectUnidade, setSelectUnidade] = useState<number | "">("");
  const handleSelectUnidade = (event: any) => {
    setSelectUnidade(event.target.value);
  };

  // fornecedor state
  const [fornecedorJson, setFornecedorJson] = useState<Fornecedores>({
    listFornecedor: [],
  });

  // fornecedor select state
  const [selectFornecedor, setSelectFornecedor] = useState<number | "">(62);
  const handleSelectFornecedor = (event: any) => {
    setSelectFornecedor(event.target.value);
  };

  const handleProdutoAdd = async () => {
    if (
      !produtoNome ||
      !selectCategoria ||
      !selectMarca ||
      !selectUnidade ||
      !selectFornecedor
    ) {
      alert(
        "Dados incompleto! Por favor informe todos os dados para adicionar o produto."
      );
    } else {
      await fetchProdutoAdd();
    }
  };

  /* BACKEND */

  // produt add fetch
  const fetchProdutoAdd = async () => {
    try {
      const response = await fetch(COMPRA_ROUTES.PRODUTO(""), {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "69420",
          "ngrok-skip-browser-warning": "69420",
        }),
        body: JSON.stringify({
          prodNome: produtoNome,
          catId: selectCategoria,
          marcaId: selectMarca,
          unidadeId: selectUnidade,
          fornId: selectFornecedor,
        }),
      });
      const backendMsg = await response.text();
      if (response.ok) {
        alert("Adição do produto com sucesso!");
        setProdutoNome("");
        setSelectCategoria("");
        setSelectMarca("");
        setSelectUnidade("");
        setSelectFornecedor("");
      } else {
        alert(`Erro do servidor:\n\n${backendMsg}`);
      }
    } catch (err) {
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  // produto display fetch
  const fetchProdutoDisplay = async (prodNome: string) => {
    try {
      const response = await fetch(
        COMPRA_ROUTES.PRODUTO(`/filter?nome=${prodNome}`),
        {
          method: `GET`,
          headers: new Headers({
            "bypass-tunnel-reminder": "69420",
            "ngrok-skip-browser-warning": "69420",
          }),
        }
      );
      if (!response.ok) {
        const message = await response.text();
        console.error(`Erro do servidor:\n\n${message}`);
        return;
      }
      const resultJson = await response.json();
      setProdutoDisplayJson(resultJson);
    } catch (err) {
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  // categoria fetch
  const fetchCategoria = async () => {
    try {
      const response = await fetch(COMPRA_ROUTES.CATEGORIA(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      if (!response.ok) {
        const message = await response.text();
        console.error(`Erro do servidor:\n\n${message}`);
        return;
      }
      const resultJson = await response.json();
      setCategoriaJson(resultJson);
      console.log(resultJson);
    } catch (err) {
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  // marca fetch
  const fetchMarca = async () => {
    try {
      const response = await fetch(COMPRA_ROUTES.MARCA(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      if (!response.ok) {
        const message = await response.text();
        console.error(`Erro do servidor:\n\n${message}`);
        return;
      }
      const marcaJson = await response.json();
      setMarcaJson(marcaJson);
    } catch (err) {
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  // unidade fetch
  const fetchUnidade = async () => {
    try {
      const response = await fetch(COMPRA_ROUTES.UNIDADE(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      if (!response.ok) {
        const message = await response.text();
        console.error(`Erro do servidor:\n\n${message}`);
        return;
      }
      const resultJson = await response.json();
      setUnidadeJson(resultJson);
    } catch (err) {
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  // fornecedor fetch
  const fetchFornecedor = async () => {
    try {
      const response = await fetch(COMPRA_ROUTES.FORNECEDOR(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      if (!response.ok) {
        const message = await response.text();
        console.error(`Erro do servidor:\n\n${message}`);
        return;
      }
      const fornecedorJson = await response.json();
      setFornecedorJson(fornecedorJson);
    } catch (err) {
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  // updates, event changing or time period
  useEffect(() => {
    fetchProdutoDisplay(produtoDisplayTextField);
    fetchCategoria();
    fetchMarca();
    fetchUnidade();
    fetchFornecedor();
    const interval = setInterval(() => {
      fetchProdutoDisplay(produtoDisplayTextField);
      fetchCategoria();
      fetchMarca();
      fetchUnidade();
      fetchFornecedor();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [produtoDisplayTextField]);

  return (
    <Box>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <h1>Biblioteca de Produtos</h1>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            padding: 3,
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Pesquise o nome do produto"
              sx={{ width: "100%" }}
              onChange={handleProdutoDisplayTextField}
              value={produtoDisplayTextField}
            />
          </FormControl>
          <Paper>
            <TableContainer
              sx={{
                height: "50vh",
                border: "1px solid black",
                borderRadius: 2,
                boxShadow: 2,
                overflowY: "auto",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Editar
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Nome
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Categoria
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Marca
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Unidade
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Fornecedor
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Excluir
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtoDisplayJson.listProduto.map((produto: Produto) => (
                    <TableRow
                      key={produto.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {produto.id}
                      </TableCell>
                      <TableCell align="center">
                        <ProdutoBibEdit
                          id={produto.id}
                          onCleanTextField={() =>
                            setProdutoDisplayTextField("")
                          }
                        />
                      </TableCell>
                      <TableCell align="center">{produto.nome}</TableCell>
                      <TableCell align="center">{produto.catNome}</TableCell>
                      <TableCell align="center">{produto.marcaNome}</TableCell>
                      <TableCell align="center">
                        {produto.unidadeNome}
                      </TableCell>
                      <TableCell align="center">{produto.fornNome}</TableCell>
                      <TableCell align="center">
                        <ProdutoBibDelete
                          id={produto.id}
                          onCleanTextField={() =>
                            setProdutoDisplayTextField("")
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
      <Divider sx={{ marginTop: "2rem" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1>Adicionar Produto na Biblioteca</h1>
        </Box>
        <Divider sx={{ marginBottom: "2rem" }} />
        <Box sx={{ padding: 1 }}>
          <FormControl fullWidth sx={{ marginBottom: 1.5 }} required>
            <TextField
              value={produtoNome}
              onChange={handleDigitProdutoNome}
              label="Nome Produto"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={selectCategoria}
              onChange={handleSelectCategoria}
              label="Categoria"
            >
              {categoria_json.listCategoria.map((categoria: Categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel>Unidade Medida</InputLabel>
            <Select
              value={selectUnidade}
              onChange={handleSelectUnidade}
              label="Unidade Medida"
            >
              {unidade_json.listUnidade.map((unidade: Unidade) => (
                <MenuItem value={unidade.id} key={unidade.id}>
                  {unidade.nome} ({unidade.abv})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel>Marca</InputLabel>
            <Select
              value={selectMarca}
              onChange={handleSelectMarca}
              label="Marca"
            >
              {marcaJson.listMarca.map((marca) => (
                <MenuItem key={marca.id} value={marca.id}>
                  {marca.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Fornecedor</InputLabel>
            <Select
              value={selectFornecedor}
              onChange={handleSelectFornecedor}
              label="Fornecedor"
            >
              {fornecedorJson.listFornecedor.map((fornecedor) => (
                <MenuItem key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProdutoAdd}
            >
              Adicionar Produto
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProdutoBib;
