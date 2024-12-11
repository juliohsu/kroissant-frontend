import React, { useState, useEffect } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  Categorias,
  Fornecedores,
  Marcas,
  Produto,
  ProdutoDialogProps,
  Produtos,
  Unidades,
} from "interfaces/compraInterfaces";
import { COMPRA_ROUTES } from "../../../../../../../config/apiRoutes";

function ProdutoBibEdit({ id, onCleanTextField }: ProdutoDialogProps) {
  /* FRONTEND */

  const [open, setOpen] = useState(false);
  const [produto, setProduto] = useState<Produtos>({ listProduto: [] });
  const [categoria, setCategoria] = useState<Categorias>({ listCategoria: [] });
  const [marca, setMarca] = useState<Marcas>({ listMarca: [] });
  const [unidade, setUnidade] = useState<Unidades>({ listUnidade: [] });
  const [fornecedor, setFornecedor] = useState<Fornecedores>({
    listFornecedor: [],
  });

  const handleOpen = async () => {
    await fetchProdutoEdit(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const produtoData = produto.listProduto[0];
    await fetchProdutoSubmit(produtoData);
    setOpen(false);
  };

  /* BACKEND */

  const fetchProdutoEdit = async (id: number) => {
    try {
      const produtoServerResult = await fetch(
        COMPRA_ROUTES.PRODUTO(`/filter?id=${id}`),
        {
          method: `GET`,
          headers: new Headers({
            "bypass-tunnel-reminder": "69420",
          }),
        }
      );
      const produtoData = await produtoServerResult.json();

      const categoriaServerResult = await fetch(COMPRA_ROUTES.CATEGORIA(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
        }),
      });
      const marcaServerResult = await fetch(COMPRA_ROUTES.MARCA(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
        }),
      });
      const unidadeServerResult = await fetch(COMPRA_ROUTES.UNIDADE(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
        }),
      });
      const fornecedorServerResult = await fetch(COMPRA_ROUTES.FORNECEDOR(), {
        method: `GET`,
        headers: new Headers({
          "bypass-tunnel-reminder": "69420",
        }),
      });

      if (produtoData && Array.isArray(produtoData.listProduto)) {
        setProduto(produtoData);
      } else {
        console.error("Invalid produto data:", produtoData);
        setProduto({ listProduto: [] }); // Fallback
      }

      setCategoria(await categoriaServerResult.json());
      setMarca(await marcaServerResult.json());
      setUnidade(await unidadeServerResult.json());
      setFornecedor(await fornecedorServerResult.json());
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
      setProduto({ listProduto: [] }); // Fallback
    }
  };

  const fetchProdutoSubmit = async (produtoData: Produto) => {
    try {
      const response = await fetch(COMPRA_ROUTES.PRODUTO("/update"), {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "69420",
        }),
        body: JSON.stringify({
          prodId: produtoData.id,
          prodNome: produtoData.nome,
          catId: produtoData.catId,
          marcaId: produtoData.marcaId,
          unidadeId: produtoData.unidadeId,
          fornId: produtoData.fornId,
        }),
      });

      if (response.ok) {
        alert("Atualização do produto com sucesso!");
        onCleanTextField();
      } else {
        alert("Erro ao atualizar os dados.");
        const message = await response.text();
        console.error(`Erro do servidor:\n\n${message}`);
      }
    } catch (err) {
      alert("Erro de conexão ao servidor.");
      console.error(`Erro de conexão ao servidor:\n\n${err}`);
    }
  };

  return (
    <React.Fragment>
      <IconButton aria-label="Editar" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lembrando que não é permitido alterar produto com mesma descrições
            de outro produto já existente.
          </DialogContentText>
          {produto.listProduto.length > 0 && (
            <>
              <FormControl fullWidth margin="dense">
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="nome"
                  name="nome"
                  label="Nome do Produto"
                  type="text"
                  variant="standard"
                  value={produto.listProduto[0].nome}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      listProduto: [
                        { ...produto.listProduto[0], nome: e.target.value },
                      ],
                    })
                  }
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Categoria do Produto</InputLabel>
                <Select
                  label="Categoria do Produto"
                  value={produto.listProduto[0].catId || ""}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      listProduto: [
                        {
                          ...produto.listProduto[0],
                          catId: Number(e.target.value),
                        },
                      ],
                    })
                  }
                >
                  {categoria.listCategoria.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Unidade do Produto</InputLabel>
                <Select
                  label="Unidade do Produto"
                  value={produto.listProduto[0].unidadeId || ""}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      listProduto: [
                        {
                          ...produto.listProduto[0],
                          unidadeId: Number(e.target.value),
                        },
                      ],
                    })
                  }
                >
                  {unidade.listUnidade.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Marca do Produto</InputLabel>
                <Select
                  label="Marca do Produto"
                  value={produto.listProduto[0].marcaId || ""}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      listProduto: [
                        {
                          ...produto.listProduto[0],
                          marcaId: Number(e.target.value),
                        },
                      ],
                    })
                  }
                >
                  {marca.listMarca.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Fornecedor do Produto</InputLabel>
                <Select
                  label="Fornecedor do Produto"
                  value={produto.listProduto[0].fornId || ""}
                  onChange={(e) =>
                    setProduto({
                      ...produto,
                      listProduto: [
                        {
                          ...produto.listProduto[0],
                          fornId: Number(e.target.value),
                        },
                      ],
                    })
                  }
                >
                  {fornecedor.listFornecedor.map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ProdutoBibEdit;
