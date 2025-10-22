'use client'
import React, { useState, createContext, useContext } from 'react'
interface CartContextType {
  cartCount: number
  addToCart: () => void
}
const CartContext = createContext<CartContextType | undefined>(undefined)
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const addToCart = () => {
    setCartCount((prev) => prev + 1)
  }
  return (
    <CartContext.Provider
      value={{
        cartCount,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
