'use client'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type BannerDoc = {
  _id: string
  image: string
  alt: string
}
export default function Hero() {
  const [banners, setBanners] = useState<BannerDoc[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/banners', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to load banners')
        const data: BannerDoc[] = await res.json()
        setBanners(data)
      } catch {
        // noop: leave skeleton if fails
      }
    })()
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
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.image}
            alt={banner.alt}
            className='w-full h-full object-cover'
          />
        </div>
      ))}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 hover:bg-card shadow-lg'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 hover:bg-card shadow-lg'
      >
        <ChevronRight className='h-6 w-6' />
      </button>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-primary/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
