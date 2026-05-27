"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
        <Search className="text-slate-400" size={22} />

        <input
          type="text"
          placeholder="Search jersey..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
