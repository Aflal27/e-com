'use client'
import React, { useEffect, useState } from 'react'
import { fetchProducts, Product } from '../utils/mockApi'
import ProductCard from './ProductCard'
export default function BestSelling() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])
  return (
    <section className='container mx-auto px-4 py-12'>
      <h2 className='text-3xl font-bold mb-8'>Best Selling Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
