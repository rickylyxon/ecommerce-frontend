// pages/Cart.tsx
import React from 'react';
import { ShoppingBag, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { CartItemCard } from '../components/cart/CartItemCard';
import { CartSummary } from '../components/cart/CartSummary.tsx';
import { EmptyCart } from '../components/cart/EmptyCart';
import { CartSkeleton } from '../components/cart/CartSkeleton';

const CartPage: React.FC = () => {
  const { cart, loading, clearCart, actionLoading } = useCartContext();

  if (loading) {
    return <CartSkeleton />;
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            Shopping Cart
            <span className="text-lg font-normal text-gray-500">
              ({cart.summary.totalItems} items)
            </span>
          </h1>
          
          <div className="mt-4 flex items-center justify-between">
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              ← Continue Shopping
            </Link>
            
            <button
              onClick={clearCart}
              disabled={actionLoading === 'clear'}
              className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}

            {/* Shipping Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-center gap-2 text-blue-800">
                <Package className="w-5 h-5" />
                <p className="text-sm font-medium">
                  Free shipping on orders over $50!
                </p>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary summary={cart.summary} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage