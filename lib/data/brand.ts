// lib/data/brand.ts
import { Truck, MessageCircle, Star, Sparkles, Tag, CheckCircle, ShieldCheck } from 'lucide-react';

export const brand = {
  name: "Diva Steps Collection",
  tagline: "Step into Confidence",
  description:
    "Stylish, affordable, and high-quality women's footwear designed for everyday elegance.",
    seo: {
    title: "Diva Steps Collection",
    description: "Premium footwear ecommerce website optimized for mobile.",
  },
  whatsappNumber: "254721743930",
  whatsappMessage: {
    general:
      "Hello Diva Steps Collection,\n\nI would like to place an order.\n\nProduct(s):\n\nSize:\nQuantity:\nDelivery Location:\n\nPlease confirm availability and total price.\n\nThank you.",
  },
  socialLinks: {
    instagram: "https://instagram.com/diva_steps_collection",
    facebook: "https://facebook.com/diva_steps_collection",
    tiktok: "https://tiktok.com/@diva_steps_collection",
  },
  deliveryInfo: {
    standard: "Ksh 300-500 for Percels Outside Nairobi",
    nairobi: "Ksh 100 for Deliveries/Drop offs Within CBD",
  },
  trustStatements: [
    "Fast Delivery Across Kenya",
    "Quality Checked",
    "WhatsApp Ordering",
    "Secure Ordering",
  ],
  features: [
    {
      title: "Premium Quality",
      description: "Every pair is carefully selected to ensure comfort, durability, and modern style."
    },
    {
      title: "Affordable Prices",
      description: "Get stylish footwear without overspending — value for money guaranteed."
    },
    {
      title: "Fast Delivery",
      description: "We process and deliver orders promptly so you receive your items as fast as possible across Kenya."
    },
    {
      title: "WhatsApp Ordering",
      description: "No complicated checkout — just message us and place your order instantly."
    }
  ],
  whatsappTrustSignals: [
    "Fast response within minutes",
    "Secure and reliable",
    "Quick delivery available",
    "Trusted across Kenya"
  ],
  whatsappMockChat: [
    {
      sender: "brand",
      text: "Hello! Welcome to Diva Steps. What style are you looking for today? 👠✨",
      time: "10:02 AM"
    },
    {
      sender: "user",
      text: "Hi, I want to order the Black Heels in size 39. Are they available?",
      time: "10:05 AM"
    },
    {
      sender: "brand",
      text: "Yes, they are! We can deliver today within Nairobi.",
      time: "10:06 AM"
    }
  ],
  salesCallout: "200+ sold this week"
};

export const announcementMessages = [
  { text: "Fast Delivery Across Kenya", icon: Truck },
  { text: "Order Easily Via WhatsApp", icon: MessageCircle },
  { text: "New Arrivals Added Weekly", icon: Sparkles },
  { text: "Trusted by Hundreds of Happy Customers", icon: Star },
  { text: "Flash Deals Available Today", icon: Tag },
];

export const cartTrustFeatures = [
  { text: "Fast Delivery Across Kenya", icon: Truck },
  { text: "Quality Checked", icon: CheckCircle },
  { text: "Secure Ordering", icon: ShieldCheck },
  { text: "WhatsApp Support", icon: MessageCircle },
];

export const footerQuickShopLinks = [
  { label: "New Arrivals", href: "/shop" },
  { label: "Best Sellers", href: "/shop?category=best-sellers" },
  { label: "Heels", href: "/shop" },
  { label: "Sneakers", href: "/shop" },
  { label: "Flats & Sandals", href: "/shop" },
];

export const footerSupportLinks = [
  { label: "How to Order", href: "/how-to-order" },
  { label: "Delivery Info", href: "/delivery" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "FAQ", href: "/faq" },
];