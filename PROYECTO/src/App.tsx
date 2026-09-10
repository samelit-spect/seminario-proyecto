import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Carrito from './pages/Carrito'
import Catalogo from './pages/Catalogo'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import ProductoDetalle from './pages/ProductoDetalle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Carrito />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App