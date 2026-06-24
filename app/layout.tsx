import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support Ticket System',
  description: 'Modern support ticket management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: '#f0f4f8' }}>
        <nav 
          className="shadow-lg sticky top-0 z-50"
          style={{
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
            <Link href="/" className="text-4xl font-black text-white drop-shadow-lg">
              SupportHub
            </Link>
            <div className="flex gap-4">
              <Link
                href="/customer"
                style={{ background: '#06b6d4' }}
                className="px-7 py-3 rounded-xl font-bold text-white hover:shadow-lg transition text-lg transform hover:scale-105"
              >
                Submit Ticket
              </Link>
              <Link
                href="/agent"
                style={{ background: '#f43f5e' }}
                className="px-7 py-3 rounded-xl font-bold text-white hover:shadow-lg transition text-lg transform hover:scale-105"
              >
                Agent Dashboard
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
