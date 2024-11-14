export interface Setor {
    id: number,
    nome: string,
}

export interface Setores {
    listSetor: Setor[]
}

export interface Responsavel {
    id: number,
    nome: string
}

export interface Responsaveis {
    listResponsavel: Responsavel[]
}

export interface Secao {
    id: number,
    nome: string,
    setorId: number
}

export interface Secoes {
    listSecao: Secao[]
}

export interface Categoria {
    id: number,
    nome: string,
    secaoId: number
}

export interface Categorias {
    listCategoria: Categoria[]
}

export interface Produto {
    id: number,
    nome: string,
    catId: number,
    catNome: string,
    marcaId: number,
    marcaNome: string,
    unidadeId: number,
    unidadeNome: string,
    unidadeAbv: string,
    fornId: number,
    fornNome: string
}

export interface Produtos {
    listProduto: Produto[]
}

export interface ProdutoDialogProps {
    id: number,
    onCleanTextField: () => void
}

export interface ItemProduto {
        itemId: number,
        prodId: number,
        catId: number,
        secaoId: number,
        setorId: number,
        responsavelId: number | null,
        prodNome: string,
        prodMarca: string,
        prodUnidade: string,
        qntCompra: number,
        qntRestante: number,
        vencimento: Date | null,
}
 
export interface ItensProduto {
    listItemProduto: ItemProduto[]
}

export interface ItensProdutoMap {
    [setorNome: string]: {
        [secaoNome: string]: {
            [catNome: string]: ItemProduto[]
        }
    }
}

export interface ItemCompra {
    responsavelNome: string, 
    setorNome: string,
    secaoNome: string,
    catNome: string,
    prodId: number,
    prodNome: string,
    marcaNome: string, 
    unidadeAbv: string, 
    fornNome: string, 
    itemId: number,
    itemQntCompra: number,
    itemQntRestante: number, 
    itemVencimento: Date, 
}

export interface ItensCompra {
    listItemCompra: ItemCompra[]
}

export interface ItensCompraMap {
    [fornNome: string]: {
        [secaoNome: string]: {
            [setorNome: string]: ItemCompra[]
        }
    }
}

export interface Marca {
    id: number,
    nome: string
}

export interface Marcas {
    listMarca: Marca[]
}

export interface Unidade {
    id: number,
    nome: string,
    abv: string
}

export interface Unidades {
    listUnidade: Unidade[]
}

export interface Fornecedor {
    id: number,
    nome: string,
    whatsapp: number
}

export interface Fornecedores {
    listFornecedor: Fornecedor[]
}