import Compra from "./pages/Compra";
import ProdutoBib from "./pages/Compra/subpages/BibCompra/ProdutoBib/ProdutoBib";
import PedidoCompra from "./pages/Compra/subpages/PedidoCompra/PedidoCompra";
import { Route, Routes } from "react-router-dom";

function CompraDomain() {
  return (
    <Routes>
      <Route path="/" element={<Compra />} />
      <Route path="/pedido" element={<PedidoCompra />} />
      <Route path="/biblioteca" element={<ProdutoBib />} />
    </Routes>
  );
}

export default CompraDomain;
