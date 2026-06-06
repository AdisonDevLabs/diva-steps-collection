// lib/data/categories.ts

export interface Category {
  name: string;
  slug: string;
  label?: string;
  image: string;
  span?: string;
}

export const categories: Category[] = [
  {
    name: "HEELS",
    slug: "heels",
    label: "Trending Now",
    image: "/Neon Fuchsia Pointed heels.png",
    span: "md:col-span-2",
  },
  {
    name: "BOOTS",
    slug: "boots",
    label: "Best Sellers",
    image: "/Slouchy White Stilettos boots.png",
    span: "md:col-span-2",
  },
];

export const heroCategories = categories.slice(0, 5);

export const discoveryChips = [
  { id: 'trending', label: '🔥 Trending', context: 'Trending Styles' },
  { id: 'best-sellers', label: '⭐ Best Sellers', context: 'Best Sellers' },
  { id: 'just-dropped', label: '🆕 Just Dropped', context: 'New Arrivals' },
  { id: 'budget-picks', label: '💰 Budget Picks', context: 'Budget Friendly' },
  { id: 'premium-styles', label: '✨ Premium Styles', context: 'Premium Collection' },
];

export const filterCategories = ['All', 'Heels', 'Sneakers', 'Flats', 'Sandals', 'Boots'];

export const searchSuggestions = ['Trending Sneakers', 'Best Selling Heels', 'Office Shoes', 'Party Wear', 'Budget Picks'];

export const navSearchSuggestions = ['Sneakers', 'Heels', 'New Arrivals'];

export const navLinksData = [
  { label: "Shop All", href: "/shop", baseTextClass: "text-white", hoverTextClass: "hover:text-[#C6FF00]", underlineClass: "bg-[#C6FF00]", isLive: false },
  { label: "New Drops", href: "/shop?category=new-arrivals", baseTextClass: "text-gray-400", hoverTextClass: "hover:text-white", underlineClass: "bg-white", isLive: false },
  { label: "Trending", href: "/shop?category=trending", baseTextClass: "text-gray-400", hoverTextClass: "hover:text-white", underlineClass: "bg-white", isLive: false },
  { label: "Deals", href: "/shop?category=deals", baseTextClass: "text-gray-400", hoverTextClass: "hover:text-[#FF0000]", underlineClass: "bg-[#FF0000]", isLive: true },
];

export const priceRanges = ['Under 2,000', '2,000 - 4,000', 'Over 4,000'];

export const filterSizes = ['36', '37', '38', '39', '40', '41', '42', '43'];