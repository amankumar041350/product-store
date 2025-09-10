import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Link from "next/link";

export const metadata = {
  title: "Product Store",
  description: "Buy products with cart functionality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <CartProvider>
          {/* Navbar */}
          <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link href="/products" className="text-2xl font-bold text-blue-600">
              🛍️ MyStore
            </Link>
            <Link
              href="/cart"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Cart
            </Link>
          </nav>
          <main className="p-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
