import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star } from "lucide-react"
import ProductCard from "@/components/product-card"
import { getProduct, getRelatedProducts } from "@/services/productServices"



export default async function ProductPage({ params }) {
  const { id } = params
  const productData = await getProduct(id)

  if (!productData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-light mb-4">Product not found</h1>
        <Button type="button" asChild>
          <Link href="/collection/all">Browse all products</Link>
        </Button>
      </div>
    )
  }

  const product = productData.data
  const relatedProducts = await getRelatedProducts(product.category, product.documentId)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={
                product.image ? `${process.env.NEXT_SITE_URL}${product.image.url}` : "/placeholder.svg?height=600&width=600"
              }
              alt={product.Name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light mb-4">{product.Name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 reviews)</span>
            </div>
            <p className="text-3xl font-light mb-6">${product.price}.00</p>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            {/* Colors */}
            {product.color && product.color.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex gap-2">
                  {product.color.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className="w-8 h-8 border-2 border-gray-300 hover:border-gray-500 transition-colors"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <Select type="select">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="38mm">38mm</SelectItem>
                  <SelectItem value="42mm">42mm</SelectItem>
                  <SelectItem value="45mm">45mm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <Select type="select">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: Math.min(product.quantity, 10) }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-1">
                {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button type="button" className="w-full" size="lg" disabled={product.quantity === 0}>
              {product.quantity === 0 ? "Sold out" : "Add to cart"}
            </Button>
            <Button type="button" variant="outline" className="w-full" size="lg">
              <Heart className="w-4 h-4 mr-2" />
              Add to wishlist
            </Button>
          </div>

          {/* Product Info */}
          <div className="space-y-4 pt-6 border-t">
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <p className="text-gray-600 capitalize">{product.category}</p>
            </div>

            {product.isFeatured && <Badge variant="secondary">Featured Product</Badge>}

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                This sophisticated timepiece combines classic design with modern functionality. Crafted with precision
                and attention to detail, it's perfect for any occasion.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Water resistant</li>
                <li>• Scratch-resistant crystal</li>
                <li>• Precision movement</li>
                <li>• Premium materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.data.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-light mb-8 text-center">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
