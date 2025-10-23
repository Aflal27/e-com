export interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  category: string
}
export interface Banner {
  id: number
  image: string
  alt: string
}
export interface Category {
  id: number
  name: string
  icon: string
}
export const mockBanners: Banner[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    alt: 'Sale Banner 1',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200',
    alt: 'Sale Banner 2',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200',
    alt: 'Sale Banner 3',
  },
]
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 1979.0,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.5,
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 1999.0,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    rating: 4.8,
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 1349.0,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    rating: 4.3,
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Running Shoes',
    price: 1289.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.7,
    category: 'Fashion',
  },
  {
    id: 5,
    name: 'Coffee Maker',
    price: 1299.0,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    rating: 4.6,
    category: 'Home',
  },
  {
    id: 6,
    name: 'Sunglasses',
    price: 1499.0,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    rating: 4.4,
    category: 'Fashion',
  },
]
export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    icon: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200',
  },
  {
    id: 2,
    name: 'Fashion',
    icon: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200',
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200',
  },
  {
    id: 4,
    name: 'Sports',
    icon: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200',
  },
  {
    id: 5,
    name: 'Books',
    icon: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200',
  },
  {
    id: 6,
    name: 'Toys',
    icon: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200',
  },
]
export const fetchBanners = async (): Promise<Banner[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBanners), 500)
  })
}
export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500)
  })
}
export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 500)
  })
}
