import type {Metadata} from 'next';
import { Inter, Anton, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Diva Steps Collection',
  description: 'Premium footwear ecommerce website optimized for mobile.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${poppins.variable}`}>
      <body className="font-sans bg-[#0E0E0E] text-white antialiased selection:bg-[#C6FF00] selection:text-black" suppressHydrationWarning>
        <CartProvider>
          <NavBar />
          <CartDrawer />
          <main className="min-h-screen pt-[72px] pb-16 md:pb-0">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
