"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import ProductCard from "@/components/product-card"
import Pagination from "@/components/pagination"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export default function CollectionClient({ category, searchParams, products, meta, page }) {
  const [availabilityOpen, setAvailabilityOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const availabilityRef = useRef(null)
  const priceRef = useRef(null)
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (availabilityRef.current && !availabilityRef.current.contains(event.target)) {
        setAvailabilityOpen(false)
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setPriceOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const createFilterUrl = (newFilters) => {
    const params = new URLSearchParams()
    Object.entries({ ...searchParams, ...newFilters }).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value)
      }
    })
    const queryString = params.toString()
    return `/collection/${category}${queryString ? `?${queryString}` : ""}`
  }

  // Get current filter values
  const currentAvailability = searchParams.availability || "all"
  const currentSort = searchParams.sort || "featured"
  
  // Helper for generating class names based on active state
  const getFilterClass = (isActive) => {
    return `block text-sm p-2 ${
      isActive ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
    }`
  }

  return (
    <>
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium">Filter:</span>

          {/* Availability Filter */}
          <div ref={availabilityRef}>
            <Collapsible open={availabilityOpen} onOpenChange={setAvailabilityOpen}>
              <CollapsibleTrigger className={`flex items-center gap-1 text-sm border-b ${currentAvailability !== "all" ? "border-black font-medium" : "hover:border-gray-400"}`}>
                {currentAvailability === "all" ? "Availability" : 
                 currentAvailability === "in-stock" ? "In Stock" : "Out of Stock"}
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="absolute bg-white border shadow-lg mt-1 p-2 z-10 min-w-[120px]">
                <div className="space-y-2">
                  <Link
                    href={createFilterUrl({ availability: undefined })}
                    className={getFilterClass(currentAvailability === "all")}
                    onClick={() => setAvailabilityOpen(false)}
                  >
                    All
                  </Link>
                  <Link
                    href={createFilterUrl({ availability: "in-stock" })}
                    className={getFilterClass(currentAvailability === "in-stock")}
                    onClick={() => setAvailabilityOpen(false)}
                  >
                    In stock
                  </Link>
                  <Link
                    href={createFilterUrl({ availability: "out-of-stock" })}
                    className={getFilterClass(currentAvailability === "out-of-stock")}
                    onClick={() => setAvailabilityOpen(false)}
                  >
                    Out of stock
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Price Filter */}
          <div ref={priceRef}>
            <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
              <CollapsibleTrigger className={`flex items-center gap-1 text-sm border-b ${
                currentSort === "price-asc" || currentSort === "price-desc" ? "border-black font-medium" : "hover:border-gray-400"
              }`}>
                {currentSort === "price-asc" ? "Price: Low to High" : 
                 currentSort === "price-desc" ? "Price: High to Low" : "Price"}
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="absolute bg-white border shadow-lg mt-1 p-2 z-10 min-w-[140px]">
                <div className="space-y-2">
                  <Link
                    href={createFilterUrl({ sort: "price-asc" })}
                    className={getFilterClass(currentSort === "price-asc")}
                    onClick={() => setPriceOpen(false)}
                  >
                    Low to High
                  </Link>
                  <Link
                    href={createFilterUrl({ sort: "price-desc" })}
                    className={getFilterClass(currentSort === "price-desc")}
                    onClick={() => setPriceOpen(false)}
                  >
                    High to Low
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">Sort by:</span>
          <Select
            value={currentSort}
            onValueChange={(value) => {
              window.location.href = createFilterUrl({ sort: value })
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="name-asc">A to Z</SelectItem>
              <SelectItem value="name-desc">Z to A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">{meta.pagination.total} products</span>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={meta.pagination.pageCount}
            basePath={`/collection/${category}`}
            searchParams={searchParams}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your criteria.</p>
        </div>
      )}
    </>
  )
}