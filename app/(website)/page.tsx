import { HomeHero } from "@/components/home/HomeHero"
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection"
import { HomeSecondarySections } from "@/components/home/HomeSecondarySections"

// This page is a Server Component so FeaturedProductsSection can query
// MongoDB directly for products marked "featured" in the admin panel. The
// animated hero/services and everything after products are client
// components split out into HomeHero and HomeSecondarySections.
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HomeHero />
      <FeaturedProductsSection />
      <HomeSecondarySections />
    </main>
  )
}
