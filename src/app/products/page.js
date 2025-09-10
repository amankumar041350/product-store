"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const addToCart = async (id) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "guest", productId: id, quantity: 1 }),
    });
    alert(" Added to cart succussfully");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition"
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">{p.name}</h2>
          <p className="text-gray-600">{p.description}</p>
          <p className="text-lg font-semibold text-blue-600 mt-2">₹{p.price}</p>
          <button
            onClick={() => addToCart(p._id)}
            className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
