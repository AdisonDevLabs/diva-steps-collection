'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, ChevronDown, Check, X, SlidersHorizontal, MessageCircle, Search, Heart, Eye, Star, SearchX } from 'lucide-react';
import { dummyProducts, formatPrice } from '@/lib/data';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/data/products';
import { brand } from '@/lib/data/brand';
import { motion, AnimatePresence } from 'motion/react';

function ShopContent() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category');
  const [filterCategory, setFilterCategory] = useState<string | null>(
    rawCategory === 'deals' || rawCategory === 'new-arrivals' || rawCategory === 'best-sellers' ? null : rawCategory
  );
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('trending-now');
  
  const discoveryChips = [
    { id: 'trending', label: '🔥 Trending', context: 'Trending Styles' },
    { id: 'best-sellers', label: '⭐ Best Sellers', context: 'Best Sellers' },
    { id: 'just-dropped', label: '🆕 Just Dropped', context: 'New Arrivals' },
    { id: 'budget-picks', label: '💰 Budget Picks', context: 'Budget Friendly' },
    { id: 'premium-styles', label: '✨ Premium Styles', context: 'Premium Collection' },
  ];
  
  const [discoveryMode, setDiscoveryMode] = useState<string>('trending');
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showHelperTooltip, setShowHelperTooltip] = useState(false);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState(false);

  const { addToCart } = useCart();

  const categories = ['All', 'Heels', 'Sneakers', 'Flats', 'Sandals', 'Boots'];
  
  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [filterCategory, searchQuery, sortOption, rawCategory, discoveryMode]);

  // Handle scroll for tooltip
  useEffect(() => {
    const handleScroll = () => {
      if (hasDismissedTooltip) return;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition + windowHeight) / documentHeight;
      
      if (scrollPercentage > 0.35 && !showHelperTooltip) {
        setShowHelperTooltip(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasDismissedTooltip, showHelperTooltip]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 600);
  };

  // Simulate network delay for filtering to show skeleton loader
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filterCategory, searchQuery, sortOption, rawCategory, discoveryMode]);

  // Apply filters
  let filteredProducts = [...dummyProducts];
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  }

  if (rawCategory === 'deals') {
    filteredProducts = filteredProducts.filter(p => p.isFlashDeal);
  } else if (rawCategory === 'new-arrivals') {
    filteredProducts = filteredProducts.filter(p => p.isNewArrival);
  } else if (rawCategory === 'best-sellers') {
    filteredProducts = filteredProducts.filter(p => p.isBestSeller);
  } else if (filterCategory && filterCategory !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());
  }

  if (!searchQuery) {
    if (discoveryMode === 'best-sellers') {
      filteredProducts = filteredProducts.filter(p => p.isBestSeller);
    } else if (discoveryMode === 'just-dropped') {
      filteredProducts = filteredProducts.filter(p => p.isNewArrival);
    } else if (discoveryMode === 'budget-picks') {
      filteredProducts = filteredProducts.filter(p => p.price <= 3500);
    } else if (discoveryMode === 'premium-styles') {
      filteredProducts = filteredProducts.filter(p => p.price >= 4500);
    }
  }

  // Apply sorting
  if (sortOption === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'best-selling') {
    filteredProducts.sort((a, b) => (b.isBestSeller === a.isBestSeller ? 0 : b.isBestSeller ? -1 : 1));
  } else if (sortOption === 'new-arrivals') {
    filteredProducts.sort((a, b) => (b.isNewArrival === a.isNewArrival ? 0 : b.isNewArrival ? -1 : 1));
  } else if (sortOption === 'trending-now') {
    filteredProducts.sort((a, b) => ((b.rating || 0) * (b.reviews || 0)) < ((a.rating || 0) * (a.reviews || 0)) ? 1 : -1);
  }

  return (
    <div className="bg-[#0E0E0E] min-h-screen text-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] pt-32 pb-8 px-6 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white">Shop All</span>
          </motion.nav>

          {/* Section Label */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6FF00] mb-3"
          >
            Discover Our Collection
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display font-black uppercase tracking-wide text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-none"
          >
            {rawCategory === 'deals' ? 'Flash Deals' : 
             rawCategory === 'new-arrivals' ? 'New Arrivals' :
             rawCategory === 'best-sellers' ? 'Best Sellers' :
             filterCategory && filterCategory !== 'All' ? filterCategory : 'Shop All Footwear'}
          </motion.h1>
          
          {/* Supporting Text */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            Discover heels, sneakers, sandals, and everyday essentials curated for the modern woman.
          </motion.p>

          {/* Trust Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 pt-6 border-t border-white/5 w-full flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6"
          >
             <span className="flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400"><Check className="w-3 h-3 mr-1.5 text-[#25D366]" /> Fast Delivery Across Kenya</span>
             <span className="flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400"><Check className="w-3 h-3 mr-1.5 text-[#25D366]" /> WhatsApp Ordering</span>
             <span className="flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400"><Check className="w-3 h-3 mr-1.5 text-[#25D366]" /> Quality Checked Products</span>
             <span className="flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400"><Check className="w-3 h-3 mr-1.5 text-[#25D366]" /> New Styles Weekly</span>
          </motion.div>
          
        </div>
      </div>

      {/* Search & Quick Filter Bar */}
      <div className="sticky top-14 md:top-[60px] z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 py-3 md:py-4 transition-all">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            
            {/* Search Input (Mobile: Top, Desktop: Left) */}
            <div className="relative w-full md:w-64 lg:w-72 flex-shrink-0">
              <input 
                type="text" 
                placeholder="Search styles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1A1A] text-white border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#C6FF00] transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            {/* Discovery Chips (Scrollable) */}
            <div className="flex-1 w-full overflow-x-auto hide-scrollbar flex gap-2 pb-1 md:pb-0 items-center">
              {discoveryChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => { setDiscoveryMode(chip.id); setSearchQuery(''); }}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest transition-colors ${
                    discoveryMode === chip.id && !searchQuery
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                      : 'bg-[#1A1A1A] text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-[#1A1A1A] border border-white/10 px-4 py-2 pr-8 rounded-full text-[10px] uppercase font-bold tracking-widest text-white focus:outline-none focus:border-white/50 cursor-pointer"
                >
                  <option value="trending-now">Trending Now</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
              </div>
              <button 
                onClick={() => setIsAdvancedFiltersOpen(true)}
                className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-widest bg-[#1A1A1A] hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-colors"
              >
                <Filter className="h-3 w-3" />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Actions (Sticky below chips) */}
          <div className="md:hidden flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <div className="relative flex-1 mr-2">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full appearance-none bg-transparent border-none py-1 pr-8 text-xs font-bold uppercase tracking-widest text-white focus:outline-none"
                >
                  <option value="trending-now">Trending Now</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
              </div>
              <button 
                onClick={() => setIsAdvancedFiltersOpen(true)}
                className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-widest py-1 pl-4 border-l border-white/10"
              >
                <Filter className="h-3 w-3" />
                <span>Filters</span>
              </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Active Discovery State */}
          <div className="flex flex-wrap items-center justify-between mb-4">
             <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="text-sm font-medium text-white flex items-center">
                  <span className="text-gray-500 mr-2">Showing:</span> 
                  {searchQuery ? `Search Results for "${searchQuery}"` : discoveryChips.find(c => c.id === discoveryMode)?.context || 'All Styles'}
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
                <div className="text-sm font-medium text-white flex items-center">
                  <span className="text-gray-500 mr-2">Sorted by:</span>
                  {sortOption === 'trending-now' ? 'Trending Now' :
                   sortOption === 'best-selling' ? 'Best Selling' :
                   sortOption === 'new-arrivals' ? 'New Arrivals' :
                   sortOption === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
                </div>
             </div>
             
             <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2 sm:mt-0">
               {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
             </div>
          </div>

          {/* Active Filter Summary */}
          {((filterCategory && filterCategory !== 'All') || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mr-2">Filters:</span>
              {searchQuery && (
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] text-white uppercase tracking-wider">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery('')} className="ml-2 text-gray-400 hover:text-white"><X className="h-3 w-3" /></button>
                </div>
              )}
              {filterCategory && filterCategory !== 'All' && (
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] text-white uppercase tracking-wider">
                  {filterCategory}
                  <button onClick={() => setFilterCategory('All')} className="ml-2 text-gray-400 hover:text-white"><X className="h-3 w-3" /></button>
                </div>
              )}
              <button 
                onClick={() => { setSearchQuery(''); setFilterCategory('All'); }}
                className="text-[10px] text-white hover:text-[#C6FF00] transition-colors uppercase tracking-widest font-bold ml-2 underline underline-offset-4"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 border-t border-white/10 pt-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-[#1A1A1A] w-full mb-4 border border-white/5"></div>
                  <div className="h-4 bg-[#1A1A1A] w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-[#1A1A1A] w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 md:py-32 flex flex-col items-center text-center border-t border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <SearchX className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mb-3">We Couldn&apos;t Find A Match</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-10 text-sm md:text-base">Try adjusting your filters or explore our most popular styles. We receive new arrivals weekly.</p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button 
                  onClick={() => { setSearchQuery(''); setFilterCategory('All'); setDiscoveryMode('trending'); setSortOption('trending-now'); }}
                  className="h-12 px-6 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#C6FF00] transition-colors"
                >
                  Clear Filters
                </button>
                <button 
                  onClick={() => { setSearchQuery(''); setFilterCategory('All'); setDiscoveryMode('best-sellers'); setSortOption('best-selling'); }}
                  className="h-12 px-6 bg-[#1A1A1A] text-white border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  View Best Sellers
                </button>
              </div>

              {/* WhatsApp Recovery */}
              <div className="p-6 md:p-8 bg-[#111] border border-white/10 max-w-xl w-full text-center">
                <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-2">Can&apos;t find what you&apos;re looking for?</h4>
                <p className="text-gray-400 text-sm mb-6">Chat with our stylists and we&apos;ll help you personally.</p>
                <a 
                  href={`https://wa.me/${brand.whatsappNumber}?text=Hello,%20I'm%20looking%20for%20a%20specific%20shoe%20but%20couldn't%20find%20it.`}
                  target="_blank" rel="noreferrer"
                  className="w-full sm:w-auto inline-flex h-14 px-8 bg-[#25D366] text-white items-center justify-center font-bold uppercase tracking-widest hover:bg-[#1EBE5A] transition-colors text-sm"
                >
                  <MessageCircle className="h-5 w-5 mr-3" /> Ask On WhatsApp
                </a>
              </div>

              <div className="mt-16 w-full max-w-2xl">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Search Suggestions</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Trending Sneakers', 'Best Selling Heels', 'Office Shoes', 'Party Wear', 'Budget Picks'].map(chip => (
                    <button 
                      key={chip}
                      onClick={() => { setSearchQuery(chip); setFilterCategory('All'); }}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors uppercase tracking-widest"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 border-t border-white/10 pt-8">
                {filteredProducts.slice(0, visibleCount).map((product, index) => {
                  const isSeparator = index > 0 && index % 12 === 0;
                  const separatorText = index === 12 ? 'Trending Right Now' : (index === 24 ? 'Customer Favorites' : 'Recently Added');
                  
                  return (
                    <React.Fragment key={product.id}>
                      {isSeparator && (
                        <div className="col-span-2 md:col-span-4 xl:col-span-6 py-12 md:py-16 flex items-center justify-center border-y border-white/5 my-4">
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C6FF00]">{separatorText}</span>
                        </div>
                      )}
                      <div className="group flex flex-col hover:-translate-y-1 transition-transform duration-300">
                        <div className="relative aspect-[3/4] w-full bg-[#111] overflow-hidden mb-4 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 border border-transparent group-hover:border-white/10">
                          <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}></Link>
                          
                          {/* Badge (Primary Only) */}
                          <div className="absolute top-3 left-3 z-20 shadow-xl">
                            {product.isFlashDeal ? (
                              <span className="bg-[#FF6B00] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest leading-none block">Sale</span>
                            ) : product.isNewArrival ? (
                              <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest leading-none block">New</span>
                            ) : product.isBestSeller ? (
                              <span className="bg-[#C6FF00] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest leading-none block">Best Seller</span>
                            ) : null}
                          </div>

                          {/* Quick Actions (Desktop Hover) */}
                          <div className="absolute top-3 right-3 z-30 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex">
                            <button className="h-8 w-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#C6FF00] transition-colors shadow-lg" aria-label="Save">
                              <Heart className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }}
                              className="h-8 w-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#C6FF00] transition-colors shadow-lg" aria-label="Quick View">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            referrerPolicy="no-referrer"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                          />
                        </div>
                        
                        <div className="w-full text-left flex flex-col flex-1">
                          <Link href={`/product/${product.id}`} className="w-full block">
                            <h3 className="font-sans font-medium text-white line-clamp-2 mb-1 group-hover:text-[#C6FF00] transition-colors text-sm sm:text-base leading-tight">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="font-sans font-medium text-white text-sm">{formatPrice(product.price)}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-gray-400 mb-4 h-4">
                              {product.rating ? (
                                <span className="flex items-center text-[#C6FF00]/80">
                                  <Star className="w-3 h-3 fill-current mr-1" /> {product.rating} Rating
                                </span>
                              ) : product.reviews ? (
                                <span>{product.reviews}+ Reviews</span>
                              ) : null}
                            </div>
                          </Link>

                          {/* CTAs */}
                          <div className="mt-auto pt-2 w-full">
                             <a 
                              href={`https://wa.me/${brand.whatsappNumber}?text=I'm%20interested%20in:%20${product.name}`}
                              target="_blank" rel="noreferrer"
                              className="w-full bg-[#25D366] text-white font-bold h-10 sm:h-12 hover:bg-[#1EBE5A] transition-colors flex justify-center items-center uppercase tracking-widest text-[10px] sm:text-xs mb-2 z-20 relative"
                             >
                               <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> Order on WhatsApp
                             </a>
                             <button 
                               onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }}
                               className="w-full h-8 flex items-center justify-center text-gray-400 hover:text-white uppercase tracking-widest font-bold text-[9px] sm:text-[10px] transition-colors lg:hidden z-20 relative"
                             >
                               Quick View
                             </button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Load More System */}
              {visibleCount < filteredProducts.length ? (
                <div className="mt-16 sm:mt-24 flex flex-col items-center">
                  {isLoadingMore ? (
                    <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#C6FF00] animate-spin" />
                  ) : (
                    <button 
                      onClick={handleLoadMore}
                      className="h-14 px-10 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors min-w-[240px]"
                    >
                      Load More Styles
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-16 sm:mt-24 border-t border-white/10 pt-16 flex flex-col items-center text-center">
                  <h4 className="font-display text-2xl text-white uppercase tracking-wide mb-3">You&apos;ve Reached The End</h4>
                  <p className="text-gray-400 mb-8 max-w-sm">Still looking for something specific? Let our team help you find the perfect pair.</p>
                  <a 
                    href={`https://wa.me/${brand.whatsappNumber}?text=Hello,%20I'm%20looking%20for%20some%20help%20finding%20a%20specific%20style.`}
                    target="_blank" rel="noreferrer"
                    className="h-14 px-8 bg-[#25D366] text-white font-bold uppercase tracking-widest hover:bg-[#1EBE5A] transition-colors inline-flex items-center text-sm"
                  >
                    <MessageCircle className="h-5 w-5 mr-3" /> Chat on WhatsApp
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Persistent WhatsApp Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {showHelperTooltip && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mb-4 bg-white text-black p-4 shadow-2xl relative max-w-[220px] rounded-sm transform origin-bottom-right"
            >
              <button 
                onClick={() => { setShowHelperTooltip(false); setHasDismissedTooltip(true); }}
                className="absolute top-2 right-2 text-gray-400 hover:text-black transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>
              <p className="text-sm font-bold leading-tight pr-4">Need help finding your size?</p>
              <p className="text-xs text-gray-600 mt-1">Chat with us instantly</p>
              
              {/* Triangle pointer */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <a 
          href={`https://wa.me/${brand.whatsappNumber}?text=Hello%20Diva%20Steps%20Collection,%20I'm%20interested%20in%20ordering%20footwear%20from%20your%20website.%20Could%20you%20assist%20me%20with%20availability,%20sizing,%20and%20delivery?%20Thank%20you.`}
          target="_blank" rel="noreferrer"
          className="relative flex items-center justify-center p-4 bg-[#25D366] text-white rounded-full hover:bg-[#1EBE5A] transition-colors shadow-[0_10px_25px_rgba(37,211,102,0.4)] group overflow-hidden"
          onMouseEnter={() => setShowHelperTooltip(false)}
        >
          <MessageCircle className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[150px] group-hover:ml-3 transition-all duration-300 font-bold uppercase tracking-widest text-sm relative z-10">
            Need Help?
          </span>
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:animate-[ping_1.5s_ease-out_infinite] pointer-events-none"></div>
        </a>
      </div>

      {/* Advanced Filter Drawer */}
      <AnimatePresence>
        {isAdvancedFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdvancedFiltersOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-50 flex flex-col pb-safe"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="font-display uppercase tracking-widest text-xl flex items-center text-white">
                  <SlidersHorizontal className="h-4 w-4 mr-3 text-[#C6FF00]" /> Advanced Filters
                </h2>
                <button
                  onClick={() => setIsAdvancedFiltersOpen(false)}
                  className="p-2 -mr-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Categories</h3>
                    {(filterCategory && filterCategory !== 'All') && (
                       <button onClick={() => setFilterCategory('All')} className="text-xs text-[#C6FF00] hover:text-white transition-colors">Clear</button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors border ${
                          (filterCategory || 'All').toLowerCase() === cat.toLowerCase()
                            ? 'bg-[#C6FF00] text-black border-[#C6FF00]'
                            : 'bg-[#1A1A1A] text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-4">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Under 2,000', '2,000 - 4,000', 'Over 4,000'].map((price) => (
                      <button
                        key={price}
                         className="px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors border bg-[#1A1A1A] text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-4">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {['36', '37', '38', '39', '40', '41', '42', '43'].map((size) => (
                      <button
                        key={size}
                         className="py-2.5 rounded text-[10px] sm:text-xs font-bold transition-colors border bg-[#1A1A1A] text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-white/5 bg-[#0A0A0A] flex gap-4">
                <button
                  onClick={() => {
                    setFilterCategory('All');
                    setSearchQuery('');
                  }}
                  className="flex-1 py-3.5 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-none font-bold uppercase tracking-widest text-xs transition-colors"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsAdvancedFiltersOpen(false)}
                  className="flex-1 py-3.5 bg-[#C6FF00] hover:bg-white text-black rounded-none font-bold uppercase tracking-widest text-xs transition-colors"
                >
                  Show ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-y-auto hide-scrollbar flex flex-col md:flex-row z-10"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image Sec */}
              <div className="w-full md:w-1/2 relative bg-[#111] min-h-[300px] md:min-h-[500px]">
                 <Image
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
              </div>

              {/* Content Sec */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                <div className="mb-2 uppercase tracking-widest text-[10px] text-[#C6FF00] font-bold">
                  {quickViewProduct.category}
                </div>
                <h2 className="font-display uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-2">
                  {quickViewProduct.name}
                </h2>
                
                <div className="flex items-end gap-3 mb-6">
                  <span className="font-sans font-medium text-white text-xl">{formatPrice(quickViewProduct.price)}</span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-gray-500 line-through mb-0.5">{formatPrice(quickViewProduct.originalPrice)}</span>
                  )}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {quickViewProduct.description}
                </p>

                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="mb-8">
                    <span className="font-bold text-white uppercase tracking-widest text-xs block mb-3">Available Sizes (EU)</span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((size) => (
                        <div
                          key={size}
                          className="h-10 px-4 border border-white/20 text-white flex items-center justify-center font-bold text-sm bg-white/5"
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-white/10">
                   <a 
                    href={`https://wa.me/${brand.whatsappNumber}?text=I'm%20interested%20in:%20${quickViewProduct.name}`}
                    target="_blank" rel="noreferrer"
                    className="w-full h-14 bg-[#25D366] text-white font-bold hover:bg-[#1EBE5A] transition-colors flex justify-center items-center uppercase tracking-widest text-sm mb-3"
                   >
                     <MessageCircle className="h-5 w-5 mr-3" /> Order on WhatsApp
                   </a>
                   <Link
                     href={`/product/${quickViewProduct.id}`}
                     className="w-full h-12 border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors flex justify-center items-center uppercase tracking-widest text-xs"
                   >
                     View Full Details
                   </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-black animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  );
}
