const BASE_URL = 'https://3374ebe20416.ngrok.app';

export const COMPRA_ROUTES = {
    SETOR: () => `${BASE_URL}/setor`,
    SECAO: () => `${BASE_URL}/secao`,
    CATEGORIA: () => `${BASE_URL}/categoria`,
    PRODUTO: (sublink: string) => `${BASE_URL}/produto${sublink}`,
    ITEMPRODUTO: (sublink: string) => `${BASE_URL}/item-produto${sublink}`, 
    ITEMCOMPRA: (sublink: string) => `${BASE_URL}/item-compra${sublink}`,
    SCANCOMPRA: () => `${BASE_URL}/scan-ocr`,
    MARCA: () => `${BASE_URL}/marca`,
    UNIDADE: () => `${BASE_URL}/unidade`,
    FORNECEDOR: () => `${BASE_URL}/fornecedor`,
} 