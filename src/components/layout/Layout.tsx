import { Outlet } from 'react-router-dom'

import BotonWhatsapp from '../ui/BotonWhatsapp'
import CartDrawer from './CartDrawer'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <BotonWhatsapp />
    </div>
  )
}