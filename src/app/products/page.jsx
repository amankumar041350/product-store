"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🛍️ Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-xl"
            />
            <div className="mt-3 flex-1">
              <h2 className="text-xl font-semibold text-gray-700">
                {product.title}
              </h2>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-green-600 mt-3">
                ₹{product.price}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
              >
                Add to Cart
              </button>
              <Link
                href="/cart"
                onClick={() => addToCart(product)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl text-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
