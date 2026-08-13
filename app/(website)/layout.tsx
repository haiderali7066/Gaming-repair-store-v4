import { CartProvider } from "@/context/CartContext"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
export default function WebsiteLayout({ children }: { children: React.ReactNode }) { return <CartProvider><Navbar />{children}<Footer /></CartProvider> }
