import { NextRequest, NextResponse } from 'next/server';
import { saveOrder } from '@/lib/order-store';

type Item = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  total: number;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const requiredFields = ['customerName', 'phone', 'address', 'city', 'state', 'pincode'];
  for (const field of requiredFields) {
    if (!String(body[field] ?? '').trim()) {
      return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
    }
  }

  const items = Array.isArray(body.items) ? (body.items as Item[]) : [];
  if (items.length === 0) {
    return NextResponse.json({ error: 'At least one product is required.' }, { status: 400 });
  }

  const grandTotal = items.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const orderId = `ORD-${Date.now()}`;

  await saveOrder({
    id: orderId,
    customerName: String(body.customerName).trim(),
    phone: String(body.phone).trim(),
    address: String(body.address).trim(),
    city: String(body.city).trim(),
    state: String(body.state).trim(),
    pincode: String(body.pincode).trim(),
    note: String(body.note ?? '').trim(),
    grandTotal,
    createdAt: new Date().toISOString(),
    items: items.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: Number(item.price),
      qty: Number(item.qty),
      total: Number(item.total),
    })),
  });

  return NextResponse.json({ ok: true, id: orderId });
}
