import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Preloader from './components/ui/Preloader'

const Admin = lazy(() => import('./pages/Admin'))
const Carrito = lazy(() => import('./pages/Carrito'))
const Catalogo = lazy(() => import('./pages/Catalogo'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const MisPedidos = lazy(() => import('./pages/MisPedidos'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'))
const Registro = lazy(() => import('./pages/Registro'))

function App() {
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <BrowserRouter>
      {cargando && <Preloader />}
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-cream">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-wood-100 border-t-wood-600" />
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/mis-pedidos" element={<MisPedidos />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App