import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistStore = {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],

      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((item) => item !== id)
            : [...state.wishlist, id],
        })),
    }),
    {
      name: "jersey-wishlist",
    }
  )
);