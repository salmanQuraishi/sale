'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { products } from '@/lib/data';

type Cart = Record<string, number>;

export default function HomeClient() {
  const [cart, setCart] = useState<Cart>({});

  const addToCart = (productId: string, minQty: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + minQty,
    }));
  };

  const updateQty = (productId: string, value: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: Math.max(0, value),
    }));
  };

  const cartItems = useMemo(() => {
    return products
      .filter((product) => (cart[product.id] ?? 0) > 0)
      .map((product) => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: cart[product.id],
        total: product.price * cart[product.id],
      }));
  }, [cart]);

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const totalUnits = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalProducts = cartItems.length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-2xl font-bold tracking-tight">Your Brand</div>
            <div className="text-xs text-slate-500">Wholesale Supplier Portal testing</div>
          </div>
          <nav className="hidden gap-8 md:flex text-sm font-medium">
            <a href="#home" className="hover:text-slate-600">Home</a>
            <a href="#products" className="hover:text-slate-600">Products</a>
            <a href="#contact" className="hover:text-slate-600">Contact</a>
          </nav>
          <Link
            href={`/checkout?cart=${encodeURIComponent(JSON.stringify(cartItems))}`}
            className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Checkout ({totalProducts})
          </Link>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm font-medium text-slate-600 shadow-sm">
              Bulk Orders for Wholesalers
            </span>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Simple Wholesale Ordering Website with Multiple Product Cart
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Browse products, add bulk quantity, checkout with your details, and send one complete order to admin.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#products" className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90">
                View Products
              </a>
              <Link href="/admin/login" className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                Open Admin
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bulk Orders</div>
              <div className="mt-2 text-3xl font-bold">Fast Inquiry Flow</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">Users can add multiple products and place one combined order.</p>
            </div>
            <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-xl sm:mt-10">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Admin Ready</div>
              <div className="mt-2 text-2xl font-bold">Customer + Product Details</div>
              <p className="mt-3 text-sm leading-6 text-slate-300">Admin can see all customer info, quantities, and final total amount.</p>
            </div>
            <div className="rounded-[28px] bg-slate-100 p-6 shadow-sm sm:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Easy to Customize</div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Replace demo products, pricing, brand name, and contact details with your real business content.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Products</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Choose products and add bulk quantity</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const qty = cart[product.id] ?? 0;
              return (
                <div key={product.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-4xl">
                    {product.image}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{product.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="mt-5 space-y-2 text-sm text-slate-700">
                    <p><span className="font-semibold">Price:</span> ₹{product.price}</p>
                    <p><span className="font-semibold">MOQ:</span> {product.minQty} {product.unit}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => updateQty(product.id, Math.max(0, qty - product.minQty))}
                      className="rounded-2xl border border-slate-300 px-4 py-2 text-lg font-semibold"
                    >
                      -
                    </button>
                    <div className="min-w-24 rounded-2xl bg-slate-100 px-4 py-2 text-center font-semibold">
                      {qty}
                    </div>
                    <button
                      onClick={() => updateQty(product.id, qty + product.minQty)}
                      className="rounded-2xl border border-slate-300 px-4 py-2 text-lg font-semibold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product.id, product.minQty)}
                    className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Add MOQ to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Cart Summary</div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">Your selected products</h3>
              </div>
              <div className="min-w-72 rounded-3xl bg-slate-950 p-6 text-white">
                <div className="text-sm text-slate-300">Total Quantity</div>
                <div className="mt-1 text-3xl font-bold">{totalUnits}</div>
                <div className="mt-4 text-sm text-slate-300">Grand Total</div>
                <div className="mt-1 text-3xl font-bold">₹{grandTotal}</div>
                <Link
                  href={`/checkout?cart=${encodeURIComponent(JSON.stringify(cartItems))}`}
                  className="mt-6 inline-block rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <p className="mt-8 text-slate-600">No products added yet. Select quantity from product cards above.</p>
            ) : (
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-3 pr-4">Product</th>
                      <th className="py-3 pr-4">Qty</th>
                      <th className="py-3 pr-4">Price</th>
                      <th className="py-3 pr-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.productId} className="border-b border-slate-100">
                        <td className="py-4 pr-4 font-medium">{item.name}</td>
                        <td className="py-4 pr-4">{item.qty}</td>
                        <td className="py-4 pr-4">₹{item.price}</td>
                        <td className="py-4 pr-4 font-semibold">₹{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="text-3xl font-bold">Your Brand</div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Replace this text with your company details, products, and wholesale contact information.
            </p>
          </div>
          <div>
            <div className="text-lg font-semibold">Call Us</div>
            <p className="mt-4 text-slate-300">+91-9876543210</p>
          </div>
          <div>
            <div className="text-lg font-semibold">Email</div>
            <p className="mt-4 text-slate-300">sales@yourbrand.com</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
