// components/NavBar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, Home, Grid, Tag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { brand } from '@/lib/data/brand';
import { navSearchSuggestions, navLinksData } from '@/lib/data/categories';
import { AnnouncementBar } from './AnnouncementBar';

export function NavBar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartPulse, setCartPulse] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(cartCount);

  useEffect(() => {
    if (cartCount > prevCartCount) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 300);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      {/* Desktop Header & Mobile Top Bar */}
      <header className={`fixed top-10 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0E0E0E]/95 backdrop-blur-md shadow-2xl py-1 border-b border-white/5' : 'bg-transparent py-1 border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-[60px]">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-display tracking-[0.15em] text-white flex flex-col justify-center mt-1">
                <span className="text-2xl md:text-3xl font-black uppercase leading-none">
                  DIVA<span className="text-[#C6FF00]">STEPS</span>
                </span>
                <span className="hidden md:block text-[8px] tracking-[0.3em] uppercase text-gray-400 mt-1 font-sans">
                  Collection
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinksData.map((link, idx) => (
                <Link key={idx} href={link.href} className={`text-[11px] uppercase tracking-widest font-bold ${link.baseTextClass} ${link.hoverTextClass} transition-colors relative group ${link.isLive ? 'flex items-center' : ''}`}>
                  {link.label}
                  {link.isLive && (
                    <span className="ml-2 bg-[#FF0000] text-white text-[9px] px-1.5 py-0.5 rounded-sm animate-pulse flex items-center leading-none">LIVE</span>
                  )}
                  <span className={`absolute -bottom-1.5 left-0 w-0 h-px transition-all group-hover:w-full ${link.underlineClass}`}></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              
              {/* Search Toggle */}
              <div className="relative hidden sm:block">
                <button 
                  className="text-white hover:text-[#C6FF00] transition-colors flex items-center"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </button>
                
                {/* Search Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-10 right-0 w-72 bg-[#1A1A1A] border border-white/10 rounded-sm shadow-2xl p-4 origin-top-right z-50"
                    >
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search products..." 
                          className="w-full bg-[#0E0E0E] text-white border border-white/5 rounded-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="mt-4">
                        <p className="text-[10px] uppercase tracking-widest text-[#C6FF00] mb-3 font-bold">Suggested</p>
                        <div className="flex flex-wrap gap-2">
                          {navSearchSuggestions.map((suggestion, idx) => (
                            <span key={idx} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 cursor-pointer transition-colors text-white rounded-full">
                              {suggestion}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WhatsApp CTA (Desktop) */}
              <a 
                href={`https://wa.me/${brand.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                className="hidden lg:flex items-center bg-[#25D366] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#1EBE5A] transition-all hover:scale-105 shadow-[0_0_15px_-3px_rgba(37,211,102,0.4)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.76.455 3.415 1.258 4.862L2 22l5.34-1.196A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zM9.54 8.78c-.28-.01-.58-.02-.84-.02-.27 0-.71.1-1.08.5s-1.42 1.39-1.42 3.39c0 2 1.45 3.93 1.65 4.19.2.27 2.82 4.41 6.94 6.13 3.65 1.52 4.54 1.22 5.37 1.15.82-.07 2.65-1.08 3.03-2.12.37-1.05.37-1.95.26-2.14-.11-.2-.41-.31-.82-.52s-2.45-1.21-2.83-1.35c-.38-.14-.65-.21-.93.21-.28.42-1.08 1.34-1.32 1.61-.25.28-.49.32-.91.1-1.63-.82-3.1-2-4.14-3.41-.26-.35.03-.5.41-1.28.18-.36.09-.68-.04-.95-.14-.28-.62-1.5-.85-2.06-.23-.55-.46-.47-.63-.48z" clipRule="evenodd" />
                </svg>
                Order via WhatsApp
              </a>

               {/* Cart */}
              <button 
                className="text-white hover:text-[#C6FF00] transition-colors relative group"
                onClick={() => setIsCartOpen(true)}
              >
                <motion.div
                  animate={cartPulse ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingBag className="h-6 w-6 group-hover:drop-shadow-[0_0_8px_rgba(198,255,0,0.5)] transition-all" />
                </motion.div>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FF6B00] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-[#0E0E0E]">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Heart (Low Priority) */}
              <button className="text-gray-400 hover:text-white transition-colors hidden lg:block opacity-50 hover:opacity-100">
                <Heart className="h-5 w-5" />
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Floating WhatsApp Button (Hidden on Desktop, shown on Mobile outside bottom nav if needed, but we put it IN bottom nav) */}

      {/* Mobile Bottom Navigation Hub */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/5 px-6 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] z-50">
        <div className="flex justify-between items-center mb-1">
          <Link href="/" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors w-12">
            <Home className="h-5 w-5" />
            <span className="text-[9px] font-medium tracking-wide uppercase">Home</span>
          </Link>
          <Link href="/shop" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors w-12">
            <Grid className="h-5 w-5" />
            <span className="text-[9px] font-medium tracking-wide uppercase">Shop</span>
          </Link>
          <div className="relative -top-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-[#C6FF00] text-black p-3 rounded-full flex flex-col items-center justify-center h-14 w-14 border-[3px] border-[#0A0A0A]"
            >
              <motion.div animate={cartPulse ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
                <ShoppingBag className="h-5 w-5" />
              </motion.div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#0A0A0A]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <Link href="/shop?category=deals" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-[#FF0000] transition-colors w-12 relative group">
            <Tag className="h-5 w-5 group-hover:text-[#FF0000] transition-colors" />
            <span className="text-[9px] font-medium tracking-wide uppercase">Deals</span>
            <span className="absolute top-0 right-1 w-2 h-2 bg-[#FF0000] rounded-full shadow-[0_0_8px_rgba(255,0,0,0.8)]"></span>
          </Link>
          <a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex flex-col items-center space-y-1 text-[#25D366] hover:text-[#1EBE5A] transition-colors w-12">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
               <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.76.455 3.415 1.258 4.862L2 22l5.34-1.196A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zM9.54 8.78c-.28-.01-.58-.02-.84-.02-.27 0-.71.1-1.08.5s-1.42 1.39-1.42 3.39c0 2 1.45 3.93 1.65 4.19.2.27 2.82 4.41 6.94 6.13 3.65 1.52 4.54 1.22 5.37 1.15.82-.07 2.65-1.08 3.03-2.12.37-1.05.37-1.95.26-2.14-.11-.2-.41-.31-.82-.52s-2.45-1.21-2.83-1.35c-.38-.14-.65-.21-.93.21-.28.42-1.08 1.34-1.32 1.61-.25.28-.49.32-.91.1-1.63-.82-3.1-2-4.14-3.41-.26-.35.03-.5.41-1.28.18-.36.09-.68-.04-.95-.14-.28-.62-1.5-.85-2.06-.23-.55-.46-.47-.63-.48z" clipRule="evenodd" />
            </svg>
            <span className="text-[9px] font-bold tracking-wide uppercase">Order</span>
          </a>
        </div>
      </div>
    </>
  );
}