export type Product = {
  id: number;
  serial?: number | null;
  size_chart?: {
    size: string;
    chest: string;
    length: string;
    sleeve: string;
  }[];
  name: string;
  image: string;
  price: number;
  old_price: number;
  discount: string;
  badge: string;
  category: string;
  stock: number;
};
