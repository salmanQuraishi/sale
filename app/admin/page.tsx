import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getOrders } from '@/lib/order-store';
import { getAdminSessionCookieName, isValidAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ success?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get(getAdminSessionCookieName())?.value;

  if (!isValidAdminSession(session)) {
    redirect('/admin/login');
  }

  const params = (await searchParams) ?? {};
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Orders</h1>
            <p className="mt-2 text-slate-600">All customer details, products, quantities, and amount are shown here.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
              Back to Home
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                Logout
              </button>
            </form>
          </div>
        </div>

        {params.success ? (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            Order submitted successfully. Order ID: {params.success}
          </div>
        ) : null}

        {orders.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-600">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Customer Details</div>
                    <h2 className="mt-3 text-2xl font-bold">{order.customerName}</h2>
                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                      <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                      <p><span className="font-semibold">Address:</span> {order.address}</p>
                      <p><span className="font-semibold">City:</span> {order.city}</p>
                      <p><span className="font-semibold">State:</span> {order.state}</p>
                      <p><span className="font-semibold">Pincode:</span> {order.pincode}</p>
                      <p><span className="font-semibold">Note:</span> {order.note || '—'}</p>
                      <p><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Ordered Products</div>
                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500">
                            <th className="py-3 pr-4">Product</th>
                            <th className="py-3 pr-4">Qty</th>
                            <th className="py-3 pr-4">Rate</th>
                            <th className="py-3 pr-4">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={`${order.id}-${item.productId}`} className="border-b border-slate-100">
                              <td className="py-4 pr-4 font-medium">{item.name}</td>
                              <td className="py-4 pr-4">{item.qty}</td>
                              <td className="py-4 pr-4">₹{item.price}</td>
                              <td className="py-4 pr-4 font-semibold">₹{item.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
                      <div className="text-sm text-slate-300">Grand Total</div>
                      <div className="mt-2 text-3xl font-bold">₹{order.grandTotal}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
