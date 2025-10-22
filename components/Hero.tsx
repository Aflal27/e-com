'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchBanners, Banner } from '../utils/mockApi'
export default function Hero() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    fetchBanners().then(setBanners)
  }, [])
  useEffect(() => {
    if (banners.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length)
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  if (banners.length === 0) {
    return <div className='w-full h-96 bg-muted animate-pulse' />
  }
  return (
    <section className='relative w-full h-96 md:h-[500px] overflow-hidden'>
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.alt}
            className='w-full h-full object-cover'
          />
        </div>
      ))}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg'
      >
        <ChevronRight className='h-6 w-6' />
      </button>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
