import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ currentPage, totalPages, basePath, searchParams = {} }) {
  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set("page", page.toString())
    } else {
      params.delete("page")
    }
    const queryString = params.toString()
    return `${basePath}${queryString ? `?${queryString}` : ""}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Button asChild variant="outline" size="sm">
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Link>
        </Button>
      )}

      {/* Page Numbers */}
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          // Show first page, last page, current page, and pages around current
          const showPage =
            pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

          if (!showPage) {
            // Show ellipsis
            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return (
                <span key={pageNum} className="px-2 py-1 text-gray-500">
                  ...
                </span>
              )
            }
            return null
          }

          return (
            <Button
              key={pageNum}
              asChild
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
              className="w-10"
            >
              <Link href={createPageUrl(pageNum)}>{pageNum}</Link>
            </Button>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Button asChild variant="outline" size="sm">
          <Link href={createPageUrl(currentPage + 1)}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      )}
    </div>
  )
}
