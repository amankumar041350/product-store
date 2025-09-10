"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then(setCart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (id) => {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId: id }),
    });
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-6">
      <h1 className="text-4xl font-extrabold text-yellow-700 mb-8">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
          <p className="text-lg font-medium text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{item.productId?.name}</h2>
                  <p className="text-gray-600">{item.productId?.description}</p>
                  <p className="text-blue-600 font-semibold mt-1">₹{item.productId?.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="text-lg font-semibold text-green-600">
                  ₹{(item.productId?.price || 0) * item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-10 bg-white p-6 rounded-xl shadow-lg text-right">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-yellow-700">₹{total}</span>
            </h3>
            <button onClick={() => { alert('development Under Progress. please wait for checkout'); }}
             className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
