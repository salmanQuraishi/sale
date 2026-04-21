export type Product = {
  id: string;
  name: string;
  price: number;
  minQty: number;
  unit: string;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 'p-101',
    name: 'Premium School Bag',
    price: 75,
    minQty: 600,
    unit: 'piece',
    image: '🎒',
    description: 'Durable wholesale school bag with premium zips and strong stitching.',
  },
  {
    id: 'p-102',
    name: 'Travel Backpack',
    price: 85,
    minQty: 600,
    unit: 'piece',
    image: '🧳',
    description: 'Spacious backpack for wholesalers looking for travel and daily-use stock.',
  },
  {
    id: 'p-103',
    name: 'Office Laptop Bag',
    price: 95,
    minQty: 600,
    unit: 'piece',
    image: '💼',
    description: 'Neat and professional laptop bag suitable for office and retail dealers.',
  },
  {
    id: 'p-104',
    name: 'Kids Water Bottle',
    price: 105,
    minQty: 600,
    unit: 'piece',
    image: '🧴',
    description: 'Colorful BPA-free bottle ideal for school and gift wholesalers.',
  },
  {
    id: 'p-105',
    name: 'Lunch Box Set',
    price: 115,
    minQty: 600,
    unit: 'piece',
    image: '🍱',
    description: 'Compact lunch box set with strong lid locking and easy wash material.',
  },
  {
    id: 'p-106',
    name: 'Stationery Combo Kit',
    price: 125,
    minQty: 600,
    unit: 'piece',
    image: '✏️',
    description: 'Bulk stationery combo designed for wholesalers and school suppliers.',
  },
];
