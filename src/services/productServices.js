export async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_SITE_URL}/api/products?filters[isFeatured][$eq]=true&pagination[limit]=8&populate=image`)
    if (!res.ok) throw new Error("Failed to fetch")
    return await res.json()
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return { data: [] }
  }
}

export async function getProducts(category, page = 1, filters = {}) {
  try {
    let url = `${process.env.NEXT_SITE_URL}/api/products?pagination[page]=${page}&pagination[pageSize]=6&populate=image`

    if (category !== "all") {
      url += `&filters[category][$eq]=${category}`
    }

    if (filters.availability === "in-stock") {
      url += `&filters[quantity][$gt]=0`
    } else if (filters.availability === "out-of-stock") {
      url += `&filters[quantity][$eq]=0`
    }

    if (filters.sortBy === "featured") {
      url += `&sort=isFeatured:desc,createdAt:desc`
    } else if (filters.sortBy === "name-asc") {
      url += `&sort=Name:asc`
    } else if (filters.sortBy === "name-desc") {
      url += `&sort=Name:desc`
    } else if (filters.sortBy === "price-asc") {
      url += `&sort=price:asc`
    } else if (filters.sortBy === "price-desc") {
      url += `&sort=price:desc`
    }

    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch")
    return await res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return { data: [], meta: { pagination: { total: 0, pageCount: 1 } } }
  }
}


export async function getProduct(id) {
  try {
    const res = await fetch(`${process.env.NEXT_SITE_URL}/api/products/${id}?populate=image`, {
      cache: "force-cache",
      next: { revalidate: 36000 }, // Revalidate every 10 hours
    })
    if (!res.ok) throw new Error("Failed to fetch")
    return await res.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function getRelatedProducts(category, currentProductId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_SITE_URL}/api/products?filters[category][$eq]=${category}&filters[documentId][$ne]=${currentProductId}&pagination[limit]=4&populate=image`)
    if (!res.ok) throw new Error("Failed to fetch")
    return await res.json()
  } catch (error) {
    console.error("Error fetching related products:", error)
    return { data: [] }
  }
}