const BASE_URL = 'https://3e6c835111fd.ngrok.app';

export const COMPRA_ROUTES = {
    SETOR: () => `${BASE_URL}/setor`,
    SECAO: () => `${BASE_URL}/secao`,
    CATEGORIA: () => `${BASE_URL}/categoria`,
    PRODUTO: (sublink: string) => `${BASE_URL}/produto${sublink}`,
    ITEMPRODUTO: (sublink: string) => `${BASE_URL}/item-produto${sublink}`, 
    ITEMCOMPRA: (sublink: string) => `${BASE_URL}/item-compra${sublink}`,
    ITENSCOMPRA: () => `${BASE_URL}/itens-compra`,
    MARCA: () => `${BASE_URL}/marca`,
    UNIDADE: () => `${BASE_URL}/unidade`,
    FORNECEDOR: () => `${BASE_URL}/fornecedor`,
} 