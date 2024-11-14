import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { COMPRA_ROUTES } from "../../../../../config/apiRoutes";
import { ProdutoDialogProps } from "interfaces/compraInterfaces";

function ProdutoBibDelete({id, onCleanTextField}: ProdutoDialogProps) {

    /* FRONTEND */

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (id: number) => {
        fetchProdutoDelete(id);
        handleClose();
    }

    /* BACKEND */

    const fetchProdutoDelete = async (prodId: number) => {
        try {

            const response = await fetch(COMPRA_ROUTES.PRODUTO(`/delete?prodId=${prodId}`), { 
                method: 'DELETE',
                headers: new Headers({
                  "ngrok-skip-browser-warning": "69420",
                }) 
             });
            
            if (response.ok) {
                alert('Exclusão do prduto com sucesso!');
                onCleanTextField();
            } else {
                alert('Erro ao excluir o produto.');
                const message = await response.text();
                console.error(`Erro do servidor:\n\n${message}`);
            } 


        } catch (err) {
            alert('Erro de conexão ao servidor.');
            console.error(`Erro de conexão ao servidor:\n\n${err}`);
        }
    };

    return (
        <Box>
            <IconButton onClick={handleOpen} aria-label="Excluir Produto">
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ALERTA!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Excluindo este produto, irá excluir todos os itens de compra relacionados a este produto.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose} color='secondary'>Cancelar</Button>
                        <Button onClick={() => handleDelete(id)} color='secondary'>Excluir</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>   
        </Box>
    )
}

export default ProdutoBibDelete;