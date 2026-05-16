import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
          NOVA<span className="text-orange-500">LO</span>
        </div>

        <div className="flex items-center gap-3 text-slate-800">
          <button>
            <Search size={24} />
          </button>

          <button>
            <ShoppingCart size={26} />
          </button>
        </div>
      </div>
    </header>
  );
}