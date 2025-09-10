import "./globals.css";

export const metadata = {
  title: "Product Store",
  description: "Next.js + MongoDB store with colorful UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🛍️ My Store</h1>
          <nav className="space-x-6">
            <a href="/products" className="hover:underline">Products</a>
            <a href="/cart" className="hover:underline">Cart</a>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
