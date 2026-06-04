export type Product = {
  id: number;
  serial?: number | null;
  name: string;
  image: string;
  price: number;
  old_price: number;
  discount: string;
  badge: string;
  category: string;
  stock: number;
};
