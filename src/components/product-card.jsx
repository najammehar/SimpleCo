import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function ProductCard({ product }) {
  // Get the image URL from Strapi
  const getImageUrl = (image) => {
    if (!image) return "/placeholder.svg?height=300&width=300"

    // Use small format if available, otherwise use the original
    const imageUrl = image.formats?.small?.url || image.url
    return `${process.env.NEXT_SITE_URL}${imageUrl}`
  }

  return (
    <div className="group">
      <Link href={`/product/${product.documentId}`}>
        <div className="relative aspect-square mb-4 overflow-hidden ">
          <Image
            src={getImageUrl(product.image) || "/placeholder.svg"}
            alt={product.Name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.quantity === 0 && <Badge className="absolute top-2 right-2 bg-gray-800 text-white">Sold out</Badge>}
          {product.isFeatured && <Badge className="absolute top-2 left-2 bg-blue-600 text-white">Featured</Badge>}
        </div>
        <h3 className="font-medium mb-2 text-sm line-clamp-2">{product.Name}</h3>
        <p className="text-gray-600">${product.price}.00</p>
      </Link>
    </div>
  )
}
