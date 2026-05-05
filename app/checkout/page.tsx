'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  total: number;
};

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cartItems = useMemo<CartItem[]>(() => {
    const cartParam = searchParams.get('cart');
    if (!cartParam) return [];
    try {
      return JSON.parse(cartParam) as CartItem[];
    } catch {
      return [];
    }
  }, [searchParams]);

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);

    const payload = {
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      state: formData.get('state'),
      pincode: formData.get('pincode'),
      note: formData.get('note'),
      items: cartItems,
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(result.error ?? 'Something went wrong.');
      return;
    }

    router.push(`/success`);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="mt-2 text-slate-600">
              Fill customer details and submit the full wholesale order.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold">Customer Details</h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <input name="customerName" required placeholder="Customer Name" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none" />
              <input name="phone" required placeholder="Phone Number" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none" />
              <input name="city" required placeholder="City" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none" />
              <input name="state" required placeholder="State" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none" />
              <input name="pincode" required placeholder="Pincode" className="rounded-2xl border border-slate-300 px-4 py-3 outline-none md:col-span-2" />
              <textarea name="address" required placeholder="Full Address" className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none md:col-span-2" />
              <textarea name="note" placeholder="Optional note" className="min-h-24 rounded-2xl border border-slate-300 px-4 py-3 outline-none md:col-span-2" />
            </div>

            {error && (
              <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
            )}

            <button
              disabled={loading || cartItems.length === 0}
              className="mt-8 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Order'}
            </button>
          </form>

          {/* SUMMARY */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="mt-6 text-slate-600">
                No cart items found. Go back and add products first.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="rounded-2xl bg-slate-50 p-4">
                    <div className="font-semibold">{item.name}</div>
                    <div className="mt-2 text-sm text-slate-600">Qty: {item.qty}</div>
                    <div className="mt-1 text-sm text-slate-600">Rate: ₹{item.price}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      Total: ₹{item.total}
                    </div>
                  </div>
                ))}

                <div className="rounded-2xl bg-slate-950 p-5 text-white">
                  <div className="text-sm text-slate-300">Grand Total</div>
                  <div className="mt-2 text-3xl font-bold">₹{grandTotal}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}