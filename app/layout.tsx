import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale B2B Starter',
  description: 'Static wholesale website with cart, checkout, and admin orders page.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
