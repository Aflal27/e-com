import React, { useState } from 'react';
import { Search, ShoppingCart, User, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
export default function Header() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    cartCount
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold">
              ShopHub
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="search" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 hover:bg-accent rounded-lg">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <Link to="/cart" className="relative p-2 hover:bg-accent rounded-lg">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>}
            </Link>
            <Link to="/profile" className="p-2 hover:bg-accent rounded-lg hidden md:block">
              <User className="h-5 w-5" />
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-accent rounded-lg">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="search" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
              </div>
            </nav>
          </div>}
      </div>
    </header>;
}