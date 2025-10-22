import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../utils/mockApi';
import { useCart } from '../context/CartContext';
interface ProductCardProps {
  product: Product;
}
export default function ProductCard({
  product
}: ProductCardProps) {
  const {
    addToCart
  } = useCart();
  return <div className="group rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-all">
      <div className="relative aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({
          length: 5
        }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
          <span className="text-sm text-muted-foreground ml-1">
            ({product.rating})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button onClick={addToCart} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>;
}