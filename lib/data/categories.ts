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
