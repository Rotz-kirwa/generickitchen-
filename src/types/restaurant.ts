export type HeroSlide = {
  name: string;
  scriptSubtitle: string;
  category: string;
  price: string;
  priceNum: number;
  description: string;
  image: string;
  image640?: string;
  image960?: string;
  position: string;
  alt: string;
};

export type Product = {
  name: string;
  category: string;
  image: string;
  position: string;
  description: string;
  price: string;
  priceNum: number;
};

export type CartItem = {
  name: string;
  price: string;
  priceNum: number;
  quantity: number;
  image: string;
  category?: string | undefined;
};
