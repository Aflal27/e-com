'use client'
import React, { useEffect, useState } from 'react'
import { fetchProducts, Product } from '../utils/mockApi'
import ProductCard from './ProductCard'
export default function FlashSales() {
  const [products, setProducts] = useState<Product[]>([])
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })
  useEffect(() => {
    fetchProducts().then((data) => setProducts(data.slice(0, 4)))
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1,
          }
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          }
        } else if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <section className='container mx-auto px-4 py-12'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-3xl font-bold'>Flash Sale</h2>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>Ends in:</span>
          <div className='flex gap-2'>
            <div className='bg-primary text-primary-foreground px-3 py-2 rounded-lg font-mono font-bold'>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className='text-2xl'>:</span>
            <div className='bg-primary text-primary-foreground px-3 py-2 rounded-lg font-mono font-bold'>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className='text-2xl'>:</span>
            <div className='bg-primary text-primary-foreground px-3 py-2 rounded-lg font-mono font-bold'>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
