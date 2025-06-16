import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { getFeaturedProducts } from "@/services/productServices"



export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <Image
          src="/banner-image.webp"
          alt="Hero watch image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-light mb-8">Sophisticated designs in time</h1>
            <Button
              type="button"
              asChild
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black"
            >
              <Link href="/collection/all">Shop all</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-light mb-12 text-center">Featured products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Button type="button" asChild variant="outline" className="bg-black text-white hover:text-white hover:bg-black/80">
            <Link href="/collection/all">View all</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
