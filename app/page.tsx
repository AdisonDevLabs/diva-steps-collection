'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, Clock, MessageCircle, ShoppingCart, Tag, Flame, Eye, Zap, Sparkles, Wallet, Users, Smartphone, CheckCircle, Heart, Facebook, Instagram, Send, Mail } from 'lucide-react';
import { dummyProducts, formatPrice } from '@/lib/data';
import { testimonials } from '@/lib/data/testimonials';
import { heroCategories } from '@/lib/data/categories';
import { brand } from '@/lib/data/brand';
import { useCart } from '@/lib/CartContext';
import { Footer } from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { addToCart } = useCart();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const [timeLeft, setTimeLeft] = useState(4 * 3600 + 45 * 60 + 30);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Image Parallax / Slow Zoom
      gsap.to('.hero-image', {
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Reveal animations for sections
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            }
          }
        );
      });
    }, heroRef);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  const newArrivals = dummyProducts.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = dummyProducts.filter(p => p.isBestSeller);
  const flashDeals = dummyProducts.filter(p => p.isFlashDeal);

  return (
    <div className="flex flex-col min-h-screen bg-[#0E0E0E] text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pexels-wedding-maps-130174465-10114295.jpg"
            alt="Cinematic Fashion Footwear"
            fill
            priority
            referrerPolicy="no-referrer"
            className="hero-image object-cover scale-[1.15]"
          />
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-[#0E0E0E] via-transparent to-[#0E0E0E]/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-16 md:mt-0">
            {/* 1. Trust Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 mb-8"
            >
              <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase">Premium Women&apos;s Footwear in Kenya</span>
            </motion.div>

            {/* 2. Main Headline */}
            <motion.div className="overflow-hidden mb-6 w-full">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="font-display uppercase tracking-wider text-[4rem] leading-[0.9] sm:text-[6rem] md:text-[8rem] text-white drop-shadow-2xl"
              >
                STEP INTO <br/> <span className="text-[#C6FF00]">CONFIDENCE</span>
              </motion.h1>
            </motion.div>

            {/* 3. Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mb-8 font-medium leading-relaxed drop-shadow-md"
            >
              Stylish, affordable, and high-quality women&apos;s footwear designed for everyday elegance.
            </motion.p>
            
            {/* 4. Micro Trust Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-12"
            >
              <div className="flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C6FF00] drop-shadow-md">
                <Truck className="h-4 w-4 mr-2" /> Fast Delivery Across Kenya
              </div>
              <span className="text-[#C6FF00]/40 text-xs hidden sm:block">•</span>
              <div className="flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C6FF00] drop-shadow-md">
                <ShieldCheck className="h-4 w-4 mr-2" /> Quality Checked
              </div>
               <span className="text-[#C6FF00]/40 text-xs hidden sm:block">•</span>
               <div className="hidden sm:flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C6FF00] drop-shadow-md">
                <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Ordering
              </div>
            </motion.div>

            {/* 5. CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center"
            >
               <a 
                href={`https://wa.me/${brand.whatsappNumber}`} 
                target="_blank"
                rel="noreferrer"
                className="h-14 sm:h-16 px-10 rounded-none bg-[#25D366] text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center hover:bg-[#1EBE5A] transition-colors shadow-[0_0_20px_-5px_rgba(37,211,102,0.5)]"
               >
                 <MessageCircle className="mr-3 h-5 w-5" /> Order on WhatsApp
               </a>
               <Link 
                href="/shop" 
                className="h-14 sm:h-16 px-10 rounded-none bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors"
               >
                 Shop Collection
               </Link>
            </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="reveal-section py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16">
            <h2 className="font-display uppercase tracking-wide text-5xl md:text-7xl text-white">Featured Collections</h2>
            <p className="text-gray-400 max-w-sm mt-4 md:mt-0 font-medium">Find your type. Browse by style and step out in confidence.</p>
          </div>
          
          <div 
            className="flex -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-6 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-8 md:pb-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {heroCategories.map((collection, idx) => (
              <Link 
                href={`/shop?category=${collection.slug}`} 
                key={idx} 
                className={`relative min-w-[85vw] sm:min-w-[60vw] md:min-w-0 ${collection.span} h-[420px] md:h-[500px] snap-center overflow-hidden group bg-neutral-900 border border-white/5`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 z-10" />
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                <div className="absolute inset-x-0 top-0 p-6 z-20 flex justify-between items-start opacity-100 transition-opacity">
                   <div className="bg-[#C6FF00] text-black text-[10px] sm:text-xs font-bold px-3 py-1.5 uppercase tracking-widest">
                     {collection.label}
                   </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end z-20 transition-transform duration-500">
                  <h3 className="text-white font-display uppercase tracking-wider text-4xl md:text-5xl mb-2 shadow-black drop-shadow-xl group-hover:text-[#C6FF00] transition-colors">{collection.name}</h3>
                  <div className="flex mt-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="flex items-center text-white text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-6 py-3 border border-white/20 group-hover:bg-[#C6FF00] group-hover:text-black group-hover:border-[#C6FF00]">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <section className="reveal-section py-24 bg-[#0a0a0a] border-y border-[#FF6B00]/20 relative overflow-hidden">
          {/* Subtle dark radial gradient for depth */}
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#1a0a00] to-transparent pointer-events-none opacity-50 z-0" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="w-full md:w-auto">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="bg-[#FF6B00] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest flex items-center animate-pulse">
                     <Zap className="h-4 w-4 mr-2" /> Live Now
                  </div>
                  <div className="flex items-center text-[#FF6B00] font-mono text-xl sm:text-2xl lg:text-3xl font-bold bg-[#FF6B00]/10 px-4 py-2 border border-[#FF6B00]/30 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                    <Clock className="h-6 w-6 mr-3" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <h2 className="font-display uppercase tracking-wide text-5xl md:text-7xl text-white drop-shadow-lg">
                  Flash Deals
                </h2>
                <p className="text-[#C6FF00] font-bold uppercase tracking-widest text-sm mt-3 flex items-center">
                  <Flame className="h-4 w-4 mr-2" /> Grab your favorite styles before they&apos;re gone.
                </p>
              </div>
              <Link href="/shop?category=deals" className="mt-8 md:mt-0 h-14 px-8 bg-transparent border-2 border-[#FF6B00] text-[#FF6B00] font-bold hover:bg-[#FF6B00] hover:text-white transition-colors flex items-center justify-center uppercase tracking-widest text-sm">
                View All Deals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div 
              className="flex -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-8 md:pb-0"
              style={{ scrollbarWidth: 'none' }}
            >
              {flashDeals.map((product) => {
                const stockLeft = (product.id.charCodeAt(0) % 4) + 1; // 1 to 4 left
                const viewing = (product.id.charCodeAt(product.id.length - 1) % 15) + 5; // 5 to 19 viewing
                
                return (
                 <div key={product.id} className="relative min-w-[75vw] sm:min-w-[45vw] md:min-w-0 snap-center group flex flex-col bg-[#0E0E0E] border border-white/10 hover:border-[#FF6B00] transition-colors overflow-hidden">
                  <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] bg-black overflow-hidden group-hover:opacity-90 transition-opacity">
                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 z-20 bg-[#FF6B00] text-white text-lg font-display uppercase tracking-widest px-3 py-1 shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                    
                    {/* Social Proof Badge */}
                     <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white border border-white/10 text-[10px] sm:text-xs font-bold px-3 py-1.5 uppercase tracking-widest flex items-center">
                       <Eye className="h-3 w-3 mr-1.5 text-[#C6FF00]" /> {viewing} viewing
                     </div>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                    />
                  </Link>
                  
                  {/* Stock Indicator Progress Bar */}
                  <div className="px-5 pt-4">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-2">
                       <span>Almost Sold Out</span>
                       <span>Only {stockLeft} left</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5">
                       <div className="bg-[#FF6B00] h-full animate-pulse" style={{ width: `${(stockLeft / 10) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="px-5 pt-4 pb-0 flex flex-col">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-poppins font-semibold text-xl text-white line-clamp-1 group-hover:text-[#FF6B00] transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="font-display tracking-widest text-3xl text-[#C6FF00]">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 font-semibold line-through text-sm">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                    </Link>
                  </div>
                  
                  {/* Action Buttons (Sticky on mobile, hover lift on desktop) */}
                  <div className="p-5 mt-auto flex flex-col gap-2 relative z-30">
                       <a 
                        href={`https://wa.me/${brand.whatsappNumber}?text=I'm interested in the flash deal for ${product.name}`}
                        target="_blank" rel="noreferrer"
                        className="w-full bg-[#25D366] text-white font-bold py-3.5 hover:bg-[#1EBE5A] transition-colors flex justify-center items-center uppercase tracking-widest text-sm"
                       >
                         <MessageCircle className="h-4 w-4 mr-2" /> Order On WhatsApp
                       </a>
                      <button 
                        onClick={(e) => { e.preventDefault(); addToCart(product, product.sizes[0] || '38'); }}
                        className="w-full bg-transparent border border-white/20 text-white font-bold py-2.5 hover:bg-white hover:text-black transition-colors flex justify-center items-center uppercase tracking-widest text-xs"
                       >
                         Add to Cart
                       </button>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals Grid */}
      <section className="reveal-section py-24 bg-[#0E0E0E] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16">
            <div>
              <div className="inline-flex items-center text-[#C6FF00] mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Updated Weekly</span>
              </div>
              <h2 className="font-display uppercase tracking-wide text-5xl md:text-7xl text-white">Latest Styles</h2>
              <p className="text-gray-400 mt-4 max-w-xl font-medium text-base md:text-lg">Fresh styles added weekly — be the first to own them.</p>
            </div>
            <Link href="/shop?category=new-arrivals" className="mt-8 md:mt-0 h-14 px-8 border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors flex items-center justify-center uppercase tracking-widest text-sm group">
              View All Arrivals <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {newArrivals.map((product) => (
              <div key={product.id} className="group flex flex-col bg-transparent lg:hover:-translate-y-2 transition-transform duration-500">
                <Link href={`/product/${product.id}`} className="relative aspect-[3/4] bg-neutral-900 border border-white/10 overflow-hidden mb-5 block">
                  <div className="absolute top-4 left-4 z-20 bg-white text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-xl flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] mr-2 animate-pulse" /> JUST DROPPED
                  </div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Desktop Quick Actions - Reveal on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hidden lg:flex flex-col gap-2">
                     <a 
                      href={`https://wa.me/${brand.whatsappNumber}?text=I'm interested in the new arrival: ${product.name}`}
                      target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-[#25D366] text-white font-bold py-3 hover:bg-[#1EBE5A] transition-colors flex justify-center items-center uppercase tracking-widest text-xs"
                     >
                       <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Order
                     </a>
                     <button 
                      onClick={(e) => { e.preventDefault(); addToCart(product, product.sizes[0] || '38'); }}
                      className="w-full bg-black/50 backdrop-blur-sm border border-white/20 text-white font-bold py-2.5 hover:bg-white hover:text-black transition-colors flex justify-center items-center uppercase tracking-widest text-xs"
                     >
                       Add to Bag
                     </button>
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col text-center px-1">
                  <p className="text-[9px] sm:text-[10px] text-[#C6FF00] font-bold uppercase tracking-widest mb-1.5 flex justify-center items-center">
                    <Flame className="h-3 w-3 mr-1" /> Trending in Nairobi
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-poppins font-semibold text-white text-base sm:text-lg line-clamp-1 mb-2 group-hover:text-[#C6FF00] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-display tracking-widest text-xl text-white">{formatPrice(product.price)}</span>
                  </div>

                  {/* Mobile Quick Actions - Always visible on small screens below product */}
                  <div className="mt-4 flex flex-col gap-2 lg:hidden w-full">
                     <a 
                      href={`https://wa.me/${brand.whatsappNumber}?text=I'm interested in the new arrival: ${product.name}`}
                      target="_blank" rel="noreferrer"
                      className="w-full bg-[#25D366] text-white font-bold py-3 transition-colors flex justify-center items-center uppercase tracking-widest text-[10px]"
                     >
                       <MessageCircle className="h-3 w-3 mr-2" /> WhatsApp Order
                     </a>
                     <button 
                      onClick={() => addToCart(product, product.sizes[0] || '38')}
                      className="w-full bg-transparent border border-white/20 text-white font-bold py-2.5 transition-colors flex justify-center items-center uppercase tracking-widest text-[10px]"
                     >
                       Bag It
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="reveal-section py-24 bg-[#111] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16">
            <div>
              <div className="inline-flex items-center text-[#FF6B00] mb-4">
                <Star className="h-4 w-4 mr-2" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Customer Favorites</span>
              </div>
              <h2 className="font-display uppercase tracking-wide text-5xl md:text-7xl text-white">BEST SELLERS</h2>
              <p className="text-gray-400 mt-4 max-w-xl font-medium text-base md:text-lg">Trusted and loved by hundreds of happy customers across Kenya.</p>
            </div>
            <Link href="/shop?category=best-sellers" className="mt-8 md:mt-0 h-14 px-8 border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors flex items-center justify-center uppercase tracking-widest text-sm group">
              View All Favorites <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.slice(0, 4).map((product) => (
              <div key={product.id} className="group flex flex-col bg-transparent">
                <Link href={`/product/${product.id}`} className="relative aspect-[4/5] bg-neutral-900 border border-white/10 overflow-hidden mb-5 block group-hover:border-[#FF6B00] transition-colors rounded-none">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-xl flex items-center">
                    <Flame className="w-3 h-3 mr-1.5 text-[#FF6B00]" /> BEST SELLER
                  </div>
                  
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100 group-hover:scale-105"
                  />
                  
                  {/* Desktop Quick Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hidden lg:flex flex-col gap-2">
                     <a 
                      href={`https://wa.me/${brand.whatsappNumber}?text=I'm interested in your best seller: ${product.name}`}
                      target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-[#25D366] text-white font-bold py-3 hover:bg-[#1EBE5A] transition-colors flex justify-center items-center uppercase tracking-widest text-xs"
                     >
                       <MessageCircle className="h-4 w-4 mr-2" /> Order On WhatsApp
                     </a>
                     <button 
                      onClick={(e) => { e.preventDefault(); addToCart(product, product.sizes[0] || '38'); }}
                      className="w-full bg-black/50 backdrop-blur-sm border border-white/20 text-white font-bold py-2.5 hover:bg-white hover:text-black transition-colors flex justify-center items-center uppercase tracking-widest text-xs"
                     >
                       Add to Cart
                     </button>
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col text-left px-1">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-[#FF6B00]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs font-bold ml-1">(120+ Reviews)</span>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-poppins font-semibold text-white text-base sm:text-lg line-clamp-1 mb-1 group-hover:text-[#FF6B00] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display tracking-widest text-xl text-white">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                       <span className="text-gray-500 font-semibold line-through text-xs sm:text-sm">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  
                  <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                    <ShoppingBag className="h-3 w-3 mr-1 text-gray-500" /> 200+ sold this week
                  </div>

                  {/* Mobile Quick Actions */}
                  <div className="mt-auto flex flex-col gap-2 lg:hidden w-full">
                     <a 
                      href={`https://wa.me/${brand.whatsappNumber}?text=I'm interested in your best seller: ${product.name}`}
                      target="_blank" rel="noreferrer"
                      className="w-full bg-[#25D366] text-white font-bold py-3 transition-colors flex justify-center items-center uppercase tracking-widest text-[10px]"
                     >
                       <MessageCircle className="h-3 w-3 mr-2" /> WhatsApp Order
                     </a>
                     <button 
                      onClick={() => addToCart(product, product.sizes[0] || '38')}
                      className="w-full bg-transparent border border-white/20 text-white font-bold py-2.5 transition-colors flex justify-center items-center uppercase tracking-widest text-[10px]"
                     >
                       Add to Cart
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Choose Us */}
      <section className="reveal-section py-24 bg-[#0a0a0a] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-[#C6FF00] mb-4">
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Trust & Reliability</span>
            </div>
            <h2 className="font-display uppercase tracking-wide text-4xl md:text-6xl text-white mb-6">WHY SHOP WITH<br/>DIVA STEPS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium text-base md:text-lg">
              We focus on quality, affordability, and fast service to make your shopping experience effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-[#0E0E0E] min-h-[220px] p-8 md:p-10 border border-white/5 hover:border-[#C6FF00]/50 transition-all duration-300 group cursor-default">
              <div className="bg-white/5 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#C6FF00]/10 transition-colors">
                <Star className="h-6 w-6 text-white group-hover:text-[#C6FF00] transition-colors" />
              </div>
              <h3 className="font-display tracking-widest uppercase text-xl text-white mb-3">Premium Quality</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every pair is carefully selected to ensure comfort, durability, and modern style.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0E0E0E] min-h-[220px] p-8 md:p-10 border border-white/5 hover:border-[#C6FF00]/50 transition-all duration-300 group cursor-default">
              <div className="bg-white/5 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#C6FF00]/10 transition-colors">
                <Wallet className="h-6 w-6 text-white group-hover:text-[#C6FF00] transition-colors" />
              </div>
              <h3 className="font-display tracking-widest uppercase text-xl text-white mb-3">Affordable Prices</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get stylish footwear without overspending — value for money guaranteed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0E0E0E] min-h-[220px] p-8 md:p-10 border border-white/5 hover:border-[#C6FF00]/50 transition-all duration-300 group cursor-default">
              <div className="bg-white/5 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#C6FF00]/10 transition-colors">
                <Truck className="h-6 w-6 text-white group-hover:text-[#C6FF00] transition-colors" />
              </div>
              <h3 className="font-display tracking-widest uppercase text-xl text-white mb-3">Fast Delivery</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We process and deliver orders promptly so you receive your items as fast as possible across Kenya.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#0E0E0E] min-h-[220px] p-8 md:p-10 border border-white/5 hover:border-[#C6FF00]/50 transition-all duration-300 group cursor-default">
              <div className="bg-white/5 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-[#C6FF00]/10 transition-colors">
                <MessageCircle className="h-6 w-6 text-white group-hover:text-[#25D366] transition-colors" />
              </div>
              <h3 className="font-display tracking-widest uppercase text-xl text-white mb-3">WhatsApp Ordering</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No complicated checkout — just message us and place your order instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="reveal-section py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16">
            <div>
              <div className="inline-flex items-center text-[#25D366] mb-4">
                <Heart className="h-4 w-4 mr-2" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Real Customers from TikTok & WhatsApp</span>
              </div>
              <h2 className="font-display uppercase tracking-wide text-4xl md:text-6xl text-white mb-6">WHAT OUR <br className="hidden md:block"/>CUSTOMERS SAY</h2>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-3">
                  <Image src="https://picsum.photos/seed/user1/100/100" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User 1" />
                  <Image src="https://picsum.photos/seed/user2/100/100" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User 2" />
                  <Image src="https://picsum.photos/seed/user3/100/100" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User 3" />
                </div>
                <div>
                  <div className="flex text-[#FF6B00] mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase">4.8/5 Average Rating • 500+ Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="flex -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-8 md:pb-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {testimonials.map((review) => (
              <div key={review.id} className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center bg-[#0E0E0E] border border-white/5 hover:border-[#C6FF00]/30 p-8 flex flex-col group lg:hover:-translate-y-2 transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-[#FF6B00]">
                    {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <div className="bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold px-2 py-1 uppercase tracking-widest flex items-center border border-[#25D366]/20">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verified WhatsApp Order
                  </div>
                </div>
                
                <p className="text-white text-base md:text-lg italic mb-8 flex-1 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <Image
                    src={review.profile}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-white/10 group-hover:border-[#C6FF00]/50 transition-colors"
                  />
                  <div>
                    <p className="text-white font-bold text-sm tracking-wide">{review.name}</p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center font-medium">
                      Purchased: <span className="text-[#C6FF00] ml-1">{review.product}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="reveal-section py-24 bg-[#111111] relative overflow-hidden border-t border-white/5">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#25D366]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center text-[#25D366] bg-[#25D366]/10 px-4 py-2 rounded-full mb-8 border border-[#25D366]/20">
                <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse mr-3"></div>
                <span className="text-xs font-bold uppercase tracking-widest">We Are Online</span>
              </div>
              
              <h2 className="font-display uppercase tracking-wide text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
                START YOUR <br className="hidden md:block"/>ORDER NOW
              </h2>
              
              <p className="text-gray-400 font-medium text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                Chat with us directly on WhatsApp to confirm size, price, and delivery in minutes.
              </p>

              {/* Trust Signals Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 w-full max-w-lg">
                <div className="flex items-center text-gray-300">
                   <Clock className="w-5 h-5 text-[#C6FF00] mr-3" />
                   <span className="font-medium text-sm">Fast response within minutes</span>
                </div>
                <div className="flex items-center text-gray-300">
                   <ShieldCheck className="w-5 h-5 text-[#C6FF00] mr-3" />
                   <span className="font-medium text-sm">Secure and reliable</span>
                </div>
                <div className="flex items-center text-gray-300">
                   <Truck className="w-5 h-5 text-[#C6FF00] mr-3" />
                   <span className="font-medium text-sm">Quick delivery available</span>
                </div>
                <div className="flex items-center text-gray-300">
                   <CheckCircle className="w-5 h-5 text-[#C6FF00] mr-3" />
                   <span className="font-medium text-sm">Trusted across Kenya</span>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a 
                  href={`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(brand.whatsappMessage.general)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-16 sm:h-20 px-8 sm:px-12 bg-[#25D366] text-white font-bold text-lg items-center justify-center hover:bg-[#1EBE5A] transition-all hover:scale-105 uppercase tracking-widest group shadow-[0_0_40px_-10px_rgba(37,211,102,0.4)]"
                >
                  <MessageCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Order on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Visual mock */}
            <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none"></div>
              
              <div className="bg-[#1A1A1A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative">
                {/* Chat Header */}
                <div className="bg-[#242424] px-6 py-4 flex items-center border-b border-white/5">
                   <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mr-4 border border-white/10">
                     <span className="font-display text-white text-lg">DS</span>
                   </div>
                   <div>
                     <p className="text-white font-bold text-sm">Diva Steps Collection</p>
                     <p className="text-[#25D366] text-xs font-medium">Online</p>
                   </div>
                   <MessageCircle className="w-5 h-5 text-gray-500 ml-auto" />
                </div>
                
                {/* Chat Body */}
                <div className="p-6 pb-20 space-y-4 bg-black/20">
                   
                   <div className="flex w-full mt-2 space-x-3 max-w-xs">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center mt-auto border border-white/10">
                         <span className="font-display text-white text-xs">DS</span>
                      </div>
                      <div className="bg-[#242424] p-4 rounded-2xl rounded-bl-sm border border-white/5 shadow-md">
                         <p className="text-white text-sm">Hello! Welcome to Diva Steps. What style are you looking for today? 👠✨</p>
                         <p className="text-gray-500 text-[10px] text-right mt-1">10:02 AM</p>
                      </div>
                   </div>

                   <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                      <div className="bg-[#005C4B] p-4 rounded-2xl rounded-br-sm border border-[#005C4B]/50 shadow-md">
                         <p className="text-white text-sm">Hi, I want to order the Black Heels in size 39. Are they available?</p>
                         <div className="flex justify-end items-center mt-1 space-x-1">
                            <p className="text-white/60 text-[10px]">10:05 AM</p>
                            <CheckCircle className="w-3 h-3 text-[#53bdeb]" />
                         </div>
                      </div>
                   </div>

                   <div className="flex w-full mt-2 space-x-3 max-w-xs">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center mt-auto border border-white/10">
                         <span className="font-display text-white text-xs">DS</span>
                      </div>
                      <div className="bg-[#242424] p-4 rounded-2xl rounded-bl-sm border border-white/5 shadow-md">
                         <p className="text-white text-sm">Yes, they are! We can deliver today within Nairobi.</p>
                         <p className="text-gray-500 text-[10px] text-right mt-1">10:06 AM</p>
                      </div>
                   </div>

                </div>

                {/* Chat Input */}
                <div className="absolute bottom-0 inset-x-0 bg-[#242424] p-4 flex items-center border-t border-white/5 z-20">
                   <div className="bg-[#1A1A1A] w-full rounded-full h-10 flex items-center px-4 border border-white/5">
                      <p className="text-gray-500 text-sm">Message...</p>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center ml-3 flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-black fill-black" />
                   </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
