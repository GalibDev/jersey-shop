export default function HeroBanner() {
  return (
    <section className="px-4 pt-4">
      <div className="relative overflow-hidden rounded-3xl bg-orange-500 p-5 text-white shadow-md">
        <p className="text-xs font-bold uppercase tracking-wide">
          New Collection
        </p>

        <h1 className="mt-2 text-2xl font-extrabold leading-tight">
          Premium Football Jersey
        </h1>

        <p className="mt-2 text-sm text-white/90">
          Brazil, Argentina, Club Jersey & more.
        </p>

        <button className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-bold text-orange-500">
          Shop Now
        </button>

        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20" />
      </div>
    </section>
  );
}