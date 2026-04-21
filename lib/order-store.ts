import { promises as fs } from 'fs';
import path from 'path';

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  total: number;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  note: string;
  grandTotal: number;
  createdAt: string;
  items: OrderItem[];
};

const dataFile = path.join(process.cwd(), 'data', 'orders.json');

async function ensureFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, '[]', 'utf-8');
  }
}

export async function getOrders(): Promise<Order[]> {
  await ensureFile();
  const raw = await fs.readFile(dataFile, 'utf-8');
  const parsed = JSON.parse(raw) as Order[];
  return parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveOrder(order: Order): Promise<void> {
  const orders = await getOrders();
  orders.unshift(order);
  await fs.writeFile(dataFile, JSON.stringify(orders, null, 2), 'utf-8');
}
