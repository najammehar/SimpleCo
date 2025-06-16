import CollectionClient from "./collection-client"
import { getProducts } from "@/services/productServices"



export default async function CollectionPage({ params, searchParams }) {
  // Await the searchParams in Next.js 15+
  const resolvedSearchParams = await searchParams
  const { category } = await params

  const page = Number.parseInt(resolvedSearchParams?.page) || 1
  const filters = {
    availability: resolvedSearchParams?.availability,
    sortBy: resolvedSearchParams?.sort || "featured",
  }

  const products = await getProducts(category, page, filters)
  const { data, meta } = products

  const getCategoryTitle = (cat) => {
    switch(cat) {
      case "all": return "All";
      case "male": return "Men's Watches";
      case "female": return "Women's Watches";
      default: return "All";
    }
  }
  
  const categoryTitle = getCategoryTitle(category);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8">{categoryTitle}</h1>

      <CollectionClient
        category={category}
        searchParams={resolvedSearchParams}
        products={data}
        meta={meta}
        page={page}
        filters={filters}
      />
    </div>
  )
}
