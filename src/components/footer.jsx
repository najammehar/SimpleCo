import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Heart } from "lucide-react"

export default function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-xl mb-6">Subscribe to our emails</h2>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input type="email" placeholder="Email" className="pr-10 border-gray-300" />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:ml-auto">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2">
                <Heart className="w-4 h-4 fill-current" />
                Follow on Shop
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-8">
            {/* Country/Region Selector */}
            <div>
              <h3 className="text-sm text-gray-600 mb-4">Country/region</h3>
              <div className="relative">
                <select className="appearance-none border border-gray-300 px-4 py-2 pr-10 bg-white text-sm min-w-[180px]">
                  <option>Australia | AUD $</option>
                  <option>United States | USD $</option>
                  <option>United Kingdom | GBP £</option>
                  <option>Canada | CAD $</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="lg:ml-auto">
              <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                {/* American Express */}
                <div className="w-12 h-8 bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AE</span>
                </div>

                {/* Apple Pay */}
                <div className="w-12 h-8 bg-black flex items-center justify-center">
                  <span className="text-white text-xs font-medium">🍎</span>
                </div>

                {/* Google Pay */}
                <div className="w-12 h-8 bg-white border border-gray-300 flex items-center justify-center">
                  <span className="text-gray-700 text-xs font-medium">G</span>
                </div>

                {/* Mastercard */}
                <div className="w-12 h-8 bg-red-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>

                {/* PayPal */}
                <div className="w-12 h-8 bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PP</span>
                </div>

                {/* Shop Pay */}
                <div className="w-12 h-8 bg-purple-600 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">S</span>
                </div>

                {/* Union Pay */}
                <div className="w-12 h-8 bg-blue-400 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">UP</span>
                </div>

                {/* Visa */}
                <div className="w-12 h-8 bg-blue-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">© 2025, Simple Watch Co.</div>
        </div>
      </footer>
    </>
  )
}
