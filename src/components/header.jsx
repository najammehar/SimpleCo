"use client"

import Link from "next/link"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      setMenuVisible(false)
      setTimeout(() => {
        setMobileMenuOpen(false)
      }, 300) // Match this timeout with the transition duration
    } else {
      setMobileMenuOpen(true)
      setTimeout(() => {
        setMenuVisible(true)
      }, 10) // Small delay to ensure the DOM is updated
    }
  }

  const closeMenu = () => {
    setMenuVisible(false)
    setTimeout(() => {
      setMobileMenuOpen(false)
    }, 300)
  }

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
        setMenuVisible(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileMenuOpen])

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="text-center py-2 border-b text-xs">Welcome to our store</div>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl ">
            Simple Watch Co.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/collection/female" className="hover:underline">
              Women's Watches
            </Link>
            <Link href="/collection/male" className="hover:underline">
              Men's Watches
            </Link>
            <Link href="/journal" className="hover:underline">
              Journal
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/gift-cards" className="hover:underline">
              Gift Cards
            </Link>
            <Link href="/collection/all" className="hover:underline">
              All Watches
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-xs">Australia | AUD $</span>
            <button type="button" name="search" className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button type="button" name="account" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5" />
            </button>
            <button type="button" name="cart" className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button 
              name="mobile-menu"
              type="button"
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu with transitions */}
      {mobileMenuOpen && (
        <div 
          className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out ${
            menuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
          style={{ top: '101px' }} // Adjust this value based on your header height
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <Link 
              href="/collection/female" 
              className="py-3 px-4 hover:bg-gray-100 rounded text-lg"
              onClick={closeMenu}
            >
              Women's Watches
            </Link>
            <Link 
              href="/collection/male" 
              className="py-3 px-4 hover:bg-gray-100 rounded text-lg"
              onClick={closeMenu}
            >
              Men's Watches
            </Link>
            <Link 
              href="/journal" 
              className="py-3 px-4 hover:bg-gray-100 rounded text-lg"
              onClick={closeMenu}
            >
              Journal
            </Link>
            <Link 
              href="/about" 
              className="py-3 px-4 hover:bg-gray-100 rounded text-lg"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="/gift-cards" 
              className="py-3 px-4 hover:bg-gray-100 rounded text-lg"
              onClick={closeMenu}
            >
              Gift Cards
            </Link>
            <Link 
              href="/collection/all" 
              className="py-3 px-4 hover:bg-gray-100 rounded text-lg"
              onClick={closeMenu}
            >
              All Watches
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}