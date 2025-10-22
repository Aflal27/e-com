'use client'
import React, { useEffect, useState } from 'react'
import { fetchCategories, Category } from '../utils/mockApi'
export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])
  return (
    <section className='container mx-auto px-4 py-12'>
      <h2 className='text-3xl font-bold mb-8'>Categories</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
        {categories.map((category) => (
          <button
            key={category.id}
            className='flex flex-col items-center gap-3 p-4 rounded-lg border hover:border-primary hover:shadow-lg transition-all'
          >
            <div className='w-20 h-20 rounded-full overflow-hidden'>
              <img
                src={category.icon}
                alt={category.name}
                className='w-full h-full object-cover'
              />
            </div>
            <span className='text-sm font-medium text-center'>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
