"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty. <Link href="/products" className="text-blue-600">Shop now</Link>.
        </p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white p-4 shadow rounded-xl justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h2>
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded-xl text-right">
            <h2 className="text-xl font-bold text-gray-800">
              Total: ₹{total}
            </h2>
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={clearCart}
                className="bg-gray-600 text-white px-6 py-2 rounded-xl"
              >
                Clear Cart
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-xl">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
