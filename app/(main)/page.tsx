import BestSelling from '@/components/BestSelling'
import Categories from '@/components/Categories'
import FlashSales from '@/components/FlashSales'
import Hero from '@/components/Hero'
import Image from 'next/image'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
    </div>
  )
}
