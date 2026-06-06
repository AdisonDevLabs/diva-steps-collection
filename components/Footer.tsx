'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Wallet, CheckCircle, MessageCircle, Send, Instagram, Facebook } from 'lucide-react';
import { brand, footerQuickShopLinks, footerSupportLinks } from '@/lib/data/brand';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-20 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href="/" className="font-display font-black text-3xl tracking-tighter text-white uppercase mb-4 block">
               DIVA<span className="text-[#C6FF00]">STEPS</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              {brand.description}
            </p>
            <div className="inline-flex items-center text-[#25D366] text-xs font-bold tracking-widest uppercase bg-[#25D366]/10 px-3 py-1.5 border border-[#25D366]/20 mb-8">
               <CheckCircle className="w-3 h-3 mr-2" /> Trusted by customers nationwide
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-auto">
              <div className="flex items-center text-gray-500">
                <Truck className="w-4 h-4 mr-1.5 text-[#C6FF00]" /> <span className="text-[10px] font-bold uppercase tracking-wider">{brand.deliveryInfo.standard}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#C6FF00]" /> <span className="text-[10px] font-bold uppercase tracking-wider">Quality Checked</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Wallet className="w-4 h-4 mr-1.5 text-[#C6FF00]" /> <span className="text-[10px] font-bold uppercase tracking-wider">Affordable</span>
              </div>
            </div>
          </div>

          {/* Quick Shop */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-white text-lg uppercase tracking-wide mb-6">Quick Shop</h4>
            <ul className="space-y-4">
              {footerQuickShopLinks.map((link, idx) => (
                <li key={idx}><Link href={link.href} className="text-gray-400 hover:text-[#C6FF00] text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-white text-lg uppercase tracking-wide mb-6">Support</h4>
            <ul className="space-y-4">
              {footerSupportLinks.map((link, idx) => (
                <li key={idx}><Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-white text-lg uppercase tracking-wide mb-6">Contact Us</h4>
            
            <a href={`https://wa.me/${brand.whatsappNumber}?text=I'm%20ready%20to%20place%20an%20order`} target="_blank" rel="noreferrer" className="flex items-center w-full bg-[#25D366] text-white p-4 group mb-6 hover:bg-[#1EBE5A] transition-colors shadow-[0_0_15px_-3px_rgba(37,211,102,0.3)]">
              <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center mr-4">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white font-bold text-sm uppercase tracking-widest leading-none mb-1">Start Order Instantly</p>
                <p className="text-white/80 text-xs">Chat on WhatsApp</p>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#25D366] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </a>

            {/* Newsletter */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2">Join Our VIP List</h4>
              <p className="text-gray-400 text-xs mb-4">Get early access to new arrivals and exclusive deals.</p>
              <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="bg-[#1A1A1A] text-white border border-white/10 px-4 py-3 w-full text-sm focus:outline-none focus:border-[#C6FF00] rounded-none placeholder:text-gray-600 transition-colors" />
                <button type="submit" className="bg-[#C6FF00] text-black px-4 py-3 font-bold text-sm hover:bg-white transition-colors flex items-center justify-center min-w-[50px]">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-4">
              <a href={brand.socialLinks.tiktok} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center text-xs font-bold tracking-wider uppercase group">
                TikTok
              </a>
              <span className="text-white/10">•</span>
              <a href={brand.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center text-xs font-bold tracking-wider uppercase group">
                <Instagram className="w-3 h-3 mr-1" />
                Instagram
              </a>
              <span className="text-white/10">•</span>
              <a href={brand.socialLinks.facebook} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center text-xs font-bold tracking-wider uppercase group">
                <Facebook className="w-3 h-3 mr-1" />
                Facebook
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
          <p className="text-gray-500 text-[10px] sm:text-xs">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="text-gray-600 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-center md:text-right">
            Designed for mobile-first shopping experience in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}