import { useEffect, useState } from "react";

import { Box, Button, Checkbox, Divider, FormControl, List, ListItem, ListItemButton, ListItemText, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { ExpandMore, ExpandLess } from '@mui/icons-material';

import { COMPRA_ROUTES } from "../../../../config/apiRoutes";
import { Categoria, Categorias, ItemProduto, ItensProduto, ItensProdutoMap, Secao, Secoes, Setor, Setores } from "../../../../interfaces/compraInterfaces";

function PedidoCompra() {
    
    /* FRONTEND */

    // setor
    const [setores, setSetores] = useState<Setores>({ listSetor: [] });

    // seção
    const [secoes, setSecoes] = useState<Secoes>({ listSecao: [] });

    // categoria
    const [categorias, setCategorias] = useState<Categorias>({ listCategoria: [] });

    // item produto
    const[itensProduto, setItensProduto] = useState<ItensProduto>({ listItemProduto: [] });

    // checkbox handle criação e deleção dos itens de compra
    const handleCheckBoxClick = (itemProd: ItemProduto) => {
        if (itensProduto.listItemProduto.some(
            item =>
                item.itemId !== 0 &&
                item.itemId === itemProd.itemId &&
                item.setorId === itemProd.setorId
            )
        ) {
            fetchDeleteItemProduto(itemProd);
        } else {
            fetchCreateItemProduto(itemProd);
        }
    };

    // setor box aparência aberto ou não
    const [setorBoxOpen, setSetorBoxOpen] = useState<Record<string, boolean>>({});
    const handleSetorBoxOpen = (setor: string) => {
        setSetorBoxOpen(prevState => ({
            ...prevState,
            [setor]: true
        }))
    };
    const handleSetorBoxClose = (setor: string) => {
        setSetorBoxOpen(prevState => ({
            ...prevState,
            [setor]: false
        }))
    };

    // item checkbox aparência marcado ou não
    const [itemBoxOpen, setItemBoxOpen] = useState<Record<number, boolean>>({});
    const handleItemBoxOpen = (itemProd: ItemProduto) => {
        setItemBoxOpen(prevState => ({
            ...prevState,
            [itemProd.itemId]: true
        }));
    };
    const handleItemBoxClose = (itemProd: ItemProduto) => {
        setItemBoxOpen(prevState => ({
            ...prevState,
            [itemProd.itemId]: false
        }));
    };

    // item box conteúdo em edição sem ser salvo
    const [itensBoxInEdition, setItensBoxInEdition] = useState<ItensProduto>({ listItemProduto: [] });
    const handleCompraChange = (itemId: number, value: number) => {
        const newItensProduto: ItemProduto[] = itensBoxInEdition.listItemProduto.map(item => (
            item.itemId !== itemId ? item
            : {
                ...item,
                qntCompra: value
            }
        ));
        setItensBoxInEdition({  listItemProduto: newItensProduto });
    };
    const handleRestanteChange = (itemId: number, value: number) => {
        const newItensProduto: ItemProduto[] = itensBoxInEdition.listItemProduto.map(item => (
            item.itemId !== itemId ? item
            : {
                ...item,
                qntRestante: value
            }
        ));
        setItensBoxInEdition({ listItemProduto: newItensProduto });
    };
    const handleDateChange = (itemId: number, value: Dayjs | null) => {
        const newItensProduto: ItemProduto[] = itensBoxInEdition.listItemProduto.map(item => (
            item.itemId !== itemId ? item
            : {
                ...item,
                vencimento: new Date(Number(value))
            }
        ));
        setItensBoxInEdition({ listItemProduto: newItensProduto });
    };

    // item box com dados salvo e atualizados
    const handleItemBoxSave = (itemProd: ItemProduto) => {
        if (itemProd.itemId === 0) {
            alert('Por favor marque o produto para incluir dentro da lista de compra.');
        } else {
            let newItemProd: ItemProduto = {
                itemId: 0,
                prodId: 0,
                catId: 0,
                setorId: 0,
                secaoId: 0,
                responsavelId: null,
                qntCompra: 0,
                qntRestante: 0,
                vencimento: null,
                prodNome: "",
                prodMarca: "",
                prodUnidade: "",
            };
            itensBoxInEdition.listItemProduto.forEach(item => {
                if (item.itemId === itemProd.itemId) {
                    newItemProd = item;
                }
            });
            if (newItemProd.itemId !== 0) {
                fetchEditItemProduto(newItemProd);
            } else {
                fetchEditItemProduto(itemProd);
            }
        }
    };

    // data atual
    const dataAtual: string = new Date().toLocaleDateString('pt-BR');

    /* BACKEND */

    const fetchSetores = async () => {
        try {
            const response = await fetch(
                COMPRA_ROUTES.SETOR(), { method: 'GET',
                    headers: new Headers({
                      "ngrok-skip-browser-warning": "69420",
                    })  }
            );
            const responseJson = await response.json();
            setSetores(responseJson);
        } catch (err) {
            console.error(`Erro de conexão ao servidor:\n\n${err}`)
        }
    };
    
    const fetchSecoes = async () => {
        try {
            const response = await fetch(
                COMPRA_ROUTES.SECAO(), { method: 'GET',
                    headers: new Headers({
                      "ngrok-skip-browser-warning": "69420",
                    })  }
            );
            const responseJson = await response.json();
            setSecoes(responseJson);
        } catch (err) {
            console.error(`Erro de conexão ao servidor:\n\n${err}`)
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await fetch(
                COMPRA_ROUTES.CATEGORIA(), { method: 'GET',
                    headers: new Headers({
                      "ngrok-skip-browser-warning": "69420",
                    })  }
            );
            const responseJson = await response.json();
            setCategorias(responseJson);
        } catch (err) {
            console.error(`Erro de conexão ao servidor:\n\n${err}`);
        }
    };

    const fetchItensProduto = async () => {
        try {
    
            // Fetch the data
            const response = await fetch(COMPRA_ROUTES.ITEMPRODUTO(''), { 
                method: 'GET',
                headers: new Headers({
                  "ngrok-skip-browser-warning": "69420",
                }) 
            });
    
            // Log the response headers and status
            const contentType = response.headers.get('Content-Type');
    
            // Check if the response is JSON
            if (contentType && contentType.includes('application/json')) {
                const responseJson = await response.json();
    
                // Process your data
                setItensProduto(responseJson);
    
                const newItensBoxInEdition: ItemProduto[] = itensProduto.listItemProduto.filter(item => 
                    item.itemId !== 0 && !itensBoxInEdition.listItemProduto.some(item2 => item2.itemId === item.itemId)
                );
    
                if (newItensBoxInEdition.length > 0) {
                    setItensBoxInEdition({ listItemProduto: [...itensBoxInEdition.listItemProduto, ...newItensBoxInEdition] });
                }
            } else {
                // If it's not JSON, log the response body as text
                const errorText = await response.text();
                console.error('Server returned non-JSON response:', errorText);
            }
    
        } catch (err) {
            console.error(`Connection error:\n\n${err}`);
        }
    };
    

    const fetchCreateItemProduto = async (itemProd: ItemProduto) => {
        try {
            const response = await fetch(
                COMPRA_ROUTES.ITEMPRODUTO(''),
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                      "ngrok-skip-browser-warning": "69420",
                    }) ,
                    body: JSON.stringify({ responsavelId: 21, setorId: itemProd.setorId, prodId: itemProd.prodId })
                }
            );
            const message = await response.text();
            if (!response.ok) {
                alert(message);
                console.error(`Erro do servidor:\n\n${message}`);
                return;
            }
            fetchItensProduto();
            alert(message);
        } catch (err) {
            console.error(`Erro de conexão ao servidor:\n\n${err}`);
        }
    };
  
    const fetchEditItemProduto = async (itemProd: ItemProduto) => {
        try {
            const response = await fetch(
                COMPRA_ROUTES.ITEMPRODUTO(''),
                {
                    method: 'PATCH',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                      "ngrok-skip-browser-warning": "69420",
                    }) 
                    ,
                    body: JSON.stringify(itemProd)
                }
            );
            const message = await response.text();
            if (!response.ok) {
                console.error(`Erro do servidor:\n\n${message}`);
                return;
            }
            fetchItensProduto();
            alert(message);

        } catch (err) {
            console.error(`Erro de conexão ao servidor:\n\n${err}`);
        }
    };
    
    const fetchDeleteItemProduto = async (itemProd: ItemProduto) => {
        try {
            const response = await fetch(
                COMPRA_ROUTES.ITEMPRODUTO(`/${itemProd.itemId}`),
                { method: 'DELETE',
                    headers: new Headers({
                      "ngrok-skip-browser-warning": "69420",
                    })  }
            );
            const message = await response.text();
            if (!response.ok) {
                console.error(`Erro do servidor:\n\n${message}`); 
                return;
            }
            const newItensBox = itensBoxInEdition.listItemProduto.filter(item => item.itemId !== itemProd.itemId);
            setItensBoxInEdition({ listItemProduto: newItensBox });
            fetchItensProduto();
            alert(message);
        } catch (err) {
            console.error(`Erro de conexão ao servidor:\n\n${err}`);
        }
    };

    useEffect(() => {
        fetchSetores();
        fetchSecoes();
        fetchCategorias();
        fetchItensProduto();
        const interval = setInterval(() => {
            fetchSetores();
            fetchSecoes();
            fetchCategorias();
            fetchItensProduto();
        }, 5000);
        return () => {clearInterval(interval)}
    }, [itensProduto]);

    // lista itens de produto
    const organizeItensProdMap = (): ItensProdutoMap => {
        let map: ItensProdutoMap = {};
        setores.listSetor.map((setor: Setor) => {
            if (!map[setor.nome]) map[setor.nome] = {};
            secoes.listSecao.map((secao: Secao) => {
                if (secao.setorId === setor.id) {
                    if (!map[setor.nome][secao.nome]) map[setor.nome][secao.nome] = {};
                    categorias.listCategoria.map((categoria: Categoria) => {
                        if (categoria.secaoId === secao.id) {
                            if (!map[setor.nome][secao.nome][categoria.nome]) map[setor.nome][secao.nome][categoria.nome] = [];
                            itensProduto.listItemProduto.map((itemProduto: ItemProduto) => {
                                if (itemProduto.catId === categoria.id && itemProduto.secaoId === secao.id && itemProduto.setorId === setor.id) {
                                    map[setor.nome][secao.nome][categoria.nome].push(itemProduto);
                                }
                            });
                        }
                    })
                
                }
            })
        })
        return map;
    };
    const itensProdutoMap: ItensProdutoMap = organizeItensProdMap();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <Typography 
                variant={ isMobile ? 'h3' : 'h2' }
                sx={{ textAlign: 'center', marginY: 2 }}
            >
                Pedido de Compra {dataAtual}
            </Typography>
            <Box>
                {
                    Object.keys(itensProdutoMap).map(setor => (
                        <Box sx={{ marginTop: '3rem' }}>
                            <Typography 
                                variant={ isMobile ? 'h4' : 'h3' }
                                sx={{ textAlign: 'center', marginY: 2 }}
                            >
                                {setor}
                            </Typography>
                            <Box>
                                {
                                    !setorBoxOpen[setor] ?
                                    <Button 
                                        onClick={() => handleSetorBoxOpen(setor)} 
                                        color='secondary' 
                                        sx={{ 
                                            marginY: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyItems: 'space-around',
                                            width: '100%'
                                        }}
                                    >
                                        <Typography>Mostrar mais</Typography>
                                        <ExpandMore />
                                    </Button>
                                    :
                                    <Box sx={{ height: '80vh', overflowY: 'auto' }}>
                                        <Button 
                                            onClick={() => handleSetorBoxClose(setor)}
                                            sx={{ position: 'sticky', zIndex: 1, top: 0, color: 'white', backgroundColor: 'black', width: '100%' }}
                                        >
                                            <Typography>Mostrar menos</Typography>
                                            <ExpandLess />
                                        </Button>
                                        {
                                            Object.keys(itensProdutoMap[setor]).map(secao => (
                                                <Box>
                                                    <Typography 
                                                        variant={ isMobile ? 'h5' : 'h4' }
                                                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginY: '1.5rem' }}
                                                    >
                                                        {secao}
                                                    </Typography>
                                                    <Box sx={{ p: '2rem' }}>
                                                        {
                                                            Object.keys(itensProdutoMap[setor][secao]).map(categoria => (
                                                                <Box>
                                                                    <Typography variant={ isMobile ? 'h6' : 'h4' }>{categoria}</Typography>
                                                                    <List>
                                                                        {
                                                                            itensProdutoMap[setor][secao][categoria].map((itemProd: ItemProduto) => (
                                                                                <ListItem sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2, border: '1px solid black' }}>
                                                                                    <ListItemButton onClick={() => handleCheckBoxClick(itemProd)}>
                                                                                        <Checkbox 
                                                                                            value={itemProd.itemId}
                                                                                            checked={
                                                                                                itensProduto.listItemProduto.some(item =>
                                                                                                    item.itemId === itemProd.itemId
                                                                                                ) && itemProd.itemId !== 0
                                                                                            }
                                                                                            color='secondary'
                                                                                        />
                                                                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                                                            <ListItemText sx={{textAlign: 'center'}}>{itemProd.prodNome} {itemProd.prodMarca}</ListItemText>
                                                                                            <ListItemText sx={{fontSize: '14px'}}>
                                                                                                <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '16px' }, lineHeight: '1.5' }}>
                                                                                                - Quantidade de Compra: {itemProd.qntCompra} {itemProd.prodUnidade}
                                                                                                <br />
                                                                                                - Restante do Item: {itemProd.qntRestante} {itemProd.prodUnidade}
                                                                                                <br />
                                                                                                - Vencimento do Item: {itemProd.vencimento ? new Date(itemProd.vencimento).toLocaleDateString() : 'Não especificado'}
                                                                                                </Typography>
                                                                                            </ListItemText>
                                                                                        </Box>
                                                                                    </ListItemButton>
                                                                                    {
                                                                                        itemProd.itemId === 0 ? 
                                                                                            <></>
                                                                                            :
                                                                                            <Box>
                                                                                                {
                                                                                                    !itemBoxOpen[itemProd.itemId] ?
                                                                                                        <Button onClick={() => handleItemBoxOpen(itemProd)} color='secondary'>
                                                                                                            Mostrar mais
                                                                                                        </Button>
                                                                                                        :
                                                                                                        <Box>
                                                                                                            <FormControl></FormControl>
                                                                                                            <FormControl fullWidth margin='dense'>
                                                                                                                <TextField 
                                                                                                                    variant="outlined"
                                                                                                                    onChange={
                                                                                                                        (e) => handleCompraChange(
                                                                                                                            itemProd.itemId, 
                                                                                                                            Number(e.target.value)
                                                                                                                        )
                                                                                                                    }
                                                                                                                    label='Quantidade Item de Compra'
                                                                                                                />
                                                                                                            </FormControl>
                                                                                                            <FormControl fullWidth margin='dense'>
                                                                                                                <TextField 
                                                                                                                    variant="outlined"
                                                                                                                    onChange={
                                                                                                                        (e) => handleRestanteChange(
                                                                                                                            itemProd.itemId,
                                                                                                                            Number(e.target.value)
                                                                                                                        )
                                                                                                                    }
                                                                                                                    label='Quantidade Item Restante'
                                                                                                                />
                                                                                                            </FormControl>
                                                                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                                                <FormControl fullWidth margin='dense'>
                                                                                                                    <DatePicker  
                                                                                                                        label='Data do Vencimento'
                                                                                                                        format="DD/MM/YYYY"
                                                                                                                        closeOnSelect
                                                                                                                        onChange={
                                                                                                                            (newDate) => handleDateChange(
                                                                                                                                itemProd.itemId,
                                                                                                                                newDate
                                                                                                                            )
                                                                                                                        }
                                                                                                                    />
                                                                                                                </FormControl>
                                                                                                            </LocalizationProvider>
                                                                                                            <Box sx={{ 
                                                                                                                width: '100%', 
                                                                                                                display: 'flex', 
                                                                                                                flexDirection: 'row', 
                                                                                                                alignItems: 'center',
                                                                                                                justifyContent: 'flex-end',
                                                                                                                gap: 1,
                                                                                                                padding: 1
                                                                                                                }}
                                                                                                            >
                                                                                                                <Button onClick={() => handleItemBoxSave(itemProd)} sx={{color: 'white', backgroundColor: 'black'}}>
                                                                                                                    Salvar
                                                                                                                </Button>
                                                                                                                <Button onClick={() => handleItemBoxClose(itemProd)} sx={{color: 'white', backgroundColor: 'black'}}>
                                                                                                                    Cancelar/Ocultar
                                                                                                                </Button>
                                                                                                            </Box>
                                                                                                        </Box>
                                                                                                }
                                                                                            </Box>
                                                                                    }
                                                                                </ListItem>
                                                                            ))
                                                                        }
                                                                    </List>
                                                                </Box>
                                                            ))
                                                        }
                                                    </Box>
                                                </Box>
                                            ))
                                        }
                                        <Button 
                                            onClick={() => handleSetorBoxClose(setor)}
                                            sx={{ color: 'white', backgroundColor: 'black', width: '100%' }}
                                        >
                                            <Typography>Mostrar menos</Typography>
                                            <ExpandLess />
                                        </Button>
                                    </Box>
                                }
                            </Box>
                            <Divider />
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default PedidoCompra;